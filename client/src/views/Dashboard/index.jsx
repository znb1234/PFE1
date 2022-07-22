import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import {Col, Row} from "antd";
import UserLayout from "../../layouts/UserLayout";
import {useEffect, useState} from "react";
import axios from "../../config/axios";
import './index.css'
ChartJS.register(ArcElement, Tooltip, Legend);


export default  () => {


    const [consulting , setconsulting] = useState(0)
    const [digital , setdigital] = useState(0)
    const [technologie , settechnologie] = useState(0)
    const [users , setusers] = useState(0)
    const [active , setactive] = useState(0)
    useEffect(() => {
        axios.get('nombrePostsC')
            .then(res => {
                setconsulting(Number(res.data))
            })
        axios.get('nombrePostsD')
            .then(res => {
                setdigital(Number(res.data))
            })
        axios.get('nombrePostsT')
            .then(res => {
                settechnologie(Number(res.data))
            })
        axios.get('nombreUsers')
            .then(res => {
                setusers(Number(res.data))
            })
        axios.get('nombreUsersV')
            .then(res => {
                setactive(Number(res.data))
            })
    } , [])

    const data = {
        labels: ['consulting', 'digital', 'technologie'],
        datasets: [
            {
                label: '# of Votes',
                data: [consulting, digital, technologie],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return(
        <>
            <UserLayout>
                <Row gutter={16} >
                    <Col  span={8} >
                        <div className="chart_card_item" >
                            <div className="left_chart" >
                                <i className="las la-users"></i>
                                <span>Utilisateurs</span>

                            </div>

                            <span>{users}</span>
                        </div>
                    </Col>
                    <Col  span={8} >
                        <div className="chart_card_item" >
                            <div className="left_chart" >
                                <i className="las la-user-check"></i>
                                <span>Utilisateurs active</span>

                            </div>

                            <span>{active}</span>
                        </div>
                    </Col>
                    <Col  span={8} >
                        <div className="chart_card_item" >
                            <div className="left_chart" >
                                <i className="las la-user-alt-slash"></i>
                                <span>Utilisateurs inactive</span>

                            </div>

                            <span>{users - active}</span>
                        </div>
                    </Col>
                </Row>
                <br/>
                <br/>
                <Row>
                    <Col span={9}  >



                    </Col>
                    <Col span={10} offset={6} >
                        <div style={{ marginBottom:"15px", display : 'flex', justifyContent:"center", fontWeight:"bold"}} >
                            <span > Publication par catégorie </span>
                        </div>
                        <Pie data={data} />
                    </Col>
                </Row>
            </UserLayout>


        </>
    )
}