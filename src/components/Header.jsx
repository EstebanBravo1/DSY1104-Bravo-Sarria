import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../hooks';
import { useNavigate } from 'react-router-dom';
import { productos } from '../data';
import logo from '../assets/imagenes/Huerto_Hogar.png'
import './Header.css';

export default function Header() {
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { isLoggedIn, usuario, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  // Calcular cantidad total de productos en el carrito
  const totalItems = cartItems ? cartItems.reduce((total, item) => total + (item.cantidad || 0), 0) : 0;

  // Buscar sugerencias en tiempo real
  useEffect(() => {
    if (query.length > 0) {
      const filteredProducts = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(query.toLowerCase()) ||
        producto.descripcion.toLowerCase().includes(query.toLowerCase()) ||
        producto.origen.toLowerCase().includes(query.toLowerCase())
      );
      setSearchSuggestions(filteredProducts.slice(0, 5)); // Máximo 5 sugerencias
      setShowSuggestions(true);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/productos?search=${encodeURIComponent(query.trim())}`);
      setShowSuggestions(false);
      setExpanded(false); // Cerrar el menú al buscar
    }
  };

  const handleSuggestionClick = (producto) => {
    navigate(`/productos/${producto.codigo}`);
    setQuery('');
    setShowSuggestions(false);
    setExpanded(false);
  };

  const handleInputBlur = () => {
    // Delay para permitir clicks en sugerencias
    setTimeout(() => setShowSuggestions(false), 200);
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
              <LinkContainer to="/blog">
                <Nav.Link onClick={closeNavbar}>Blog</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/contacto">
                <Nav.Link onClick={closeNavbar}>Contacto</Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav className="center-search">
              <div className="search-container position-relative">
                <Form className="d-flex" onSubmit={handleSearch}>
                  <FormControl
                    type="search"
                    placeholder="Buscar productos..."
                    className="search-input"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onBlur={handleInputBlur}
                    onFocus={() => query.length > 0 && setShowSuggestions(true)}
                  />
                  <Button variant="outline-success" type="submit" className="search-btn">
                    Buscar
                  </Button>
                </Form>
                
                {/* Sugerencias de búsqueda */}
                {showSuggestions && searchSuggestions.length > 0 && (
                  <div className="search-suggestions">
                    {searchSuggestions.map((producto) => (
                      <div 
                        key={producto.codigo}
                        className="search-suggestion-item"
                        onClick={() => handleSuggestionClick(producto)}
                      >
                        <img 
                          src={`/src/assets/${producto.imagen}`} 
                          alt={producto.nombre}
                          className="suggestion-image"
                        />
                        <div className="suggestion-info">
                          <div className="suggestion-name">{producto.nombre}</div>
                          <div className="suggestion-price">${producto.precio}</div>
                          <div className="suggestion-category">{producto.categoria}</div>
                        </div>
                      </div>
                    ))}
                    {query.length > 0 && (
                      <div 
                        className="search-suggestion-all"
                        onClick={() => handleSearch({ preventDefault: () => {} })}
                      >
                        <i className="ri-search-line"></i>
                        Ver todos los resultados para "{query}"
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Nav>
            <Nav className="cart-nav">
              <LinkContainer to="/carrito">
                <Nav.Link className="cart-btn position-relative" onClick={closeNavbar}>
                  🛒 Carrito
                  <span className="cart-badge">{totalItems}</span>
                </Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav className="right-nav">
              {isLoggedIn ? (
                // Usuario logueado - Mostrar dropdown con opciones
                <NavDropdown 
                  title={`👋 ${usuario?.nombre || 'Usuario'}`} 
                  id="user-dropdown" 
                  className="user-dropdown"
                >
                  <NavDropdown.Item>
                    <strong>{usuario?.nombre} {usuario?.apellido}</strong>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    📧 {usuario?.email}
                  </NavDropdown.Item>
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
