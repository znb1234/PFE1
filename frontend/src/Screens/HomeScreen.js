import React from 'react'
import { Container } from 'react-bootstrap'
import background from '../assets/img/background.png'
import centered from '../index.css'
import bottom from '../index.css'
const HomeScreen = () => {
  return (
      <div class ="">
    <div  className="background"
          style={{
              width:"100%",
              position:'static',
              backgroundImage: 'url(' + background + ')',
              backgroundSize: "cover",
              height: "100vh",
              color: "#613274"
            ,
              backgroundRepeat:'no-repeat'
          }}>





    </div>
      </div>
  )
}

export default HomeScreen
