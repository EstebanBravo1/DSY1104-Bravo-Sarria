# DOCUMENTACIÓN COMPLETA - PROYECTO HUERTO HOGAR

## 📋 ÍNDICE
1. [Visión General del Proyecto](#vision-general)
2. [Estructura de Archivos](#estructura-archivos)
3. [Archivos HTML - Explicación Detallada](#archivos-html)
4. [Archivos CSS - Estilos y Diseño](#archivos-css)
5. [Archivos JavaScript - Funcionalidad](#archivos-javascript)
6. [Interacciones DOM](#interacciones-dom)
7. [Funciones Principales](#funciones-principales)
8. [Flujo de Datos](#flujo-datos)
9. [Patrones de Código](#patrones-codigo)
10. [Conceptos Clave para Aprender](#conceptos-clave)

---

## 🎯 VISIÓN GENERAL DEL PROYECTO {#vision-general}

**HuertoHogar** es una tienda online de productos orgánicos y naturales que permite:
- Navegar por categorías de productos (frutas, verduras, lácteos, etc.)
- Buscar productos en tiempo real
- Ver detalles de productos
- Gestionar un carrito de compras
- Leer un blog con recetas
- Contactar con la empresa

### Tecnologías Utilizadas
- **HTML5**: Estructura y contenido semántico
- **CSS3**: Estilos, diseño responsivo y animaciones
- **JavaScript ES6+**: Funcionalidad interactiva y módulos
- **LocalStorage**: Persistencia de datos del carrito
- **DOM API**: Manipulación de elementos HTML

---

## 📁 ESTRUCTURA DE ARCHIVOS {#estructura-archivos}

```
Proyecto Huerto/
│
├── 📄 ARCHIVOS HTML (Páginas principales)
│   ├── Inicio.html          # Página principal con productos destacados
│   ├── Productos.html       # Catálogo completo con filtros
│   ├── DetalleProducto.html # Vista detallada de un producto
│   ├── Carrito.html         # Gestión del carrito de compras
│   ├── Blog.html            # Blog con recetas
│   ├── Contacto.html        # Formulario de contacto
│   ├── Login.html           # Página de inicio de sesión
│   ├── Register.html        # Página de registro
│   ├── ForgotPassword.html  # Recuperación de contraseña
│   └── Sistema.html         # Página administrativa/sistema
│
├── 🎨 ARCHIVOS CSS (Estilos)
│   ├── style.css            # Estilos base y componentes principales
│   ├── Sistema.css          # Estilos específicos del sistema
│   ├── contacto.css         # Estilos del formulario de contacto
│   ├── carrito.css          # Estilos del carrito de compras
│   ├── detalleproducto.css  # Estilos de la página de detalle
│   ├── Login.css            # Estilos de login
│   ├── Register.css         # Estilos de registro
│   └── ForgotPassword.css   # Estilos de recuperación
│
├── ⚡ ARCHIVOS JAVASCRIPT (Funcionalidad)
│   ├── datos.js             # Base de datos de productos y categorías
│   ├── search.js            # Funcionalidad de búsqueda (módulos ES6)
│   ├── search-simple.js     # Búsqueda sin módulos (compatible)
│   ├── carrito.js           # Gestión del carrito de compras
│   ├── carrito-page.js      # Página específica del carrito
│   ├── productos.js         # Catálogo de productos con filtros
│   ├── detalle-producto.js  # Vista detallada de productos
│   ├── featured-products.js # Productos destacados
│   ├── blog.js              # Funcionalidad del blog
│   ├── UserLogin.js         # Validación de login
│   ├── UserRegister.js      # Validación de registro
│   ├── UserForgotPassword.js# Recuperación de contraseña
│   └── System.js            # Funciones del sistema
│
└── 🖼️ DIRECTORIO IMÁGENES
    ├── LogoHuertoHogar.png
    ├── Imagen_Principal.png
    └── [productos]/*.jpg
```

---

## 📄 ARCHIVOS HTML - EXPLICACIÓN DETALLADA {#archivos-html}

### 1. ESTRUCTURA BÁSICA HTML

Todos los archivos HTML siguen esta estructura:

```html
<!DOCTYPE html>                    <!-- Declaración de HTML5 -->
<html lang="es">                   <!-- Idioma español para SEO y accesibilidad -->
<head>
    <meta charset="UTF-8">         <!-- Codificación de caracteres Unicode -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- Responsivo -->
    <title>Título de la página</title>
    <!-- Enlaces a CSS externos -->
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <!-- Contenido de la página -->
    <!-- Scripts de JavaScript al final para mejor rendimiento -->
    <script src="js/archivo.js"></script>
</body>
</html>
```

### 2. INICIO.HTML - Página Principal

**Propósito**: Primera página que ve el usuario, muestra productos destacados y navegación principal.

**Elementos clave explicados línea por línea**:

```html
<!-- NAVEGACIÓN PRINCIPAL -->
<nav class="menu-principal">                    <!-- Contenedor principal de navegación -->
    <div class="menu-principal-container">      <!-- Contenedor con ancho máximo -->
        <a href="Inicio.html" class="logo-link"> <!-- Enlace del logo -->
            <img src="imagenes/LogoHuertoHogar.png" alt="Logo"> <!-- Imagen del logo -->
        </a>
        <ul>                                    <!-- Lista de navegación -->
            <li><a href="Inicio.html">Inicio</a></li>  <!-- Elemento de lista -->
            <li><a href="Productos.html">Productos</a></li>
            <!-- ... más elementos -->
        </ul>
    </div>
</nav>

<!-- BARRA DE BÚSQUEDA -->
<div class="search-bar-block">                  <!-- Contenedor de la búsqueda -->
    <form class="search-bar-container">         <!-- Formulario de búsqueda -->
        <input type="text"                      <!-- Campo de entrada de texto -->
               placeholder="Buscar productos..." 
               class="search-bar"               <!-- Clase para estilos CSS -->
               aria-label="Buscar productos">  <!-- Accesibilidad para lectores -->
        <button type="submit" class="search-btn">Buscar</button>
    </form>
</div>

<!-- SECCIÓN DE PRODUCTOS DESTACADOS -->
<section class="featured-products">             <!-- Sección semántica -->
    <h2>Productos destacados</h2>              <!-- Título de nivel 2 -->
    <div class="products-grid"                 <!-- Contenedor tipo grid CSS -->
         id="featured-products-container">     <!-- ID para JavaScript -->
        <!-- Productos se cargan dinámicamente -->
    </div>
</section>
```

**¿Por qué estos elementos?**
- `<nav>`: Elemento semántico para navegación
- `aria-label`: Mejora accesibilidad para usuarios con discapacidades
- `id`: Permite a JavaScript encontrar el elemento específico
- `class`: Conecta HTML con estilos CSS

### 3. PRODUCTOS.HTML - Catálogo

**Propósito**: Muestra todos los productos con filtros por categoría.

```html
<!-- FILTROS DE PRODUCTOS -->
<div class="filters" id="product-filters">      <!-- Contenedor de filtros -->
    <button class="filter-btn active"           <!-- Botón de filtro activo -->
            data-categoria="all">               <!-- Atributo de datos personalizado -->
        Todos
    </button>
    <!-- JavaScript lee 'data-categoria' para filtrar -->
</div>

<!-- GRID DE PRODUCTOS -->
<div id="product-grid" class="product-grid">    <!-- Contenedor que JavaScript llena -->
    <!-- Los productos se insertan aquí dinámicamente -->
</div>
```

**Conceptos importantes**:
- `data-*`: Atributos personalizados para pasar datos a JavaScript
- IDs únicos permiten que JavaScript encuentre elementos específicos

### 4. CARRITO.HTML - Gestión de Compras

```html
<!-- LISTA DE PRODUCTOS EN CARRITO -->
<div id="cart-items" class="cart-items">        <!-- Contenedor de items -->
    <!-- JavaScript inserta productos aquí -->
</div>

<!-- RESUMEN DE COMPRA -->
<div class="cart-summary">                      <!-- Resumen de totales -->
    <div class="total-price">
        <span>Total: </span>
        <span id="cart-total">$0</span>        <!-- JavaScript actualiza este valor -->
    </div>
    <button id="checkout-btn" class="checkout-btn">Finalizar Compra</button>
</div>

<!-- MODAL DE CHECKOUT -->
<div id="checkout-modal" class="modal">         <!-- Ventana emergente -->
    <div class="modal-content">
        <span id="close-modal" class="close">&times;</span>  <!-- Botón cerrar -->
        <form id="checkout-form">               <!-- Formulario de datos -->
            <!-- Campos del formulario -->
        </form>
    </div>
</div>
```

**¿Qué hace cada parte?**
- `cart-items`: JavaScript llena con productos del carrito
- `cart-total`: Se actualiza automáticamente cuando cambian cantidades
- Modal: Ventana emergente que aparece/desaparece con JavaScript

---

## 🎨 ARCHIVOS CSS - ESTILOS Y DISEÑO {#archivos-css}

### 1. VARIABLES CSS (:root)

```css
:root {
    --color-primary: #2E8B57;      /* Variable de color principal */
    --color-accent: #FFD700;       /* Color de acento */
    --font-primary: 'Montserrat';  /* Fuente principal */
    --shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Sombra estándar */
}
```

**¿Para qué sirven las variables?**
- Centralizar colores y valores
- Fácil mantenimiento (cambiar en un lugar afecta todo)
- Consistencia visual en todo el sitio

### 2. RESET CSS

```css
* {
    margin: 0;           /* Elimina márgenes por defecto */
    padding: 0;          /* Elimina padding por defecto */
    box-sizing: border-box; /* Incluye borde y padding en el ancho total */
}
```

**¿Por qué esto es importante?**
- Los navegadores tienen estilos por defecto diferentes
- Reset garantiza consistencia entre navegadores

### 3. FLEXBOX Y GRID

```css
.menu-principal-container {
    display: flex;           /* Activa Flexbox */
    justify-content: space-between; /* Espacio entre elementos */
    align-items: center;     /* Centra verticalmente */
}

.products-grid {
    display: grid;           /* Activa CSS Grid */
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* Responsive */
    gap: 1.5rem;            /* Espacio entre elementos */
}
```

**Flexbox vs Grid**:
- **Flexbox**: Mejor para layouts 1D (filas O columnas)
- **Grid**: Mejor para layouts 2D (filas Y columnas)

### 4. MEDIA QUERIES (Responsive)

```css
@media (max-width: 768px) {     /* En pantallas pequeñas */
    .menu-principal ul {
        flex-direction: column;  /* Cambia de horizontal a vertical */
    }
    
    .products-grid {
        grid-template-columns: 1fr; /* Una sola columna */
    }
}
```

**¿Cómo funciona?**
- CSS se aplica solo cuando la condición se cumple
- Permite diferentes diseños según el tamaño de pantalla

---

## ⚡ ARCHIVOS JAVASCRIPT - FUNCIONALIDAD {#archivos-javascript}

### 1. DATOS.JS - Base de Datos

```javascript
// EXPORTAR datos para usar en otros archivos
export const productos = [
    {
        codigo: 'FR001',           // Identificador único
        nombre: 'Manzanas Fuji',   // Nombre del producto
        categoria: 'FR',           // Categoría (Frutas)
        precio: 1200,              // Precio en pesos chilenos
        imagen: 'imagenes/Manzanas_Fuji.jpg', // Ruta de la imagen
        descripcion: 'Manzanas dulces...'      // Descripción
    }
    // ... más productos
];

export const categorias = [
    {id: 'FR', nombre: 'Frutas Frescas'},
    {id: 'VE', nombre: 'Verduras Orgánicas'}
    // ... más categorías
];
```

**Conceptos clave**:
- `export`: Permite que otros archivos usen estos datos
- Array de objetos: Estructura de datos para organizar información
- Cada objeto representa un producto con propiedades

### 2. SEARCH.JS - Búsqueda en Tiempo Real

```javascript
// IMPORTAR datos de otros archivos
import { productos } from './datos.js';

function initializeSearch() {
    console.log('Inicializando búsqueda...');
    
    // BUSCAR elemento en el DOM
    const searchInput = document.querySelector('.search-bar');
    if (!searchInput) {
        console.log('No se encontró el input de búsqueda');
        return; // Salir de la función si no existe
    }
    
    // AGREGAR listener para cuando el usuario escriba
    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase().trim(); // Obtener texto
        
        if (query.length === 0) {
            // Si no hay texto, ocultar sugerencias
            suggestionsContainer.style.display = 'none';
            return;
        }
        
        // FILTRAR productos que coincidan
        const matches = productos.filter(producto => 
            producto.nombre.toLowerCase().includes(query) ||
            producto.descripcion.toLowerCase().includes(query)
        );
        
        // MOSTRAR resultados
        showSuggestions(matches);
    });
}
```

**Línea por línea explicado**:

1. **`import { productos } from './datos.js'`**
   - Trae los datos de productos desde otro archivo
   - ES6 modules: código modular y organizado

2. **`document.querySelector('.search-bar')`**
   - Busca el primer elemento con clase 'search-bar'
   - Devuelve `null` si no lo encuentra

3. **`addEventListener('input', function...)`**
   - Escucha cuando el usuario escribe en el input
   - 'input' se dispara en cada tecla presionada

4. **`e.target.value`**
   - `e` es el evento que ocurrió
   - `target` es el elemento que disparó el evento
   - `value` es lo que escribió el usuario

5. **`.toLowerCase().trim()`**
   - `toLowerCase()`: convierte a minúsculas para comparar
   - `trim()`: elimina espacios al inicio y final

6. **`productos.filter(...)`**
   - `filter()` crea un nuevo array con elementos que cumplen condición
   - Devuelve solo productos que contienen el texto buscado

### 3. CARRITO.JS - Gestión del Carrito

```javascript
// CARRITO en memoria (se pierde al cerrar navegador)
let cart = [];

// CARRITO persistente (se guarda en navegador)
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart); // Convertir texto a objeto
    }
}

function addToCart(productCode) {
    // BUSCAR si el producto ya está en el carrito
    const existingItem = cart.find(item => item.codigo === productCode);
    
    if (existingItem) {
        // Si existe, aumentar cantidad
        existingItem.cantidad += 1;
    } else {
        // Si no existe, agregarlo
        const product = productos.find(p => p.codigo === productCode);
        if (product) {
            cart.push({
                ...product,    // Copiar todas las propiedades del producto
                cantidad: 1    // Agregar cantidad inicial
            });
        }
    }
    
    saveCart(); // Guardar en localStorage
    updateCartDisplay(); // Actualizar interfaz
}
```

**Conceptos importantes**:

1. **LocalStorage**:
   - `localStorage.setItem()`: Guarda datos en el navegador
   - `localStorage.getItem()`: Recupera datos guardados
   - `JSON.stringify()`: Convierte objeto a texto
   - `JSON.parse()`: Convierte texto a objeto

2. **Array.find()**:
   - Busca el primer elemento que cumple condición
   - Devuelve el elemento o `undefined`

3. **Spread operator (...)**:
   - `...product` copia todas las propiedades del producto
   - Útil para clonar objetos

### 4. DOM MANIPULATION

```javascript
function renderProducts(productosAMostrar) {
    const container = document.getElementById('product-grid');
    
    // LIMPIAR contenido anterior
    container.innerHTML = '';
    
    // CREAR HTML para cada producto
    productosAMostrar.forEach(producto => {
        // CREAR elemento div
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        // AGREGAR contenido HTML
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${producto.imagen}" alt="${producto.nombre}">
            </div>
            <div class="product-info">
                <h3>${producto.nombre}</h3>
                <p>$${producto.precio.toLocaleString('es-CL')}</p>
                <button onclick="addToCart('${producto.codigo}')">
                    Agregar al carrito
                </button>
            </div>
        `;
        
        // AGREGAR al contenedor
        container.appendChild(productCard);
    });
}
```

**Métodos DOM explicados**:

1. **`document.getElementById()`**: Busca elemento por ID
2. **`document.createElement()`**: Crea nuevo elemento HTML
3. **`innerHTML`**: Cambia el contenido HTML interno
4. **`appendChild()`**: Agrega elemento como hijo
5. **`className`**: Asigna clases CSS al elemento

---

## 🔄 INTERACCIONES DOM {#interacciones-dom}

### 1. ¿Qué es el DOM?

El **DOM (Document Object Model)** es la representación de la página HTML que JavaScript puede manipular:

```
HTML Original:          DOM en memoria:              JavaScript puede:
<div id="productos">    div#productos               ├─ Agregar elementos
</div>                  └─ (vacío)                  ├─ Cambiar contenido
                                                    ├─ Modificar estilos
                                                    └─ Escuchar eventos
```

### 2. Seleccionar Elementos

```javascript
// Por ID (más rápido)
const productGrid = document.getElementById('product-grid');

// Por clase (devuelve lista)
const buttons = document.querySelectorAll('.filter-btn');

// Por selector CSS
const searchInput = document.querySelector('.search-bar');
const firstProduct = document.querySelector('.product-card:first-child');
```

### 3. Modificar Contenido

```javascript
// Cambiar texto
element.textContent = 'Nuevo texto';

// Cambiar HTML
element.innerHTML = '<strong>Texto en negrita</strong>';

// Cambiar atributos
element.setAttribute('data-id', '123');
element.src = 'nueva-imagen.jpg'; // Para imágenes
```

### 4. Escuchar Eventos

```javascript
// Click en botón
button.addEventListener('click', function() {
    console.log('Botón clickeado');
});

// Envío de formulario
form.addEventListener('submit', function(e) {
    e.preventDefault(); // Evita que se envíe el formulario
    // Procesar datos
});

// Tecla presionada
input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        console.log('Enter presionado');
    }
});
```

### 5. Eventos Personalizados

```javascript
// CREAR evento personalizado
const cartUpdated = new CustomEvent('cartUpdated', {
    detail: { itemCount: cart.length }
});

// DISPARAR evento
document.dispatchEvent(cartUpdated);

// ESCUCHAR evento
document.addEventListener('cartUpdated', function(e) {
    console.log('Carrito actualizado:', e.detail.itemCount);
    updateCartBadge();
});
```

---

## 🔧 FUNCIONES PRINCIPALES {#funciones-principales}

### 1. Funciones de Renderizado

```javascript
function renderFeaturedProducts() {
    // OBJETIVO: Mostrar productos destacados en la página principal
    
    const container = document.getElementById('featured-products-container');
    
    // OBTENER un producto de cada categoría
    const featuredProducts = [];
    categorias.forEach(categoria => {
        const productInCategory = productos.find(p => p.categoria === categoria.id);
        if (productInCategory) {
            featuredProducts.push(productInCategory);
        }
    });
    
    // GENERAR HTML y mostrarlo
    const html = featuredProducts.map(createProductCard).join('');
    container.innerHTML = html;
}

function createProductCard(producto) {
    // OBJETIVO: Crear HTML para una tarjeta de producto
    return `
        <div class="product-card" data-codigo="${producto.codigo}">
            <div class="product-image">
                <img src="${producto.imagen}" alt="${producto.nombre}">
            </div>
            <div class="product-info">
                <h3>${producto.nombre}</h3>
                <p class="price">$${formatPrice(producto.precio)}</p>
                <button onclick="addToCart('${producto.codigo}')">
                    Agregar al carrito
                </button>
            </div>
        </div>
    `;
}
```

### 2. Funciones de Filtrado

```javascript
function filterProducts(categoria) {
    // OBJETIVO: Filtrar productos por categoría
    
    let filteredProducts;
    
    if (categoria === 'all') {
        filteredProducts = productos; // Mostrar todos
    } else {
        filteredProducts = productos.filter(p => p.categoria === categoria);
    }
    
    renderProducts(filteredProducts);
    updateActiveFilter(categoria);
}

function searchProducts(query) {
    // OBJETIVO: Buscar productos por texto
    
    const lowercaseQuery = query.toLowerCase();
    
    const matches = productos.filter(producto => {
        const searchText = (
            producto.nombre + ' ' + 
            producto.descripcion + ' ' + 
            producto.categoria
        ).toLowerCase();
        
        return searchText.includes(lowercaseQuery);
    });
    
    return matches;
}
```

### 3. Funciones de Utilidad

```javascript
function formatPrice(price) {
    // OBJETIVO: Formatear precio en pesos chilenos
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
    }).format(price);
}

function debounce(func, wait) {
    // OBJETIVO: Evitar que una función se ejecute demasiado seguido
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// USAR debounce para búsqueda
const debouncedSearch = debounce(searchProducts, 300);
searchInput.addEventListener('input', (e) => {
    debouncedSearch(e.target.value);
});
```

---

## 🔄 FLUJO DE DATOS {#flujo-datos}

### 1. Carga Inicial de la Página

```
1. HTML se carga
   ├─ Navegador lee <script> tags
   ├─ JavaScript se ejecuta
   └─ DOMContentLoaded se dispara

2. JavaScript inicializa
   ├─ Importa datos de productos
   ├─ Configura event listeners
   ├─ Carga carrito desde localStorage
   └─ Renderiza contenido inicial

3. Usuario ve página completa
```

### 2. Interacción del Usuario

```
Usuario escribe en búsqueda
   ↓
addEventListener('input') se activa
   ↓
searchProducts() filtra array de productos
   ↓
showSuggestions() crea HTML
   ↓
DOM se actualiza
   ↓
Usuario ve resultados
```

### 3. Gestión del Carrito

```
Usuario click "Agregar al carrito"
   ↓
addToCart() se ejecuta
   ↓
├─ Busca producto en array
├─ Actualiza array del carrito
├─ Guarda en localStorage
└─ Dispara evento 'cartUpdated'
   ↓
Otros componentes escuchan evento
   ↓
├─ Badge del carrito se actualiza
├─ Página del carrito se refresca
└─ Usuario ve cambios
```

---

## 🎯 PATRONES DE CÓDIGO {#patrones-codigo}

### 1. Módulos ES6

```javascript
// ARCHIVO: datos.js
export const productos = [...];    // Exportar datos
export function formatPrice() {}   // Exportar función

// ARCHIVO: carrito.js
import { productos } from './datos.js';  // Importar datos
import { formatPrice } from './datos.js'; // Importar función

// USAR en el código
const product = productos.find(p => p.codigo === 'FR001');
const formattedPrice = formatPrice(product.precio);
```

### 2. Event-Driven Architecture

```javascript
// DISPARAR eventos cuando algo cambia
function updateCart() {
    // ... actualizar carrito
    
    // Notificar a toda la aplicación
    document.dispatchEvent(new CustomEvent('cartUpdated', {
        detail: { cart, itemCount: cart.length }
    }));
}

// ESCUCHAR eventos en diferentes partes
document.addEventListener('cartUpdated', function(e) {
    updateCartBadge(e.detail.itemCount);
});

document.addEventListener('cartUpdated', function(e) {
    updateCartTotal(e.detail.cart);
});
```

### 3. Error Handling

```javascript
function safelyExecute(func, fallback) {
    try {
        return func();
    } catch (error) {
        console.error('Error ejecutando función:', error);
        return fallback ? fallback() : null;
    }
}

// USAR el patrón
const products = safelyExecute(
    () => JSON.parse(localStorage.getItem('products')),
    () => [] // Array vacío si falla
);
```

### 4. Function Composition

```javascript
// FUNCIONES pequeñas y específicas
const toLowerCase = str => str.toLowerCase();
const trim = str => str.trim();
const includes = (text, query) => text.includes(query);

// COMBINAR para crear funcionalidad compleja
function searchInText(text, query) {
    const normalizedText = toLowerCase(trim(text));
    const normalizedQuery = toLowerCase(trim(query));
    return includes(normalizedText, normalizedQuery);
}
```

---

## 📚 CONCEPTOS CLAVE PARA APRENDER {#conceptos-clave}

### 1. JavaScript Fundamentals

**Variables y Tipos de Datos**:
```javascript
// Primitivos
let nombre = 'Juan';        // String
let edad = 25;              // Number
let activo = true;          // Boolean
let indefinido = undefined; // Undefined
let nulo = null;           // Null

// Objetos
let producto = {           // Object
    nombre: 'Manzana',
    precio: 1200
};

let productos = [1, 2, 3]; // Array (tipo especial de objeto)
```

**Funciones**:
```javascript
// Declaración de función
function saludar(nombre) {
    return `Hola, ${nombre}`;
}

// Función flecha (ES6)
const saludar = (nombre) => `Hola, ${nombre}`;

// Función como variable
const miFuncion = function(x) {
    return x * 2;
};
```

### 2. Arrays y Métodos

```javascript
const numeros = [1, 2, 3, 4, 5];

// FILTER: Crear nuevo array con elementos que cumplen condición
const pares = numeros.filter(n => n % 2 === 0); // [2, 4]

// MAP: Transformar cada elemento
const dobles = numeros.map(n => n * 2); // [2, 4, 6, 8, 10]

// FIND: Encontrar primer elemento que cumple condición
const tres = numeros.find(n => n === 3); // 3

// FOREACH: Ejecutar función para cada elemento
numeros.forEach(n => console.log(n));

// REDUCE: Combinar todos los elementos en uno
const suma = numeros.reduce((total, n) => total + n, 0); // 15
```

### 3. Objetos y Propiedades

```javascript
const producto = {
    nombre: 'Manzana',
    precio: 1200,
    categoria: 'frutas'
};

// Acceder a propiedades
console.log(producto.nombre);        // 'Manzana'
console.log(producto['precio']);     // 1200

// Agregar propiedades
producto.stock = 50;

// Destructuring (ES6)
const { nombre, precio } = producto;
console.log(nombre); // 'Manzana'

// Spread operator
const nuevoProducto = {
    ...producto,      // Copiar todas las propiedades
    descuento: 10     // Agregar nueva propiedad
};
```

### 4. Promises y Async/Await

```javascript
// Promise básico
function cargarDatos() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(['producto1', 'producto2']);
        }, 1000);
    });
}

// Usar con .then()
cargarDatos()
    .then(datos => console.log(datos))
    .catch(error => console.error(error));

// Usar con async/await (más limpio)
async function mostrarDatos() {
    try {
        const datos = await cargarDatos();
        console.log(datos);
    } catch (error) {
        console.error(error);
    }
}
```

### 5. Event Loop y Asincronía

```javascript
console.log('1'); // Se ejecuta inmediatamente

setTimeout(() => {
    console.log('2'); // Se ejecuta después de 0ms (pero asíncrono)
}, 0);

Promise.resolve().then(() => {
    console.log('3'); // Promises tienen prioridad sobre setTimeout
});

console.log('4'); // Se ejecuta inmediatamente

// Orden de ejecución: 1, 4, 3, 2
```

### 6. Manipulación del DOM

```javascript
// Encontrar elementos
const elemento = document.getElementById('mi-id');
const elementos = document.querySelectorAll('.mi-clase');

// Crear elementos
const nuevoDiv = document.createElement('div');
nuevoDiv.textContent = 'Hola mundo';
nuevoDiv.className = 'mi-clase';

// Agregar al DOM
document.body.appendChild(nuevoDiv);

// Event listeners
elemento.addEventListener('click', function(e) {
    e.preventDefault(); // Evitar comportamiento por defecto
    console.log('Elemento clickeado');
});
```

### 7. LocalStorage

```javascript
// Guardar datos
localStorage.setItem('usuario', 'Juan');
localStorage.setItem('carrito', JSON.stringify([1, 2, 3]));

// Recuperar datos
const usuario = localStorage.getItem('usuario');
const carrito = JSON.parse(localStorage.getItem('carrito'));

// Eliminar datos
localStorage.removeItem('usuario');
localStorage.clear(); // Eliminar todo
```

### 8. Consejos para Debuggear

```javascript
// Console.log para seguir flujo
function miFuncion(parametro) {
    console.log('Entrada:', parametro);
    
    const resultado = parametro * 2;
    console.log('Resultado:', resultado);
    
    return resultado;
}

// Debugger para pausar ejecución
function miFuncion(parametro) {
    debugger; // Pausa aquí cuando DevTools está abierto
    return parametro * 2;
}

// Try-catch para errores
try {
    const datos = JSON.parse(textoInvalido);
} catch (error) {
    console.error('Error parseando JSON:', error);
}
```

---

## 🚀 SIGUIENTE PASOS PARA ESTUDIAR

### 1. Practicar Estos Conceptos
1. **Arrays**: Crear, filtrar, mapear, buscar
2. **Objetos**: Crear, acceder, modificar propiedades
3. **DOM**: Seleccionar, modificar, crear elementos
4. **Eventos**: Click, input, submit, custom events
5. **LocalStorage**: Guardar, recuperar, modificar datos

### 2. Herramientas de Desarrollo
- **DevTools del navegador**: Console, Network, Elements
- **Breakpoints**: Para debuggear código paso a paso
- **Console.log**: Para seguir el flujo del programa

### 3. Conceptos Avanzados
- **Módulos ES6**: Import/export entre archivos
- **Fetch API**: Para llamadas a servidores
- **Async/Await**: Manejo de operaciones asíncronas
- **Error Handling**: Try/catch y manejo de errores

### 4. Patrones de Diseño
- **MVC**: Model-View-Controller
- **Observer**: Para comunicación entre componentes
- **Module Pattern**: Organización de código

---

Esta documentación cubre todos los aspectos principales del proyecto. ¿Te gustaría que profundice en algún concepto específico o que explique alguna parte con más detalle?