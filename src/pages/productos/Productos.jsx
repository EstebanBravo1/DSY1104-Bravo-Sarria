import { Link, useLoaderData } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Button, ButtonGroup, Card } from 'react-bootstrap';
import { useCart } from '../../hooks';
import '../../styles.css';
import './Productos.css';
import './Card-Overlay.css';


function Productos() {
    const { productos } = useLoaderData(); // Obtiene los datos del loader
    const { addToCart } = useCart(); // Obtiene la función para agregar al carrito
    const [filtroActivo, setFiltroActivo] = useState('all');

    const productosFiltrados = filtroActivo === 'all'
        ?productos
        :productos.filter(p=>p.categoria === filtroActivo);

    

    useEffect(() => {
        // Aquí puedes cargar los scripts que necesites
        // Por ejemplo, lógica de productos, búsqueda, etc.
    }, []);



    return (
        <div className="productos-page">
                <section className="home section" id="home">
                    <div className="home__container container grid">
                        <div className="home__data">
                            <h3 className="home__subtitle">
                                Frutas y Verduras de calidad
                            </h3>
                            <h1 className="home__title">
                                Es el momento de <br />
                                Comer Saludable
                            </h1>
                            <p className="home__description">
                                Cada fruta refleja la calidad de la tierra donde crece, y cada verdura es un testimonio del cuidado con el que se cultiva. Al elegir frutas y verduras frescas y de temporada, no solo estás nutriendo tu cuerpo, sino también apoyando prácticas agrícolas sostenibles que respetan el medio ambiente.
                            </p>
                        
                        </div>
                        <img src="/assets/cesta-llena-verduras.png" alt="Comer Saludable" className="home__img" />
                    </div>
                </section>
       
                <section id="productos">
                    <Container>
                        {/* Filtros con React Bootstrap */}
                        <Row className="mb-4">
                            <Col xs={12}>
                                <div className="d-flex justify-content-center">
                                    <div className="filters-responsive">
                                        {/* Filtros horizontales en desktop, dropdown en móvil */}
                                        <div className="d-none d-md-flex flex-wrap justify-content-center gap-2">
                                            <Button 
                                                variant={filtroActivo === 'all' ? 'primary' : 'outline-primary'}
                                                onClick={() => setFiltroActivo('all')}
                                                className="filter-btn-bootstrap"
                                            >
                                                Todos
                                            </Button>
                                            <Button 
                                                variant={filtroActivo === 'FR' ? 'primary' : 'outline-primary'}
                                                onClick={() => setFiltroActivo('FR')}
                                                className="filter-btn-bootstrap"
                                            >
                                                Frutas Frescas
                                            </Button>
                                            <Button 
                                                variant={filtroActivo === 'VR' ? 'primary' : 'outline-primary'}
                                                onClick={() => setFiltroActivo('VR')}
                                                className="filter-btn-bootstrap"
                                            >
                                                Verduras Orgánicas
                                            </Button>
                                            <Button 
                                                variant={filtroActivo === 'PO' ? 'primary' : 'outline-primary'}
                                                onClick={() => setFiltroActivo('PO')}
                                                className="filter-btn-bootstrap"
                                            >
                                                Productos Orgánicos
                                            </Button>
                                            <Button 
                                                variant={filtroActivo === 'PL' ? 'primary' : 'outline-primary'}
                                                onClick={() => setFiltroActivo('PL')}
                                                className="filter-btn-bootstrap"
                                            >
                                                Lácteos
                                            </Button>
                                        </div>
                                        
                                        {/* Filtros verticales en móvil */}
                                        <div className="d-block d-md-none">
                                            <ButtonGroup vertical className="w-100 gap-2">
                                                <Button 
                                                    variant={filtroActivo === 'all' ? 'primary' : 'outline-primary'}
                                                    onClick={() => setFiltroActivo('all')}
                                                    className="filter-btn-mobile"
                                                    size="lg"
                                                >
                                                    Todos
                                                </Button>
                                                <Button 
                                                    variant={filtroActivo === 'FR' ? 'primary' : 'outline-primary'}
                                                    onClick={() => setFiltroActivo('FR')}
                                                    className="filter-btn-mobile"
                                                    size="lg"
                                                >
                                                    Frutas Frescas
                                                </Button>
                                                <Button 
                                                    variant={filtroActivo === 'VR' ? 'primary' : 'outline-primary'}
                                                    onClick={() => setFiltroActivo('VR')}
                                                    className="filter-btn-mobile"
                                                    size="lg"
                                                >
                                                    Verduras Orgánicas
                                                </Button>
                                                <Button 
                                                    variant={filtroActivo === 'PO' ? 'primary' : 'outline-primary'}
                                                    onClick={() => setFiltroActivo('PO')}
                                                    className="filter-btn-mobile"
                                                    size="lg"
                                                >
                                                    Productos Orgánicos
                                                </Button>
                                                <Button 
                                                    variant={filtroActivo === 'PL' ? 'primary' : 'outline-primary'}
                                                    onClick={() => setFiltroActivo('PL')}
                                                    className="filter-btn-mobile"
                                                    size="lg"
                                                >
                                                    Lácteos
                                                </Button>
                                            </ButtonGroup>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        
                        {/* Grid de productos */}
                        <Row>
                            {productosFiltrados.map(producto => (
                                <Col key={producto.codigo} xs={12} sm={6} md={4} lg={3} className="mb-4">
                                    <Card className="h-100 product-card">
                                        <div className="product-card-container">
                                            <Card.Img 
                                                variant="top"
                                                src={`/assets/${producto.imagen.replace('imagenes/', '')}`} 
                                                alt={producto.nombre}
                                                style={{height: '200px', objectFit: 'cover'}}
                                            />
                                            {/* Overlay con efecto hover */}
                                            <Link 
                                                to={`/productos/${producto.codigo}`} 
                                                className="product-card-overlay"
                                            >
                                                <i className="ri-eye-line overlay-icon"></i>
                                                <span className="overlay-text">Ver detalle del producto</span>
                                            </Link>
                                        </div>
                                        <Card.Body className="d-flex flex-column">
                                            <Card.Title>{producto.nombre}</Card.Title>
                                            <Card.Text className="flex-grow-1">
                                                {producto.descripcion}
                                            </Card.Text>
                                            <Card.Text>
                                                <small className="text-muted">Origen: {producto.origen}</small>
                                            </Card.Text>
                                            <Card.Text>
                                                <strong className="text-success">${producto.precio}</strong>
                                            </Card.Text>
                                            <Button 
                                                variant="primary"
                                                size="sm"
                                                onClick={() => addToCart(producto)}
                                                className="mt-auto"
                                            >
                                                Agregar al carrito
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </section>
        </div>
    );
}

export default Productos;