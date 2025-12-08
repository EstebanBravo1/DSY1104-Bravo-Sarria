import { useLoaderData, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../../hooks";
import { formatCLP } from "../../data"; // Ya no importamos 'productos' aquí
import { PRODUCTS_API_URL } from "../../config/api";
import './DetalleProducto.css';

function DetailProduct() {
    const { producto } = useLoaderData();
    const { addToCart } = useCart();
    const [cantidad, setCantidad] = useState(1);
    const [productosRelacionados, setProductosRelacionados] = useState([]);

    // Efecto para cargar productos relacionados desde la API
    useEffect(() => {
        const obtenerRelacionados = async () => {
            if (!producto?.categoria) return;

            try {
                // Pedimos a la API todos los productos de la misma categoría
                const response = await fetch(`${PRODUCTS_API_URL}?categoria=${producto.categoria}`);
                
                if (response.ok) {
                    const data = await response.json();
                    console.log("🔗 Productos relacionados recibidos:", data);
                    
                    // El backend devuelve un objeto Page, extraemos el contenido
                    const todosProductos = data.content || data;
                    
                    // Filtramos para no mostrar el mismo producto que ya estamos viendo
                    // y tomamos máximo 4 para mostrar
                    const relacionados = todosProductos
                        .filter(p => p.codigo !== producto.codigo)
                        .slice(0, 4);
                    
                    console.log("✅ Productos relacionados filtrados:", relacionados);
                    setProductosRelacionados(relacionados);
                }
            } catch (error) {
                console.error("❌ Error cargando productos relacionados:", error);
            }
        };

        obtenerRelacionados();
    }, [producto]); // Se ejecuta cada vez que cambia el producto principal

    const calcularTotal = () => producto.precio * cantidad;

    const handleAgregarCarrito = () => {
        addToCart(producto, cantidad);
        // Opcional: mostrar mensaje de confirmación
        alert(`Se agregaron ${cantidad} unidad(es) de ${producto.nombre} al carrito`);
    };

    const incrementar = () => setCantidad(prev => prev + 1);
    const decrementar = () => setCantidad(prev => prev > 1 ? prev - 1 : 1);

    return (
        <div className="container-full">
            <h1>Detalle producto: {producto.nombre}</h1>
            
            <main className="main">
                <section className="product-detail-section">
                    <div className="product-detail-container">

                        <div className="product-gallery">
                            <div className="main-image">
                                {/* Ajuste de ruta para que coincida con tus assets públicos */}
                                <img 
                                    id="main-product-image" 
                                    src={`/assets/${producto.imagen.replace('imagenes/', '')}`} 
                                    alt={producto.nombre} 
                                    className="main-img"
                                    onError={(e) => {
                                        // Fallback por si la ruta con/sin 'imagenes/' falla
                                        e.target.src = `/assets/imagenes/${producto.imagen.split('/').pop()}`;
                                    }}
                                />
                                <div className="image-zoom-overlay">
                                    <i className="ri-zoom-in-line"></i>
                                    <span>Hacer clic para ampliar</span>
                                </div>
                            </div>
                            <div className="thumbnail-gallery">
                                {/* Aquí podrías agregar miniaturas si tuvieras más imágenes */}
                            </div>
                        </div>
                        
                        <div className="product-info">
                            <div className="product-header">
                                <span id="product-category" className="product-category-badge">{producto.categoria}</span>
                                <h1 id="product-name" className="product-title">{producto.nombre}</h1>
                                <div className="product-rating">
                                    <div className="stars">
                                        <i className="ri-star-fill"></i>
                                        <i className="ri-star-fill"></i>
                                        <i className="ri-star-fill"></i>
                                        <i className="ri-star-fill"></i>
                                        <i className="ri-star-half-line"></i>
                                    </div>
                                    <span className="rating-text">(4.5/5 - 23 reseñas)</span>
                                </div>
                            </div>

                            <div className="product-pricing">
                                <span id="product-price" className="current-price">{formatCLP(producto.precio)}</span>
                                <span className="price-unit">por kg</span>
                                <div className="discount-badge" style={{display: 'none'}}>
                                    <span>15% OFF</span>
                                </div>
                            </div>

                            <div className="product-description">
                                <p id="product-description-text">{producto.descripcion}</p>
                            </div>

                            <div className="product-details">
                                <h3>Detalles del Producto</h3>
                                <div className="details-grid">
                                    <div className="detail-item">
                                        <span className="detail-label">Origen:</span>
                                        <span id="product-origin" className="detail-value">{producto.origen}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Stock disponible:</span>
                                        <span id="product-stock" className="detail-value">{producto.stock}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="purchase-section">
                                <div className="quantity-selector">
                                    <label htmlFor="quantity-input">Cantidad:</label>
                                    <div className="quantity-controls">
                                        <button onClick={decrementar} id="decrease-qty" className="qty-btn">
                                            <i className="ri-subtract-line"></i>
                                        </button>
                                        <input
                                            type="number"
                                            id="quantity-input"
                                            value={cantidad}
                                            onChange={(e) => setCantidad(parseInt(e.target.value) || 1)}
                                            min="1"
                                            max="999"
                                            className="qty-input"
                                        />
                                        <button onClick={incrementar} id="increase-qty" className="qty-btn">
                                            <i className="ri-add-line"></i>
                                        </button>
                                    </div>
                                    <span className="quantity-unit">kg</span>
                                </div>

                                <div className="purchase-actions">
                                    <button 
                                        id="btn-add-cart" 
                                        className="btn-add-cart"
                                        onClick={handleAgregarCarrito}
                                        disabled={producto.stock <= 0}
                                    >
                                        <i className="ri-shopping-cart-line"></i>
                                        {producto.stock > 0 ? 'Agregar al Carrito' : 'Sin Stock'}
                                    </button>
                                </div>

                                <div className="total-preview">
                                    <span className="total-label">Total estimado:</span>
                                    <span id="total-price" className="total-amount">{formatCLP(calcularTotal())}</span>
                                </div>
                            </div>
                                   
                            <div className="additional-info">
                                <div className="info-item">
                                    <i className="ri-truck-line"></i>
                                    <div className="info-content">
                                        <h4>Envío Gratis</h4>
                                        <p>En compras superiores a $15.000</p>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <i className="ri-refresh-line"></i>
                                    <div className="info-content">
                                        <h4>Garantía de Frescura</h4>
                                        <p>Productos frescos o te devolvemos el dinero</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Sección de Productos Relacionados */}
                <section className="related-products-section">
                    <div className="related-container">
                        <h2>Productos Relacionados</h2>
                        <div id="related-products" className="related-products-grid">
                            {productosRelacionados.length > 0 ? (
                                productosRelacionados.map((productoRelacionado) => (
                                    <div key={productoRelacionado.codigo} className="related-product-card">
                                        <Link to={`/productos/${productoRelacionado.codigo}`} className="product-link">
                                            <div className="related-product-image">
                                                <img 
                                                    src={`/assets/${productoRelacionado.imagen.replace('imagenes/', '')}`} 
                                                    alt={productoRelacionado.nombre}
                                                    className="related-img"
                                                    onError={(e) => {
                                                        e.target.src = `/assets/imagenes/${productoRelacionado.imagen.split('/').pop()}`;
                                                    }}
                                                />
                                            </div>
                                            <div className="related-product-info">
                                                <span className="related-product-category">
                                                    {productoRelacionado.categoria}
                                                </span>
                                                <h3 className="related-product-name">
                                                    {productoRelacionado.nombre}
                                                </h3>
                                                <p className="related-product-description">
                                                    {productoRelacionado.descripcion ? productoRelacionado.descripcion.substring(0, 50) + '...' : ''}
                                                </p>
                                                <div className="related-product-price">
                                                    <span className="price">{formatCLP(productoRelacionado.precio)}</span>
                                                    <span className="unit">por kg</span>
                                                </div>
                                                <div className="related-product-stock">
                                                    <span className={`stock-status ${productoRelacionado.stock > 10 ? 'in-stock' : 'low-stock'}`}>
                                                        {productoRelacionado.stock > 0 ? `Stock: ${productoRelacionado.stock}` : 'Sin stock'}
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                        <div className="related-product-actions">
                                            <button 
                                                className="btn-add-related"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    addToCart(productoRelacionado, 1);
                                                    alert(`${productoRelacionado.nombre} agregado al carrito`);
                                                }}
                                                disabled={productoRelacionado.stock <= 0}
                                            >
                                                <i className="ri-shopping-cart-line"></i>
                                                {productoRelacionado.stock > 0 ? 'Agregar' : 'Agotado'}
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="no-related-products">
                                    No hay más productos relacionados en esta categoría.
                                </p>
                            )}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default DetailProduct;