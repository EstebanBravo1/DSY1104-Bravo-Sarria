// Blog de Recetas - JavaScript
// Importar datos de productos con recetas
import { productos, categorias, formatCLP } from './datos.js';

// ==================== VARIABLES GLOBALES ====================
let recetasData = [];
let recetasFiltradas = [];
let categoriaActiva = 'todas';

// ==================== ELEMENTOS DEL DOM ====================
const recetasContainer = document.getElementById('recetas-container');
const loadingState = document.getElementById('loading-state');
const emptyState = document.getElementById('empty-state');
const filterButtons = document.querySelectorAll('.filter-btn');
const recetaModal = document.getElementById('receta-modal');
const modalClose = document.getElementById('modal-close');
const modalTitulo = document.getElementById('modal-titulo');
const modalBody = document.getElementById('modal-body');
const newsletterForm = document.getElementById('newsletter-form');
const cartCountElement = document.getElementById('cart-count');
const announcements = document.getElementById('announcements');

// ==================== FUNCIONES DE ACCESIBILIDAD HH-003 ====================
function announceMessage(message) {
    if (announcements) {
        announcements.textContent = message;
        // Clear after announcement
        setTimeout(() => {
            announcements.textContent = '';
        }, 1000);
    }
}

function handleKeyboardNavigation(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        event.target.click();
    }
}

// ==================== PROCESAMIENTO DE DATOS ====================
function procesarRecetas() {
    recetasData = [];
    
    productos.forEach(producto => {
        if (producto.recetas && producto.recetas.length > 0) {
            producto.recetas.forEach((receta, index) => {
                const categoria = categorias.find(cat => cat.id === producto.categoria);
                
                recetasData.push({
                    id: `${producto.codigo}-${index}`,
                    nombre: receta,
                    producto: producto.nombre,
                    categoria: producto.categoria,
                    categoriaNombre: categoria ? categoria.nombre : 'Sin categoría',
                    descripcion: producto.descripcion,
                    imagen: producto.imagen,
                    precio: producto.precio,
                    origen: producto.origen,
                    practicas: producto.practicas || [],
                    codigo: producto.codigo,
                    ingredientePrincipal: producto.nombre,
                    tipoCategoria: obtenerTipoCategoria(producto.categoria)
                });
            });
        }
    });
    
    recetasFiltradas = [...recetasData];
    console.log('Recetas procesadas:', recetasData);
}

function obtenerTipoCategoria(categoriaId) {
    const tipos = {
        'FR': 'Recetas con Frutas',
        'VE': 'Recetas Vegetarianas', 
        'PO': 'Recetas Orgánicas',
        'PL': 'Recetas con Lácteos'
    };
    return tipos[categoriaId] || 'Recetas Generales';
}

// ==================== RENDERIZADO ====================
function renderRecetas() {
    showLoading();
    
    // Simular tiempo de carga para UX
    setTimeout(() => {
        hideLoading();
        
        if (recetasFiltradas.length === 0) {
            showEmptyState();
            announceMessage('No se encontraron recetas para esta categoría');
            return;
        }
        
        hideEmptyState();
        
        const recetasHTML = recetasFiltradas.map(receta => createRecetaCard(receta)).join('');
        recetasContainer.innerHTML = recetasHTML;
        
        // Añadir event listeners
        addRecetaEventListeners();
        
        announceMessage(`${recetasFiltradas.length} recetas encontradas`);
    }, 300);
}

function createRecetaCard(receta) {
    return `
        <article class="receta-card" data-id="${receta.id}">
            <div class="receta-card__image-container">
                <img src="${receta.imagen}" alt="${receta.nombre}" class="receta-card__img" loading="lazy">
                <div class="receta-card__overlay">
                    <i class='bx bx-book-open'></i>
                    <span>Ver Receta</span>
                </div>
                <div class="receta-card__badge">
                    ${receta.tipoCategoria}
                </div>
            </div>
            
            <div class="receta-card__content">
                <h3 class="receta-card__title">${receta.nombre}</h3>
                
                <div class="receta-card__info">
                    <div class="receta-card__ingredient">
                        <i class='bx bx-leaf'></i>
                        <span>Ingrediente: ${receta.ingredientePrincipal}</span>
                    </div>
                    
                    <div class="receta-card__origin">
                        <i class='bx bx-map'></i>
                        <span>Origen: ${receta.origen}</span>
                    </div>
                </div>
                
                <div class="receta-card__practices">
                    ${receta.practicas.map(practica => 
                        `<span class="practice-tag">${practica}</span>`
                    ).join('')}
                </div>
                
                <div class="receta-card__price">
                    <span class="price-label">Producto disponible desde:</span>
                    <span class="price-value">${formatCLP(receta.precio)}</span>
                </div>
                
                <div class="receta-card__actions">
                    <button class="btn-receta" data-id="${receta.id}" tabindex="0">
                        <i class='bx bx-book-content'></i>
                        Ver Receta Completa
                    </button>
                    <button class="btn-producto" data-codigo="${receta.codigo}" tabindex="0">
                        <i class='bx bx-cart-add'></i>
                        Ver Producto
                    </button>
                </div>
            </div>
        </article>
    `;
}

function addRecetaEventListeners() {
    // Event listeners para ver receta
    document.querySelectorAll('.btn-receta').forEach(btn => {
        btn.addEventListener('click', handleVerReceta);
        btn.addEventListener('keydown', handleKeyboardNavigation);
    });
    
    // Event listeners para ver producto
    document.querySelectorAll('.btn-producto').forEach(btn => {
        btn.addEventListener('click', handleVerProducto);
        btn.addEventListener('keydown', handleKeyboardNavigation);
    });
    
    // Event listeners para cards
    document.querySelectorAll('.receta-card__image-container').forEach(container => {
        container.addEventListener('click', (e) => {
            const card = e.target.closest('.receta-card');
            const recetaId = card.dataset.id;
            showRecetaModal(recetaId);
        });
        container.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const card = e.target.closest('.receta-card');
                const recetaId = card.dataset.id;
                showRecetaModal(recetaId);
            }
        });
        container.setAttribute('tabindex', '0');
        container.setAttribute('role', 'button');
        container.setAttribute('aria-label', 'Ver receta completa');
    });
}

// ==================== HANDLERS DE EVENTOS ====================
function handleVerReceta(e) {
    const recetaId = e.target.closest('.btn-receta').dataset.id;
    showRecetaModal(recetaId);
    announceMessage('Abriendo receta completa');
}

function handleVerProducto(e) {
    const codigo = e.target.closest('.btn-producto').dataset.codigo;
    // Redirigir a página de productos con filtro específico
    window.location.href = `Productos.html?producto=${codigo}`;
    announceMessage('Redirigiendo a página de producto');
}

function handleFilterClick(e) {
    const categoria = e.target.dataset.categoria;
    
    // Actualizar botones activos
    filterButtons.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    // Filtrar recetas
    filtrarRecetas(categoria);
    
    announceMessage(`Filtrando por categoría: ${e.target.textContent.trim()}`);
}

// ==================== FILTRADO ====================
function filtrarRecetas(categoria) {
    categoriaActiva = categoria;
    
    if (categoria === 'todas') {
        recetasFiltradas = [...recetasData];
    } else {
        recetasFiltradas = recetasData.filter(receta => receta.categoria === categoria);
    }
    
    renderRecetas();
}

// ==================== MODAL ====================
function showRecetaModal(recetaId) {
    const receta = recetasData.find(r => r.id === recetaId);
    if (!receta) return;
    
    modalTitulo.textContent = receta.nombre;
    modalBody.innerHTML = createModalContent(receta);
    
    recetaModal.style.display = 'flex';
    document.body.classList.add('modal-open');
    
    // Focus management
    modalClose.focus();
    
    // Trap focus dentro del modal
    trapFocus(recetaModal);
}

function hideRecetaModal() {
    recetaModal.style.display = 'none';
    document.body.classList.remove('modal-open');
    announceMessage('Modal de receta cerrado');
}

function createModalContent(receta) {
    return `
        <div class="modal-receta">
            <div class="modal-receta__header">
                <img src="${receta.imagen}" alt="${receta.nombre}" class="modal-receta__img">
                <div class="modal-receta__info">
                    <h4>Información del Ingrediente Principal</h4>
                    <p><strong>Producto:</strong> ${receta.producto}</p>
                    <p><strong>Origen:</strong> ${receta.origen}</p>
                    <p><strong>Precio:</strong> ${formatCLP(receta.precio)}</p>
                    <p><strong>Categoría:</strong> ${receta.categoriaNombre}</p>
                </div>
            </div>
            
            <div class="modal-receta__content">
                <h4>Descripción del Ingrediente</h4>
                <p>${receta.descripcion}</p>
                
                <h4>Prácticas Sostenibles</h4>
                <ul class="practices-list">
                    ${receta.practicas.map(practica => `<li>${practica}</li>`).join('')}
                </ul>
                
                <h4>Receta Sugerida: ${receta.nombre}</h4>
                <div class="receta-suggestions">
                    ${getRecetaInstructions(receta)}
                </div>
                
                <div class="modal-receta__actions">
                    <button class="btn-primary" onclick="window.location.href='Productos.html?producto=${receta.codigo}'">
                        <i class='bx bx-cart-add'></i>
                        Comprar Ingrediente
                    </button>
                    <button class="btn-secondary" onclick="compartirReceta('${receta.id}')">
                        <i class='bx bx-share'></i>
                        Compartir Receta
                    </button>
                </div>
            </div>
        </div>
    `;
}

function getRecetaInstructions(receta) {
    // Instrucciones básicas según el tipo de receta
    const instrucciones = {
        'Tarta de manzana': `
            <p><strong>Ingredientes principales:</strong> Manzanas frescas, harina, azúcar, mantequilla</p>
            <p><strong>Tiempo:</strong> 45 minutos</p>
            <p><strong>Instrucciones básicas:</strong> Pela y corta las manzanas en rodajas. Prepara la masa con harina y mantequilla. Coloca las manzanas sobre la masa y hornea a 180°C por 35 minutos.</p>
        `,
        'Ensalada de frutas': `
            <p><strong>Ingredientes principales:</strong> Frutas frescas variadas, miel, limón</p>
            <p><strong>Tiempo:</strong> 15 minutos</p>
            <p><strong>Instrucciones básicas:</strong> Lava y corta las frutas en trozos. Mezcla con un poco de miel y jugo de limón. Refrigera por 10 minutos antes de servir.</p>
        `,
        'Smoothie de platano': `
            <p><strong>Ingredientes principales:</strong> Plátanos maduros, leche, miel</p>
            <p><strong>Tiempo:</strong> 5 minutos</p>
            <p><strong>Instrucciones básicas:</strong> Pela los plátanos y córtalos en rodajas. Licúa con leche y miel hasta obtener consistencia cremosa.</p>
        `,
        'Crema de zanahoria': `
            <p><strong>Ingredientes principales:</strong> Zanahorias, cebolla, caldo de verduras</p>
            <p><strong>Tiempo:</strong> 30 minutos</p>
            <p><strong>Instrucciones básicas:</strong> Sofríe la cebolla, añade las zanahorias cortadas y el caldo. Cocina 20 minutos y licúa hasta obtener crema.</p>
        `
    };
    
    return instrucciones[receta.nombre] || `
        <p><strong>Receta:</strong> ${receta.nombre}</p>
        <p><strong>Ingrediente principal:</strong> ${receta.ingredientePrincipal}</p>
        <p>¡Una deliciosa receta para preparar con nuestros productos frescos y naturales!</p>
        <p><em>Visita nuestra tienda para obtener ingredientes de la mejor calidad.</em></p>
    `;
}

// ==================== FUNCIONES DE UTILIDAD ====================
function showLoading() {
    loadingState.style.display = 'block';
    recetasContainer.style.display = 'none';
    emptyState.style.display = 'none';
}

function hideLoading() {
    loadingState.style.display = 'none';
    recetasContainer.style.display = 'grid';
}

function showEmptyState() {
    emptyState.style.display = 'block';
    recetasContainer.style.display = 'none';
}

function hideEmptyState() {
    emptyState.style.display = 'none';
}

function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
        
        if (e.key === 'Escape') {
            hideRecetaModal();
        }
    });
}

function compartirReceta(recetaId) {
    const receta = recetasData.find(r => r.id === recetaId);
    if (!receta) return;
    
    if (navigator.share) {
        navigator.share({
            title: `Receta: ${receta.nombre}`,
            text: `Deliciosa receta de ${receta.nombre} con ${receta.ingredientePrincipal}`,
            url: window.location.href
        });
    } else {
        // Fallback: copiar al portapapeles
        const texto = `¡Prueba esta deliciosa receta de ${receta.nombre} con ${receta.ingredientePrincipal}! ${window.location.href}`;
        navigator.clipboard.writeText(texto).then(() => {
            announceMessage('Enlace de receta copiado al portapapeles');
        });
    }
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalItems = cart.reduce((total, item) => total + item.cantidad, 0);
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
}

// ==================== NEWSLETTER ====================
function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    const email = document.getElementById('newsletter-email').value;
    
    // Simular envío
    const submitButton = e.target.querySelector('.newsletter__button');
    const originalText = submitButton.innerHTML;
    
    submitButton.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Enviando...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        submitButton.innerHTML = '<i class="bx bx-check"></i> ¡Suscrito!';
        submitButton.style.backgroundColor = 'var(--home-color1)';
        
        announceMessage('Suscripción exitosa al newsletter');
        
        // Reset después de 3 segundos
        setTimeout(() => {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            submitButton.style.backgroundColor = '';
            e.target.reset();
        }, 3000);
    }, 1500);
}

// ==================== SCROLL UP ====================
function handleScrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY >= 350) {
            scrollUp.classList.add('show-scroll');
        } else {
            scrollUp.classList.remove('show-scroll');
        }
    });
    
    scrollUp.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==================== INICIALIZACIÓN ====================
function init() {
    console.log('Inicializando Blog de Recetas...');
    
    // Procesar datos
    procesarRecetas();
    
    // Renderizar recetas iniciales
    renderRecetas();
    
    // Event listeners
    filterButtons.forEach(btn => {
        btn.addEventListener('click', handleFilterClick);
        btn.addEventListener('keydown', handleKeyboardNavigation);
    });
    
    // Modal event listeners
    modalClose.addEventListener('click', hideRecetaModal);
    recetaModal.addEventListener('click', (e) => {
        if (e.target === recetaModal) {
            hideRecetaModal();
        }
    });
    
    // Newsletter
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
    
    // Scroll up
    handleScrollUp();
    
    // Actualizar contador del carrito
    updateCartCount();
    
    // Accessibility
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && recetaModal.style.display === 'flex') {
            hideRecetaModal();
        }
    });
    
    console.log('Blog inicializado correctamente');
    announceMessage('Blog de recetas cargado correctamente');
}

// ==================== EJECUTAR AL CARGAR ====================
document.addEventListener('DOMContentLoaded', init);
