import React, {Component} from 'react'
import { Container } from 'react-bootstrap'
import axios from 'axios'
import '../components/Users.css'
import { Row, Col } from 'react-bootstrap'
import '../components/home.css'
class TopThree extends Component {
    constructor() {
        super();
        this.state = { posts: [], loading: true };
    }
    componentDidMount() {
        this.getPosts();
    }
    getPosts() {
        axios.get(`http://localhost:8000/ListingPosts`).then(posts => {
           console.log(posts)
            this.setState({ posts: posts.data, loading: false })
        })
    }

   ;



    render() {
        const loading = this.state.loading;
        return (

        <
        div >
        <
        Container >
            <div className="container mt-4 mb-5">
                <div className="d-flex justify-content-center row">
                    <div className="col-md-8">
                        <div className="feed p-2">
                            <div
                                className="d-flex flex-row justify-content-between align-items-center p-2 bg-white border">
                                <div className="feed-text px-2">
                                    <h6 className="text-black-50 mt-2">What's on your mind
                                    </h6>
                                </div>
                                <div className="feed-icon px-2"><i className="fa fa-long-arrow-up text-black-50"></i>
                                </div>
                            </div>

                            {
                                this.state.posts.map(post =>
                                    <div  key = { post.id }>
                            <div className="bg-white border mt-2">
                                <div>
                                    <div
                                        className="d-flex flex-row justify-content-between align-items-center p-2 border-bottom">
                                        <div className="d-flex flex-row align-items-center feed-text px-2">
                                            <i className="fa-solid fa-user" ></i>
                                            <div className="d-flex flex-column flex-wrap ml-2"><span
                                                className="font-weight-bold">{ post.username }</span><span
                                                className="text-black-50 time"> { post.updatetime }</span></div>
                                        </div>
                                        <div className="feed-icon px-2">
                                            <i className="fa fa-ellipsis-v text-black-50"></i></div>
                                    </div>
                                </div>

                                        <div className="p-2 px-3"><span> { post.contenu }</span>
                                        </div>
                                    <div className='dashed'/>
                                        <div className="d-flex justify-content-end socials p-2 py-3"><i
                                            className="fa fa-thumbs-up"></i><i className="fa fa-comments-o"></i><i
                                            className="fa fa-share"></i></div>

                                    </div>



                                 </div> )}



                        </div>
                    </div>
                </div>
            </div> < /Container> <
        /div>

    )
    }}
export default TopThree