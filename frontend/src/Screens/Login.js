import React, { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import history from '../history.js'
import axios from 'axios'
import  '../components/Login.css'
import { Link } from 'react-router-dom'
const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false);
  const submitHandler = (e) => {
    e.preventDefault()
    console.log(username, password)
    axios.post("http://127.0.0.1:8000/login", {
        username,
        password
      }).then(res => 


    {if (res.data.status === 200)


          {
            //var username_value = sessionStorage.getItem("username_key");// Assign value to a key
            sessionStorage.setItem("username_key", username);


            if (res.data.username===("admin1"))

        {  setLoading(true);  history.push('/users'); history.go(0)}
else  setLoading(true);  history.push('/my_space'); history.go(0)}
    else
    alert("check your confirmation email ")}
  //  ).catch(err => {
    //    err.response.status === 401 ? console.log("User not found") : console.log(err)
      //}
      );
  }

  return (
    <div>
      <Container>
        <div className="login-html">
        <Form onSubmit={submitHandler}>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>UserName</Form.Label>
            <Form.Control
              type='text'
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button  onClick={ submitHandler} variant='primary' type='submit'>
            login
          </Button>
          <br/>
          <div className='p-3'>
          <Link to='/register' >
            New User ? Register
          </Link>
          </div>
        </Form>
          </div>
      </Container>
    </div>
  )
}

export default Login