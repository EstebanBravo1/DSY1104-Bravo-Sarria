import { Link, useLoaderData, useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Button, ButtonGroup, Card, Alert } from 'react-bootstrap';
import { useCart } from '../../hooks';
import { getImagePath } from '../../utils/imageUtils';
import '../../styles.css';
import './Productos.css';
import './Card-Overlay.css';


function Productos() {
    const { productos } = useLoaderData(); // Obtiene los datos del loader
    console.log('🔍 Productos cargados:', productos);
    const { addToCart } = useCart(); // Obtiene la función para agregar al carrito
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';
    const categoriaParam = searchParams.get('categoria') || 'all';

    // Función para cambiar de categoría
    const cambiarCategoria = (categoria) => {
        if (categoria === 'all') {
            navigate('/productos');
        } else {
            navigate(`/productos?categoria=${categoria}`);
        }
    };

    // Función para filtrar productos por búsqueda
    const filtrarPorBusqueda = (productos, query) => {
        if (!query) return productos;

        const queryLower = query.toLowerCase();
        return productos.filter(productos =>
            productos.nombre.toLowerCase().includes(queryLower) ||
            productos.descripcion.toLowerCase().includes(queryLower) ||
            productos.origen.toLowerCase().includes(queryLower)
        );
    };

    // Aplicar solo filtro de búsqueda (el filtro de categoría ya viene del backend)
    let productosFiltrados = productos;

    if (searchQuery) {
        productosFiltrados = filtrarPorBusqueda(productos, searchQuery);
    }

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
                    <img src="/assets/imagenes/cesta-llena-verduras.png" alt="Comer Saludable" className="home__img" />
                </div>
            </section>

            <section id="productos">
                <Container>
                    {/* Mostrar información de búsqueda si hay query */}
                    {searchQuery && (
                        <Row className="mb-3">
                            <Col xs={12}>
                                <Alert variant="info" className="d-flex justify-content-between align-items-center">
                                    <span>
                                        <strong>Búsqueda:</strong> "{searchQuery}"
                                        {productosFiltrados.length > 0
                                            ? ` (${productosFiltrados.length} producto${productosFiltrados.length !== 1 ? 's' : ''} encontrado${productosFiltrados.length !== 1 ? 's' : ''})`
                                            : ' (Sin resultados)'
                                        }
                                    </span>
                                    <Button
                                        variant="outline-secondary"
                                        size="sm"
                                        onClick={() => window.location.href = '/productos'}
                                    >
                                        Limpiar búsqueda
                                    </Button>
                                </Alert>
                            </Col>
                        </Row>
                    )}

                    {/* Filtros con React Bootstrap */}
                    <Row className="mb-4">
                        <Col xs={12}>
                            <div className="d-flex justify-content-center">
                                <div className="filters-responsive">
                                    {/* Filtros horizontales en desktop, dropdown en móvil */}
                                    <div className="d-none d-md-flex flex-wrap justify-content-center gap-2">
                                        <Button
                                            variant={categoriaParam === 'all' ? 'primary' : 'outline-primary'}
                                            onClick={() => cambiarCategoria('all')}
                                            className="filter-btn-bootstrap"
                                        >
                                            Todos
                                        </Button>
                                        <Button
                                            variant={categoriaParam === 'FR' ? 'primary' : 'outline-primary'}
                                            onClick={() => cambiarCategoria('FR')}
                                            className="filter-btn-bootstrap"
                                        >
                                            Frutas Frescas
                                        </Button>
                                        <Button
                                            variant={categoriaParam === 'VR' ? 'primary' : 'outline-primary'}
                                            onClick={() => cambiarCategoria('VR')}
                                            className="filter-btn-bootstrap"
                                        >
                                            Verduras Orgánicas
                                        </Button>
                                        <Button
                                            variant={categoriaParam === 'PO' ? 'primary' : 'outline-primary'}
                                            onClick={() => cambiarCategoria('PO')}
                                            className="filter-btn-bootstrap"
                                        >
                                            Productos Orgánicos
                                        </Button>
                                        <Button
                                            variant={categoriaParam === 'PL' ? 'primary' : 'outline-primary'}
                                            onClick={() => cambiarCategoria('PL')}
                                            className="filter-btn-bootstrap"
                                        >
                                            Lácteos
                                        </Button>
                                    </div>

                                    {/* Filtros verticales en móvil */}
                                    <div className="d-block d-md-none">
                                        <ButtonGroup vertical className="w-100 gap-2">
                                            <Button
                                                variant={categoriaParam === 'all' ? 'primary' : 'outline-primary'}
                                                onClick={() => cambiarCategoria('all')}
                                                className="filter-btn-mobile"
                                                size="lg"
                                            >
                                                Todos
                                            </Button>
                                            <Button
                                                variant={categoriaParam === 'FR' ? 'primary' : 'outline-primary'}
                                                onClick={() => cambiarCategoria('FR')}
                                                className="filter-btn-mobile"
                                                size="lg"
                                            >
                                                Frutas Frescas
                                            </Button>
                                            <Button
                                                variant={categoriaParam === 'VR' ? 'primary' : 'outline-primary'}
                                                onClick={() => cambiarCategoria('VR')}
                                                className="filter-btn-mobile"
                                                size="lg"
                                            >
                                                Verduras Orgánicas
                                            </Button>
                                            <Button
                                                variant={categoriaParam === 'PO' ? 'primary' : 'outline-primary'}
                                                onClick={() => cambiarCategoria('PO')}
                                                className="filter-btn-mobile"
                                                size="lg"
                                            >
                                                Productos Orgánicos
                                            </Button>
                                            <Button
                                                variant={categoriaParam === 'PL' ? 'primary' : 'outline-primary'}
                                                onClick={() => cambiarCategoria('PL')}
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
                        {productosFiltrados.length > 0 ? (
                            productosFiltrados.map(producto => {
                                const imagenSrc = getImagePath(producto.imagen);

                                console.log('🖼️ Producto:', producto.nombre, '- Imagen original:', producto.imagen, '- Imagen final:', imagenSrc);
                                return (
                                    <Col key={producto.codigo} xs={12} sm={6} md={4} lg={3} className="mb-4">
                                        <Card className="h-100 product-card">
                                            <div className="product-card-container">

                                                <Card.Img
                                                    variant="top"
                                                    src={imagenSrc}
                                                    alt={producto.nombre}
                                                    style={{ height: '200px', objectFit: 'cover' }}
                                                    onLoad={() => console.log(`✅ Imagen cargada: ${imagenSrc}`)}
                                                    onError={() => console.error(`❌ Error cargando imagen: ${imagenSrc}`)}
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
                                )
                            })
                        ) : (
                            <Col xs={12}>
                                <div className="text-center py-5">
                                    <div className="mb-4">
                                        <i className="ri-search-line" style={{ fontSize: '4rem', color: '#6c757d' }}></i>
                                    </div>
                                    <h4 className="text-muted">No se encontraron productos</h4>
                                    <p className="text-muted">
                                        {searchQuery
                                            ? `No hay productos que coincidan con "${searchQuery}"${categoriaParam !== 'all' ? ' en la categoría seleccionada' : ''}.`
                                            : 'No hay productos disponibles en esta categoría.'
                                        }
                                    </p>
                                    {(searchQuery || categoriaParam !== 'all') && (
                                        <div className="mt-3">
                                            <Button
                                                variant="outline-primary"
                                                onClick={() => {
                                                    cambiarCategoria('all');
                                                }}
                                                className="me-2"
                                            >
                                                Ver todos los productos
                                            </Button>
                                            {searchQuery && (
                                                <Button
                                                    variant="outline-secondary"
                                                    onClick={() => window.location.href = '/productos'}
                                                >
                                                    Limpiar búsqueda
                                                </Button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </Col>
                        )}
                    </Row>
                </Container>
            </section>
        </div>
    );
}

export default Productos;