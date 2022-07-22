import {Button, Table} from "antd";
import Post from "../../Components/Post";
import UserLayout from "../../layouts/UserLayout"
import {useEffect} from "react";
import axios from "../../config/axios";
import {useState} from "react";

export default () => {
    const columns = [
       
        {
            title: 'Contenu',
            dataIndex: 'contenu',
            key: 'age',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'age',
        },
        {
            title: 'Actions',
            dataIndex: 'username',
            key: 'age',
            render :  (text , record) => {
                return(
                    <>
                        {
                            record.isApprouved
                          ?
                                <span> approuvé  </span>
                                :
                                <Button
                                    onClick={() => approuver(record)}
                                >
                                    approuver
                                </Button>
                        }

                    </>
                )
            }
        },
    ];

     const [posts  , setposts] =  useState([])

    useEffect(() => {
        getPosst()
    }, [])

    const getPosst = () => {
        axios.post('ListingPosts' )
            .then(res => {
                setposts(res.data)

            })
    }

    const approuver  = item => {
axios.post('approuve' , {id : item.id})
    .then(res => {
        getPosst()
    })
    }

    return (
        <>
            <UserLayout>
                <h3>Les publications</h3>

                <br />
                <br />
                <Table dataSource={posts} columns={columns} />
            </UserLayout>
        </>
    )
}