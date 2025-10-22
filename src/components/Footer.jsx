import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <Container>
                <Row>
                    {/* Columna 1 - Información de la empresa */}
                    <Col lg={4} md={6} className="mb-4">
                        <div className="footer-brand">
                            <h3 className="brand-name">Frescura Natural</h3>
                            <p className="brand-description">
                                Productos orgánicos directamente del campo a tu hogar. 
                                Frescura y calidad garantizada.
                            </p>
                        </div>
                        <div className="social-links">
                            <a href="#" className="social-link">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className="social-link">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="#" className="social-link">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className="social-link">
                                <i className="fab fa-whatsapp"></i>
                            </a>
                        </div>
                    </Col>

                    {/* Columna 2 - Enlaces rápidos */}
                    <Col lg={2} md={6} className="mb-4">
                        <h5 className="footer-title">Enlaces Rápidos</h5>
                        <ul className="footer-links">
                            <li><Link to="/">Inicio</Link></li>
                            <li><Link to="/catalogo">Catálogo</Link></li>
                            <li><Link to="/nosotros">Nosotros</Link></li>
                            <li><Link to="/contacto">Contacto</Link></li>
                            <li><Link to="/faq">Preguntas Frecuentes</Link></li>
                        </ul>
                    </Col>

                    {/* Columna 3 - Categorías */}
                    <Col lg={3} md={6} className="mb-4">
                        <h5 className="footer-title">Categorías</h5>
                        <ul className="footer-links">
                            <li><Link to="/categoria/frutas">Frutas Frescas</Link></li>
                            <li><Link to="/categoria/verduras">Verduras Orgánicas</Link></li>
                            <li><Link to="/categoria/lacteos">Lácteos</Link></li>
                            <li><Link to="/categoria/organicos">Productos Orgánicos</Link></li>
                            <li><Link to="/categoria/especias">Especias y Hierbas</Link></li>
                        </ul>
                    </Col>

                    {/* Columna 4 - Contacto */}
                    <Col lg={3} md={6} className="mb-4">
                        <h5 className="footer-title">Contacto</h5>
                        <div className="contact-info">
                            <div className="contact-item">
                                <i className="fas fa-map-marker-alt"></i>
                                <span>Av. Principal 123, Ciudad</span>
                            </div>
                            <div className="contact-item">
                                <i className="fas fa-phone"></i>
                                <span>+56 9 1234 5678</span>
                            </div>
                            <div className="contact-item">
                                <i className="fas fa-envelope"></i>
                                <span>info@frescuranatural.cl</span>
                            </div>
                            <div className="contact-item">
                                <i className="fas fa-clock"></i>
                                <span>Lun-Sab: 8:00 - 20:00</span>
                            </div>
                        </div>
                    </Col>
                </Row>

                <hr className="footer-divider" />

                {/* Pie inferior */}
                <Row className="align-items-center">
                    <Col md={6}>
                        <p className="copyright">
                            © 2024 Frescura Natural. Todos los derechos reservados.
                        </p>
                    </Col>
                    <Col md={6}>
                        <div className="footer-bottom-links">
                            <Link to="/privacidad">Política de Privacidad</Link>
                            <Link to="/terminos">Términos de Servicio</Link>
                            <Link to="/envios">Envíos y Devoluciones</Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;