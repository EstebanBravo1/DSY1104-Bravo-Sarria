import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './home.css';

export default function Home() {
    // Datos de productos destacados
    const featuredProducts = [
        {
            id: 1,
            code: "FR001",
            name: "Manzanas Fuji",
            price: "$1.990",
            category: "Frutas",
            image: "/assets/imagenes/Manzana-Fuji-granel.png"
        },
        {
            id: 2,
            code: "FR002",
            name: "Naranjas Valencia",
            price: "$1.590",
            category: "Frutas",
            image: "/assets/imagenes/Naranjas_Valencias.png"
        },
        {
            id: 3,
            code: "FR003",
            name: "Plátanos Cavendish",
            price: "$1.290",
            category: "Frutas",
            image: "/assets/imagenes/Platano_Cavendish.png"
        },
        {
            id: 4,
            code: "VIR001",
            name: "Zanahorias Orgánicas",
            price: "$990",
            category: "Verduras",
            image: "/assets/imagenes/Zanahorias_Organicas.png"
        },
        {
            id: 5,
            code: "VIR002",
            name: "Lechuga Romana",
            price: "$990",
            category: "Verduras",
            image: "/assets/imagenes/Lechuga_Romana.png"
        },
        {
            id: 6,
            code: "OR001",
            name: "Miel Orgánica",
            price: "$4.990",
            category: "Orgánicos",
            image: "/assets/imagenes/Miel_Organica.png"
        },
        {
            id: 7,
            code: "LA001",
            name: "Leche Entera",
            price: "$1.190",
            category: "Lácteos",
            image: "/assets/imagenes/Leche_Entera.png"
        },
        {
            id: 8,
            code: "LA002",
            name: "Yogur Natural",
            price: "$990",
            category: "Lácteos",
            image: "/assets/imagenes/Yogur_Natural.png"
        }
    ];

    return (
        <>
            <div className="home-page">
                {/* Hero Section */}
                <section className="hero-section">
                    <div className="hero-overlay"></div>
                    <Container fluid className="hero-container">
                        <Row className="align-items-center min-vh-100">
                            <Col lg={7}>
                                <div className="hero-content">
                                    <div className="hero-badge">🌱 100% Orgánico & Natural</div>
                                    <h1 className="hero-title">
                                        Del Campo<br />
                                        a tu <span className="hero-highlight">Mesa</span>
                                    </h1>
                                    <p className="hero-subtitle">
                                        Descubre la frescura auténtica con productos cosechados con amor y cuidado. 
                                        Sin químicos, solo naturaleza pura.
                                    </p>
                                    <div className="hero-buttons">
                                        <Button 
                                            as={Link} 
                                            to="/productos" 
                                            className="hero-button-primary"
                                            size="lg"
                                        >
                                            🛒 Explorar Productos
                                        </Button>
                                        <Button 
                                            as={Link} 
                                            to="/contacto" 
                                            className="hero-button-secondary"
                                            size="lg"
                                        >
                                            📞 Contáctanos
                                        </Button>
                                    </div>
                                    <div className="hero-stats">
                                        <div className="stat-item">
                                            <span className="stat-number">500+</span>
                                            <span className="stat-label">Productos Frescos</span>
                                        </div>
                                        <div className="stat-item">
                                            <span className="stat-number">100%</span>
                                            <span className="stat-label">Orgánico</span>
                                        </div>
                                        <div className="stat-item">
                                            <span className="stat-number">24/7</span>
                                            <span className="stat-label">Atención</span>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>

                {/* Sección de Categorías Destacadas - CONTENIDO COMPLETO */}
                <section className="categories-section">
                    <Container>
                        <Row className="text-center mb-5">
                            <Col>
                                <h2 className="section-title">Categorías destacadas</h2>
                            </Col>
                        </Row>
                        <Row>
                            {/* Categoría 1 - Frutas Frescas */}
                            <Col lg={3} md={6} className="mb-4">
                                <Card className="category-card h-100">
                                    <Card.Body className="text-center">
                                        <div className="category-icon mb-3">
                                            🍎
                                        </div>
                                        <Card.Title className="category-title">Frutas Frescas</Card.Title>
                                        <Card.Text className="category-description">
                                            Descubre nuestra selección de frutas de temporada
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>

                            {/* Categoría 2 - Lácteos */}
                            <Col lg={3} md={6} className="mb-4">
                                <Card className="category-card h-100">
                                    <Card.Body className="text-center">
                                        <div className="category-icon mb-3">
                                            🥛
                                        </div>
                                        <Card.Title className="category-title">Lácteos</Card.Title>
                                        <Card.Text className="category-description">
                                            Productos lácteos frescos y naturales
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>

                            {/* Categoría 3 - Verduras Orgánicas */}
                            <Col lg={3} md={6} className="mb-4">
                                <Card className="category-card h-100">
                                    <Card.Body className="text-center">
                                        <div className="category-icon mb-3">
                                            🥕
                                        </div>
                                        <Card.Title className="category-title">Verduras Orgánicas</Card.Title>
                                        <Card.Text className="category-description">
                                            Verduras cultivadas sin pesticidas
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>

                            {/* Categoría 4 - Productos Orgánicos */}
                            <Col lg={3} md={6} className="mb-4">
                                <Card className="category-card h-100">
                                    <Card.Body className="text-center">
                                        <div className="category-icon mb-3">
                                            🌿
                                        </div>
                                        <Card.Title className="category-title">Productos Orgánicos</Card.Title>
                                        <Card.Text className="category-description">
                                            Alimentos 100% naturales y ecológicos
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </section>

                {/* Sección de Productos Destacados */}
                <section className="products-section">
                    <Container fluid className="px-5">
                        <Row className="text-center mb-5">
                            <Col>
                                <h2 className="section-title">Productos destacados</h2>
                                <p className="section-subtitle">
                                    Los productos más frescos y naturales para tu hogar
                                </p>
                            </Col>
                        </Row>
                        <Row className="g-4">
                            {featuredProducts.map((product) => (
                                <Col xl={3} lg={4} md={6} className="mb-3" key={product.id}>
                                    <Card className="product-card h-100">
                                        <div className="product-image">
                                            <img 
                                                src={product.image} 
                                                alt={product.name}
                                                className="img-fluid"
                                            />
                                        </div>
                                        <Card.Body className="text-center">
                                            <Card.Title className="product-name">
                                                {product.name}
                                            </Card.Title>
                                            <div className="product-details">
                                                <p className="product-code">{product.code}</p>
                                                <p className="product-price">{product.price}</p>
                                            </div>
                                            <div className="product-category">
                                                <span className="category-badge">{product.category}</span>
                                            </div>
                                            <Button 
                                                className="product-button mt-3"
                                                size="sm"
                                            >
                                                Agregar al carrito
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                        <Row className="text-center mt-4">
                            <Col>
                                <Button 
                                    as={Link} 
                                    to="/productos" 
                                    className="view-all-button"
                                    size="lg"
                                >
                                    Ver todos los productos
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </div>
        </>
    );
}