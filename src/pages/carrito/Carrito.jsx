import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks';
import { useAuth } from '../../context/AuthContext';
import { formatCLP } from '../../data';
import CheckoutModal from '../../components/checkout/CheckoutModal';
import "../carrito/carrito.css"



function Carrito() {
    const { cartItems, removeFromCart, updateQuantity, clearCart, getTotal, getItemCount } = useCart();
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [showCheckoutModal, setShowCheckoutModal] = useState(false);
    const [showLoginAlert, setShowLoginAlert] = useState(false);

    // Manejar click en "Proceder al Pago"
    const handleCheckout = () => {
        if (cartItems.length === 0) return;
        
        // Verificar si el usuario está logueado
        if (!isLoggedIn) {
            setShowLoginAlert(true);
            setTimeout(() => {
                navigate('/login');
            }, 2000);
            return;
        }
        
        setShowCheckoutModal(true);
    };

    // Manejar finalización del pago (éxito o cierre)
    const handlePaymentComplete = (data) => {
        // Si hay data, el pago fue exitoso
        if (data) {
            clearCart(); // Vaciar carrito después del pago exitoso
        }
    };

    // Cerrar modal
    const handleCloseModal = () => {
        setShowCheckoutModal(false);
    };

    return (
        <div className="container-full">
            <main className="main">
        <section className="cart-section">
            <div className="cart-container">
                {showLoginAlert && (
                    <div className="alert alert-warning" style={{ marginBottom: '1rem' }}>
                        ⚠️ Debes iniciar sesión para continuar con la compra. Redirigiendo...
                    </div>
                )}
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
                            onClick={handleCheckout}
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

        {/* MODAL UNIFICADO DE CHECKOUT */}
        <CheckoutModal 
            isOpen={showCheckoutModal}
            onClose={handleCloseModal}
            onPaymentComplete={handlePaymentComplete}
        />

        </main>
        </div>
    )
}

export default Carrito;