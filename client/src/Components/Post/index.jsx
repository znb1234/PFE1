import "./index.css"
import {Menu, Dropdown, Button,Form , Input, message, Avatar, Select} from 'antd';
import moment from 'moment'
import {useSelector} from "react-redux";
import {useEffect, useState} from 'react'
import { Modal } from 'antd';
import axios from "../../config/axios";
const {Option} = Select
export default ({onRefresh , post ,own }) => {

    const [isModalVisible, setIsModalVisible] = useState(false);
const [form] = Form.useForm()
    const showModal = () => {
    form.setFieldsValue(post)
        setIsModalVisible(true);
    };

    const handleOk = () => {
        console.log(form.getFieldsValue())

        let data  = {
            contenu:form.getFieldsValue().contenu,
            desciption:form.getFieldsValue().description,
            category:form.getFieldsValue().category,
            id : post.id

        }

        axios.post('UpdateP'  , data )
            .then(res=> {
                setIsModalVisible(false);
                window.location.reload()
            })

    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

const {username ,id ,  role } = useSelector(state => state.authentication)
    const [comments , setcomments] = useState([])
    const [comment , setcomment] = useState('')
    const [likes , setlikes] = useState(0)

    useEffect(() =>  {
axios.post('getComment' , {post_Id:post.id,user_Id:id})
    .then(
        res => {
           setcomments(res.data[0])
            console.log(res)

        })

        axios.post('nombreLike' , {post : post.id} )
            .then(res => {
                console.log(res)
                setlikes(Number(res.data))
            })

    }, [])




    const handlecomment= e => {
    if(e.key === 'Enter'){
        let data  = {
            contenu : comment,
            idUser : id,
           idPost: post.id
        }

        axios.post("Comment" , data)
            .then(res => {
                setcomment(prev  => [data  , ...prev])
                setcomment('');window.location.reload()
            })
    }
    }

    const deletPost  = () => {
    axios.post('DeleteP' , {id : JSON.stringify(post.id) })
        .then(res => {
            message.success('publiaction supprimé')
            onRefresh()
        })

    }


    const menu = (
        <Menu
            items={[
                {
                    label: (
                        <div onClick={() => deletPost()} style={{ display: "flex", alignItems: "center", fontSize: "16px" }} >
                            <i  style={{ marginRight: "5px" }} class="las la-trash-alt"></i>
                            <span>supprimer</span>
                        </div>
                    ),
                },
                {
                    label: (
                        <div onClick={showModal} style={{ display: "flex", alignItems: "center", fontSize: "16px" }}>
                            <i style={{ marginRight: "5px" }} class="las la-edit"></i>
                            <span>modifier</span>
                        </div>
                    ),
                },


            ]}
        />
    );




const like = () => {

    let data = {

        id_post : post.id,
        id_user : id
    }


    axios.post('likePost' , data)
        .then(res => {
            setlikes(likes+1)
        })
        .catch(err => {
            message.error('vous avez réagi déja à cette publication')
        })
}



    return (
        <>
            <div className="post_item">
                <div className="post_header">

                    <div className="owner" >
                        <div>
                            {
                                own
                                    ?
                                    null
                                    :
                                    <Avatar size={32} style={{marginRight:"10px", color: '#f56a00', backgroundColor: '#fde3cf' }}>{post.username[0].toUpperCase()}</Avatar>

                            }
                            <span>
                               {post.username}
                            </span>
                        </div>


                    </div>
                    <div>

                        {username === post.username
                            &&
                            <Dropdown overlay={menu} placement="bottomLeft">
                                <div>
                                    <i class="las la-cog"></i>

                                </div>
                                {/* */}
                            </Dropdown>
                        }


                    </div>



                </div>
                <div className="post_content">
                    <div style={{display:"flex" , justifyContent:"space-between"}} >
                        <b>{post.description}</b>
                        <span className='post_date' > {moment(post.creationdate).format('YYYY-MM-DD:hh-mm')} </span>
                    </div>
<br/>
                    <p >
                        {post.contenu}
                    </p>
                </div>
                <div className="actions">
                    <div style={{ display: "flex" }} >
                        <div className="likes">
                            <i style={{color : 'red'}} onClick={like} class="las la-heart"></i>
                            <span>{likes}</span>
                        </div>
                        <div className="comments_number">
                            <i class="las la-comment-dots"></i>
                            <span>{comments.length} comment</span>
                        </div>
                    </div>

                    <div className="category">
                        <span>{post.category}</span>
                    </div>
                </div>


                <div className="post_comments">
                    <div className="write_comment">
                        <input onKeyDown={handlecomment} value={comment} onChange={e => setcomment(e.target.value)} placeholder="Ecrire un commentaire  ! " type="text" />
                    </div>

                    <br />
                    {
                        comments.map(com => {
                            return (
                                <>
                                    <div className="comment_item" >
                                        <b>{com.auteur.username}</b>
                                        <span>{com.contenu}</span>
                                    </div>
                                    <br />
                                </>
                            )
                        })
                    }
                </div>
            </div>
            <Modal title="Modifier la publication" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
               <Form
                   form={form}
               >
                   <Form.Item
                   name="description"
                   >
                       <Input placeholder=" description" />
                   </Form.Item>
                   <Form.Item
                       name="contenu"
                   >
                       <textarea
                                    style={
                                        { width: "100%", marginTop: "8px" }
                                    }
                                    placeholder="corps de publication "
                                    rows={8}
                       />
                   </Form.Item>
                   <Form.Item
                       name="category"
                   >
                       <Select defaultValue="Digital"
                                style={
                                    { width: "100%" }
                                }
                                 >
                           <Option value="Technology" > Technology < /Option>
                           <Option value="Consulting" > Consulting< /Option>
                           <Option value="Digital" >Digital< /Option>

                       </Select>
                   </Form.Item>



               </Form>
            </Modal>
        </>
    )
}


