import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Home.css';
import Header from "../../components/Header";

export default function Home() {
    // Datos de productos destacados
    const featuredProducts = [
        {
            id: 1,
            code: "FR001",
            name: "Manzanas Fuji",
            price: "$1.990",
            category: "Frutas",
            image: "🍎"
        },
        {
            id: 2,
            code: "FR002",
            name: "Naranjas Valencia",
            price: "$1.590",
            category: "Frutas",
            image: "🍊"
        },
        {
            id: 3,
            code: "FR003",
            name: "Plátanos Cavendish",
            price: "$1.290",
            category: "Frutas",
            image: "🍌"
        },
        {
            id: 4,
            code: "VIR001",
            name: "Zanahorias Orgánicas",
            price: "$990",
            category: "Verduras",
            image: "🥕"
        },
        {
            id: 5,
            code: "VIR002",
            name: "Lechuga Romana",
            price: "$990",
            category: "Verduras",
            image: "🥬"
        },
        {
            id: 6,
            code: "OR001",
            name: "Miel Orgánica",
            price: "$4.990",
            category: "Orgánicos",
            image: "🍯"
        },
        {
            id: 7,
            code: "LA001",
            name: "Leche Entera",
            price: "$1.190",
            category: "Lácteos",
            image: "🥛"
        },
        {
            id: 8,
            code: "LA002",
            name: "Yogur Natural",
            price: "$990",
            category: "Lácteos",
            image: "🥄"
        }
    ];

    return (
        <>
            <Header />
            <div className="home-page">
                {/* Hero Section */}
                <section className="hero-section">
                    <Container fluid>
                        <Row className="align-items-center min-vh-100">
                            <Col lg={6}>
                                <div className="hero-content">
                                    <h1 className="hero-title">Frescura y naturalidad</h1>
                                    <p className="hero-subtitle">
                                        Productos orgánicos directamente del campo a tu hogar
                                    </p>
                                    <Button 
                                        as={Link} 
                                        to="/catalogo" 
                                        className="hero-button"
                                        size="lg"
                                    >
                                        Ver catálogo
                                    </Button>
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
                    <Container>
                        <Row className="text-center mb-5">
                            <Col>
                                <h2 className="section-title">Productos destacados</h2>
                                <p className="section-subtitle">
                                    Los productos más frescos y naturales para tu hogar
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            {featuredProducts.map((product) => (
                                <Col lg={3} md={6} className="mb-4" key={product.id}>
                                    <Card className="product-card h-100">
                                        <Card.Body className="text-center">
                                            <div className="product-image mb-3">
                                                {product.image}
                                            </div>
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
                                    to="/catalogo" 
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