import UserLayout from "../../layouts/UserLayout";
import { Input, Row, Col } from 'antd'
import './index.css'
import {useEffect , useState} from 'react'
import Post from "../../Components/Post";
import axios from "../../config/axios";
import { Select } from 'antd';
import {useSelector} from "react-redux";
const { Search } = Input;


const { Option } = Select;

export default () => {
    const [copy, setcopy] = useState([])
    const [posts, setposts] = useState([])
    const onSearch = value =>{
        console.log('filtring')
        if(value === ''){
            setposts(copy)
        }else{
            let arr = [...copy]

            let data = arr.filter(x => x.contenu.toLowerCase().includes(value.toLowerCase()))
            setposts(data)
        }
    };


    const handleChange = (value) => {
        console.log(`selected ${value}`);
        if(value === 'all'){
            setposts(copy)
        }else{
            let arr = [...copy]

            let data = arr.filter(x => x.category === value)
            setposts(data)
        }
    };




    useEffect(() => {
        axios.post('ListingPosts' )
        .then(res => {
            setposts(res.data)
            setcopy(res.data)
        })
    }, [])
const {username}  = useSelector(state => state.authentication)
    return (
        <>
            <UserLayout>
                <div className="feeds_header" >
                    <Row>
                        <Col xs={24} sm={24} md={6} >
                            <div className="connected_user" >
                                <i className="las la-user-circle"></i>
                                <span> {username} </span>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={{ span: 12, offset: 0 }} >
                            <Search placeholder="chercher une publication " onChange={e => onSearch(e.target.value)} onSearch={onSearch} enterButton />
                            <br />
                            <br/>
                            <Select defaultValue="all" style={{ width: "100%" }} onChange={handleChange}>
                                <Option value="all" > All < /Option>
                                <Option value="Technology" > Technology < /Option>
                                <Option value="Consulting" > Consulting< /Option>
                                <Option value="Digital" >Digital< /Option>

                            </Select>
                            <br />
                            <br/>
                            {
                                posts.map(post => {
                                    return (
                                        <Post post={post} />
                                    )
                                })
                            }
                        </Col>
                    </Row>
                </div>

            </UserLayout>

        </>
    )
}