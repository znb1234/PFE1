import { Table } from "antd";
import Post from "../../Components/Post";
import UserLayout from "../../layouts/UserLayout"

export default () => {
    const columns = [
       
        {
            title: 'Actions',
            dataIndex: 'age',
            key: 'age',
        },
        
    ];
    return (
        <>
            <UserLayout>
                <h3>Publications</h3>

                <br />
                <br />
                <Post />
            </UserLayout>
        </>
    )
}