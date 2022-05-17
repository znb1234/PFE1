import "./index.css"
import { Menu, Dropdown, Button } from 'antd';

export default () => {


    const comments = [1, 2, 3, 5, 6, 7, 8]


    const menu = (
        <Menu
            items={[
                {
                    label: (
                        <div style={{ display: "flex", alignItems: "center", fontSize: "16px" }} >
                            <i style={{ marginRight: "5px" }} class="las la-trash-alt"></i>
                            <span>supprimer</span>
                        </div>
                    ),
                },
                {
                    label: (
                        <div style={{ display: "flex", alignItems: "center", fontSize: "16px" }}>
                            <i style={{ marginRight: "5px" }} class="las la-edit"></i>
                            <span>modifier</span>
                        </div>
                    ),
                },
                {
                    label: (
                        <div style={{ display: "flex", alignItems: "center", fontSize: "16px" }}>
                            <i style={{ marginRight: "5px" }} class="las la-check-circle"></i>
                            <span>approuver</span>
                        </div>
                    ),
                },
            ]}
        />
    );

    return (
        <>
            <div className="post_item">
                <div className="post_header">

                    <div className="owner" >
                        <h6>Username</h6>
                        <span>25/02/2002</span>
                    </div>
                    <div>
                        <Dropdown overlay={menu} placement="bottomLeft">
                            <div>
                                <i class="las la-cog"></i>

                            </div>
                            {/* */}
                        </Dropdown>

                    </div>



                </div>
                <div className="post_content">
                    <b>post description</b>
                    <p >
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                </div>
                <div className="actions">
                    <div style={{ display: "flex" }} >
                        <div className="likes">
                            <i class="las la-heart"></i>
                            <span>22</span>
                        </div>
                        <div className="comments_number">
                            <i class="las la-comment-dots"></i>
                            <span>22 comment</span>
                        </div>
                    </div>

                    <div className="category">
                        <span>caetgory</span>
                    </div>
                </div>


                <div className="post_comments">
                    <div className="write_comment">
                        <input placeholder="Write a comment ! " type="text" />
                    </div>

                    <br />
                    {
                        comments.map(com => {
                            return (
                                <>
                                    <div className="comment_item" >
                                        <b>username</b>
                                        <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                    </div>
                                    <br />
                                </>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}


