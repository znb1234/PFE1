import React from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'

const MySpace = () => {

    const submitHandler = () => {
        // Dispatch what to do
    }

    return (
        <div>
            <Container>
                <Row >
                    <Col className='pt-5'>
                        <form onSubmit={submitHandler}>
                            <textarea
                                className="form-control"
                                style={{
                                    borderRadius: '10px',
                                    width: '500px',
                                    height: '200px',
                                    marginRight: 'auto'
                                }}>
                            </textarea>
                        </form>
                        <Button type='submit'
                            style={{
                                borderRadius: '10px',
                                borderColor: '#A2599F',
                                backgroundColor: '#A2599F',
                                float: 'right',
                                margin: '20px 50px 0 0',
                            }}>
                            Publier
                        </Button>
                    </Col>
                    <Col className='pt-5'>
                        <Row >
                            <Button
                                style={{
                                    borderRadius: '25px',
                                    borderColor: '#E0C7DF',
                                    backgroundColor: '#E0C7DF',
                                    color: '#642277',
                                    width: '200px',
                                    height: '120px',
                                    marginLeft: 'auto'
                                }}>
                                Mes Publications
                            </Button>
                        </Row>
                        <Row className='pt-5'>
                            <Button
                                style={{
                                    borderRadius: '25px',
                                    borderColor: '#E0C7DF',
                                    backgroundColor: '#E0C7DF',
                                    color: '#642277',
                                    width: '200px',
                                    height: '120px',
                                    marginLeft: 'auto'
                                }}>
                                Mes Questions
                            </Button>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default MySpace