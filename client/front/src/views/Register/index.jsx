import {Form, Input, Button, Checkbox, Alert} from 'antd';
import { UserOutlined, LockOutlined,MailOutlined  } from '@ant-design/icons';
import axios from "../../config/axios";
import {useState} from "react";

export default () => {
    let user = "Nom d'utilisateur ";
    const [loading , setLoading] = useState(false)
const [error , setError] = useState('')
    const [success , setSuccess] = useState(false)

    const onFinish = (values) => {
        setError('')
        console.log('Received values of form: ', values);
        setLoading(true)
        setSuccess(false)
        axios.post('/register' , values)
            .then(res => {
                console.log(res)
                setLoading(false)
                if(res.data.status === 200){

                    setSuccess(true)
                }else{
                    setError(res.data.response)
                }

            })
    };
    return(
        <>

            <section class="main-banner" id="top">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6 ">
                            <div class="header-text">
                                {
                                    success
                                    ?
                                      <Alert type='success' showIcon message="Votre compte a était crée avec success" />
                                        :
                                        <>
                                            <h6>Create account</h6>
                                            <br/>
                                            <Form
                                                name="normal_login"
                                                className="login-form"
                                                initialValues={{
                                                    remember: true,
                                                }}
                                                onFinish={onFinish}
                                            >

                                                {
                                                    error.length > 0
                                                    &&
                                                    <>
                                                        <Alert type='error' showIcon message={error} />
                                                        <br/>
                                                    </>

                                                }
                                                <Form.Item
                                                    name="username"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please input your Username!',
                                                        },
                                                    ]}
                                                >
                                                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder= "Nom d'utilisateur " />
                                                </Form.Item>

                                                <Form.Item
                                                    name="email"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please input your email!',
                                                        },
                                                    ]}
                                                >
                                                    <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
                                                </Form.Item>

                                                <Form.Item
                                                    name="password"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please input your Password!',
                                                        },
                                                    ]}
                                                >
                                                    <Input
                                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                                        type="password"
                                                        placeholder="Password"
                                                    />
                                                </Form.Item>


                                                <Form.Item>
                                                    <Button loading={loading} style={{marginRight:'10px'}} type="primary" htmlType="submit" className="login-form-button">
                                                        S'inscrire
                                                    </Button>
                                                    <br/>
                                                    <br/>
                                                    <br/>
                                                   vous avez déja un compte  ! <a href="">se connecter </a>
                                                </Form.Item>
                                            </Form>
                                        </>
                                }

                            </div>
                        </div>
                        <div class="col-lg-6">

                        </div>
                    </div>
                </div>
            </section>


        </>
    )
}