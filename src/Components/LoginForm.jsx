import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../features/User';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
const [email,setEmail]=useState("")
const [password,setPassword]=useState("")
const dispatch=useDispatch()
const navigate = useNavigate()

const handleSubmit=async()=>{
    try{
        //put the right api uri
        const res= await fetch("http://localhost:8081/users/Login", {
            method: "POST", body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data =await res.json()
         //check wether to redirect to the next screen and set the global variable " current user "
        if(res.status===200 && data){
            dispatch(setCurrentUser(data))
            localStorage.setItem('currentUser', JSON.stringify(data))
            navigate("/Dashboard")
        }
    }catch(err){
        console.log("erreur : "+err)
    }

}

    return (
        <div>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" onClick={handleSubmit}>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default LoginForm
