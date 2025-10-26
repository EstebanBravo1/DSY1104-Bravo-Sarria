# 📚 Documentación Completa - Huerto Hogar

## 🚀 Descripción General del Proyecto

**Huerto Hogar** es una aplicación web de e-commerce desarrollada en React.js que permite a los usuarios navegar, filtrar y comprar productos orgánicos y saludables. El proyecto incluye un sistema de autenticación completo, carrito de compras, proceso de checkout integrado con Transbank, y un diseño completamente responsive.

---

## 🏗️ Arquitectura del Proyecto

```
DSY1104-Bravo-Sarria/
├── public/                     # Archivos estáticos
│   └── assets/                 # Imágenes y recursos públicos
├── src/
│   ├── components/             # Componentes reutilizables
│   │   ├── checkout/          # Componentes del proceso de pago
│   │   ├── Header.jsx         # Navegación principal
│   │   ├── Footer.jsx         # Pie de página
│   │   └── SearchBar.jsx      # Barra de búsqueda
│   ├── context/               # Contextos de React (Estado global)
│   │   ├── AuthContext.jsx    # Autenticación de usuarios
│   │   └── CartContext.jsx    # Carrito de compras
│   ├── data/                  # Datos y configuraciones
│   │   ├── product.js         # Base de datos de productos
│   │   └── usuarios.js        # Base de datos de usuarios
│   ├── hooks/                 # Custom hooks
│   │   ├── useCart.js         # Hook para manejo del carrito
│   │   └── useRelatedCart.js  # Hook para productos relacionados
│   ├── loaders/               # Cargadores de datos para React Router
│   ├── pages/                 # Páginas principales
│   │   ├── auth/              # Páginas de autenticación
│   │   ├── Home/              # Página principal
│   │   ├── productos/         # Páginas de productos
│   │   ├── carrito/           # Página del carrito
│   │   └── contacto/          # Página de contacto
│   ├── services/              # Servicios externos
│   │   └── transbank.js       # Integración con Transbank
│   ├── test/                  # Tests unitarios
│   ├── main.jsx               # Punto de entrada de la aplicación
│   ├── routes.jsx             # Configuración de rutas
│   └── styles.css             # Estilos globales
├── package.json               # Dependencias y scripts
├── vite.config.js            # Configuración de Vite
└── README.md                 # Documentación básica
```

---

## 🔧 Tecnologías Utilizadas

### **Frontend**
- **React.js 19.1.1**: Framework principal
- **React Router DOM**: Navegación y rutas
- **React Bootstrap**: Componentes UI responsivos
- **Vite**: Build tool y servidor de desarrollo

### **Estilos**
- **CSS3**: Estilos personalizados
- **Bootstrap**: Framework CSS
- **Responsive Design**: Mobile-first approach

### **Estado y Datos**
- **React Context API**: Manejo de estado global
- **localStorage**: Persistencia de datos
- **JSON**: Base de datos simulada

### **Testing**
- **Jasmine**: Framework de testing
- **Karma**: Test runner

---

## 📁 Análisis Detallado por Archivo

### 🔐 **1. Sistema de Autenticación**

#### `src/context/AuthContext.jsx`
```javascript
// Contexto principal de autenticación
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Funciones principales:
    // - login(): Valida credenciales y autentica usuario
    // - logout(): Cierra sesión y limpia datos
    // - getDatosCheckout(): Retorna datos para autocompletado
    // - Persistencia con localStorage
};
```

**Funcionalidades:**
- ✅ Autenticación de usuarios con validación
- ✅ Persistencia de sesión en localStorage
- ✅ Autocompletado de datos en checkout
- ✅ Estado global accesible en toda la app

#### `src/data/usuarios.js`
```javascript
// Base de datos de usuarios predefinidos
export const usuarios = [
    {
        email: "juan.perez@email.com",
        password: "123456",
        nombre: "Juan",
        apellido: "Pérez",
        telefono: "+56 9 1234 5678",
        direccion: {
            calle: "Av. Libertador Bernardo O'Higgins",
            numero: "1234",
            comuna: "Santiago Centro",
            ciudad: "Santiago",
            codigoPostal: "8320000"
        }
    },
    // ... 4 usuarios más
];

// Funciones de validación:
// - validarCredenciales(): Verifica email y contraseña
// - buscarUsuarioPorEmail(): Encuentra usuario específico
```

**Características:**
- 🎯 5 usuarios de prueba con datos completos
- 📍 Direcciones reales para testing
- 🔒 Validación de credenciales
- 🚀 Integración directa con checkout

#### `src/pages/auth/Login.jsx`
```javascript
// Página de inicio de sesión
const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Valida credenciales usando AuthContext
        // Redirige en caso de éxito
        // Muestra errores en caso de fallo
    };
};
```

**Funcionalidades:**
- 📝 Formulario con validación
- 🔄 Integración con AuthContext
- 🚨 Manejo de errores
- 🔀 Redirección automática

---

### 🛒 **2. Sistema de Carrito**

#### `src/context/CartContext.jsx`
```javascript
// Contexto del carrito de compras
const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Funciones principales:
    // - addToCart(): Agrega productos al carrito
    // - removeFromCart(): Elimina productos
    // - updateQuantity(): Actualiza cantidades
    // - clearCart(): Vacía el carrito
    // - getCartTotal(): Calcula total
    // - getCartCount(): Cuenta productos
};
```

**Características:**
- ➕ Agregar/eliminar productos
- 📊 Cálculo automático de totales
- 💾 Persistencia en localStorage
- 🔢 Manejo de cantidades

#### `src/hooks/useCart.js`
```javascript
// Custom hook para operaciones del carrito
export const useCart = () => {
    const context = useContext(CartContext);
    
    if (!context) {
        throw new Error('useCart debe usarse dentro de CartProvider');
    }
    
    return context;
};
```

**Propósito:**
- 🔧 Abstrae la lógica del carrito
- ✅ Validación de contexto
- 🎯 Interfaz simple para componentes

---

### 🛍️ **3. Sistema de Productos**

#### `src/data/product.js`
```javascript
// Base de datos de productos
export const products = [
    {
        codigo: "FR001",
        nombre: "Manzanas Fuji Premium",
        categoria: "FR", // FR: Frutas, VR: Verduras, etc.
        precio: 2990,
        stock: 50,
        descripcion: "Manzanas Fuji de primera calidad...",
        origen: "Valle del Aconcagua, Chile",
        imagen: "imagenes/Manzana-Fuji-granel.png",
        destacado: true
    },
    // ... más productos
];
```

**Estructura de datos:**
- 🏷️ Código único por producto
- 📂 Categorización por tipo
- 💰 Precios en pesos chilenos
- 📦 Control de stock
- 🖼️ Imágenes asociadas

#### `src/pages/productos/Productos.jsx`
```javascript
// Página principal de productos
const Productos = () => {
    const { productos } = useLoaderData(); // Datos cargados por React Router
    const { addToCart } = useCart();
    const [filtroActivo, setFiltroActivo] = useState('all');

    // Lógica de filtrado
    const productosFiltrados = filtroActivo === 'all'
        ? productos
        : productos.filter(p => p.categoria === filtroActivo);

    return (
        <Container>
            {/* Filtros responsive con React Bootstrap */}
            {/* Grid de productos con Cards */}
        </Container>
    );
};
```

**Funcionalidades:**
- 🔍 Filtrado por categorías
- 📱 Diseño responsive con Bootstrap
- 🃏 Cards de producto con hover effects
- ➕ Integración con carrito

#### `src/pages/productos/Productos.css`
```css
/* Estilos principales para productos */

/* Grid responsive */
.products__content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    justify-content: center;
    place-items: center;
}

/* Cards de producto */
.product-card {
    max-width: 320px;
    margin: 0 auto;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* Filtros responsivos */
.filters-responsive {
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Media queries para diferentes pantallas */
@media screen and (min-width: 1024px) {
    .product-card { max-width: 350px; }
}

@media screen and (min-width: 1440px) {
    .product-card { max-width: 380px; }
}
```

**Características CSS:**
- 📐 Grid responsive con auto-fit
- 🎨 Hover effects en cards
- 📱 Mobile-first design
- 🔧 Flexbox para centrado perfecto

---

### 💳 **4. Sistema de Checkout**

#### `src/components/checkout/CheckoutForm.jsx`
```javascript
// Formulario principal de checkout
const CheckoutForm = () => {
    const { user, getDatosCheckout } = useAuth();
    const { cart, getCartTotal, clearCart } = useCart();
    const [formData, setFormData] = useState({
        // Datos del cliente
        // Datos de envío
        // Método de pago
    });

    // Autocompletado si usuario autenticado
    useEffect(() => {
        if (user) {
            const datosUsuario = getDatosCheckout();
            setFormData(prev => ({ ...prev, ...datosUsuario }));
        }
    }, [user]);

    const handleSubmit = async (e) => {
        // Validación de formulario
        // Integración con Transbank
        // Redirección a página de éxito
    };
};
```

**Funcionalidades:**
- 🔄 Autocompletado para usuarios autenticados
- ✅ Validación completa del formulario
- 💳 Integración con Transbank
- 🚀 Experiencia de usuario optimizada

#### `src/services/transbank.js`
```javascript
// Simulación de integración con Transbank
export const procesarPagoTransbank = async (datosCompra) => {
    // Simula validación de tarjeta
    // Genera número de transacción
    // Retorna resultado del pago
    
    return {
        exito: true,
        numeroTransaccion: generateTransactionId(),
        codigoAutorizacion: generateAuthCode(),
        fechaTransaccion: new Date().toISOString()
    };
};
```

**Características:**
- 🔐 Simulación realista de pago
- 📊 Generación de datos de transacción
- ✅ Manejo de respuestas exitosas/fallidas

---

### 🧭 **5. Sistema de Navegación**

#### `src/routes.jsx`
```javascript
// Configuración de rutas con React Router
export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "productos",
                element: <Productos />,
                loader: productosLoader, // Carga datos antes de renderizar
            },
            {
                path: "productos/:codigo",
                element: <DetalleProducto />,
                loader: detalleProductoLoader,
            },
            // ... más rutas
        ],
    },
]);
```

**Características:**
- 🔄 Lazy loading de datos
- 🚨 Manejo de errores
- 📱 Rutas anidadas
- ⚡ Optimización de carga

#### `src/components/Header.jsx`
```javascript
// Navegación principal responsive
const Header = () => {
    const { user, logout } = useAuth();
    const { getCartCount } = useCart();
    const [expanded, setExpanded] = useState(false);

    const closeNavbar = () => setExpanded(false);

    return (
        <Navbar expand="lg" expanded={expanded} onToggle={setExpanded}>
            {/* Logo y marca */}
            {/* Toggle para móvil */}
            {/* Menú de navegación */}
            {/* Carrito e información de usuario */}
        </Navbar>
    );
};
```

**Funcionalidades:**
- 📱 Menu hamburguesa controlado
- 🛒 Contador de carrito en tiempo real
- 👤 Estado de autenticación
- 🔄 Navegación responsive

---

### 🎨 **6. Sistema de Estilos**

#### `src/styles.css`
```css
/* Estilos globales del proyecto */

/* Variables CSS personalizadas */
:root {
    --first-color: hsl(120, 60%, 40%);
    --first-color-alt: hsl(120, 60%, 35%);
    --white-color: #fff;
    --title-color: hsl(0, 0%, 15%);
    --text-color: hsl(0, 0%, 35%);
    --home-color1: #28a745;
    --home-color2: #20c997;
}

/* Tipografía */
--h1-font-size: 2.5rem;
--h2-font-size: 2rem;
--normal-font-size: 1rem;
--small-font-size: 0.875rem;

/* Utilidades de layout */
.container { max-width: 1120px; margin: 0 auto; }
.grid { display: grid; }
.section { padding: 4rem 0; }
```

**Organización:**
- 🎨 Sistema de colores coherente
- 📏 Tipografía escalable
- 📐 Layout utilities
- 🔧 Variables CSS reutilizables

---

### 🧪 **7. Sistema de Testing**

#### `src/test/proyecto.test.js`
```javascript
// Tests unitarios del proyecto
describe('Sistema de Autenticación', () => {
    it('debería validar credenciales correctas', () => {
        const resultado = validarCredenciales('juan.perez@email.com', '123456');
        expect(resultado.valido).toBe(true);
    });

    it('debería rechazar credenciales incorrectas', () => {
        const resultado = validarCredenciales('email@falso.com', 'wrongpass');
        expect(resultado.valido).toBe(false);
    });
});

describe('Sistema de Carrito', () => {
    // Tests para operaciones del carrito
});
```

**Cobertura:**
- ✅ Autenticación de usuarios
- ✅ Operaciones del carrito
- ✅ Validación de formularios
- ✅ Cálculos de precios

---

## 🚀 **Flujo de la Aplicación**

### **1. Inicio de la App**
```
main.jsx → routes.jsx → Root → Header/Footer/Pages
```

### **2. Autenticación**
```
Login.jsx → AuthContext → validarCredenciales() → localStorage → Redirección
```

### **3. Navegación de Productos**
```
Productos.jsx → productosLoader → Filtros → Cards → DetalleProducto
```

### **4. Carrito**
```
addToCart() → CartContext → localStorage → Carrito.jsx → Checkout
```

### **5. Proceso de Pago**
```
CheckoutForm → Autocompletado → Validación → Transbank → Éxito
```

---

## ⚙️ **Comandos de Desarrollo**

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Ejecutar tests
npm test

# Preview de producción
npm run preview
```

---

## 🔧 **Configuración del Proyecto**

### **package.json - Dependencias principales**
```json
{
  "dependencies": {
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "react-router-dom": "^7.1.1",
    "react-bootstrap": "^2.10.6",
    "bootstrap": "^5.3.3"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "vite": "^6.0.3"
  }
}
```

### **vite.config.js - Configuración de build**
```javascript
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react', 'react-dom']
  }
});
```

---

## 📱 **Responsive Design**

### **Breakpoints utilizados:**
- 📱 **Móvil**: < 480px
- 📲 **Tablet**: 481px - 768px  
- 💻 **Desktop**: 769px - 1024px
- 🖥️ **Large**: 1025px - 1200px
- 🖥️ **XL**: > 1200px
- 🖥️ **XXL**: > 1440px

### **Estrategia Mobile-First:**
```css
/* Base styles (mobile) */
.product-card { max-width: 320px; }

/* Tablet */
@media (min-width: 768px) {
    .product-card { max-width: 300px; }
}

/* Desktop */
@media (min-width: 1024px) {
    .product-card { max-width: 350px; }
}

/* Large screens */
@media (min-width: 1440px) {
    .product-card { max-width: 380px; }
}
```

---

## 🔐 **Seguridad y Mejores Prácticas**

### **Autenticación:**
- ✅ Validación en frontend y simulación de backend
- ✅ Sanitización de inputs
- ✅ Manejo seguro de localStorage
- ✅ Timeouts de sesión

### **Performance:**
- ✅ Lazy loading de componentes
- ✅ Optimización de imágenes
- ✅ Memoización de cálculos
- ✅ Code splitting automático

### **Accesibilidad:**
- ✅ Semantic HTML
- ✅ ARIA labels
- ✅ Keyboard navigation
- ✅ Alt texts en imágenes

---

## 🐛 **Debugging y Logs**

### **Errores comunes y soluciones:**

1. **Error de contexto no encontrado:**
```javascript
// Asegurar que el componente esté envuelto en el Provider
if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
}
```

2. **Problema de persistencia:**
```javascript
// Verificar localStorage
try {
    const userData = JSON.parse(localStorage.getItem('user'));
} catch (error) {
    console.error('Error parsing user data:', error);
}
```

3. **Rutas no encontradas:**
```javascript
// Verificar configuración en routes.jsx
{
    path: "*",
    element: <ErrorPage />
}
```

---

## 🚀 **Optimizaciones Implementadas**

### **Performance:**
- ⚡ Vite para build ultra-rápido
- 📦 Code splitting automático
- 🔄 Lazy loading de rutas
- 💾 Caché de imágenes

### **UX/UI:**
- 🎨 Transiciones suaves
- 📱 Responsive perfecto
- 🔄 Loading states
- ✅ Feedback inmediato

### **SEO:**
- 📝 Meta tags optimizados
- 🏷️ Semantic HTML
- 🖼️ Alt texts descriptivos
- 📊 Structured data ready

---

## 📈 **Métricas y Analytics Ready**

El proyecto está preparado para integrar:
- 📊 Google Analytics
- 🔥 Firebase Analytics  
- 📱 User behavior tracking
- 🛒 E-commerce events

---

## 🔮 **Futuras Mejoras Sugeridas**

### **Backend Real:**
- 🗄️ Base de datos PostgreSQL/MongoDB
- 🔐 JWT Authentication
- 📧 Sistema de emails
- 💳 Transbank real

### **Funcionalidades:**
- 🔍 Búsqueda avanzada
- ⭐ Sistema de reviews
- 📦 Tracking de pedidos
- 🎁 Sistema de cupones

### **Performance:**
- 🖼️ Lazy loading de imágenes
- 📱 PWA capabilities
- 🔄 Offline support
- 📊 Analytics integrados

---

¡Esta documentación cubre todo el funcionamiento del proyecto Huerto Hogar! 🌱🏠✨