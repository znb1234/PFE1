import { Col, Row } from "antd"
import Post from "../../Components/Post"
import UserLayout from "../../layouts/UserLayout"
import {useEffect, useState} from "react";
import axios from "../../config/axios";

export default () => {

    const [posts  , setposts] = useState([])


    useEffect(() => {
        axios.get('/AffichagePostsApprouved')
            .then(res => {
                setposts(res.data)
            })
    } , [])

    return (
        <>
            <UserLayout>
                <h3>Top trois publications</h3>

                <Row gutter={[16,16]} >
                    {
                        posts.map( p => {
                            return(
                                <Col xs={24} sm={24} md={8} ><Post post={p} /></Col>
                            )
                        })
                    }


                </Row>
            </UserLayout>
        </>
    )
}