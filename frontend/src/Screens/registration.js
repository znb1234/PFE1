import React, { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import history from '../history.js'
import '../components/Login.css'
import axios from 'axios'

const Registration = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userRegister = useSelector(state => state.userRegister)
  const { loading, error } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(register(email, username, password))
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
              Register
            </Button>
            <Row className='py-3'>
              <Col>
                Already User ?{' '}
                <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                  Sign In
                </Link>
              </Col>
            </Row>
          </Form>
        </div>
      </Container>
    </div>
  )
}

export default Registration