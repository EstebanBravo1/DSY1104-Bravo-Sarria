import { Link, useLoaderData } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
                    <div className="filters" id="product-filters">
                        <button 
                            className={filtroActivo === 'all' ? 'filter-btn active' : 'filter-btn'}
                            onClick={() => setFiltroActivo('all')}
                        >
                            Todos
                        </button>
                        <button 
                            className={filtroActivo === 'FR' ? 'filter-btn active' : 'filter-btn'}
                            onClick={() => setFiltroActivo('FR')}
                        >
                            Frutas Frescas
                        </button>
                        <button 
                            className={filtroActivo === 'VR' ? 'filter-btn active' : 'filter-btn'}
                            onClick={() => setFiltroActivo('VR')}
                        >
                            Verduras Orgánicas
                        </button>
                        <button 
                            className={filtroActivo === 'PO' ? 'filter-btn active' : 'filter-btn'}
                            onClick={() => setFiltroActivo('PO')}
                        >
                            Productos Orgánicos
                        </button>
                        <button 
                            className={filtroActivo === 'PL' ? 'filter-btn active' : 'filter-btn'}
                            onClick={() => setFiltroActivo('PL')}
                        >
                            Lácteos
                        </button>
                    </div>
                    <div className="container">
                        <div className="row">
                            {productosFiltrados.map(producto => (
                                <div key={producto.codigo} className="col-md-4 mb-4">
                                    <div className="card" style={{width: '18rem'}}>
                                        <div className="product-card-container">
                                            <img 
                                                src={`/assets/${producto.imagen.replace('imagenes/', '')}`} 
                                                className="card-img-top" 
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
                                        <div className="card-body">
                                            <h5 className="card-title">{producto.nombre}</h5>
                                            <p className="card-text">
                                                {producto.descripcion}
                                            </p>
                                            <p className="card-text">
                                                <small className="text-muted">Origen: {producto.origen}</small>
                                            </p>
                                            <p className="card-text">
                                                <strong className="text-success">${producto.precio}</strong>
                                            </p>
                                            <div className="d-flex gap-2">
            
                                                <button 
                                                    className="btn btn-primary btn-sm"
                                                    onClick={() => addToCart(producto)}
                                                >
                                                    Agregar al carrito
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
        </div>
    );
}

export default Productos;