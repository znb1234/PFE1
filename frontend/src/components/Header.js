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


            <Nav className='ms-auto'>

              {/* <LinkContainer to='/search' style={{ color: 'white' }}>
                <Nav.Link className='justify-content-end'>
                  <col>
                    <div class="input-group">
                      <div class="form-outline">
                        <input type="search" id="form1" class="form-control" />
                        <label class="form-label" for="form1">Search</label>
                      </div>
                      <button type="button" class="btn btn-primary">
                        <i class="fas fa-search"></i>
                      </button>
                    </div>
                  </col>
                </Nav.Link>
              </LinkContainer> */}
              <div className="wrap">
                <div className="search">
                  <input type="text" className="searchTerm" placeholder="What are you looking for?"></input>
                    <button type="submit" className="searchButton">
                      <i className="fa fa-search"></i>
                    </button>
                </div>
              </div>





              <LinkContainer to='/login' style={{ color: 'purple' }}>
                <Nav.Link className='justify-content-end'>
                  <Col>
                    <i className='fas fa-user'></i> Login
                  </Col>
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
