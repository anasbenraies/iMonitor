import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const data = [
//   {
//     name: 'Page A',
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: 'Page B',
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: 'Page C',
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: 'Page D',
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: 'Page E',
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: 'Page F',
//     pv: 3800,
//     amt: 2500,
//   },

//   {
//     name: 'Page G',
//     pv: 4300,
//     amt: 2100,
//   },
//   {
//     name: 'Tomorrow',
//     pv: 4300,
//     amt: 2100,
//   },

  
// ];

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/p/sandbox/simple-bar-chart-72d7y5';
  
  render() {
    const {data} = this.props;
    return (
      <div style={{ width: "38vw", height: '40vh' }}> 

     
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="usageDate" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="durationInMinutes" fill="#b2e281" activeBar={<Rectangle fill="#8bc34a" stroke="#8bc34a" />} />
        </BarChart>
      </ResponsiveContainer>
      </div>
    );
  }
}
