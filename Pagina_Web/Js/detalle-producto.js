/*=============== DETALLE PRODUCTO JAVASCRIPT ===============*/

// Importar funciones del carrito y datos
import { addToCart, getCartItemCount, getCart, formatPrice } from './carrito.js';
import { productos, categorias, formatCLP } from './datos.js';

// Variables globales
let currentProduct = {};
let currentQuantity = 1;

// Debug: Verificar si los datos se importaron
console.log('Datos importados:', { productos, categorias });
console.log('Número de productos:', productos?.length);

// Función para actualizar el contador del carrito
function updateCartCount() {
    const cartBadge = document.getElementById('cart-badge');
    if (cartBadge) {
        const count = getCartItemCount();
        cartBadge.textContent = count;
        cartBadge.style.display = count > 0 ? 'inline' : 'none';
    }
}

/*=============== FUNCIONES DE INICIALIZACIÓN ===============*/
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...'); // Debug
    console.log('Products available:', productos?.length); // Debug
    
    // Pequeño delay para asegurar que todo esté cargado
    setTimeout(() => {
        initializeProductDetail();
        setupEventListeners();
        updateCartCount();
    }, 100);
});

function initializeProductDetail() {
    // Obtener el ID del producto desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    console.log('Product ID from URL:', productId); // Debug
    
    if (productId) {
        loadProductById(productId);
    } else {
        // Si no hay ID, cargar producto de ejemplo
        loadDefaultProduct();
    }
}

/*=============== CARGA DE PRODUCTO ===============*/
async function loadProductById(productId) {
    try {
        console.log('Loading product by ID:', productId); // Debug
        const product = getProductData(productId);
        
        console.log('Product data retrieved:', product); // Debug
        
        if (product) {
            currentProduct = product;
            renderProduct(product);
            updateBreadcrumb(product);
            loadRelatedProducts(product.category);
            console.log('Product loaded successfully'); // Debug
        } else {
            console.log('Product not found, loading default'); // Debug
            loadDefaultProduct();
        }
    } catch (error) {
        console.error('Error al cargar el producto:', error);
        loadDefaultProduct();
    }
}

function loadDefaultProduct() {
    // Cargar el primer producto disponible
    if (productos.length > 0) {
        const firstProduct = productos[0];
        currentProduct = getProductData(firstProduct.codigo);
        renderProduct(currentProduct);
        updateBreadcrumb(currentProduct);
        loadRelatedProducts(currentProduct.category);
    } else {
        console.error('No hay productos disponibles');
    }
}

/*=============== RENDERIZADO DEL PRODUCTO ===============*/
function renderProduct(product) {
    console.log('Rendering product:', product); // Debug
    
    // Actualizar título de la página
    document.title = `${product.name} - EcoMercado`;
    
    // Renderizar galería de imágenes
    renderImageGallery(product);
    
    // Renderizar información del producto
    renderProductInfo(product);
    
    // Actualizar precio total inicial
    updateTotalPrice();
    
    console.log('Product rendered successfully'); // Debug
}

function renderImageGallery(product) {
    const mainImage = document.getElementById('main-product-image');
    const thumbnailContainer = document.querySelector('.thumbnail-gallery');
    
    // Imagen principal
    mainImage.src = product.image;
    mainImage.alt = product.name;
    
    // Thumbnails
    thumbnailContainer.innerHTML = '';
    const images = product.images || [product.image];
    
    images.forEach((imgSrc, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
        thumbnail.innerHTML = `<img src="${imgSrc}" alt="${product.name} - imagen ${index + 1}">`;
        
        thumbnail.addEventListener('click', () => {
            changeMainImage(imgSrc, thumbnail);
        });
        
        thumbnailContainer.appendChild(thumbnail);
    });
}

function renderProductInfo(product) {
    console.log('Rendering product info for:', product.name); // Debug
    
    // Elementos del DOM
    const categoryBadge = document.getElementById('product-category');
    const productTitle = document.getElementById('product-name');
    const ratingStars = document.querySelector('.stars');
    const ratingText = document.querySelector('.rating-text');
    const currentPrice = document.getElementById('product-price');
    const priceUnit = document.querySelector('.price-unit');
    const description = document.getElementById('product-description-text');
    const detailsContainer = document.querySelector('.details-grid');
    const practicesContainer = document.getElementById('product-practices');
    
    // Debug: Verificar si se encontraron los elementos
    console.log('DOM elements found:', {
        categoryBadge: !!categoryBadge,
        productTitle: !!productTitle,
        currentPrice: !!currentPrice,
        description: !!description
    });
    
    if (!categoryBadge || !productTitle || !currentPrice) {
        console.error('Some required DOM elements not found!');
        return;
    }
    
    // Actualizar contenido
    if(categoryBadge) categoryBadge.textContent = product.category;
    if(productTitle) productTitle.textContent = product.name;
    if(currentPrice) currentPrice.textContent = formatCLP(product.price);
    if(priceUnit) priceUnit.textContent = `por ${product.unit}`;
    if(description) description.textContent = product.description;



    
    // Rating
    if(ratingStars) ratingStars.innerHTML = generateStarRating(product.rating);
    if(ratingText) ratingText.textContent = `${product.rating.toFixed(1)} (${product.reviews} reseñas)`;

    // Detalles del producto
    if(detailsContainer) {
        detailsContainer.innerHTML = `
            <div class="detail-item">
                <span class="detail-label">Origen:</span>
                <span class="detail-value">${product.origin}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Productor:</span>
                <span class="detail-value">${product.producer}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Cosecha:</span>
                <span class="detail-value">${product.harvest}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Stock:</span>
                <span class="detail-value">${product.inStock ? `${product.stockQuantity} ${product.unit} disponibles` : 'Agotado'}</span>
            </div>
        `;
    }
    
    // Prácticas
    if(practicesContainer) {
        practicesContainer.innerHTML = '';
        product.practices.forEach(practice => {
            const tag = document.createElement('span');
            tag.className = 'practice-tag';
            tag.textContent = practice;
            practicesContainer.appendChild(tag);
        });
    }
}

function updateBreadcrumb(product) {
    const breadcrumb = document.querySelector('.breadcrumb-container');
    breadcrumb.innerHTML = `
        <a href="index.html">
            <i class="ri-home-4-line"></i>
            Inicio
        </a>
        <i class="ri-arrow-right-s-line"></i>
        <a href="Productos.html">Productos</a>
        <i class="ri-arrow-right-s-line"></i>
        <a href="Productos.html?category=${encodeURIComponent(product.category)}">${product.category}</a>
        <i class="ri-arrow-right-s-line"></i>
        <span>${product.name}</span>
    `;
}

/*=============== FUNCIONES DE UTILIDAD ===============*/
function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="ri-star-fill"></i>';
    }
    
    if (hasHalfStar) {
        starsHTML += '<i class="ri-star-half-line"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="ri-star-line"></i>';
    }
    
    return starsHTML;
}

function changeMainImage(newSrc, clickedThumbnail) {
    const mainImage = document.getElementById('main-product-image');
    mainImage.src = newSrc;
    
    // Actualizar thumbnail activo
    document.querySelectorAll('.thumbnail').forEach(thumb => thumb.classList.remove('active'));
    clickedThumbnail.classList.add('active');
}

/*=============== GESTIÓN DE CANTIDAD ===============*/
function setupEventListeners() {
    // Botones de cantidad
    const decreaseBtn = document.getElementById('decrease-qty');
    const increaseBtn = document.getElementById('increase-qty');
    const quantityInput = document.getElementById('quantity-input');
    
    if(decreaseBtn) decreaseBtn.addEventListener('click', decreaseQuantity);
    if(increaseBtn) increaseBtn.addEventListener('click', increaseQuantity);
    if(quantityInput) quantityInput.addEventListener('change', handleQuantityChange);
    
    // Botones de acción
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    const buyNowBtn = document.querySelector('.btn-buy-now');
    
    if(addToCartBtn) addToCartBtn.addEventListener('click', handleAddToCart);
    if(buyNowBtn) buyNowBtn.addEventListener('click', handleBuyNow);
    
    // Modal de imagen
    const mainImage = document.querySelector('.main-image');
    mainImage.addEventListener('click', openImageModal);
    
    // Configurar cierre del modal
    setupImageModal();
}

function decreaseQuantity() {
    if (currentQuantity > 1) {
        currentQuantity--;
        updateQuantityDisplay();
        updateTotalPrice();
    }
}

function increaseQuantity() {
    if (currentQuantity < currentProduct.stockQuantity) {
        currentQuantity++;
        updateQuantityDisplay();
        updateTotalPrice();
    }
}

function handleQuantityChange(event) {
    const value = parseInt(event.target.value);
    if (value >= 1 && value <= currentProduct.stockQuantity) {
        currentQuantity = value;
        updateTotalPrice();
    } else {
        updateQuantityDisplay();
    }
}

function updateQuantityDisplay() {
    const quantityInput = document.getElementById('quantity-input');
    if(quantityInput) {
        quantityInput.value = currentQuantity;
    }
}

function updateTotalPrice() {
    const totalAmount = document.getElementById('total-price');
    if(totalAmount && currentProduct.price) {
        const total = currentProduct.price * currentQuantity;
        totalAmount.textContent = formatCLP(total);
    }
}

/*=============== FUNCIONES DE CARRITO ===============*/
function handleAddToCart() {
    if (!currentProduct.inStock) {
        showNotification('Producto agotado', 'error');
        return;
    }
    
    // Crear objeto compatible con addToCart
    const producto = {
        codigo: currentProduct.id,
        nombre: currentProduct.name,
        precio: currentProduct.price,
        imagen: currentProduct.image,
        stock: currentProduct.stockQuantity
    };
    
    try {
        // Llamar addToCart con producto y cantidad separados
        addToCart(producto, currentQuantity);
        showNotification(`${currentQuantity} ${producto.nombre} agregado al carrito`, 'success');
        updateCartCount();
        
        // Resetear cantidad a 1
        currentQuantity = 1;
        updateQuantityDisplay();
        updateTotalPrice();
    } catch (error) {
        console.error('Error al agregar al carrito:', error);
        showNotification('Error al agregar al carrito', 'error');
    }
}

function handleBuyNow() {
    if (!currentProduct.inStock) {
        showNotification('Producto agotado', 'error');
        return;
    }
    
    // Agregar al carrito y redirigir
    handleAddToCart();
    
    // Pequeño delay para mostrar la notificación
    setTimeout(() => {
        window.location.href = 'Carrito.html';
    }, 1000);
}

/*=============== MODAL DE IMAGEN ===============*/
function openImageModal() {
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const mainImage = document.getElementById('main-product-image');
    
    modalImage.src = mainImage.src;
    modal.style.display = 'flex';
    
    // Prevenir scroll del body
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    const modal = document.getElementById('image-modal');
    modal.style.display = 'none';
    
    // Restaurar scroll del body
    document.body.style.overflow = 'auto';
}

function setupImageModal() {
    const modal = document.getElementById('image-modal');
    const closeBtn = document.querySelector('.image-modal-close');
    
    closeBtn.addEventListener('click', closeImageModal);
    
    // Cerrar al hacer click fuera de la imagen
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeImageModal();
        }
    });
    
    // Cerrar con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeImageModal();
        }
    });
}

/*=============== PRODUCTOS RELACIONADOS ===============*/
function loadRelatedProducts(category) {
    const relatedContainer = document.querySelector('.related-products-grid');
    
    // Productos de ejemplo para demostración
    const relatedProducts = getRelatedProducts(category);
    
    relatedContainer.innerHTML = '';
    
    relatedProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'related-product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="related-product-info">
                <h4>${product.name}</h4>
                <p class="related-product-price">${formatCLP(product.price)} por ${product.unit}</p>
            </div>
        `;
        
        productCard.addEventListener('click', () => {
            window.location.href = `DetalleProducto.html?id=${product.id}`;
        });
        
        relatedContainer.appendChild(productCard);
    });
}

/*=============== FUNCIONES DE DATOS ===============*/
function getProductData(productId) {
    const product = productos.find(p => p.codigo === productId);

    
    if (!product) {
        console.log('Producto no encontrado:', productId);
        return null;
    }
    
    // Obtener la categoría
    const categoria = categorias.find(cat => cat.id === product.categoria);
    
    // Adaptar los datos al formato esperado
    const productData = {
        id: product.codigo,
        name: product.nombre,
        description: product.descripcion,
        category: categoria ? categoria.nombre : 'Sin categoria',
        price: product.precio,
        unit: "kg", // Por defecto kg, podrías agregar esto a tus datos
        image: product.imagen,
        images: [product.imagen], // Por ahora solo una imagen
        origin: "Chile", // Datos por defecto, podrías expandir tu estructura de datos
        producer: "Productor Local",
        harvest: "2024",
        practices: ["Fresco", "Local", "Calidad Premium"],
        rating: 4.5 + Math.random() * 0.5, // Rating aleatorio entre 4.5-5.0
        reviews: Math.floor(Math.random() * 200) + 50, // Reviews aleatorias
        inStock: true,
        stockQuantity: Math.floor(Math.random() * 50) + 10 // Stock aleatorio
    };
    
    console.log('Processed product data:', productData); // Debug
    return productData;
}

function getRelatedProducts(category) {
    // Buscar la categoría por nombre
    const categoriaObj = categorias.find(cat => cat.nombre === category);
    
    if (!categoriaObj) return [];
    
    // Filtrar productos de la misma categoría (excluyendo el actual)
    const relatedProductsData = productos
        .filter(product => product.categoria === categoriaObj.id && product.codigo !== currentProduct.id)
        .slice(0, 4);
    
    // Adaptar al formato esperado
    return relatedProductsData.map(producto => ({
        id: producto.codigo,
        name: producto.nombre,
        category: category,
        price: producto.precio,
        unit: "kg",
        image: producto.imagen
    }));
}

/*=============== NOTIFICACIONES ===============*/
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification${type}`;
    notification.innerHTML = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        color:white;
        font-weight: 500;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    // Estilos de la notificación
    switch(type){
        case 'success':
            notification.style.backgroundColor = '#10b981';
            break;
        case 'error':
            notification.style.backgroundColor = '#ef4444';
            break;
        default:
            notification.style.backgroundColor= '#3b82f6';
    }
    
    document.body.appendChild(notification);
    
    // Animación de entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

/*=============== FUNCIONES AUXILIARES ===============*/
