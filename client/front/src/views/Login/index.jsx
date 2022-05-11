import {Form, Input, Button, Checkbox, Alert} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from "../../config/axios";
import {useState} from 'react'
export default () => {


    const [loading  ,setLoading] = useState(false)
    const [error  ,setError] = useState('')
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        setLoading(true)
        axios.post('/login' , values)
            .then(res => {
                setLoading(false)
                console.log(res)
                if(res.data.status === 200){

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
                                <h6> se connecter à Sharevioo </h6>
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
                                        <Alert type='error' message={error} showIcon />
                                            <br />
                                        </>
                                    }
                                    <Form.Item
                                        name="username"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'entrer le nom d utilisateur!',
                                            },
                                        ]}
                                    >
                                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="nom d utilisateur " />
                                    </Form.Item>
                                    <Form.Item
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'entrer le mot de passe!',
                                            },
                                        ]}
                                    >
                                        <Input
                                            prefix={<LockOutlined className="site-form-item-icon" />}
                                            type="password"
                                            placeholder="mot de passe "
                                        />
                                    </Form.Item>


                                    <Form.Item>
                                        <Button loading={loading} style={{marginRight:'10px'}} type="primary" htmlType="submit" className="login-form-button">
                                           Se connecter
                                        </Button> <br/>
                                        <br/>
                                        <br/>
                                        Vous n'avez pas un compte ! <a href="">S'inscrir maintenant </a>
                                    </Form.Item>
                                </Form>
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