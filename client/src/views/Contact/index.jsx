import { Alert, Button, Col, Form, Input, Row } from "antd";
import contactus from '../../assets/img/contactus.png.png'
import logo from "../../assets/img/logo.png";
import axios from '../../config/axios'
import {useState} from 'react'
const { TextArea } = Input
export default () => {

    const [success, setsuccess] = useState(false)

    const onFinish = values => {
        axios.post('ContactUs', values)
            .then(res => {
                setsuccess(true)
            })
    }

    return (
        <>
            <section className="main-banner" id="top">
                <div className="container" >
                    <Row gutter={[16, 16]} >
                        <Col xs={24} sm={24} md={12} >

                            <img src={contactus} alt="Contact Us" />
                        </Col>
                        <Col xs={24} sm={24} md={12} >
                            {
                                success
                                    ?
                                    <Alert message='votre message est envoyée avec succès ' type="success" showIcon />
                                    :

                                    <Form
                                        onFinish={onFinish}
                                        wrapperCol={{ span: 24 }}
                                        labelCol={{ span: 24 }}
                                    >

                                        <Form.Item
                                            label='Email'
                                            name="email"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your Email!',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name="subject"
                                            label="Sujet"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your Username!',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            label='Message'
                                            name="message"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your subject!',
                                                },
                                            ]}
                                        >
                                            <TextArea rows={3} />
                                        </Form.Item>
                                        <Form.Item>
                                            <Button type="primary" htmlType="submit" className="login-form-button">
                                                Envoyer
                                            </Button>

                                        </Form.Item>
                                    </Form>
                            }
                        </Col>
                    </Row>
                </div>
            </section>
        </>
    )
}