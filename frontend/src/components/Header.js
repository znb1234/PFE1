import React from 'react'
import { Navbar, Nav, Container, Button, NavDropdown, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import logo from '../assets/img/logo.png'
import './Header.css'

const Header = () => {
  return (
    <header>
      <Navbar bg='white' expand='lg'>
        <Container>
          <LinkContainer to='/' style={{ color: 'white' }}>
            <img className='logo' src={logo} alt='Sharevioo' style={{ width: '10px', height: '10px' }}>
            </img>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <LinkContainer to='/dashboard' style={{ color: 'purple' }}>
              <Nav.Link>Dashboard</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/users' style={{ color: 'purple' }}>
              <Nav.Link>Espace admin</Nav.Link>
            </LinkContainer>

            <NavDropdown
              title={
                <span className="my-auto" style={{ color: 'purple' }}>
                  Espace Admin
                </span>
              }
              id='espace-admin'>
              <LinkContainer to='/users'>
                <NavDropdown.Item>User's List</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/dashboard'>
                <NavDropdown.Item>Dashboard</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>


            <LinkContainer to='/my-space' style={{ color: 'purple' }}>
              <Nav.Link>Mon espace</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/top-three' style={{ color: 'purple' }}>
              <Nav.Link>Top Trois</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/contact-us' style={{ color: 'purple' }}>
              <Nav.Link>Contactez_nous</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/Shared-Space' style={{ color: 'purple' }}>
              <Nav.Link>Espace commun </Nav.Link>
            </LinkContainer>
            {/* <Nav > */}
            <Nav className='ms-auto'>

              <div className=" search-box">
                <div className="search ">
                  <input type="text" className="searchTerm" placeholder="What are you looking for?"></input>
                  <button type="submit" className="searchButton">
                    <i className="fa fa-search"></i>
                  </button>
                </div>
              </div>
              {/* </Nav> */}
              {/* <Nav> */}
              <LinkContainer to='/login' style={{ color: 'purple' }}>
                <Nav.Link className='justify-content-end'>
                  <i className='fas fa-user'></i> Login
                </Nav.Link>
              </LinkContainer>
            </Nav>
            {/* </Nav> */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
