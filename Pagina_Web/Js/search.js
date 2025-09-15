// Búsqueda en tiempo real para productos
import { productos } from './datos.js';

console.log('Script de búsqueda cargado');

// Datos de prueba para casos donde no se carga datos.js
const productosBackup = [
    {codigo: 'FR001', nombre: 'Naranjas Valencia', categoria: 'FR', precio: 1500, imagen: 'imagenes/Naranjas_Valencia.jpg', descripcion: 'Naranjas frescas de Valencia'},
    {codigo: 'FR002', nombre: 'Manzanas Fuji', categoria: 'FR', precio: 1200, imagen: 'imagenes/Manzanas_Fuji.jpg', descripcion: 'Manzanas dulces y crujientes'},
    {codigo: 'VE001', nombre: 'Lechuga Romana', categoria: 'VE', precio: 800, imagen: 'imagenes/Lechuga_Romana.jpg', descripcion: 'Lechuga fresca y crujiente'}
];

function initializeSearch() {
    console.log('Inicializando búsqueda...');
    
    // Usar productos importados o backup
    const productosToUse = productos && productos.length > 0 ? productos : productosBackup;
    console.log('Productos disponibles:', productosToUse.length);
    console.log('Primer producto:', productosToUse[0]);
    
    const searchInput = document.querySelector('.search-bar');
    if (!searchInput) {
        console.log('No se encontró el input de búsqueda');
        const allInputs = document.querySelectorAll('input[type="text"]');
        console.log('Inputs encontrados:', allInputs.length);
        return;
    }
    
    console.log('Input de búsqueda encontrado:', searchInput);
    
    const searchContainer = searchInput.closest('.search-bar-container');
    if (!searchContainer) {
        console.log('No se encontró el contenedor de búsqueda');
        return;
    }
    
    console.log('Contenedor encontrado:', searchContainer);
    
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
            return;
        }
        
        // Filtrar productos
        const matches = productosToUse.filter(producto => {
            const searchIn = (producto.nombre + ' ' + producto.descripcion).toLowerCase();
            const found = searchIn.includes(query);
            if (found) console.log('Producto encontrado:', producto.nombre);
            return found;
        });
        
        console.log('Total productos encontrados:', matches.length);
        console.log('Matches:', matches.map(p => p.nombre));
        
        if (matches.length === 0) {
            console.log('No se encontraron productos');
            suggestionsContainer.style.display = 'none';
            return;
        }
        
        console.log('Generando HTML para sugerencias...');
        
        // Mostrar sugerencias
        const html = matches.slice(0, 5).map(producto => `
            <div class="suggestion-item" data-codigo="${producto.codigo}" style="
                padding: 10px; 
                cursor: pointer; 
                border-bottom: 1px solid #eee; 
                display: flex; 
                align-items: center;
                background: white;
            ">
                <img src="${producto.imagen}" alt="${producto.nombre}" style="
                    width: 40px; 
                    height: 40px; 
                    object-fit: cover; 
                    border-radius: 4px; 
                    margin-right: 10px;
                ">
                <div style="flex: 1;">
                    <div style="font-weight: 500; color: #333;">${producto.nombre}</div>
                    <div style="font-size: 0.85rem; color: #666;">$${producto.precio.toLocaleString('es-CL')}</div>
                </div>
            </div>
        `).join('');
        
        console.log('HTML generado, mostrando sugerencias...');
        console.log('Tamaño del HTML:', html.length, 'caracteres');
        
        suggestionsContainer.innerHTML = html;
        suggestionsContainer.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border: 1px solid #ddd;
            border-radius: 0 0 8px 8px;
            max-height: 200px;
            overflow-y: auto;
            z-index: 9999;
            display: block;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        
        console.log('Sugerencias mostradas');
    });
    
    // Click en sugerencias
    document.addEventListener('click', function(e) {
        if (e.target.closest('.suggestion-item')) {
            const item = e.target.closest('.suggestion-item');
            const codigo = item.dataset.codigo;
            console.log('Producto seleccionado:', codigo);
            window.location.href = `DetalleProducto.html?codigo=${codigo}`;
        } else if (!e.target.closest('.search-bar-container')) {
            suggestionsContainer.style.display = 'none';
        }
    });
    
    console.log('Búsqueda inicializada correctamente');
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSearch);
} else {
    initializeSearch();
}