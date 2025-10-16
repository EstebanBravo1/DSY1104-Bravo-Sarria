import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import logo from '../../public/assets/LogoHuertoHogar.png';
import './Header.css';

export default function Header() {
  return (
    <header>
      <Navbar bg="light" expand="md" fixed="top" className="custom-navbar">
        <Container>
          <Navbar.Brand href="/"><img src={logo} alt="Huerto Hogar Logo" style={{ height: '40px', cursor: 'pointer' }}/></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/productos">
                <Nav.Link>Productos</Nav.Link>
              </LinkContainer>
              <NavDropdown title="Categorías" id="basic-nav-dropdown">
                <LinkContainer to="/categoria/verduras">
                  <NavDropdown.Item>Verduras</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/categoria/frutas">
                  <NavDropdown.Item>Frutas</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
              <LinkContainer to="/contacto">
                <Nav.Link>Contacto</Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav>
              <LinkContainer to="/login">
                <Nav.Link>Iniciar Sesión</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/register">
                <Nav.Link>Registrarse</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/cart">
                <Nav.Link>🛒 Carrito</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
