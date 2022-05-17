import { Col, Row } from "antd"
import Post from "../../Components/Post"
import UserLayout from "../../layouts/UserLayout"

export default () => {
    return (
        <>
            <UserLayout>
                <h3>Top trois publications</h3>

                <Row gutter={[16,16]} >
                    <Col xs={24} sm={24} md={8} ><Post /></Col>
                    <Col xs={24} sm={24} md={8} ><Post /></Col>
                    <Col xs={24} sm={24} md={8} ><Post /></Col>
                </Row>
            </UserLayout>
        </>
    )
}