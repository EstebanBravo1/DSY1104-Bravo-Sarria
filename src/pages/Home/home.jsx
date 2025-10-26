import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks'; // ✅ Usa tu hook global del carrito
import './home.css';

export default function Home() {
    const { addToCart } = useCart(); // ✅ Extrae la función para agregar al carrito

    // Productos destacados
    const featuredProducts = [
        {
            code: "FR001",
            name: "Manzanas Fuji",
            price: "$1.990",
            category: "Frutas",
            image: "🍎"
        },
        {
            code: "FR002",
            name: "Naranjas Valencia",
            price: "$1.590",
            category: "Frutas",
            image: "🍊"
        },
        {
            code: "FR003",
            name: "Plátanos Cavendish",
            price: "$1.290",
            category: "Frutas",
            image: "🍌"
        },
        {
            code: "VIR001",
            name: "Zanahorias Orgánicas",
            price: "$990",
            category: "Verduras",
            image: "🥕"
        },
        {
            code: "VIR002",
            name: "Lechuga Romana",
            price: "$990",
            category: "Verduras",
            image: "🥬"
        },
        {
            code: "OR001",
            name: "Miel Orgánica",
            price: "$4.990",
            category: "Orgánicos",
            image: "🍯"
        },
        {
            code: "LA001",
            name: "Leche Entera",
            price: "$1.190",
            category: "Lácteos",
            image: "🥛"
        },
        {
            code: "LA002",
            name: "Yogur Natural",
            price: "$990",
            category: "Lácteos",
            image: "🥄"
        }
    ];

    // ✅ Función para agregar productos al carrito con el formato correcto
    const handleAddToCart = (product) => {
        const item = {
            codigo: product.code,
            nombre: product.name,
            precio: parseInt(product.price.replace(/\D/g, '')), // Convierte "$1.990" a 1990
            categoria: product.category,
            imagen: "", // si luego agregas imágenes reales, puedes actualizar esto
            cantidad: 1
        };
        addToCart(item);
    };

    return (
        <div className="home-page">
            {/* HERO */}
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
                                    to="/productos" 
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

            {/* CATEGORÍAS DESTACADAS */}
            <section className="categories-section">
                <Container>
                    <Row className="text-center mb-5">
                        <Col>
                            <h2 className="section-title">Categorías destacadas</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={3} md={6} className="mb-4">
                            <Card className="category-card h-100 text-center">
                                <Card.Body>
                                    <div className="category-icon mb-3">🍎</div>
                                    <Card.Title>Frutas Frescas</Card.Title>
                                    <Card.Text>Descubre nuestra selección de frutas de temporada</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={3} md={6} className="mb-4">
                            <Card className="category-card h-100 text-center">
                                <Card.Body>
                                    <div className="category-icon mb-3">🥛</div>
                                    <Card.Title>Lácteos</Card.Title>
                                    <Card.Text>Productos lácteos frescos y naturales</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={3} md={6} className="mb-4">
                            <Card className="category-card h-100 text-center">
                                <Card.Body>
                                    <div className="category-icon mb-3">🥕</div>
                                    <Card.Title>Verduras Orgánicas</Card.Title>
                                    <Card.Text>Verduras cultivadas sin pesticidas</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={3} md={6} className="mb-4">
                            <Card className="category-card h-100 text-center">
                                <Card.Body>
                                    <div className="category-icon mb-3">🌿</div>
                                    <Card.Title>Productos Orgánicos</Card.Title>
                                    <Card.Text>Alimentos 100% naturales y ecológicos</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* PRODUCTOS DESTACADOS */}
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
                            <Col lg={3} md={6} className="mb-4" key={product.code}>
                                <Card className="product-card h-100 text-center">
                                    <Card.Body>
                                        <div className="product-image mb-3">{product.image}</div>
                                        <Card.Title>{product.name}</Card.Title>
                                        <div className="product-details">
                                            <p className="product-code">{product.code}</p>
                                            <p className="product-price">{product.price}</p>
                                        </div>
                                        <div className="product-category mb-2">
                                            <span className="category-badge">{product.category}</span>
                                        </div>
                                        <Button
                                            className="product-button mt-3"
                                            size="sm"
                                            onClick={() => handleAddToCart(product)}
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
    );
}
