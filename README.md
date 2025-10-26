# 🌱 Huerto Hogar - E-commerce de Productos Orgánicos

![Huerto Hogar](./public/assets/LogoHuertoHogar.png)

## 📋 Descripción del Proyecto

**Huerto Hogar** es una aplicación web de e-commerce desarrollada en React.js que permite a los usuarios navegar, filtrar y comprar productos orgánicos frescos. El proyecto incluye un sistema completo de autenticación, carrito de compras, proceso de checkout integrado con Transbank, y un diseño completamente responsive.

### 🎯 **Características Principales**

- ✅ **Sistema de Autenticación Completo** - Login/logout con 5 usuarios predefinidos
- 🛒 **Carrito de Compras Funcional** - Agregar, eliminar, actualizar cantidades
- 💳 **Proceso de Checkout** - Formulario completo con autocompletado
- 🔄 **Integración Transbank** - Simulación de pagos con tarjeta
- 📱 **Diseño Responsive** - Optimizado para móvil, tablet y desktop
- 🎨 **UI/UX Moderno** - Bootstrap + CSS personalizado
- 🔍 **Filtros de Productos** - Por categorías con diseño centrado
- 📊 **Gestión de Estado** - React Context API
- 🧪 **Testing Incluido** - Suite de tests unitarios

---

## 🚀 Instalación y Configuración

### **Prerrequisitos**
- Node.js >= 18.0.0
- npm >= 8.0.0
- Git

### **Instalación**
```bash
# Clonar el repositorio
git clone https://github.com/EstebanBravo1/DSY1104-Bravo-Sarria.git
cd DSY1104-Bravo-Sarria

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Abrir en navegador
# http://localhost:5173
```

### **Scripts Disponibles**
```bash
npm run dev       # Servidor de desarrollo
npm run build     # Build para producción
npm run preview   # Preview del build
npm test         # Ejecutar tests
```

---

## 🏗️ Arquitectura del Proyecto

```
src/
├── components/           # Componentes reutilizables
│   ├── checkout/        # Componentes del proceso de pago
│   ├── Header.jsx       # Navegación principal
│   └── Footer.jsx       # Pie de página
├── context/             # Contextos de React (Estado global)
│   ├── AuthContext.jsx  # Autenticación de usuarios
│   └── CartContext.jsx  # Carrito de compras
├── data/                # Datos y configuraciones
│   ├── product.js       # Base de datos de productos
│   └── usuarios.js      # Base de datos de usuarios
├── hooks/               # Custom hooks
├── pages/               # Páginas principales
│   ├── auth/            # Páginas de autenticación
│   ├── Home/            # Página principal
│   ├── productos/       # Páginas de productos
│   └── carrito/         # Página del carrito
├── services/            # Servicios externos
│   └── transbank.js     # Integración con Transbank
└── styles.css           # Estilos globales
```

---

## 🔐 Sistema de Autenticación

### **Usuarios de Prueba Disponibles**

| Email | Contraseña | Nombre |
|-------|------------|--------|
| `juan.perez@email.com` | `123456` | Juan Pérez |
| `maria.gonzalez@email.com` | `123456` | María González |
| `carlos.rodriguez@email.com` | `123456` | Carlos Rodríguez |
| `ana.martinez@email.com` | `123456` | Ana Martínez |
| `luis.fernandez@email.com` | `123456` | Luis Fernández |

### **Características del Sistema**
- ✅ Validación de credenciales
- ✅ Persistencia de sesión en localStorage
- ✅ Autocompletado de datos en checkout
- ✅ Protección de rutas
- ✅ Estado global de autenticación

---

## 🛒 Sistema de Carrito

### **Funcionalidades**
- ➕ **Agregar productos** - Con validación de stock
- 🔄 **Actualizar cantidades** - Incrementar/decrementar
- ❌ **Eliminar productos** - Individual o vaciar todo
- 💾 **Persistencia** - Datos guardados en localStorage
- 📊 **Cálculos automáticos** - Subtotales y total general
- 🔢 **Contador en header** - Actualización en tiempo real

### **Ejemplo de Uso**
```javascript
const { addToCart, removeFromCart, getCartTotal } = useCart();

// Agregar producto
addToCart(producto, cantidad);

// Obtener total
const total = getCartTotal();
```

---

## 💳 Sistema de Checkout

### **Proceso Completo**
1. **Validación de carrito** - Verificar productos y stock
2. **Autocompletado** - Si el usuario está autenticado
3. **Formulario completo** - Datos personales, dirección, pago
4. **Validación** - Frontend con mensajes de error
5. **Procesamiento** - Integración con Transbank (simulado)
6. **Confirmación** - Página de éxito con detalles

### **Características**
- 🔄 Autocompletado para usuarios autenticados
- ✅ Validación completa del formulario
- 💳 Simulación de pago con tarjeta
- 📧 Generación de número de transacción
- 🧾 Página de confirmación detallada

---

## 📱 Diseño Responsive

### **Breakpoints**
- 📱 **Móvil**: < 480px
- 📲 **Tablet**: 481px - 768px
- 💻 **Desktop**: 769px - 1024px
- 🖥️ **Large**: 1025px - 1200px
- 🖥️ **XL**: > 1200px
- 🖥️ **XXL**: > 1440px

### **Características**
- 🎨 Mobile-first approach
- 🔧 Flexbox y CSS Grid
- 📐 Product cards responsive
- 🍔 Menu hamburguesa en móvil
- 🎯 Filtros adaptables por pantalla

---

## 🧪 Testing

### **Cobertura de Tests**
- ✅ **Autenticación** - Validación de credenciales
- ✅ **Carrito** - Operaciones CRUD
- ✅ **Productos** - Filtrado y búsqueda
- ✅ **Formularios** - Validación de datos
- ✅ **Cálculos** - Precios y totales

### **Ejecutar Tests**
```bash
npm test
```

### **Estructura de Tests**
```
src/test/
├── proyecto.test.js     # Tests principales
├── setup.js            # Configuración
└── mocks.js            # Datos de prueba
```

---

## 🎨 Tecnologías Utilizadas

### **Frontend**
- **React.js 19.1.1** - Framework principal
- **React Router DOM** - Navegación
- **React Bootstrap** - Componentes UI
- **Bootstrap 5.3.3** - Framework CSS

### **Build & Dev**
- **Vite** - Build tool y servidor de desarrollo
- **ESLint** - Linter de código
- **Prettier** - Formateo de código

### **Testing**
- **Jasmine** - Framework de testing
- **Karma** - Test runner

---

## 📊 Productos Disponibles

### **Categorías**
- 🍎 **Frutas Frescas (FR)** - Manzanas, naranjas, plátanos
- 🥬 **Verduras Orgánicas (VR)** - Lechugas, espinacas, zanahorias
- 🌾 **Productos Orgánicos (PO)** - Quinua, miel orgánica
- 🥛 **Lácteos (PL)** - Leche, yogur natural

### **Características de Productos**
- 📦 Control de stock en tiempo real
- 💰 Precios en pesos chilenos
- 🖼️ Imágenes de alta calidad
- 📍 Información de origen
- ⭐ Productos destacados

---

## 🔧 Configuración Avanzada

### **Variables de Entorno (Opcional)**
```bash
# .env.local
VITE_APP_NAME="Huerto Hogar"
VITE_API_URL="http://localhost:3000"
VITE_TRANSBANK_ENV="testing"
```

### **Personalización**
```css
/* src/styles.css - Variables personalizables */
:root {
  --first-color: hsl(120, 60%, 40%);
  --first-color-alt: hsl(120, 60%, 35%);
  --home-color1: #28a745;
  --home-color2: #20c997;
}
```

---

## 📚 Documentación Adicional

- 📖 **[Documentación Completa](./DOCUMENTACION_PROYECTO.md)** - Guía detallada del proyecto
- 💻 **[Código Detallado](./CODIGO_DETALLADO.md)** - Explicación línea por línea
- 🔧 **[Guía Técnica](./GUIA_TECNICA.md)** - Troubleshooting y optimización
- 👥 **[Usuarios de Prueba](./USUARIOS_PRUEBA.md)** - Credenciales para testing

---

## 🚀 Deploy y Producción

### **Build para Producción**
```bash
npm run build
```

### **Preview Local**
```bash
npm run preview
```

### **Optimizaciones Incluidas**
- ⚡ Code splitting automático
- 📦 Minificación de assets
- 🖼️ Optimización de imágenes
- 📱 PWA ready
- 🔍 SEO optimizado

---

## 🤝 Contribución

### **Flujo de Desarrollo**
1. Fork del repositorio
2. Crear rama feature: `git checkout -b feature/nueva-funcionalidad`
3. Commit cambios: `git commit -m 'Add nueva funcionalidad'`
4. Push a la rama: `git push origin feature/nueva-funcionalidad`
5. Crear Pull Request

### **Estándares de Código**
- 📝 ESLint para calidad de código
- 🎨 Prettier para formateo
- 🧪 Tests obligatorios para nuevas features
- 📖 Documentación actualizada

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

---

## 👥 Autores

- **Alvaro Sarria** - *Desarrollo Full-Stack* - [GitHub](https://github.com/tu-usuario)
- **Esteban Bravo** - *Colaborador* - [GitHub](https://github.com/EstebanBravo1)

---

## 🙏 Agradecimientos

- **DuocUC** - Institución educativa
- **React Team** - Por el excelente framework
- **Bootstrap Team** - Por los componentes UI
- **Vite Team** - Por la herramienta de build

---

## 📞 Soporte

¿Tienes preguntas o necesitas ayuda?

- 📧 **Email**: al.sarria@duocuc.cl
- 📋 **Issues**: [GitHub Issues](https://github.com/EstebanBravo1/DSY1104-Bravo-Sarria/issues)
- 📖 **Wiki**: [Documentación](./DOCUMENTACION_PROYECTO.md)

---

## 🏆 Estado del Proyecto

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![React](https://img.shields.io/badge/React-19.1.1-blue)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.3-purple)

**¡Proyecto completamente funcional y listo para producción!** 🚀

---

*Última actualización: Octubre 2025*
