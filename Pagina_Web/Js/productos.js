import {productos, categorias, formatCLP} from './datos.js';
import { addToCart, getCartItemCount } from './carrito.js';

/*=============== HH-003: FUNCIONES DE ACCESIBILIDAD ===============*/
// Función para anunciar mensajes a lectores de pantalla
function announceMessage(message, isUrgent = false) {
    const regionId = isUrgent ? 'aria-live-assertive' : 'aria-live-region';
    const region = document.getElementById(regionId);
    
    if (region) {
        region.textContent = message;
        // Limpiar después de 3 segundos
        setTimeout(() => {
            region.textContent = '';
        }, 3000);
    }
}

// Función para manejar navegación por teclado en filtros
function handleKeyboardNavigation(event) {
    const currentElement = event.target;
    const isFilter = currentElement.classList.contains('filter-btn');
    
    if (isFilter && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
        event.preventDefault();
        
        const filters = Array.from(document.querySelectorAll('.filter-btn'));
        const currentIndex = filters.indexOf(currentElement);
        
        let nextIndex;
        if (event.key === 'ArrowRight') {
            nextIndex = (currentIndex + 1) % filters.length;
        } else {
            nextIndex = (currentIndex - 1 + filters.length) % filters.length;
        }
        
        filters[nextIndex].focus();
    }
}

// Event listener para navegación por teclado
document.addEventListener('keydown', handleKeyboardNavigation);

const grid = document.getElementById('product-grid');
const filtersContainer = document.querySelector('.filters');
const cartBadge = document.getElementById('cart-badge');

// Función para ir al detalle del producto
function goToProductDetail(productCode) {
    console.log('Navegando al producto:', productCode); // Debug
    window.location.href = `DetalleProducto.html?id=${productCode}`;
}

// Hacer la función global
window.goToProductDetail = goToProductDetail;

// Actualizar badge del carrito
function updateCartBadge() {
    if (cartBadge) {
        const count = getCartItemCount();
        cartBadge.textContent = count;
        cartBadge.style.display = count > 0 ? 'inline' : 'none';
    }
}

// Escuchar cambios en el carrito
document.addEventListener('cartUpdated', updateCartBadge);

// Actualizar badge al cargar la página
document.addEventListener('DOMContentLoaded', updateCartBadge);

const renderProducts = (productList) => {
    grid.innerHTML = ''; // LIMPIA EL CONTENEDOR
    productList.forEach(producto => {
        const categoriaNombre = categorias.find(cat => cat.id === producto.categoria)?.nombre || 'Sin categoria';
        // CREAMOS UN ELEMENTO DIV PARA CADA PRODUCTO
        const card = document.createElement('div');
        card.className = 'product-card'; // LE ASIGNAMMOS LA CLASE PARA DESPUES DARLE ESTILO

        card.innerHTML = `
            <div class="product-card__image-container" data-codigo="${producto.codigo}">
                <img src="${producto.imagen}" alt="${producto.descripcion}" class="product-card__img">
                <div class="product-card__overlay">
                    <i class="ri-eye-line"></i>
                    <span>Ver detalles</span>
                </div>
            </div>
            <div class="product-card__info">
                <span class ="product-card__badge">${categoriaNombre}</span>
                <h3 class="product-card__name" data-codigo="${producto.codigo}">${producto.nombre}</h3>
                <p class="product-card__price">${formatCLP(producto.precio)}</p>
                <button class="product-card__btn" data-codigo="${producto.codigo}">Añadir al carrito</button>
            </div>
        `;
        grid.appendChild(card); // AÑADIR EL PRODUCTO AL CARRITO
      
    });
};

// FUNCION PARA RENDERIZAR LOS BOTONES DEL FILTRO
filtersContainer.addEventListener('click', (e) => {
    if(e.target.classList.contains('filter-btn')){
        //manejar la clase activa
        document.querySelectorAll('.filter-btn').forEach(btn=>btn.classList.remove('active'));
        e.target.classList.add('active');

        const categoria = e.target.dataset.categoria;
        if(categoria === 'all'){
            renderProducts(productos);
            // HH-003: Anunciar filtro aplicado
            announceMessage(`Mostrando todos los productos. ${productos.length} productos encontrados.`);
        }else{
            const productosFiltrados = productos.filter(p => p.categoria === categoria);
            renderProducts(productosFiltrados);
            // HH-003: Anunciar filtro aplicado
            const categoriaNombre = categorias.find(cat => cat.id === categoria)?.nombre || categoria;
            announceMessage(`Filtro aplicado: ${categoriaNombre}. ${productosFiltrados.length} productos encontrados.`);
        }
        
    }
});

// RENDERIZAR TODOS LOS PRODUCTOS AL CARGAR LA PAGINA
grid.addEventListener('click',(e)=>{
    // Manejar clic en botón de agregar al carrito
    if(e.target.classList.contains('product-card__btn')){
        const codigo = e.target.dataset.codigo;
        const producto = productos.find(p => p.codigo === codigo);
        if(producto){
            addToCart(producto);
            // HH-003: Anunciar acción a lectores de pantalla
            announceMessage(`${producto.nombre} añadido al carrito`);
            // Mantener el alert visual también
            alert(`${producto.nombre} ha sido añadido al carrito`);
        }
    }
    
    // Manejar clic en imagen para ver detalles
    if(e.target.classList.contains('product-card__img') || 
       e.target.closest('.product-card__image-container') ||
       e.target.classList.contains('product-card__name')){
        
        let codigo;
        if(e.target.classList.contains('product-card__img')){
            codigo = e.target.closest('.product-card__image-container').dataset.codigo;
        } else if(e.target.closest('.product-card__image-container')){
            codigo = e.target.closest('.product-card__image-container').dataset.codigo;
        } else if(e.target.classList.contains('product-card__name')){
            codigo = e.target.dataset.codigo;
        }
        
        if(codigo){
            goToProductDetail(codigo);
        }
    }
});

//INICIALIZAR
const renderFilters = ()=>{
    const categoriasUnicas = [...new Set(productos.map(p => p.categoria))];
    let filtersHTML = '<button class="filter-btn active" data-categoria="all">Todos</button>';
    categoriasUnicas.forEach(catId => {
        const categoria = categorias.find(cat => cat.id === catId);
        if(categoria){
            filtersHTML += `<button class="filter-btn" data-categoria="${categoria.id}">${categoria.nombre}</button>`;
        }
    });
    filtersContainer.innerHTML = filtersHTML;
};

renderFilters();
renderProducts(productos);