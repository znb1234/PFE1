import React, { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import history from '../history.js'
import axios from 'axios'
import  '../components/Login.css'
import { Link } from 'react-router-dom'
const ContactUs = () => {

    const [Email, setEmail] = useState('')
    const [Subject, setSubject] = useState('')
    const [Message, setMessage] = useState('');
    const submitHandler = (e) => {
        e.preventDefault()
        console.log(Email,Subject,Message)
        axios.post("http://127.0.0.1:8000/ContactUs", {

         Email,Subject,Message
        }).then(res =>
                //  console.log(res.data.status)
            {if (res.data.status === 200)
            {  alert("your email was send successfully")}
            else
                alert("verify your data")}
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
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Email'
                                value={Email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='formBasicText'>
                            <Form.Label>Subject</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Subject'
                                value={Subject}
                                onChange={(e) => setSubject(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='formBasicText'>
                            <Form.Label>Message</Form.Label>
                            <textarea
                                className="form-control"
                                style={{
                                    borderRadius: '10px',
                                    width: '500px',
                                    height: '200px',
                                    marginRight: 'auto'
                                }}>
                            </textarea>
                        </Form.Group>
                        <Button  onClick={ submitHandler} variant='primary' type='submit'>
                         send
                        </Button>
                        <br/>
                        <div className='p-3'>

                        </div>
                    </Form>
                </div>
            </Container>
        </div>
    )
}

export default ContactUs
