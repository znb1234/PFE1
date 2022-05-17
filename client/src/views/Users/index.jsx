import UserLayout from "../../layouts/UserLayout"
import { Table } from 'antd'
export default () => {

    const columns = [
        {
            title: `Nom d'utilisateur`,
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Actions',
            dataIndex: 'address',
            key: 'address',
            render: (text, record) => {
                return (
                    <>
                        <div style={{ display: "flex", alignItems: "center", fontSize: "20px", justifyContent: "space-around" }} >
                            <i style={{ cursor: "pointer", marginRight: "5px" }} class="las la-trash-alt"></i>
                            <i style={{ cursor: "pointer", marginRight: "5px" }} class="las la-edit"></i>
                            <i style={{ cursor: "pointer", marginRight: "5px" }} class="las la-check-circle"></i>
                        </div>
                    </>
                )
            }
        },

    ];

    return (
        <>
            <UserLayout>
                <h3>Utilisateurs (0)</h3>
                <br />
                <Table dataSource={[1]} columns={columns} />
            </UserLayout>
        </>
    )
}