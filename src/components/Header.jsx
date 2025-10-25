import React, { useState } from 'react';
import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth } from '../context/AuthContext';
import logo from '/assets/LogoHuertoHogar.png';
import './Header.css';

export default function Header() {
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(false);
  const { isLoggedIn, usuario, logout } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Buscando:', query);
    setExpanded(false); // Cerrar el menú al buscar
  };

  const handleLogout = () => {
    logout();
    setExpanded(false); // Cerrar el menú al hacer logout
    window.location.href = '/'; // Redirigir al home
  };

  const closeNavbar = () => {
    setExpanded(false);
  };

  return (
    <header>
      <Navbar 
        bg="light" 
        expand="md" 
        fixed="top" 
        className="custom-navbar"
        expanded={expanded}
        onToggle={(expanded) => setExpanded(expanded)}
      >
        <Container fluid>
          <Navbar.Brand href="/"><img src={logo} alt="Huerto Hogar Logo" className="logo"/></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="left-nav">
              <LinkContainer to="/productos">
                <Nav.Link onClick={closeNavbar}>Productos</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/contacto">
                <Nav.Link onClick={closeNavbar}>Contacto</Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav className="center-search">
              <Form className="d-flex" onSubmit={handleSearch}>
                <FormControl
                  type="search"
                  placeholder="Buscar productos..."
                  className="search-input"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <Button variant="outline-success" type="submit" className="search-btn">
                  Buscar
                </Button>
              </Form>
            </Nav>
            <Nav className="cart-nav">
              <LinkContainer to="/carrito">
                <Nav.Link className="cart-btn" onClick={closeNavbar}>🛒 Carrito</Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav className="right-nav">
              {isLoggedIn ? (
                // Usuario logueado - Mostrar dropdown con opciones
                <NavDropdown 
                  title={`👋 ${usuario?.nombres || 'Usuario'}`} 
                  id="user-dropdown" 
                  className="user-dropdown"
                >
                  <NavDropdown.Item>
                    <strong>{usuario?.nombres} {usuario?.apellidos}</strong>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    📧 {usuario?.email}
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <LinkContainer to="/perfil">
                    <NavDropdown.Item onClick={closeNavbar}>👤 Mi Perfil</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/mis-pedidos">
                    <NavDropdown.Item onClick={closeNavbar}>📦 Mis Pedidos</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    🚪 Cerrar Sesión
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                // Usuario no logueado - Mostrar botones de login/registro
                <>
                  <LinkContainer to="/login">
                    <Nav.Link className="login-btn" onClick={closeNavbar}>Iniciar Sesión</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link className="register-btn" onClick={closeNavbar}>Registrarse</Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
