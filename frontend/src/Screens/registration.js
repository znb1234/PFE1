import React, { useState } from 'react'
import { Container, Form, Button, Col, Row } from 'react-bootstrap'
import '../components/Login.css'
import { useDispatch, useSelector } from "react-redux";
import { register } from "../Redux/actions/userActions";
import history from '../history'
import {Redirect} from "react-router-dom";
import {Link} from "@mui/material";
import { useHistory } from "react-router-dom";


const Registration = ({  }) => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  console.log("user", username)
  console.log("user", email)
  const userRegister = useSelector(state => state.userRegister)
  const { success, userInfo } = userRegister

  console.log('success', success)
  console.log('userInfo', userInfo)

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(register(email, username, password))
    history.push("/login");
    history.go(0); }
  const LoginLink= (e) => {
    e.preventDefault()

    history.push("/login");
    history.go(0);
  }



    return (
        <div className={'a'}>
      <div>
        <Container>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
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
              <Button onClick={submitHandler} className='button' type='submit'>
                Register
              </Button>
              <Row className='py-3'>
                <br/>
                <br/>
                <br/>
                <Col>
                  Vous avez déja un compte ?{' '}
                  <button className="button" onClick={LoginLink}>
                   Login
                  </button>

                </Col>
              </Row>
            </Form>
          </div>
        </Container>
      </div>

        </div>)
}

export default Registration