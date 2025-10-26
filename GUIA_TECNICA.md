# 🔧 Guía Técnica y Troubleshooting - Huerto Hogar

## 🚀 Guía de Instalación y Configuración

### **Prerrequisitos**
```bash
# Verificar versiones requeridas
node --version    # >= 18.0.0
npm --version     # >= 8.0.0
git --version     # >= 2.0.0
```

### **Instalación Paso a Paso**
```bash
# 1. Clonar el repositorio
git clone https://github.com/EstebanBravo1/DSY1104-Bravo-Sarria.git
cd DSY1104-Bravo-Sarria

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno (opcional)
# Crear archivo .env.local
VITE_APP_NAME="Huerto Hogar"
VITE_API_URL="http://localhost:3000"

# 4. Ejecutar en modo desarrollo
npm run dev

# 5. Abrir en navegador
# http://localhost:5173
```

### **Scripts Disponibles**
```json
{
  "scripts": {
    "dev": "vite",              // Servidor de desarrollo
    "build": "vite build",      // Build para producción
    "preview": "vite preview",  // Preview del build
    "test": "karma start",      // Ejecutar tests
    "lint": "eslint src/",      // Linter de código
    "format": "prettier --write src/" // Formatear código
  }
}
```

---

## 📁 **Estructura de Datos Detallada**

### **1. Modelo de Usuario**
```javascript
// src/data/usuarios.js
const usuarioModel = {
  email: "string",              // Único, requerido
  password: "string",           // Mínimo 6 caracteres
  nombre: "string",            // Requerido
  apellido: "string",          // Requerido
  telefono: "string",          // Formato: +56 9 1234 5678
  direccion: {
    calle: "string",           // Requerido
    numero: "string",          // Requerido
    comuna: "string",          // Requerido
    ciudad: "string",          // Requerido
    codigoPostal: "string"     // Opcional
  },
  fechaRegistro: "ISO String", // Auto-generado
  activo: "boolean"            // Default: true
};

// Ejemplo de usuario completo
const usuarioEjemplo = {
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
  },
  fechaRegistro: "2024-01-15T10:30:00Z",
  activo: true
};
```

### **2. Modelo de Producto**
```javascript
// src/data/product.js
const productoModel = {
  codigo: "string",            // Único (FR001, VR002, etc.)
  nombre: "string",            // Requerido
  categoria: "string",         // FR, VR, PO, PL
  precio: "number",            // En pesos chilenos
  stock: "number",             // Cantidad disponible
  descripcion: "string",       // Texto descriptivo
  origen: "string",            // Lugar de origen
  imagen: "string",            // Ruta de la imagen
  destacado: "boolean",        // Para productos destacados
  fechaCreacion: "ISO String", // Auto-generado
  activo: "boolean"            // Default: true
};

// Categorías disponibles
const categorias = {
  "FR": "Frutas Frescas",
  "VR": "Verduras Orgánicas", 
  "PO": "Productos Orgánicos",
  "PL": "Lácteos"
};
```

### **3. Modelo de Carrito**
```javascript
// Estructura del carrito en localStorage
const carritoModel = [
  {
    codigo: "FR001",           // Referencia al producto
    nombre: "Manzanas Fuji",   // Nombre del producto
    precio: 2990,             // Precio unitario
    cantidad: 2,              // Cantidad seleccionada
    stock: 50,                // Stock disponible
    imagen: "path/image.png", // Imagen del producto
    subtotal: 5980,           // precio * cantidad
    fechaAgregado: "ISO String" // Timestamp
  }
];

// Funciones de cálculo
const calcularTotal = (carrito) => {
  return carrito.reduce((total, item) => total + item.subtotal, 0);
};

const contarProductos = (carrito) => {
  return carrito.reduce((count, item) => count + item.cantidad, 0);
};
```

### **4. Modelo de Transacción**
```javascript
// Resultado de procesarPagoTransbank
const transaccionModel = {
  exito: "boolean",              // Estado del pago
  numeroTransaccion: "string",   // ID único de transacción
  codigoAutorizacion: "string",  // Código de autorización
  fechaTransaccion: "ISO String", // Timestamp del pago
  monto: "number",               // Monto total
  metodoPago: "string",          // tarjeta, efectivo, etc.
  estado: "string",              // aprobado, rechazado, pendiente
  mensaje: "string"              // Mensaje descriptivo
};
```

---

## 🔄 **Flujos de Datos Avanzados**

### **1. Flujo de Autenticación Completo**
```javascript
// Login Flow - Paso a paso
const loginFlow = async (email, password) => {
  // 1. Validación inicial
  if (!email || !password) {
    return { success: false, message: "Campos requeridos" };
  }

  // 2. Buscar usuario en base de datos
  const usuario = usuarios.find(u => u.email === email);
  if (!usuario) {
    return { success: false, message: "Usuario no encontrado" };
  }

  // 3. Verificar contraseña
  if (usuario.password !== password) {
    return { success: false, message: "Contraseña incorrecta" };
  }

  // 4. Verificar que el usuario esté activo
  if (!usuario.activo) {
    return { success: false, message: "Cuenta desactivada" };
  }

  // 5. Crear sesión
  const sessionData = {
    user: { ...usuario, password: undefined }, // Sin contraseña
    timestamp: new Date().toISOString(),
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 horas
  };

  // 6. Guardar en localStorage
  localStorage.setItem('user', JSON.stringify(sessionData.user));
  localStorage.setItem('isAuthenticated', 'true');
  localStorage.setItem('sessionExpires', sessionData.expires.toISOString());

  return { success: true, user: sessionData.user };
};
```

### **2. Flujo de Carrito Avanzado**
```javascript
// Agregar producto con validaciones completas
const addToCartAdvanced = (producto, cantidad = 1) => {
  // 1. Validaciones iniciales
  if (!producto || !producto.codigo) {
    return { success: false, message: "Producto inválido" };
  }

  if (cantidad <= 0) {
    return { success: false, message: "Cantidad debe ser positiva" };
  }

  if (cantidad > producto.stock) {
    return { 
      success: false, 
      message: `Solo hay ${producto.stock} unidades disponibles` 
    };
  }

  // 2. Obtener carrito actual
  let carrito = [];
  try {
    const carritoGuardado = localStorage.getItem('cart');
    if (carritoGuardado) {
      carrito = JSON.parse(carritoGuardado);
    }
  } catch (error) {
    console.error('Error cargando carrito:', error);
    carrito = [];
  }

  // 3. Verificar si el producto ya existe
  const existingIndex = carrito.findIndex(item => item.codigo === producto.codigo);

  if (existingIndex >= 0) {
    // 3a. Producto existe - actualizar cantidad
    const nuevaCantidad = carrito[existingIndex].cantidad + cantidad;
    
    if (nuevaCantidad > producto.stock) {
      return { 
        success: false, 
        message: `Cantidad máxima: ${producto.stock}` 
      };
    }

    carrito[existingIndex].cantidad = nuevaCantidad;
    carrito[existingIndex].subtotal = nuevaCantidad * producto.precio;
    carrito[existingIndex].fechaActualizado = new Date().toISOString();
  } else {
    // 3b. Producto nuevo - agregar al carrito
    const nuevoItem = {
      codigo: producto.codigo,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: cantidad,
      stock: producto.stock,
      imagen: producto.imagen,
      subtotal: cantidad * producto.precio,
      fechaAgregado: new Date().toISOString()
    };
    carrito.push(nuevoItem);
  }

  // 4. Guardar carrito actualizado
  try {
    localStorage.setItem('cart', JSON.stringify(carrito));
    
    // 5. Disparar evento personalizado para actualizar UI
    window.dispatchEvent(new CustomEvent('cartUpdated', {
      detail: { carrito, action: 'add', producto }
    }));

    return { 
      success: true, 
      message: "Producto agregado al carrito",
      carrito 
    };
  } catch (error) {
    console.error('Error guardando carrito:', error);
    return { success: false, message: "Error guardando en carrito" };
  }
};
```

### **3. Flujo de Checkout Detallado**
```javascript
// Proceso de checkout completo
const checkoutFlow = async (datosFormulario) => {
  // 1. Validación de datos
  const validacion = validarDatosCheckout(datosFormulario);
  if (!validacion.valido) {
    return { success: false, errors: validacion.errores };
  }

  // 2. Verificar carrito
  const carrito = obtenerCarrito();
  if (!carrito || carrito.length === 0) {
    return { success: false, message: "Carrito vacío" };
  }

  // 3. Calcular totales
  const subtotal = carrito.reduce((sum, item) => sum + item.subtotal, 0);
  const descuento = calcularDescuento(subtotal);
  const envio = calcularEnvio(datosFormulario.direccion);
  const total = subtotal - descuento + envio;

  // 4. Crear orden
  const orden = {
    id: generarIdOrden(),
    cliente: {
      nombre: `${datosFormulario.nombre} ${datosFormulario.apellido}`,
      email: datosFormulario.email,
      telefono: datosFormulario.telefono
    },
    direccion: datosFormulario.direccion,
    productos: carrito,
    totales: { subtotal, descuento, envio, total },
    estado: 'pendiente',
    fechaCreacion: new Date().toISOString()
  };

  // 5. Procesar pago
  try {
    const resultadoPago = await procesarPagoTransbank({
      monto: total,
      tarjeta: datosFormulario.tarjeta,
      orden: orden.id
    });

    if (resultadoPago.exito) {
      // 5a. Pago exitoso
      orden.estado = 'pagado';
      orden.transaccion = resultadoPago;
      
      // Guardar orden
      guardarOrden(orden);
      
      // Limpiar carrito
      localStorage.removeItem('cart');
      
      // Enviar confirmación por email (simulado)
      enviarConfirmacionEmail(orden);
      
      return { 
        success: true, 
        orden, 
        transaccion: resultadoPago 
      };
    } else {
      // 5b. Pago fallido
      orden.estado = 'fallido';
      orden.errorPago = resultadoPago.mensaje;
      
      return { 
        success: false, 
        message: resultadoPago.mensaje,
        orden 
      };
    }
  } catch (error) {
    console.error('Error en checkout:', error);
    return { 
      success: false, 
      message: "Error procesando el pago" 
    };
  }
};
```

---

## 🔧 **Funciones Utilitarias**

### **1. Validadores**
```javascript
// src/utils/validators.js

// Validar email
export const validarEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Validar teléfono chileno
export const validarTelefono = (telefono) => {
  const regex = /^\+56\s?[2-9]\s?\d{4}\s?\d{4}$/;
  return regex.test(telefono);
};

// Validar RUT chileno
export const validarRut = (rut) => {
  const rutLimpio = rut.replace(/\./g, '').replace('-', '');
  const cuerpo = rutLimpio.slice(0, -1);
  const dv = rutLimpio.slice(-1);
  
  let suma = 0;
  let multiplicador = 2;
  
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i]) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }
  
  const dvCalculado = 11 - (suma % 11);
  const dvFinal = dvCalculado === 11 ? '0' : dvCalculado === 10 ? 'K' : dvCalculado.toString();
  
  return dv.toUpperCase() === dvFinal;
};

// Validar tarjeta de crédito (algoritmo de Luhn)
export const validarTarjeta = (numero) => {
  const numeroLimpio = numero.replace(/\s/g, '');
  
  if (!/^\d{16}$/.test(numeroLimpio)) {
    return false;
  }
  
  let suma = 0;
  let esSegundo = false;
  
  for (let i = numeroLimpio.length - 1; i >= 0; i--) {
    let digito = parseInt(numeroLimpio[i]);
    
    if (esSegundo) {
      digito *= 2;
      if (digito > 9) {
        digito = digito % 10 + 1;
      }
    }
    
    suma += digito;
    esSegundo = !esSegundo;
  }
  
  return suma % 10 === 0;
};
```

### **2. Formateadores**
```javascript
// src/utils/formatters.js

// Formatear precio en pesos chilenos
export const formatearPrecio = (precio) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0
  }).format(precio);
};

// Formatear número de tarjeta
export const formatearTarjeta = (numero) => {
  return numero.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
};

// Formatear teléfono
export const formatearTelefono = (telefono) => {
  const numeroLimpio = telefono.replace(/\D/g, '');
  
  if (numeroLimpio.length === 11 && numeroLimpio.startsWith('56')) {
    const codigo = numeroLimpio.slice(0, 2);
    const movil = numeroLimpio.slice(2, 3);
    const numero1 = numeroLimpio.slice(3, 7);
    const numero2 = numeroLimpio.slice(7, 11);
    return `+${codigo} ${movil} ${numero1} ${numero2}`;
  }
  
  return telefono;
};

// Formatear fecha
export const formatearFecha = (fecha) => {
  return new Intl.DateTimeFormat('es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(fecha));
};
```

### **3. Generadores**
```javascript
// src/utils/generators.js

// Generar ID único
export const generarId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Generar número de transacción
export const generarNumeroTransaccion = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `TBK${timestamp}${random}`;
};

// Generar código de autorización
export const generarCodigoAutorizacion = () => {
  const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numeros = '0123456789';
  let codigo = '';
  
  // 2 letras + 6 números
  for (let i = 0; i < 2; i++) {
    codigo += letras[Math.floor(Math.random() * letras.length)];
  }
  for (let i = 0; i < 6; i++) {
    codigo += numeros[Math.floor(Math.random() * numeros.length)];
  }
  
  return codigo;
};

// Generar token de sesión
export const generarTokenSesion = () => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};
```

---

## 🐛 **Troubleshooting Common Issues**

### **1. Problemas de Autenticación**

#### **Error: "Usuario no encontrado"**
```javascript
// Problema: Email no existe en la base de datos
// Solución: Verificar usuarios disponibles

// Debug: Mostrar usuarios disponibles
console.log('Usuarios disponibles:', usuarios.map(u => u.email));

// Fix: Usar uno de los emails de prueba
const emailsPrueba = [
  "juan.perez@email.com",
  "maria.gonzalez@email.com", 
  "carlos.rodriguez@email.com",
  "ana.martinez@email.com",
  "luis.fernandez@email.com"
];
```

#### **Error: "Sesión expirada"**
```javascript
// Problema: LocalStorage corrupto o expirado
// Solución: Limpiar y reiniciar sesión

const limpiarSesion = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('isAuthenticated');
  localStorage.removeItem('sessionExpires');
  window.location.reload();
};

// Verificar expiración de sesión
const verificarSesion = () => {
  const expires = localStorage.getItem('sessionExpires');
  if (expires && new Date() > new Date(expires)) {
    limpiarSesion();
    return false;
  }
  return true;
};
```

### **2. Problemas del Carrito**

#### **Error: "Carrito no se actualiza"**
```javascript
// Problema: LocalStorage no se sincroniza
// Solución: Forzar actualización

const forzarActualizacionCarrito = () => {
  // 1. Leer carrito actual
  let carrito = [];
  try {
    carrito = JSON.parse(localStorage.getItem('cart') || '[]');
  } catch (error) {
    console.error('Carrito corrupto, reiniciando:', error);
    carrito = [];
  }

  // 2. Validar estructura
  carrito = carrito.filter(item => 
    item.codigo && 
    item.nombre && 
    typeof item.precio === 'number' &&
    typeof item.cantidad === 'number'
  );

  // 3. Recalcular subtotales
  carrito = carrito.map(item => ({
    ...item,
    subtotal: item.precio * item.cantidad
  }));

  // 4. Guardar carrito limpio
  localStorage.setItem('cart', JSON.stringify(carrito));
  
  // 5. Disparar evento de actualización
  window.dispatchEvent(new CustomEvent('cartUpdated'));
};
```

#### **Error: "Stock insuficiente"**
```javascript
// Problema: Cantidad en carrito > stock disponible
// Solución: Validar y ajustar automáticamente

const validarStockCarrito = () => {
  const carrito = JSON.parse(localStorage.getItem('cart') || '[]');
  let hubosCambios = false;

  const carritoValidado = carrito.map(item => {
    // Buscar producto actual para verificar stock
    const producto = products.find(p => p.codigo === item.codigo);
    
    if (!producto) {
      // Producto no existe, remover del carrito
      hubosCambios = true;
      return null;
    }

    if (item.cantidad > producto.stock) {
      // Ajustar cantidad al stock disponible
      hubosCambios = true;
      return {
        ...item,
        cantidad: producto.stock,
        subtotal: producto.stock * item.precio
      };
    }

    return item;
  }).filter(Boolean);

  if (hubosCambios) {
    localStorage.setItem('cart', JSON.stringify(carritoValidado));
    alert('Algunas cantidades fueron ajustadas por disponibilidad de stock');
    window.location.reload();
  }
};
```

### **3. Problemas de Navegación**

#### **Error: "404 - Página no encontrada"**
```javascript
// Problema: Rutas no configuradas correctamente
// Solución: Verificar configuración de React Router

// En routes.jsx, asegurar que todas las rutas estén definidas:
const routesDebug = [
  { path: "/", component: "Home" },
  { path: "/productos", component: "Productos" },
  { path: "/productos/:codigo", component: "DetalleProducto" },
  { path: "/carrito", component: "Carrito" },
  { path: "/auth/login", component: "Login" },
  { path: "/auth/register", component: "Register" },
  { path: "/contacto", component: "Contacto" },
  { path: "*", component: "ErrorPage" } // Catch-all route
];

// Verificar si todas las rutas tienen sus componentes
routesDebug.forEach(route => {
  console.log(`Ruta ${route.path}: ${route.component}`);
});
```

#### **Error: "useContext debe ser usado dentro del Provider"**
```javascript
// Problema: Componente fuera del Provider
// Solución: Verificar estructura del App

// En main.jsx, estructura correcta:
<React.StrictMode>
  <AuthProvider>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </AuthProvider>
</React.StrictMode>

// Debug: Verificar providers
const debugContext = () => {
  console.log('AuthContext:', useContext(AuthContext));
  console.log('CartContext:', useContext(CartContext));
};
```

### **4. Problemas de Performance**

#### **Optimización de Re-renders**
```javascript
// Problema: Componentes se re-renderizan innecesariamente
// Solución: Usar React.memo y useMemo

import React, { memo, useMemo } from 'react';

// Memoizar componente de producto
const ProductCard = memo(({ producto, onAddToCart }) => {
  const precioFormateado = useMemo(() => 
    formatearPrecio(producto.precio), 
    [producto.precio]
  );

  return (
    <div className="product-card">
      <img src={producto.imagen} alt={producto.nombre} />
      <h3>{producto.nombre}</h3>
      <p>{precioFormateado}</p>
      <button onClick={() => onAddToCart(producto)}>
        Agregar al carrito
      </button>
    </div>
  );
});

// Memoizar cálculos costosos
const CarritoSummary = () => {
  const { cart } = useCart();
  
  const totales = useMemo(() => ({
    cantidad: cart.reduce((sum, item) => sum + item.cantidad, 0),
    precio: cart.reduce((sum, item) => sum + item.subtotal, 0)
  }), [cart]);

  return (
    <div>
      <p>Productos: {totales.cantidad}</p>
      <p>Total: {formatearPrecio(totales.precio)}</p>
    </div>
  );
};
```

---

## 📊 **Métricas y Monitoring**

### **1. Performance Monitoring**
```javascript
// src/utils/performance.js

// Medir tiempo de carga de componentes
export const medirTiempoComponente = (nombreComponente) => {
  const inicio = performance.now();
  
  return () => {
    const fin = performance.now();
    console.log(`${nombreComponente} tardó ${fin - inicio} ms en renderizar`);
  };
};

// Uso en componente:
const Productos = () => {
  const medirTiempo = medirTiempoComponente('Productos');
  
  useEffect(() => {
    medirTiempo(); // Llamar cuando el componente esté listo
  }, []);
};

// Monitorear tamaño del bundle
export const analizarBundle = () => {
  if (typeof window !== 'undefined') {
    console.group('Bundle Analysis');
    console.log('React version:', React.version);
    console.log('Router version:', require('react-router-dom/package.json').version);
    console.log('Bootstrap version:', require('react-bootstrap/package.json').version);
    console.groupEnd();
  }
};
```

### **2. Error Tracking**
```javascript
// src/utils/errorTracking.js

// Error boundary personalizado
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error capturado por ErrorBoundary:', error, errorInfo);
    
    // Enviar error a servicio de tracking (simulado)
    this.reportError(error, errorInfo);
  }

  reportError = (error, errorInfo) => {
    const errorReport = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    // Simular envío a servicio de tracking
    console.log('Error report:', errorReport);
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>¡Algo salió mal!</h2>
          <p>Ha ocurrido un error inesperado.</p>
          <button onClick={() => window.location.reload()}>
            Recargar página
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

---

## 🔐 **Seguridad y Mejores Prácticas**

### **1. Sanitización de Datos**
```javascript
// src/utils/security.js

// Sanitizar input de usuario
export const sanitizarInput = (input) => {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/[<>]/g, '') // Remover < y >
    .replace(/javascript:/gi, '') // Remover javascript:
    .replace(/on\w+=/gi, '') // Remover event handlers
    .trim();
};

// Validar datos de entrada
export const validarEntrada = (data, schema) => {
  const errores = {};
  
  Object.keys(schema).forEach(key => {
    const valor = data[key];
    const reglas = schema[key];
    
    // Verificar si es requerido
    if (reglas.requerido && (!valor || valor.trim() === '')) {
      errores[key] = `${key} es requerido`;
      return;
    }
    
    // Verificar longitud mínima
    if (reglas.minLength && valor.length < reglas.minLength) {
      errores[key] = `${key} debe tener al menos ${reglas.minLength} caracteres`;
      return;
    }
    
    // Verificar patrón
    if (reglas.pattern && !reglas.pattern.test(valor)) {
      errores[key] = reglas.mensaje || `${key} tiene formato inválido`;
      return;
    }
  });
  
  return {
    valido: Object.keys(errores).length === 0,
    errores
  };
};

// Schema para validación de login
const loginSchema = {
  email: {
    requerido: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    mensaje: 'Email inválido'
  },
  password: {
    requerido: true,
    minLength: 6
  }
};
```

### **2. Protección de Rutas**
```javascript
// src/components/ProtectedRoute.jsx

const ProtectedRoute = ({ children, requireAuth = true }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="loading-spinner">Cargando...</div>;
  }

  if (requireAuth && !isAuthenticated) {
    // Redirigir a login con la página actual como referencia
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (!requireAuth && isAuthenticated) {
    // Redirigir a home si ya está autenticado (ej: página de login)
    return <Navigate to="/" replace />;
  }

  return children;
};

// Uso en routes.jsx
{
  path: "/carrito",
  element: (
    <ProtectedRoute requireAuth={true}>
      <Carrito />
    </ProtectedRoute>
  )
}
```

---

Esta guía técnica te ayudará a entender los aspectos más profundos del código y resolver problemas comunes. ¿Hay algún tema específico que te gustaría que profundice más?