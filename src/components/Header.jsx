import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap';
import {Link} from 'react-router-dom';

const Header = () => {
  return (
    <Container fluid>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand><Link to="/">SockApp</Link></Navbar.Brand>
          <Nav className="me-auto">
            
              <Link to="/" className='nav-link'>Home</Link>
              <Link to="/about" className='nav-link'>About</Link>
              <Link to="/contact" className='nav-link'>Contact</Link>
              <Link to="/add-product" className='nav-link'>Add Product</Link>
          </Nav>
        </Container>
      </Navbar>
    </Container>
  )
}

export default Header