// Script para mostrar productos destacados en la página de inicio
import { productos, categorias } from './datos.js';

function renderFeaturedProducts() {
    const container = document.getElementById('featured-products-container');
    if (!container) return;

    // Obtener un producto de cada categoría
    const featuredProducts = [];
    
    categorias.forEach(categoria => {
        const productosDeCategoria = productos.filter(producto => producto.categoria === categoria.id);
        if (productosDeCategoria.length > 0) {
            // Tomar el primer producto de cada categoría
            featuredProducts.push(productosDeCategoria[0]);
        }
    });

    // Generar HTML para los productos destacados
    const productosHTML = featuredProducts.map(producto => {
        const categoriaNombre = categorias.find(cat => cat.id === producto.categoria)?.nombre || 'Sin categoria';
        return `
        <div class="product-card" onclick="window.location.href='DetalleProducto.html?codigo=${producto.codigo}'">
            <div class="product-card__image-container" data-codigo="${producto.codigo}">
                <img src="${producto.imagen}" alt="${producto.descripcion}" class="product-card__img">
                <div class="product-card__overlay">
                    <i class="ri-eye-line"></i>
                    <span>Ver detalles</span>
                </div>
            </div>
            <div class="product-card__info">
                <span class="product-card__badge">${categoriaNombre}</span>
                <h3 class="product-card__name" data-codigo="${producto.codigo}">${producto.nombre}</h3>
                <p class="product-card_price">${producto.precio.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</p>
                <button class="product-card__btn" onclick="event.stopPropagation(); addToCart('${producto.codigo}')" data-codigo="${producto.codigo}">
                    <i class="ri-shopping-cart-line"></i>
                    Agregar
                </button>
            </div>
        </div>
        `;
    }).join('');

    container.innerHTML = productosHTML;
}

function addToCart(codigo) {
    // Función simple para agregar al carrito (puedes expandir según tu lógica de carrito)
    const producto = productos.find(p => p.codigo === codigo);
    if (producto) {
        console.log('Producto agregado al carrito:', producto.nombre);
        // Aquí puedes agregar la lógica real del carrito
        alert(`${producto.nombre} agregado al carrito`);
        
        // Actualizar badge del carrito (ejemplo simple)
        const cartBadge = document.getElementById('cart-badge');
        if (cartBadge) {
            let currentCount = parseInt(cartBadge.textContent) || 0;
            cartBadge.textContent = currentCount + 1;
        }
    }
}

// Hacer la función global para que pueda ser llamada desde onclick
window.addToCart = addToCart;

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', renderFeaturedProducts);