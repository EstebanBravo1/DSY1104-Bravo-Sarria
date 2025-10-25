import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../../hooks";
import { formatCLP } from "../../data";
import './DetalleProducto.css'


function DetailProduct() {
    const { producto } = useLoaderData();
    const { addToCart } = useCart();
    const [cantidad, setCantidad] = useState(1);

    const calcularTotal = () => producto.precio * cantidad;

    const handleAgregarCarrito = () => {
        addToCart(producto, cantidad);
        // Opcional: mostrar mensaje de confirmación
        alert(`Se agregaron ${cantidad} unidad(es) de ${producto.nombre} al carrito`);
    };

    const incrementar = () => setCantidad(prev => prev + 1);
    const decrementar = () => setCantidad(prev => prev > 1 ? prev - 1 : 1);
     // Obtener datos del loader

    return (
        <div className="container-full">
            <h1>Detalle producto: {producto.nombre}</h1>
            
            <main className="main">
                <section className="product-detail-section">
                    <div className="product-detail-container">

                        <div className="product-gallery">
                            <div className="main-image">
                                <img id="main-product-image" src={`/src/assets/${producto.imagen}`} alt={producto.nombre} className="main-img"/>
                                    <div className="image-zoom-overlay">
                                        <i className="ri-zoom-in-line"></i>
                                        <span>Hacer clic para ampliar</span>
                                    </div>
                            </div>
                            <div className="thumbnail-gallery">

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
                                <span id="product-price" className="current-price">${producto.precio}</span>
                                <span className="price-unit">por kg</span>
                                <div className="discount-badge" style={{display: 'none'}}>
                                    <span>15% OFF</span>
                                </div>
                            </div>

                            <div className="product-description">
                                            <span id="product-stock" className="detail-value">{producto.stock}</span>
                                <p id="product-description-text">Descripción del producto...</p>
                                <span id="producto-description-text" className="detail-value">{producto.descripcion}</span>
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
                                    <div className="detail-item">
                                        <span className="detail-label">Prácticas:</span>
                                        <span id="product-stock" className="detail-value">{producto.practicas}</span>
                                        <div id="product-practices" className="practices-list">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="purchase-section">
                                <div className="quantity-selector">
                                    <label htmlFor="quantity-input">Cantidad:</label>
                                    <span>{cantidad}</span>
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
                                            className="qty-input"/>
                                            <button onClick={incrementar} id="increase-qty" className="qty-btn">
                                                <i className="ri-add-line"></i>
                                           </button>
                                    
                                    </div>
                                    <span className="quantity-unit">kg</span>
                                </div>

                                <div className="purchase-actions">
                                    <button 
                                        id="btn-add-cart" 
                                        className="btn-buy-now"
                                        onClick={handleAgregarCarrito}
                                    >
                                        <i className="ri-flashlight-line"></i>
                                        Agregar al Carrito
                                    </button>
                                    <button className="btn-buy-now">
                                        <i className="ri-flashlight-line"></i>
                                        Comprar Ahora
                                    </button>
                                </div>

                                <div className="total-preview">
                                    <span className="total-label">Total:</span>
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
                                <div className="info-item">
                                    <i className="ri-time-line"></i>
                                    <div className="info-content">
                                        <h4>Entrega Rápida</h4>
                                        <p>Recibe tu pedido en 24-48 horas</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="recipes-section">
                    <div className="recipes-container">
                        
                        <h2 className="recipes-title">Recetas Recomendadas</h2>
                        
                        <div id="recipes-grid" className="recipes-grid">
                            {producto.recetas && producto.recetas.length > 0 ? (
                                producto.recetas.map((receta, index) => (
                                    <div key={index} className="recipe-card">
                                        <div className="recipe-header">
                                            <h3 className="recipe-name">{receta.nombre}</h3>
                                            <div className="recipe-meta">
                                                <span className="recipe-time">
                                                    <i className="ri-time-line"></i> {receta.tiempo}
                                                </span>
                                                <span className="recipe-difficulty">
                                                    <i className="ri-fire-line"></i> {receta.dificultad}
                                                </span>
                                                <span className="recipe-servings">
                                                    <i className="ri-user-line"></i> {receta.porciones} porciones
                                                </span>
                                            </div>
                                        </div>

                                        <div className="recipe-content">
                                            <div className="recipe-ingredients">
                                                <h4><i className="ri-list-check"></i> Ingredientes:</h4>
                                                <ul>
                                                    {receta.ingredientes.map((ingrediente, idx) => (
                                                        <li key={idx}>{ingrediente}</li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className="recipe-steps">
                                                <h4><i className="ri-file-list-line"></i> Preparación:</h4>
                                                <ol>
                                                    {receta.pasos.map((paso, idx) => (
                                                        <li key={idx}>{paso}</li>
                                                    ))}
                                                </ol>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No hay recetas disponibles para este producto.</p>
                            )}
                        </div>
                    </div>
                </section>
                <section className="related-products-section">
                    <div className="related-container">
                        <h2>Productos Relacionados</h2>
                        <div id="related-products" className="related-products-grid">
                        </div>
                    </div>
                </section>
            </main>
            
            <div id="image-modal" className="image-modal" style={{display: 'none'}}>
                <div className="image-modal-content">
                    <button className="image-modal-close">
                        <i className="ri-close-line"></i>
                    </button>
                    <img id="modal-image" src="" alt="Imagen ampliada"/>
                </div>
            </div>
        </div>
    );
}
export default DetailProduct;