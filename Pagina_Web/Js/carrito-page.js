// carrito-page.js - JavaScript específico para la página del carrito
import { 
    getCart, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    getCartTotal, 
    getCartItemCount, 
    formatPrice 
} from './carrito.js';

import { productos } from './datos.js';

// Elementos del DOM
const cartItemsContainer = document.getElementById('cart-items');
const emptyCartMessage = document.getElementById('empty-cart');
const cartCountElement = document.getElementById('cart-count');
const cartTotalElement = document.getElementById('cart-total');
const clearCartBtn = document.getElementById('clear-cart');
const checkoutBtn = document.getElementById('checkout-btn');
const checkoutModal = document.getElementById('checkout-modal');
const closeModalBtn = document.getElementById('close-modal');
const cancelCheckoutBtn = document.getElementById('cancel-checkout');
const checkoutForm = document.getElementById('checkout-form');

// Inicializar la página del carrito
document.addEventListener('DOMContentLoaded', function() {
    renderCart();
    updateCartSummary();
    setupEventListeners();
});

// Escuchar cambios en el carrito
document.addEventListener('cartUpdated', function() {
    renderCart();
    updateCartSummary();
});

// Configurar event listeners
function setupEventListeners() {
    // Limpiar carrito
    clearCartBtn.addEventListener('click', function() {
        clearCart();
    });

    // Abrir modal de checkout
    checkoutBtn.addEventListener('click', function() {
        if (getCartItemCount() === 0) {
            alert('Tu carrito está vacío');
            return;
        }
        openCheckoutModal();
    });

    // Cerrar modal
    closeModalBtn.addEventListener('click', closeCheckoutModal);
    cancelCheckoutBtn.addEventListener('click', closeCheckoutModal);

    // Cerrar modal al hacer clic fuera
    checkoutModal.addEventListener('click', function(e) {
        if (e.target === checkoutModal) {
            closeCheckoutModal();
        }
    });

    // Manejar envío del formulario
    checkoutForm.addEventListener('submit', handleCheckout);
}

// Renderizar los items del carrito
function renderCart() {
    const cart = getCart();
    
    if (cart.length === 0) {
        showEmptyCart();
        return;
    }
    
    hideEmptyCart();
    
    const cartHTML = cart.map(item => {
        const producto = productos.find(p => p.codigo === item.codigo);
        const subtotal = item.precio * item.qty;
        
        return `
            <div class="cart-item" data-codigo="${item.codigo}">
                <div class="cart-item-image">
                    <img src="${producto?.imagen || 'imagenes/placeholder.png'}" 
                         alt="${item.nombre}">
                </div>
                <div class="cart-item-info">
                    <h3 class="cart-item-name">${item.nombre}</h3>
                    <p class="cart-item-price">Precio unitario: ${formatPrice(item.precio)}</p>
                    <p class="cart-item-subtotal">Subtotal: ${formatPrice(subtotal)}</p>
                </div>
                <div class="cart-item-controls">
                    <div class="quantity-controls">
                        <button class="qty-btn minus" data-codigo="${item.codigo}">
                            <i class="ri-subtract-line"></i>
                        </button>
                        <input type="number" 
                               class="qty-input" 
                               value="${item.qty}" 
                               min="1" 
                               max="${producto?.stock || 999}"
                               data-codigo="${item.codigo}">
                        <button class="qty-btn plus" data-codigo="${item.codigo}">
                            <i class="ri-add-line"></i>
                        </button>
                    </div>
                    <button class="remove-btn" data-codigo="${item.codigo}">
                        <i class="ri-delete-bin-line"></i>
                        Eliminar
                    </button>
                </div>
            </div>
        `;
    }).join('');
    
    cartItemsContainer.innerHTML = cartHTML;
    
    // Agregar event listeners a los controles
    addCartItemListeners();
}

// Agregar event listeners a los controles de cantidad
function addCartItemListeners() {
    // Botones de incrementar/decrementar
    document.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const codigo = this.dataset.codigo;
            const isPlus = this.classList.contains('plus');
            const input = document.querySelector(`.qty-input[data-codigo="${codigo}"]`);
            const currentQty = parseInt(input.value);
            
            if (isPlus) {
                const maxStock = parseInt(input.max);
                if (currentQty < maxStock) {
                    updateQuantity(codigo, currentQty + 1);
                }
            } else {
                if (currentQty > 1) {
                    updateQuantity(codigo, currentQty - 1);
                }
            }
        });
    });
    
    // Inputs de cantidad
    document.querySelectorAll('.qty-input').forEach(input => {
        input.addEventListener('change', function() {
            const codigo = this.dataset.codigo;
            const newQty = parseInt(this.value);
            
            if (newQty > 0) {
                updateQuantity(codigo, newQty);
            }
        });
    });
    
    // Botones de eliminar
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const codigo = this.dataset.codigo;
            if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
                removeFromCart(codigo);
            }
        });
    });
}

// Actualizar resumen del carrito
function updateCartSummary() {
    const count = getCartItemCount();
    const total = getCartTotal();
    
    cartCountElement.textContent = count;
    cartTotalElement.textContent = formatPrice(total);
    
    // Habilitar/deshabilitar botón de checkout
    checkoutBtn.disabled = count === 0;
}

// Mostrar mensaje de carrito vacío
function showEmptyCart() {
    cartItemsContainer.style.display = 'none';
    emptyCartMessage.style.display = 'block';
}

// Ocultar mensaje de carrito vacío
function hideEmptyCart() {
    cartItemsContainer.style.display = 'block';
    emptyCartMessage.style.display = 'none';
}

// Abrir modal de checkout
function openCheckoutModal() {
    const cart = getCart();
    const checkoutItemsContainer = document.getElementById('checkout-items');
    const checkoutTotalElement = document.getElementById('checkout-total');
    
    // Mostrar items en el modal
    const checkoutHTML = cart.map(item => {
        const subtotal = item.precio * item.qty;
        return `
            <div class="checkout-item">
                <span>${item.nombre} x ${item.qty}</span>
                <span>${formatPrice(subtotal)}</span>
            </div>
        `;
    }).join('');
    
    checkoutItemsContainer.innerHTML = checkoutHTML;
    checkoutTotalElement.textContent = formatPrice(getCartTotal());
    
    checkoutModal.style.display = 'block';
    document.body.classList.add('modal-open');
}

// Cerrar modal de checkout
function closeCheckoutModal() {
    checkoutModal.style.display = 'none';
    document.body.classList.remove('modal-open');
    checkoutForm.reset();
}

// Manejar el checkout
function handleCheckout(e) {
    e.preventDefault();
    
    const formData = new FormData(checkoutForm);
    const customerData = {
        name: document.getElementById('customer-name').value,
        email: document.getElementById('customer-email').value,
        phone: document.getElementById('customer-phone').value,
        address: document.getElementById('customer-address').value
    };
    
    // Simular procesamiento del pedido
    showOrderProcessing();
    
    setTimeout(() => {
        const orderNumber = generateOrderNumber();
        showOrderSuccess(orderNumber, customerData);
        clearCart();
        closeCheckoutModal();
    }, 2000);
}

// Mostrar procesamiento del pedido
function showOrderProcessing() {
    const submitBtn = checkoutForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="ri-loader-4-line"></i> Procesando...';
    
    // Restaurar después de un tiempo
    setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }, 3000);
}

// Mostrar éxito del pedido
function showOrderSuccess(orderNumber, customerData) {
    const cart = getCart();
    const total = getCartTotal();
    
    alert(`
¡Pedido confirmado! 🎉

Número de pedido: ${orderNumber}
Cliente: ${customerData.name}
Email: ${customerData.email}
Total: ${formatPrice(total)}

Te enviaremos un email de confirmación a ${customerData.email}
¡Gracias por tu compra!
    `);
}

// Generar número de pedido
function generateOrderNumber() {
    return 'HH-' + Date.now().toString().slice(-6);
}
