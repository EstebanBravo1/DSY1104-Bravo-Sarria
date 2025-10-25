# 🔐 Sistema de Autenticación - Usuarios de Prueba

## Usuarios Disponibles para Testing

### 👤 Usuario Principal (Álvaro)
- **Email:** `alvaro.sarria@duocuc.cl`
- **Contraseña:** `123456`
- **Descripción:** Usuario principal del proyecto

### 👩‍💼 María González
- **Email:** `maria.gonzalez@email.com`
- **Contraseña:** `password123`
- **Descripción:** Usuario con dirección en Las Condes

### 👨‍💼 Carlos Rodríguez
- **Email:** `carlos.rodriguez@gmail.com`
- **Contraseña:** `mipassword`
- **Descripción:** Usuario con dirección en Ñuñoa

### 👩‍🎓 Ana Martínez
- **Email:** `ana.martinez@hotmail.com`
- **Contraseña:** `ana2024`
- **Descripción:** Usuario con dirección en Vitacura

### 🧪 Usuario de Prueba
- **Email:** `test@test.com`
- **Contraseña:** `test123`
- **Descripción:** Usuario genérico para testing

## ✨ Funcionalidades del Sistema

### 🚀 Características Principales
- ✅ **Autenticación completa** con usuarios predefinidos
- ✅ **Autocompletado automático** en el checkout cuando el usuario está logueado
- ✅ **Persistencia de sesión** usando localStorage
- ✅ **Header dinámico** que cambia según el estado de autenticación
- ✅ **Dropdown de usuario** con opciones de perfil y logout
- ✅ **Validación de credenciales** en tiempo real

### 🎯 Flujo de Usuario
1. **Login:** Usar cualquiera de los emails y contraseñas listadas arriba
2. **Navegación:** El header mostrará el nombre del usuario y opciones adicionales
3. **Checkout:** Al ir al carrito y proceder al pago, todos los campos se autocompletarán
4. **Logout:** Usar el dropdown del usuario para cerrar sesión

### 🛠️ Datos Autocompletados
Cuando un usuario inicia sesión, el formulario de checkout se completa automáticamente con:
- ✅ Nombre y apellidos
- ✅ RUT 
- ✅ Email
- ✅ Teléfono
- ✅ Dirección completa (calle, número, comuna, región)
- ✅ Código postal
- ✅ Indicaciones de entrega

## 🔧 Implementación Técnica

### Archivos Creados/Modificados:
- `src/data/usuarios.js` - Base de datos de usuarios
- `src/context/AuthContext.jsx` - Contexto de autenticación
- `src/pages/auth/Login.jsx` - Formulario de login actualizado
- `src/components/Header.jsx` - Header con autenticación
- `src/components/checkout/CheckoutForm.jsx` - Autocompletado de datos
- `src/main.jsx` - Wrapper con AuthProvider

### Mejoras Visuales:
- Badge de "Datos autocompletados" en el checkout
- Dropdown elegante para el usuario logueado
- Animaciones y transiciones suaves
- Diseño responsivo para móviles

## 🎉 ¡Listo para Usar!

El sistema está completamente funcional. Prueba logueándote con cualquiera de los usuarios listados arriba y observa cómo se autocompletan los datos en el checkout.