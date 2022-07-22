//import UserLayout from "../../layouts/UserLayout";

import { Col, Row, Input, Button } from "antd"
import Post from "../../Components/Post"
import UserLayout from "../../layouts/UserLayout"
import axios from "../../config/axios"
import './index.css'
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { Select } from 'antd';
const { TextArea } = Input
const { Option } = Select;

export default () => {


    const authdata = useSelector(state => state.authentication)
    const [description, setdescription] = useState('')
    const [text, settext] = useState('')
    const [category, setcategory] = useState('')

    const [posts, setposts] = useState([])

    useEffect(() => {
        getPosts()
    }, [])

    const getPosts = () => {
        axios.post('getPost', { "auteurId": authdata.id })
            .then(res => {
                console.log('====================================')
                console.log(res.data)
                console.log('====================================')
             setposts(res.data[0])
            })
    }



    const addpost = () => {
        let data = {
            description: description,
            contenu: text,
            auteur_id: authdata.id,
            category: category,
            username: authdata.username
        }
      if (  data.contenu=== ''){
            alert(' il faut que la publication a un contenu ')
        }
         else  axios.post('/posting', data)
            .then(res => {
                console.log(res);
                Swal.fire(
                    '',
                    'la publication est publiée',
                    'success'
                )
                setdescription("")
                settext("")
                setcategory("")
            })
    }

    return ( <
        >
        <
        UserLayout >
            <
        Row >
                <
        Col sm={24}
                    xs={24}
                    md={6} > < /Col> <
        Col sm={24}
                        xs={24}
                        md={12} >
                        <
        div className="add_post" >
                            <
                                input value={description}
                                onChange={e => setdescription(e.target.value)}
                                placeholder=" description" />
                            <
                                textarea value={text } rules= {
                                [{
                                    required: true,
                                    message: 'il faut que la publication a un corps!'} ]}
                                onChange={e => settext(e.target.value)}
                                className="textarea_post"

                                style={
                                    { width: "100%", marginTop: "8px" }
                                }
                                placeholder="contenu"
                                rows={4}

                            />
                                             <
        div style={
                                    { marginTop: "8px", display: "flex", width: "100%" }
                                } >

                                <
        Select defaultValue="Digital"
                                    style={
                                        { width: "100%" }
                                    }
                                    onChange={e => setcategory(e)} >
                                    <Option value="Technology" > Technology < /Option>
                                        <Option value="Consulting" > Consulting< /Option> <
                                            Option value="Digital" >Digital< /Option>

                                            <
        /Select> <
                                                Button onClick={
                                                    () => addpost()
                                                }
                                                style={
                                                    { color: "white", marginLeft: "8px" }
                                                }
                                                shape="round" >
                                                publier <
        /Button>

                                            </div>
                                        </div>

                                            <
                                                br /> {
                                                posts.map(item => {
                                                    return ( <
                    >
                                                        <
                                                            Post onRefresh={getPosts}  post={item} own={true} />
                                                        <
                    />
                                                        )
            })
        } <
        /Col> <
                                                            Col sm={24}
                                                            xs={24}
                                                            md={6} > < /Col> </Row>

                                                        <
        /UserLayout> < />
                                                        )
}