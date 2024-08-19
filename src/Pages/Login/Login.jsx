import React from 'react'
import LoginForm from "../../Components/LoginForm"
import "./Login.css"
function Login() {
  return (
    <>
      <h2 className='header'>Login to monitor your house</h2>
      <div className='loginForm'>
        <LoginForm />
      </div>
    </>
  )
}

export default Login
