import React, { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import history from '../history.js'
import  '../components/Login.css'
import axios from 'axios'

const Registration = () => {
    const [loading, setLoading] = useState(false);
 const [email,setEmail]= useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    console.log(email,username, password)
    axios.post("http://127.0.0.1:8000/register", {
       email:email, username: username,
        password: password
      }).then(res =>
        //console.log(res))
 {if (res.data.status === 200)
        {  setLoading(true);  history.push('/login'); history.go(0)}
     else
     alert("invalid data")}
     // .catch(err => {
       // err.response.status === 401 ? console.log("review your data") : console.log(err)
      //}
      );
  }

  return (
    <div>
      <Container>
          <div className="login-html">
        <Form onSubmit={submitHandler}>
          <Form.Group className='mb-3' controlId='formBasicUsername'>
            <Form.Label>username</Form.Label>
            <Form.Control
                type='text'
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>email</Form.Label>
            <Form.Control
              type='text'
              placeholder='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <Button onClick={submitHandler} variant='primary' type='submit'>
            register
          </Button>
        </Form>
          </div>
      </Container>
    </div>
  )
}

export default Registration