import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { clearUser, increment,decrement } from '../features/User'

function Test() {
    const dispatch=useDispatch()
    const counter= useSelector((state)=>state.variables.counter)
    const currentUser= useSelector((state)=>state.variables.currentUser)

    const handleAction=()=>{
        dispatch(increment(2))
    }
    const handleAction2=()=>{
      dispatch(decrement(2))
  }

    const handleClear=()=>{
      localStorage.setItem('currentUser', null);
    }

  return (
    <div>
        This is Testing page !
        Counter :{counter}
        <button onClick={handleAction}>Click to increment by 2</button>
        <button onClick={handleAction2}>Click to decrement by 2</button>

        <h4>Clear Browser Storage (clear user)</h4>
        <button onClick={handleClear}>clear</button>
        <p>{currentUser.email}</p>
    </div>
  )
}

export default Test
