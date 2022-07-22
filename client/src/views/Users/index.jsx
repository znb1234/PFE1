import UserLayout from "../../layouts/UserLayout"
import {Button, Form, Input, message, Table} from 'antd'
import { useState, useEffect } from 'react'
import axios from "../../config/axios"
import Swal from "sweetalert2";
import * as React from 'react';
import {useSelector} from "react-redux";
import swal from "sweetalert";


export default () => {

    const [users, setusers] = useState([])
const [loading , setloading] = useState(false)
const [form] = Form.useForm()
    const [display , setdisplay] = useState(false)
    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = () => {
        setloading(true)
        axios.get('users')
            .then(res => {
                console.log(res);
                setusers(res.data)
                setloading(false)
            })
    }

    const activate = (item) => {
        axios.post('activate', { username: item.username })
            .then(res => {
                getUsers(); Swal.fire(
                    '',
                    'status modifié avec succés ',
                    'success'
                )
axios.post('validation' , {email  : item.email})
    .then(res => {
        message('un email de validtion est envoyé')
    })
            })
    }
    const supprimer = (name) => {
        swal({
            title: "voulez vous vraiment ",
            text: "se déconnecter ?",
            icon: "info",
            buttons: true,
            dangerMode: true,
            okText : "oui"
        }).then(        axios.post('DeleteU', { username: name })
            .then(res => {
                getUsers();Swal.fire(
                    '',
                    'utilisateur supprimé avec succès ',
                    'success'
                )
            }))
    }



    const columns = [
        {
            title: `Nom d'utilisateur`,
            dataIndex: 'username',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'age',
        },
        {
            title: 'status',
            dataIndex: 'status',
            key: 'status ',
            render: (text, record) => {
                return (
                    <>
                        {
                            record.isVerified ?

                                <span className="badge rounded-pill bg-success" > vérifié</span> :
                                <span className="badge rounded-pill bg-danger" >  non vérifié  </span>
                        }
                    </>
                )
            }
        },
        {
            title: 'Actions',
            dataIndex: 'address',
            key: 'address',
            render: (text, record) => {
                return (
                    <>
                        <div style={{ display: "flex", alignItems: "center", fontSize: "20px", justifyContent: "space-around" }} >
                            <i onClick={()=>supprimer(record.username)} style={{ cursor: "pointer", marginRight: "5px" }} class="las la-trash-alt"></i>
                            <i onClick={()=>handleEdit(record)} style={{ cursor: "pointer", marginRight: "5px" }} class="las la-edit"></i>
                            <i onClick={()=>activate(record)} style={{ cursor: "pointer", marginRight: "5px" }} class="las la-check-circle"></i>
                        </div>
                    </>
                )
            }
        },

    ];


    const handleEdit = record => {
        form.setFieldsValue(record)
        setdisplay(true)
        localStorage.setItem('idupuser' , record.id)
    }
const {id} = useSelector(state => state.authentication)
    const update = (values) => {

        let data = {
           id :localStorage.getItem('idupuser' ),
            username : values.username,
            email : values.email
        }
        axios.post('UpdateU' , data )
            .then(res => {
                message.success("modification est efféctuée avec succès ")
                setdisplay(false)
                getUsers()
            })
    }

    return (
        <>
            <UserLayout>


                {
                    display
                    ?
                        <>
                            <h3>modifier les données de l'utilisateur </h3>
                            <Form
                                form={form}
                                onFinish={update}
                            >
                                <Form.Item
                                    name="username"
                                >
                                    <Input  />
                                </Form.Item>
                                <Form.Item
                                    name="email"
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item >
                                    <Button type="primary" htmlType="submit">
                                        sauvegarder
                                    </Button>
                                </Form.Item>
                            </Form>

                        </>
                        :
                        <>
                            <h3>Les utilisateurs </h3>
                            <br />
                            <Table loading={loading} dataSource={users} columns={columns} />
                        </>
                }


            </UserLayout>
        </>
    )
}
