import { useCart } from '../../hooks';
import { formatCLP } from '../../data';
import "../carrito/carrito.css"


function Carrito() {
    const { cartItems, removeFromCart, updateQuantity, clearCart, getTotal, getItemCount } = useCart();

    return (
        <div className="container-full">
            <main className="main">
        <section className="cart-section">
            <div className="cart-container">
                <div className="cart-summary">
                    <h2>Resumen del Pedido</h2>
                    <div className="cart-stats">
                        <p>Items en el carrito: <span id="cart-count">{getItemCount()}</span></p>
                        <p className="cart-total">Total: <span id="cart-total">{formatCLP(getTotal())}</span></p>
                    </div>
                    <div className="cart-actions">
                        <button 
                            id="clear-cart" 
                            className="btn-secondary"
                            onClick={clearCart}
                            disabled={cartItems.length === 0}
                        >
                            <i className="ri-delete-bin-line"></i>
                            Vaciar Carrito
                        </button>
                        <button 
                            id="checkout-btn" 
                            className="btn-primary"
                            disabled={cartItems.length === 0}
                        >
                            <i className="ri-shopping-cart-line"></i>
                            Proceder al Pago
                        </button>
                    </div>
                </div>


                <div className="cart-items-container">
                    <h2>Productos en tu Carrito</h2>
                    
                    {cartItems.length > 0 ? (
                        <div id="cart-items" className="cart-items">
                            {cartItems.map(item => (
                                <div key={item.codigo} className="cart-item">
                                    <div className="cart-item-image">
                                        <img src={`/src/assets/${item.imagen}`} alt={item.nombre} />
                                    </div>
                                    <div className="cart-item-info">
                                        <h3 className="cart-item-name">{item.nombre}</h3>
                                        <p className="cart-item-price">Precio unitario: {formatCLP(item.precio)}</p>
                                        <p className="cart-item-subtotal">Subtotal: {formatCLP(item.precio * item.cantidad)}</p>
                                    </div>
                                    <div className="cart-item-controls">
                                        <div className="quantity-controls">
                                            <button 
                                                className="qty-btn"
                                                onClick={() => updateQuantity(item.codigo, item.cantidad - 1)}
                                            >
                                                -
                                            </button>
                                            <input 
                                                type="number" 
                                                className="qty-input" 
                                                value={item.cantidad}
                                                onChange={(e) => updateQuantity(item.codigo, parseInt(e.target.value) || 0)}
                                                min="1"
                                            />
                                            <button 
                                                className="qty-btn"
                                                onClick={() => updateQuantity(item.codigo, item.cantidad + 1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button 
                                            className="remove-btn"
                                            onClick={() => removeFromCart(item.codigo)}
                                        >
                                            <i className="ri-delete-bin-line"></i>
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div id="empty-cart" className="empty-cart">
                            <i className="ri-shopping-cart-line"></i>
                            <h3>Tu carrito está vacío</h3>
                            <p>¡Agrega algunos productos deliciosos!</p>
                            <a href="/productos" className="btn-primary">
                                <i className="ri-arrow-left-line"></i>
                                Continuar Comprando
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </section>

        <div id="checkout-modal" className="modal" style={{ display: 'none' }}>
            <div className="modal-content">
                <div className="modal-header">
                    <h3>Finalizar Compra</h3>
                    <button className="modal-close" id="close-modal">
                        <i className="ri-close-line"></i>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="checkout-summary">
                        <h4>Resumen del Pedido</h4>
                        <div id="checkout-items"></div>
                        <div className="checkout-total">
                            <strong>Total a Pagar: <span id="checkout-total">$0</span></strong>
                        </div>
                    </div>
                    
                    <form id="checkout-form" className="checkout-form">
                        <h4>Datos de Entrega</h4>
                        <div className="form-group">
                            <label htmlFor="customer-name">Nombre Completo:</label>
                            <input type="text" id="customer-name" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="customer-email">Email:</label>
                            <input type="email" id="customer-email" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="customer-phone">Teléfono:</label>
                            <input type="tel" id="customer-phone" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="customer-address">Dirección de Entrega:</label>
                            <textarea id="customer-address" rows="3" required></textarea>
                        </div>
                        <div className="form-actions">
                            <button type="button" className="btn-secondary" id="cancel-checkout">Cancelar</button>
                            <button type="submit" className="btn-primary">
                                <i className="ri-check-line"></i>
                                Confirmar Pedido
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </main>
        </div>
    )
}

export default Carrito;