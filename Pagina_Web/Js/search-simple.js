// Búsqueda en tiempo real - Versión con filtrado funcional
console.log('Script de búsqueda con filtrado cargado');

// Productos para la búsqueda (sincronizados con datos.js)
const productosSearch = [
    // FRUTAS
    {
        codigo: 'FR001',
        nombre: 'Manzanas Fuji',
        categoria: 'Frutas Frescas',
        precio: 1200,
        imagen: 'imagenes/Manzana-Fuji-granel.png',
        descripcion: 'Manzana fuji fresca y jugosa, ideal para comer al natural o en postres.'
    },
    {
        codigo: 'FR002',
        nombre: 'Naranjas Valencia',
        categoria: 'Frutas Frescas',
        precio: 1000,
        imagen: 'imagenes/Naranjas_Valencia.jpg',
        descripcion: 'Naranjas valencia dulces y jugosas, perfectas para zumos naturales.'
    },
    {
        codigo: 'FR003',
        nombre: 'Plátanos Cavendish',
        categoria: 'Frutas Frescas',
        precio: 800,
        imagen: 'imagenes/Platanos_Cavendish.jpg',
        descripcion: 'Plátanos Cavendish frescos y dulces, perfectos para snacks y postres.'
    },
    // VERDURAS
    {
        codigo: 'VE001',
        nombre: 'Zanahorias Orgánicas',
        categoria: 'Verduras Orgánicas',
        precio: 5900,
        imagen: 'imagenes/Zanahorias_Organicas.jpg',
        descripcion: 'Zanahorias organicas, crocantes y dulces, cultivadas sin pesticidad ni quimicos.'
    },
    {
        codigo: 'VE002',
        nombre: 'Espinacas Frescas',
        categoria: 'Verduras Orgánicas',
        precio: 700,
        imagen: 'imagenes/Espinacas_Frescas.jpg',
        descripcion: 'Espinacas frescas y tiernas, ricas en hierro y vitaminas.'
    },
    {
        codigo: 'VE003',
        nombre: 'Pimientos Tricolores',
        categoria: 'Verduras Orgánicas',
        precio: 1500,
        imagen: 'imagenes/Pimientos_Tricolores.jpg',
        descripcion: 'Pimientos rojos, verdes y amarillos, ideales para ensaladas y salteados.'
    },
    // PRODUCTOS ORGÁNICOS
    {
        codigo: 'PO001',
        nombre: 'Miel Orgánica',
        categoria: 'Productos Orgánicos',
        precio: 5000,
        imagen: 'imagenes/Miel_Organica.png',
        descripcion: 'Miel organica pura, recolectada de colmenas certificadas.'
    },
    {
        codigo: 'PO002',
        nombre: 'Quinua Orgánica',
        categoria: 'Productos Orgánicos',
        precio: 3000,
        imagen: 'imagenes/Miel_Organica.png',
        descripcion: 'Quinua organica, rica en proteinas y libre de gluten.'
    },
    // LÁCTEOS
    {
        codigo: 'PL001',
        nombre: 'Leche Entera',
        categoria: 'Lácteos',
        precio: 1200,
        imagen: 'imagenes/Leche_Entera.jpg',
        descripcion: 'Leche fresca entera, libre de pastoreo y aditivos'
    }
];

// Función para filtrar productos en la página
function filterProductsOnPage(query, matches) {
    // Si estamos en la página de productos, filtrar
    if (window.location.pathname.includes('Productos.html')) {
        console.log('Intentando filtrar productos...');
        console.log('window.productos disponible:', !!window.productos);
        console.log('window.renderProducts disponible:', typeof window.renderProducts);
        
        // Función para intentar el filtrado con reintentos
        function tryFiltering() {
            // Importar productos desde datos.js si están disponibles
            if (!window.allProducts && window.productos) {
                window.allProducts = window.productos;
            }
            
            if (window.allProducts && typeof window.renderProducts === 'function') {
                // Filtrar productos reales de datos.js
                const filteredProducts = window.allProducts.filter(producto => {
                    const searchText = (
                        producto.nombre + ' ' + 
                        producto.descripcion + ' ' + 
                        (producto.categoria || '')
                    ).toLowerCase();
                    
                    return searchText.includes(query) || 
                           producto.nombre.toLowerCase().includes(query) ||
                           producto.nombre.toLowerCase().startsWith(query) ||
                           producto.nombre.toLowerCase().split(' ').some(word => word.startsWith(query));
                });
                
                console.log('Filtrando productos en la página:', filteredProducts.length);
                window.renderProducts(filteredProducts);
                
                // Desactivar filtros de categoría
                const filterButtons = document.querySelectorAll('.filter-btn');
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Mostrar mensaje si no hay resultados
                if (filteredProducts.length === 0) {
                    const grid = document.getElementById('product-grid');
                    if (grid) {
                        grid.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: #666;"><i class="ri-search-line" style="font-size: 3rem; margin-bottom: 1rem; display: block;"></i><h3>No se encontraron productos</h3><p>No hay productos que coincidan con "' + query + '"</p><button onclick="clearSearch()" style="background: var(--home-color1); color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 0.5rem; margin-top: 1rem; cursor: pointer;">Ver todos los productos</button></div>';
                    }
                }
                return true; // Éxito
            }
            return false; // No pudo filtrar
        }
        
        // Intentar inmediatamente
        if (!tryFiltering()) {
            // Si no funciona, esperar y reintentar
            console.log('Reintentando filtrado después de esperar...');
            setTimeout(() => {
                if (!tryFiltering()) {
                    console.log('No se pudo filtrar productos - datos no disponibles');
                }
            }, 200);
        }
    }
}

// Función para limpiar búsqueda
function clearSearch() {
    const searchInput = document.querySelector('.search-bar');
    if (searchInput) {
        searchInput.value = '';
        // Disparar evento input para limpiar la búsqueda
        searchInput.dispatchEvent(new Event('input'));
    }
    
    // Si estamos en productos.html, mostrar todos los productos
    if (window.location.pathname.includes('Productos.html') && window.allProducts && typeof window.renderProducts === 'function') {
        window.renderProducts(window.allProducts);
        // Reactivar filtro "Todos"
        const allFilter = document.querySelector('.filter-btn[data-categoria="all"]');
        if (allFilter) {
            const filterButtons = document.querySelectorAll('.filter-btn');
            filterButtons.forEach(btn => btn.classList.remove('active'));
            allFilter.classList.add('active');
        }
    }
}

function initializeSearchNoModule() {
    console.log('=== INICIALIZANDO BÚSQUEDA ===');
    console.log('Productos disponibles:', productosSearch.length);
    console.log('Página actual:', window.location.pathname);
    console.log('¿Es página de productos?', window.location.pathname.includes('Productos.html'));
    
    const searchInput = document.querySelector('.search-bar');
    if (!searchInput) {
        console.log('❌ No se encontró el input de búsqueda');
        return;
    }
    
    console.log('✅ Input de búsqueda encontrado');
    
    const searchContainer = searchInput.closest('.search-bar-container');
    if (!searchContainer) {
        console.log('❌ No se encontró el contenedor de búsqueda');
        return;
    }
    
    console.log('✅ Contenedor encontrado');
    
    // Crear contenedor de sugerencias
    let suggestionsContainer = document.getElementById('search-suggestions');
    if (!suggestionsContainer) {
        suggestionsContainer = document.createElement('div');
        suggestionsContainer.id = 'search-suggestions';
        suggestionsContainer.className = 'search-suggestions';
        searchContainer.style.position = 'relative';
        searchContainer.appendChild(suggestionsContainer);
        console.log('Contenedor de sugerencias creado');
    }
    
    // Event listener para el input
    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase().trim();
        console.log('Búsqueda:', query);
        
        if (query.length === 0) {
            suggestionsContainer.style.display = 'none';
            // Si estamos en la página de productos, mostrar todos los productos
            if (window.location.pathname.includes('Productos.html') && window.allProducts && typeof window.renderProducts === 'function') {
                window.renderProducts(window.allProducts);
                // Reactivar filtro "Todos"
                const allFilter = document.querySelector('.filter-btn[data-categoria="all"]');
                if (allFilter) {
                    const filterButtons = document.querySelectorAll('.filter-btn');
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    allFilter.classList.add('active');
                }
            }
            return;
        }
        
        // Filtrar productos - búsqueda más amplia
        const matches = productosSearch.filter(producto => {
            const searchText = (
                producto.nombre + ' ' + 
                producto.descripcion + ' ' + 
                producto.categoria
            ).toLowerCase();
            
            // Buscar coincidencias parciales y también por inicio de palabra
            return searchText.includes(query) || 
                   producto.nombre.toLowerCase().includes(query) ||
                   producto.categoria.toLowerCase().includes(query) ||
                   producto.nombre.toLowerCase().startsWith(query) ||
                   // Buscar por palabras individuales
                   producto.nombre.toLowerCase().split(' ').some(word => word.startsWith(query));
        });
        
        console.log('Productos encontrados:', matches.length);
        console.log('Matches:', matches.map(p => p.nombre));
        
        // Si estamos en la página de productos, filtrar los productos mostrados
        if (window.location.pathname.includes('Productos.html')) {
            filterProductsOnPage(query, matches);
        }
        
        // Mostrar sugerencias
        if (matches.length === 0) {
            suggestionsContainer.innerHTML = '<div style="padding: 15px; text-align: center; color: #666;">No se encontraron productos para "' + query + '"</div>';
            suggestionsContainer.style.cssText = 'position: absolute; top: 100%; left: 0; right: 0; background: white; border: 1px solid #ddd; border-radius: 0 0 8px 8px; z-index: 9999; display: block; box-shadow: 0 4px 12px rgba(0,0,0,0.15);';
            return;
        }
        
        console.log('Generando HTML para sugerencias...');
        
        // Mostrar sugerencias (máximo 5)
        const html = matches.slice(0, 5).map(producto => {
            return '<div class="suggestion-item" data-codigo="' + producto.codigo + '" onclick="selectProductSearch(\'' + producto.codigo + '\')" style="padding: 12px; cursor: pointer; border-bottom: 1px solid #eee; display: flex; align-items: center; background: white; transition: background 0.2s ease;" onmouseover="this.style.background=\'#f8f9fa\'" onmouseout="this.style.background=\'white\'"><img src="' + producto.imagen + '" alt="' + producto.nombre + '" style="width: 50px; height: 50px; object-fit: cover; border-radius: 8px; margin-right: 12px; border: 1px solid #eee; flex-shrink: 0; background-color: #f8f9fa;" onerror="this.src=\'imagenes/LogoHuertoHogar.png\'; this.style.padding=\'5px\';"><div style="flex: 1;"><div style="font-weight: 500; color: #333; margin-bottom: 4px; font-size: 14px;">' + highlightQuery(producto.nombre, query) + '</div><div style="font-size: 12px; color: #666; margin-bottom: 4px;">' + producto.categoria + '</div><div style="font-size: 13px; color: #2E8B57; font-weight: 600;">$' + producto.precio.toLocaleString('es-CL') + '</div></div><div style="color: #999; font-size: 12px; margin-left: 8px;">→</div></div>';
        }).join('');
        
        console.log('HTML generado, tamaño:', html.length, 'caracteres');
        
        suggestionsContainer.innerHTML = html;
        suggestionsContainer.style.cssText = 'position: absolute; top: 100%; left: 0; right: 0; background: white; border: 1px solid #ddd; border-radius: 0 0 8px 8px; max-height: 350px; overflow-y: auto; z-index: 9999; display: block; box-shadow: 0 4px 12px rgba(0,0,0,0.15);';
        
        console.log('Sugerencias mostradas');
    });
    
    // Click fuera para cerrar
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.search-bar-container')) {
            suggestionsContainer.style.display = 'none';
        }
    });
    
    // Manejar tecla Enter
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const firstSuggestion = suggestionsContainer.querySelector('.suggestion-item');
            if (firstSuggestion) {
                const codigo = firstSuggestion.dataset.codigo;
                selectProductSearch(codigo);
            }
        }
        
        if (e.key === 'Escape') {
            suggestionsContainer.style.display = 'none';
            searchInput.blur();
        }
    });
    
    console.log('Búsqueda inicializada correctamente');
}

// Función para resaltar texto en las sugerencias
function highlightQuery(text, query) {
    if (!query) return text;
    const regex = new RegExp('(' + query + ')', 'gi');
    return text.replace(regex, '<strong style="background-color: #fff3cd; padding: 1px 2px; border-radius: 2px;">$1</strong>');
}

// Función para seleccionar producto
function selectProductSearch(codigo) {
    console.log('Producto seleccionado:', codigo);
    window.location.href = 'DetalleProducto.html?codigo=' + codigo;
}

// Hacer las funciones globales
window.selectProductSearch = selectProductSearch;
window.filterProductsOnPage = filterProductsOnPage;
window.clearSearch = clearSearch;

// Escuchar cuando productos.js esté listo
window.addEventListener('productosReady', function(event) {
    console.log('🎉 Productos.js está listo!', event.detail);
    window.allProducts = event.detail.productos;
    window.renderProducts = event.detail.renderProducts;
});

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSearchNoModule);
} else {
    initializeSearchNoModule();
}