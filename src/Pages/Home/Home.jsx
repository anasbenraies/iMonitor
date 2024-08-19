import { React, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setDevicesUsages } from '../../features/User'
import { FaRegUserCircle } from "react-icons/fa";
import "./Home.css"
import { Container, Row, Col, Alert } from 'react-bootstrap';

/**
 * The Home function is the main component of the application.
 * It handles the rendering of the home page, including the overview and device monitoring sections.
 * It also fetches the device usage data for the current user and updates the state accordingly.
 *
 * @return {JSX.Element} The JSX element representing the home page.
 */
function Home() {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.variables.currentUser)
  const devicesUsages = useSelector((state) => state.variables.devicesUsages)
  const [DevicesNumber, setDevicesNumber] = useState(0)
  const [LastDeviceUsage, setLastDeviceUsage] = useState(null)
  const [TotalThisMonth, setTotalThisMonth] = useState(0)
  const [devicesList, setDevicesList] = useState([])
/**
 * Finds the latest device usage date and sets it as the last device usage.
 *
 * @return {void}
 */
  const LastDeviceUsageDate = () => {
    let LastDeviceUsage_date = devicesUsages[0]?.usageDate;
    let lastUsage = {}
    for (let devicesUsage of devicesUsages) {
      if (LastDeviceUsage_date < devicesUsage.usageDate) {
        LastDeviceUsage_date = devicesUsage.usageDate
        lastUsage = devicesUsage
      }
    }
    setLastDeviceUsage(lastUsage)
  }

  // calculates the energy use for the current month 
  const TotalEneryUse = () => {
    let total = 0
    for (let deviceUsage of devicesUsages) {
      if (deviceUsage.usageDate.split("-")[0] === new Date().getFullYear().toString() && deviceUsage.usageDate.split("-")[1] === ('0' + (new Date().getMonth() + 1).toString())) {
        console.log(deviceUsage.usageDate)
        total += deviceUsage.energy_usage_in_kwh
      }
    }
    console.log("total this month :", total)
    setTotalThisMonth(parseFloat(total).toFixed(2))



  }

  // useEffect hook for data fetching the Device usage of the current user with his iD 
  useEffect(() => {
    async function getDeviceUsage() {
      try {
        //put the right api uri
        const res = await fetch(`http://localhost:8081/ressources/devicesUsages/${currentUser.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${currentUser.token}`
          }
        })
        const data = await res.json()
        if (res.status === 200 && data) {
          console.log(data)
          dispatch(setDevicesUsages(data))
        }
      } catch (err) {
        console.log("erreur : " + err)
      }
    }
    getDeviceUsage()

  }, [dispatch]);


  useEffect(() => {
    /**
     * Processes device usages by grouping them by device ID, sorting the grouped usages by date, and updating the devices number state.
     *
     * @return {void}
     */
    const ProcessingDeviceUsages = () => {
      if (devicesUsages.length > 0) {
        LastDeviceUsageDate()
        TotalEneryUse()
        //Grouping th e device usages by device id
        const groupedDevicesUsages = devicesUsages.reduce((groups, deviceUsage) => {
          const { device } = deviceUsage
          if (!groups[device.id]) {
            groups[device.id] = []
          }
          groups[device.id].push(deviceUsage)
          return groups
        }, {})
        // groupedDevicesUsages = { 1: [deviceUsage1, deviceUsage2], 2: [deviceUsage3, deviceUsage4] }
        console.log("result after grouping", groupedDevicesUsages)


        //Sorting the grouped device usages by date

        // Convert groupedDevicesUsages to an array of arrays this will only use the values of the groupedDevicesUsages
        // [ [deviceUsage1, deviceUsage2], [deviceUsage3, deviceUsage4] ]
        const groupedDevicesArray = Object.values(groupedDevicesUsages);
        console.log("result after converting", groupedDevicesArray);
        setDevicesNumber(groupedDevicesArray.length)
        // Sorting each inner array by usageDate
        groupedDevicesArray.forEach(deviceGroup => {
          deviceGroup.sort((a, b) => new Date(a.usageDate) - new Date(b.usageDate));
        });

        console.log("result after sorting", groupedDevicesArray);
        console.log("length of the array", groupedDevicesArray.length);


        //sorting the grouped device usages by date
        // const sortedGroupedDevicesUsages = Object.entries(groupedDevicesUsages).map(([deviceId, deviceUsages]) => {
        //   return {
        //     deviceId,
        //     deviceUsages: deviceUsages.sort((a, b) => new Date(a.usageDate) - new Date(b.usageDate))
        //   }
        // })
        // console.log(sortedGroupedDevicesUsages)
      }
    }
    ProcessingDeviceUsages();

  }, [devicesUsages]);



  return (
    <div>
      <div className='Header'>
        <div className='logoTitle'>
          <h2>iMonitor </h2>
        </div>
        <div className='user-info'>
          <h3>{currentUser.username}</h3>
          <FaRegUserCircle style={{ fontSize: "1.3em", cursor: "pointer" }} />
        </div>
      </div>
      <div className='Overview'>
        <h2>Overview</h2>
        <div className='Overview-cards'>
          <Container fluid >
            <Row style={{ marginLeft: "-1.5vw" }}>
              <Col xs={6} md={4} >
                <Alert variant={"info"} >
                  Total Enery use this month : {TotalThisMonth} kWh
                </Alert>
              </Col>
              <Col xs={6} md={4}>
                <Alert variant={"info"} >
                  Total devices : {DevicesNumber}
                </Alert>
              </Col>
              <Col md={4}>
                <Alert variant={"info"} >
                  Last Usage : {LastDeviceUsage?.device.type}-{LastDeviceUsage?.device.model}-{LastDeviceUsage?.usageDate}
                </Alert>
              </Col>
            </Row>
          </Container>
        </div>

      </div>
      <div className="DeviceMonitoring">
        <h2>
          Device Monitoring
        </h2>
        <div className="DeviceList">
          <h4>Device : </h4>
          <h4>Usage : </h4>

        </div>
      </div>
      Home !
      <h3>{currentUser.username}</h3>
      <h3>{currentUser.email}</h3>
      <div>DeviceUsages</div>
      {devicesUsages.map((deviceUsage, index) => (
        <div key={index}>
          <p>Device : {deviceUsage.durationInMinutes}</p>
          <p>Usage : {deviceUsage.device.type}</p>
        </div>
      ))}

    </div>
  )
}

export default Home
