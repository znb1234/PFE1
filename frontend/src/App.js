import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './Screens/HomeScreen'
import TopThree from './Screens/TopThree'
import ContactUs from './Screens/ContactUs'
import SharedSpace from './Screens/SharedSpace'
import Login from './Screens/Login'
import MyPosts from './Screens/MyPosts'
import MyQuestions from './Screens/MyQuestions'
import Registration from './Screens/registration'
import Dashboard from './Screens/Dashboard'
import MySpace from './Screens/Myspace'
import Users from "./Screens/Users";

const App = () => {

  const [user, setUser] = useState('null')

  return (
    <Router>
      {user ?
        <>
          <Header />
          <main className='py-3'>
            <Routes>
              <Route path='/' element={<HomeScreen />} exact />
              <Route path='/users' element={<Users />} />
              <Route path='/top-three' element={<TopThree />} />
              <Route path='/contact-us' element={<ContactUs />} />
              <Route path='/shared-space' element={<SharedSpace />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/my-questions' element={<MyQuestions />} />
              <Route path='/my-posts' element={<MyPosts />} />
              <Route path='/my-space' element={<MySpace />} />
              {/* <Route path='/login' element={<Login />} /> */}
              <Route path='/register' element={<Registration />} />
            </Routes>
          </main>
          <Footer />
        </>
        : <Login />}
    </Router>
  )
}

export default App
