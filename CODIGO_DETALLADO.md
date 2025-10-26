# 🔄 Diagramas de Flujo y Ejemplos de Código - Huerto Hogar

## 📊 Diagramas de Flujo del Sistema

### 🔐 **Flujo de Autenticación**

```
┌─────────────────┐
│   Usuario       │
│ ingresa datos   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Login.jsx       │
│ handleSubmit()  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ AuthContext     │
│ login()         │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ usuarios.js     │
│validarCredencial│
└────────┬────────┘
         │
    ┌────▼────┐
    │ ¿Válido? │
    └────┬────┘
         │
    ┌────▼────┐         ┌──────────────┐
    │   SÍ    │         │      NO      │
    └────┬────┘         └──────┬───────┘
         │                     │
         ▼                     ▼
┌─────────────────┐    ┌─────────────────┐
│ setUser(data)   │    │ mostrarError()  │
│ setAuthenticated│    │ mantener login  │
│ localStorage    │    └─────────────────┘
│ redirect("/")   │
└─────────────────┘
```

### 🛒 **Flujo del Carrito**

```
┌─────────────────┐
│ Productos.jsx   │
│ Click "Agregar" │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ useCart()       │
│ addToCart()     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ CartContext     │
│ updateCart()    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ localStorage    │
│ save cart data  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Header.jsx      │
│ update counter  │
└─────────────────┘
```

### 💳 **Flujo de Checkout**

```
┌─────────────────┐
│ Carrito.jsx     │
│ Click "Pagar"   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ CheckoutForm    │
│ componentMount  │
└────────┬────────┘
         │
    ┌────▼────┐
    │¿Usuario │
    │logueado?│
    └────┬────┘
         │
    ┌────▼────┐         ┌──────────────┐
    │   SÍ    │         │      NO      │
    └────┬────┘         └──────┬───────┘
         │                     │
         ▼                     ▼
┌─────────────────┐    ┌─────────────────┐
│ getDatosCheckout│    │ formulario      │
│ autocompletado  │    │ manual          │
└────────┬────────┘    └──────┬──────────┘
         │                     │
         └──────────┬──────────┘
                    │
                    ▼
           ┌─────────────────┐
           │ handleSubmit()  │
           │ validation      │
           └────────┬────────┘
                    │
                    ▼
           ┌─────────────────┐
           │ transbank.js    │
           │ procesarPago()  │
           └────────┬────────┘
                    │
                    ▼
           ┌─────────────────┐
           │ CheckoutSuccess │
           │ clearCart()     │
           └─────────────────┘
```

---

## 💻 **Ejemplos de Código Detallados**

### 🔐 **1. Sistema de Autenticación Completo**

#### **AuthContext.jsx - Implementación completa**
```javascript
import React, { createContext, useContext, useState, useEffect } from 'react';
import { validarCredenciales, buscarUsuarioPorEmail } from '../data/usuarios';

// Crear el contexto
const AuthContext = createContext();

// Hook personalizado para usar el contexto
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
    // Estados del usuario
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Recuperar sesión al cargar la app
    useEffect(() => {
        const checkAuthStatus = () => {
            try {
                const savedUser = localStorage.getItem('user');
                const isAuth = localStorage.getItem('isAuthenticated');
                
                if (savedUser && isAuth === 'true') {
                    setUser(JSON.parse(savedUser));
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error('Error recuperando sesión:', error);
                // Limpiar datos corruptos
                localStorage.removeItem('user');
                localStorage.removeItem('isAuthenticated');
            } finally {
                setLoading(false);
            }
        };

        checkAuthStatus();
    }, []);

    // Función de login
    const login = async (email, password) => {
        try {
            // Validar credenciales
            const resultado = validarCredenciales(email, password);
            
            if (resultado.valido) {
                // Buscar datos completos del usuario
                const userData = buscarUsuarioPorEmail(email);
                
                if (userData) {
                    // Actualizar estado
                    setUser(userData);
                    setIsAuthenticated(true);
                    
                    // Persistir en localStorage
                    localStorage.setItem('user', JSON.stringify(userData));
                    localStorage.setItem('isAuthenticated', 'true');
                    
                    return { 
                        success: true, 
                        message: 'Login exitoso',
                        user: userData 
                    };
                }
            }
            
            return { 
                success: false, 
                message: resultado.mensaje || 'Credenciales inválidas' 
            };
            
        } catch (error) {
            console.error('Error en login:', error);
            return { 
                success: false, 
                message: 'Error interno del servidor' 
            };
        }
    };

    // Función de logout
    const logout = () => {
        try {
            // Limpiar estado
            setUser(null);
            setIsAuthenticated(false);
            
            // Limpiar localStorage
            localStorage.removeItem('user');
            localStorage.removeItem('isAuthenticated');
            
            // Opcional: Limpiar carrito
            localStorage.removeItem('cart');
            
            return { success: true, message: 'Sesión cerrada exitosamente' };
            
        } catch (error) {
            console.error('Error en logout:', error);
            return { success: false, message: 'Error cerrando sesión' };
        }
    };

    // Función para obtener datos de checkout
    const getDatosCheckout = () => {
        if (!user || !isAuthenticated) {
            return null;
        }

        return {
            nombre: user.nombre,
            apellido: user.apellido,
            email: user.email,
            telefono: user.telefono,
            calle: user.direccion.calle,
            numero: user.direccion.numero,
            comuna: user.direccion.comuna,
            ciudad: user.direccion.ciudad,
            codigoPostal: user.direccion.codigoPostal
        };
    };

    // Función para actualizar perfil de usuario
    const updateProfile = (newData) => {
        try {
            const updatedUser = { ...user, ...newData };
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
            
            return { success: true, message: 'Perfil actualizado' };
        } catch (error) {
            console.error('Error actualizando perfil:', error);
            return { success: false, message: 'Error actualizando perfil' };
        }
    };

    // Valor del contexto
    const value = {
        // Estados
        user,
        isAuthenticated,
        loading,
        
        // Funciones
        login,
        logout,
        getDatosCheckout,
        updateProfile
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
```

#### **Login.jsx - Componente de login**
```javascript
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './auth.css';

const Login = () => {
    // Estados del formulario
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // Hooks de navegación y autenticación
    const navigate = useNavigate();
    const location = useLocation();
    const { login, isAuthenticated } = useAuth();

    // Redireccionar si ya está autenticado
    useEffect(() => {
        if (isAuthenticated) {
            const from = location.state?.from?.pathname || '/';
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, navigate, location]);

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Limpiar error específico
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Validar formulario
    const validateForm = () => {
        const newErrors = {};

        // Validar email
        if (!formData.email) {
            newErrors.email = 'El email es requerido';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email inválido';
        }

        // Validar contraseña
        if (!formData.password) {
            newErrors.password = 'La contraseña es requerida';
        } else if (formData.password.length < 6) {
            newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Manejar envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validar formulario
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        
        try {
            // Intentar login
            const result = await login(formData.email, formData.password);
            
            if (result.success) {
                // Login exitoso - navegar
                const from = location.state?.from?.pathname || '/';
                navigate(from, { replace: true });
            } else {
                // Login fallido - mostrar error
                setErrors({
                    general: result.message
                });
            }
        } catch (error) {
            console.error('Error en login:', error);
            setErrors({
                general: 'Error inesperado. Intenta nuevamente.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h2>Iniciar Sesión</h2>
                    <p>Ingresa a tu cuenta de Huerto Hogar</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    {/* Error general */}
                    {errors.general && (
                        <div className="error-message general-error">
                            {errors.general}
                        </div>
                    )}

                    {/* Campo Email */}
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? 'error' : ''}
                            placeholder="tu@email.com"
                            disabled={loading}
                        />
                        {errors.email && (
                            <span className="error-message">{errors.email}</span>
                        )}
                    </div>

                    {/* Campo Contraseña */}
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={errors.password ? 'error' : ''}
                            placeholder="Tu contraseña"
                            disabled={loading}
                        />
                        {errors.password && (
                            <span className="error-message">{errors.password}</span>
                        )}
                    </div>

                    {/* Botón Submit */}
                    <button 
                        type="submit" 
                        className="auth-button primary"
                        disabled={loading}
                    >
                        {loading ? 'Ingresando...' : 'Iniciar Sesión'}
                    </button>

                    {/* Enlaces adicionales */}
                    <div className="auth-links">
                        <Link to="/auth/forgot-password">
                            ¿Olvidaste tu contraseña?
                        </Link>
                        <p>
                            ¿No tienes cuenta? 
                            <Link to="/auth/register"> Regístrate aquí</Link>
                        </p>
                    </div>
                </form>

                {/* Usuarios de prueba */}
                <div className="demo-users">
                    <h4>👥 Usuarios de Prueba</h4>
                    <div className="demo-user">
                        <strong>Email:</strong> juan.perez@email.com<br/>
                        <strong>Contraseña:</strong> 123456
                    </div>
                    <div className="demo-user">
                        <strong>Email:</strong> maria.gonzalez@email.com<br/>
                        <strong>Contraseña:</strong> 123456
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
```

---

### 🛒 **2. Sistema de Carrito Completo**

#### **CartContext.jsx - Contexto del carrito**
```javascript
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart debe ser usado dentro de CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    // Cargar carrito desde localStorage al iniciar
    useEffect(() => {
        try {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                setCart(JSON.parse(savedCart));
            }
        } catch (error) {
            console.error('Error cargando carrito:', error);
            localStorage.removeItem('cart');
        } finally {
            setLoading(false);
        }
    }, []);

    // Guardar carrito en localStorage cuando cambie
    useEffect(() => {
        if (!loading) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart, loading]);

    // Agregar producto al carrito
    const addToCart = (producto, cantidad = 1) => {
        try {
            setCart(prevCart => {
                // Verificar si el producto ya existe
                const existingIndex = prevCart.findIndex(
                    item => item.codigo === producto.codigo
                );

                if (existingIndex >= 0) {
                    // Producto existe - actualizar cantidad
                    const newCart = [...prevCart];
                    newCart[existingIndex].cantidad += cantidad;
                    
                    // Verificar stock
                    if (newCart[existingIndex].cantidad > producto.stock) {
                        newCart[existingIndex].cantidad = producto.stock;
                    }
                    
                    return newCart;
                } else {
                    // Producto nuevo - agregar al carrito
                    const newItem = {
                        ...producto,
                        cantidad: Math.min(cantidad, producto.stock)
                    };
                    return [...prevCart, newItem];
                }
            });

            return { success: true, message: 'Producto agregado al carrito' };
        } catch (error) {
            console.error('Error agregando al carrito:', error);
            return { success: false, message: 'Error agregando producto' };
        }
    };

    // Remover producto del carrito
    const removeFromCart = (codigo) => {
        try {
            setCart(prevCart => prevCart.filter(item => item.codigo !== codigo));
            return { success: true, message: 'Producto eliminado' };
        } catch (error) {
            console.error('Error removiendo del carrito:', error);
            return { success: false, message: 'Error eliminando producto' };
        }
    };

    // Actualizar cantidad de un producto
    const updateQuantity = (codigo, nuevaCantidad) => {
        try {
            if (nuevaCantidad <= 0) {
                return removeFromCart(codigo);
            }

            setCart(prevCart => {
                return prevCart.map(item => {
                    if (item.codigo === codigo) {
                        return {
                            ...item,
                            cantidad: Math.min(nuevaCantidad, item.stock)
                        };
                    }
                    return item;
                });
            });

            return { success: true, message: 'Cantidad actualizada' };
        } catch (error) {
            console.error('Error actualizando cantidad:', error);
            return { success: false, message: 'Error actualizando cantidad' };
        }
    };

    // Vaciar carrito
    const clearCart = () => {
        try {
            setCart([]);
            localStorage.removeItem('cart');
            return { success: true, message: 'Carrito vaciado' };
        } catch (error) {
            console.error('Error vaciando carrito:', error);
            return { success: false, message: 'Error vaciando carrito' };
        }
    };

    // Calcular total del carrito
    const getCartTotal = () => {
        return cart.reduce((total, item) => {
            return total + (item.precio * item.cantidad);
        }, 0);
    };

    // Obtener cantidad total de productos
    const getCartCount = () => {
        return cart.reduce((count, item) => count + item.cantidad, 0);
    };

    // Verificar si un producto está en el carrito
    const isInCart = (codigo) => {
        return cart.some(item => item.codigo === codigo);
    };

    // Obtener cantidad de un producto específico
    const getProductQuantity = (codigo) => {
        const item = cart.find(item => item.codigo === codigo);
        return item ? item.cantidad : 0;
    };

    const value = {
        // Estado
        cart,
        loading,
        
        // Funciones
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        
        // Utilidades
        getCartTotal,
        getCartCount,
        isInCart,
        getProductQuantity
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
```

#### **Carrito.jsx - Página del carrito**
```javascript
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { useCart } from '../../context/CartContext';
import CheckoutModal from '../../components/checkout/CheckoutModal';
import './Carrito.css';

const Carrito = () => {
    const { 
        cart, 
        removeFromCart, 
        updateQuantity, 
        clearCart, 
        getCartTotal,
        getCartCount 
    } = useCart();
    
    const [showCheckout, setShowCheckout] = useState(false);
    const [notification, setNotification] = useState(null);

    // Mostrar notificación temporal
    const showNotification = (message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    // Manejar cambio de cantidad
    const handleQuantityChange = (codigo, nuevaCantidad) => {
        const result = updateQuantity(codigo, parseInt(nuevaCantidad));
        if (result.success) {
            showNotification(result.message);
        }
    };

    // Manejar eliminación de producto
    const handleRemoveProduct = (codigo, nombre) => {
        const result = removeFromCart(codigo);
        if (result.success) {
            showNotification(`${nombre} eliminado del carrito`);
        }
    };

    // Manejar vaciado del carrito
    const handleClearCart = () => {
        if (window.confirm('¿Estás seguro de vaciar todo el carrito?')) {
            const result = clearCart();
            if (result.success) {
                showNotification('Carrito vaciado completamente');
            }
        }
    };

    // Formatear precio
    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP'
        }).format(price);
    };

    // Si el carrito está vacío
    if (cart.length === 0) {
        return (
            <Container className="carrito-vacio">
                <Row className="justify-content-center">
                    <Col md={6} className="text-center">
                        <div className="carrito-vacio-content">
                            <i className="ri-shopping-cart-line carrito-vacio-icon"></i>
                            <h2>Tu carrito está vacío</h2>
                            <p>¡Agrega algunos productos frescos para comenzar!</p>
                            <Link to="/productos">
                                <Button variant="primary" size="lg">
                                    Ver Productos
                                </Button>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }

    return (
        <Container className="carrito-page">
            {/* Notificación */}
            {notification && (
                <Alert 
                    variant={notification.type === 'success' ? 'success' : 'danger'}
                    className="notification"
                >
                    {notification.message}
                </Alert>
            )}

            <Row>
                <Col lg={8}>
                    {/* Header del carrito */}
                    <div className="carrito-header">
                        <h2>Tu Carrito ({getCartCount()} productos)</h2>
                        <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={handleClearCart}
                        >
                            Vaciar Carrito
                        </Button>
                    </div>

                    {/* Lista de productos */}
                    <div className="carrito-items">
                        {cart.map(item => (
                            <Card key={item.codigo} className="carrito-item">
                                <Row className="g-0 align-items-center">
                                    {/* Imagen del producto */}
                                    <Col md={3}>
                                        <img
                                            src={`/assets/${item.imagen.replace('imagenes/', '')}`}
                                            alt={item.nombre}
                                            className="carrito-item-img"
                                        />
                                    </Col>

                                    {/* Información del producto */}
                                    <Col md={4}>
                                        <div className="carrito-item-info">
                                            <h5>{item.nombre}</h5>
                                            <p className="text-muted">{item.descripcion}</p>
                                            <small className="text-muted">
                                                Origen: {item.origen}
                                            </small>
                                        </div>
                                    </Col>

                                    {/* Controles de cantidad */}
                                    <Col md={2}>
                                        <div className="quantity-controls">
                                            <Button
                                                variant="outline-secondary"
                                                size="sm"
                                                onClick={() => handleQuantityChange(
                                                    item.codigo, 
                                                    item.cantidad - 1
                                                )}
                                            >
                                                -
                                            </Button>
                                            <span className="quantity-display">
                                                {item.cantidad}
                                            </span>
                                            <Button
                                                variant="outline-secondary"
                                                size="sm"
                                                onClick={() => handleQuantityChange(
                                                    item.codigo, 
                                                    item.cantidad + 1
                                                )}
                                                disabled={item.cantidad >= item.stock}
                                            >
                                                +
                                            </Button>
                                        </div>
                                        <small className="text-muted">
                                            Stock: {item.stock}
                                        </small>
                                    </Col>

                                    {/* Precio */}
                                    <Col md={2}>
                                        <div className="carrito-item-price">
                                            <strong>
                                                {formatPrice(item.precio * item.cantidad)}
                                            </strong>
                                            <br />
                                            <small className="text-muted">
                                                {formatPrice(item.precio)} c/u
                                            </small>
                                        </div>
                                    </Col>

                                    {/* Botón eliminar */}
                                    <Col md={1}>
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={() => handleRemoveProduct(
                                                item.codigo, 
                                                item.nombre
                                            )}
                                            className="remove-button"
                                        >
                                            <i className="ri-delete-bin-line"></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </Card>
                        ))}
                    </div>
                </Col>

                {/* Resumen del carrito */}
                <Col lg={4}>
                    <Card className="carrito-summary sticky-top">
                        <Card.Header>
                            <h4>Resumen de la Compra</h4>
                        </Card.Header>
                        <Card.Body>
                            <div className="summary-line">
                                <span>Productos ({getCartCount()})</span>
                                <span>{formatPrice(getCartTotal())}</span>
                            </div>
                            <div className="summary-line">
                                <span>Envío</span>
                                <span className="text-success">Gratis</span>
                            </div>
                            <hr />
                            <div className="summary-total">
                                <strong>
                                    <span>Total</span>
                                    <span>{formatPrice(getCartTotal())}</span>
                                </strong>
                            </div>
                            
                            <Button
                                variant="primary"
                                size="lg"
                                className="w-100 mt-3"
                                onClick={() => setShowCheckout(true)}
                            >
                                Proceder al Pago
                            </Button>

                            <Link to="/productos">
                                <Button
                                    variant="outline-primary"
                                    className="w-100 mt-2"
                                >
                                    Seguir Comprando
                                </Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Modal de Checkout */}
            <CheckoutModal
                show={showCheckout}
                onHide={() => setShowCheckout(false)}
            />
        </Container>
    );
};

export default Carrito;
```

---

### 🔄 **3. Hooks Personalizados**

#### **useCart.js - Hook del carrito**
```javascript
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export const useCart = () => {
    const context = useContext(CartContext);
    
    if (!context) {
        throw new Error('useCart debe ser usado dentro de un CartProvider');
    }
    
    return context;
};

// Hook adicional para operaciones específicas del carrito
export const useCartOperations = () => {
    const { cart, addToCart, removeFromCart, updateQuantity } = useCart();
    
    // Incrementar cantidad
    const incrementQuantity = (codigo) => {
        const item = cart.find(item => item.codigo === codigo);
        if (item && item.cantidad < item.stock) {
            updateQuantity(codigo, item.cantidad + 1);
        }
    };
    
    // Decrementar cantidad
    const decrementQuantity = (codigo) => {
        const item = cart.find(item => item.codigo === codigo);
        if (item && item.cantidad > 1) {
            updateQuantity(codigo, item.cantidad - 1);
        } else if (item && item.cantidad === 1) {
            removeFromCart(codigo);
        }
    };
    
    // Agregar múltiples unidades
    const addMultiple = (producto, cantidad) => {
        const maxCantidad = Math.min(cantidad, producto.stock);
        return addToCart(producto, maxCantidad);
    };
    
    return {
        incrementQuantity,
        decrementQuantity,
        addMultiple
    };
};
```

#### **useAuth.js - Hook de autenticación**
```javascript
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => {
    const context = useContext(AuthContext);
    
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    
    return context;
};

// Hook para proteger rutas
export const useRequireAuth = () => {
    const { isAuthenticated, loading } = useAuth();
    
    return {
        isAuthenticated,
        loading,
        canAccess: isAuthenticated && !loading
    };
};

// Hook para datos de usuario
export const useUserData = () => {
    const { user, isAuthenticated, updateProfile } = useAuth();
    
    const getUserName = () => {
        if (!user) return 'Usuario';
        return `${user.nombre} ${user.apellido}`;
    };
    
    const getUserInitials = () => {
        if (!user) return 'U';
        return `${user.nombre[0]}${user.apellido[0]}`.toUpperCase();
    };
    
    return {
        user,
        isAuthenticated,
        getUserName,
        getUserInitials,
        updateProfile
    };
};
```

---

### 💳 **4. Sistema de Checkout Avanzado**

#### **CheckoutForm.jsx - Formulario completo**
```javascript
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Row, Col, Button, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { procesarPagoTransbank } from '../../services/transbank';

const CheckoutForm = ({ onSuccess, onError }) => {
    // Estados del formulario
    const [formData, setFormData] = useState({
        // Datos personales
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        
        // Dirección de envío
        calle: '',
        numero: '',
        comuna: '',
        ciudad: '',
        codigoPostal: '',
        
        // Método de pago
        metodoPago: 'tarjeta',
        numeroTarjeta: '',
        nombreTarjeta: '',
        expiracionMes: '',
        expiracionAno: '',
        cvv: '',
        
        // Opciones adicionales
        comentarios: ''
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [processingPayment, setProcessingPayment] = useState(false);

    // Hooks
    const { user, isAuthenticated, getDatosCheckout } = useAuth();
    const { cart, getCartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    // Autocompletar datos si el usuario está logueado
    useEffect(() => {
        if (isAuthenticated && user) {
            const datosUsuario = getDatosCheckout();
            if (datosUsuario) {
                setFormData(prev => ({
                    ...prev,
                    ...datosUsuario
                }));
            }
        }
    }, [isAuthenticated, user, getDatosCheckout]);

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // Formateo especial para algunos campos
        let formattedValue = value;
        
        if (name === 'numeroTarjeta') {
            // Formatear número de tarjeta: 1234 5678 9012 3456
            formattedValue = value.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
        } else if (name === 'telefono') {
            // Formatear teléfono: +56 9 1234 5678
            formattedValue = value.replace(/\D/g, '');
        } else if (name === 'cvv') {
            // Limitar CVV a 3-4 dígitos
            formattedValue = value.replace(/\D/g, '').slice(0, 4);
        }
        
        setFormData(prev => ({
            ...prev,
            [name]: formattedValue
        }));
        
        // Limpiar error específico
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Validar formulario
    const validateForm = () => {
        const newErrors = {};

        // Validar datos personales
        if (!formData.nombre.trim()) {
            newErrors.nombre = 'El nombre es requerido';
        }
        if (!formData.apellido.trim()) {
            newErrors.apellido = 'El apellido es requerido';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'El email es requerido';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email inválido';
        }
        if (!formData.telefono.trim()) {
            newErrors.telefono = 'El teléfono es requerido';
        }

        // Validar dirección
        if (!formData.calle.trim()) {
            newErrors.calle = 'La calle es requerida';
        }
        if (!formData.numero.trim()) {
            newErrors.numero = 'El número es requerido';
        }
        if (!formData.comuna.trim()) {
            newErrors.comuna = 'La comuna es requerida';
        }
        if (!formData.ciudad.trim()) {
            newErrors.ciudad = 'La ciudad es requerida';
        }

        // Validar tarjeta de crédito
        if (formData.metodoPago === 'tarjeta') {
            if (!formData.numeroTarjeta.replace(/\s/g, '')) {
                newErrors.numeroTarjeta = 'El número de tarjeta es requerido';
            } else if (formData.numeroTarjeta.replace(/\s/g, '').length < 16) {
                newErrors.numeroTarjeta = 'Número de tarjeta inválido';
            }
            
            if (!formData.nombreTarjeta.trim()) {
                newErrors.nombreTarjeta = 'El nombre en la tarjeta es requerido';
            }
            
            if (!formData.expiracionMes) {
                newErrors.expiracionMes = 'Mes de expiración requerido';
            }
            
            if (!formData.expiracionAno) {
                newErrors.expiracionAno = 'Año de expiración requerido';
            }
            
            if (!formData.cvv) {
                newErrors.cvv = 'CVV requerido';
            } else if (formData.cvv.length < 3) {
                newErrors.cvv = 'CVV inválido';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Manejar envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setProcessingPayment(true);

        try {
            // Preparar datos de la compra
            const datosCompra = {
                cliente: {
                    nombre: formData.nombre,
                    apellido: formData.apellido,
                    email: formData.email,
                    telefono: formData.telefono
                },
                direccion: {
                    calle: formData.calle,
                    numero: formData.numero,
                    comuna: formData.comuna,
                    ciudad: formData.ciudad,
                    codigoPostal: formData.codigoPostal
                },
                productos: cart,
                total: getCartTotal(),
                metodoPago: formData.metodoPago,
                tarjeta: formData.metodoPago === 'tarjeta' ? {
                    numero: formData.numeroTarjeta.replace(/\s/g, ''),
                    nombre: formData.nombreTarjeta,
                    expiracion: `${formData.expiracionMes}/${formData.expiracionAno}`,
                    cvv: formData.cvv
                } : null,
                comentarios: formData.comentarios,
                fecha: new Date().toISOString()
            };

            // Procesar pago con Transbank
            const resultadoPago = await procesarPagoTransbank(datosCompra);

            if (resultadoPago.exito) {
                // Pago exitoso
                clearCart();
                
                // Navegar a página de éxito con datos
                navigate('/checkout/success', {
                    state: {
                        transaccion: resultadoPago,
                        compra: datosCompra
                    }
                });
                
                if (onSuccess) {
                    onSuccess(resultadoPago);
                }
            } else {
                // Pago fallido
                setErrors({
                    general: resultadoPago.mensaje || 'Error procesando el pago'
                });
                
                if (onError) {
                    onError(resultadoPago);
                }
            }

        } catch (error) {
            console.error('Error en checkout:', error);
            setErrors({
                general: 'Error inesperado. Intenta nuevamente.'
            });
            
            if (onError) {
                onError({ error: error.message });
            }
        } finally {
            setProcessingPayment(false);
        }
    };

    return (
        <Form onSubmit={handleSubmit} className="checkout-form">
            {/* Error general */}
            {errors.general && (
                <Alert variant="danger">
                    {errors.general}
                </Alert>
            )}

            {/* Datos Personales */}
            <div className="form-section">
                <h4>📋 Datos Personales</h4>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre *</Form.Label>
                            <Form.Control
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                isInvalid={!!errors.nombre}
                                placeholder="Tu nombre"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.nombre}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Apellido *</Form.Label>
                            <Form.Control
                                type="text"
                                name="apellido"
                                value={formData.apellido}
                                onChange={handleChange}
                                isInvalid={!!errors.apellido}
                                placeholder="Tu apellido"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.apellido}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email *</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                isInvalid={!!errors.email}
                                placeholder="tu@email.com"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Teléfono *</Form.Label>
                            <Form.Control
                                type="tel"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleChange}
                                isInvalid={!!errors.telefono}
                                placeholder="+56 9 1234 5678"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.telefono}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
            </div>

            {/* Dirección de Envío */}
            <div className="form-section">
                <h4>📦 Dirección de Envío</h4>
                <Row>
                    <Col md={8}>
                        <Form.Group className="mb-3">
                            <Form.Label>Calle *</Form.Label>
                            <Form.Control
                                type="text"
                                name="calle"
                                value={formData.calle}
                                onChange={handleChange}
                                isInvalid={!!errors.calle}
                                placeholder="Nombre de la calle"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.calle}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Número *</Form.Label>
                            <Form.Control
                                type="text"
                                name="numero"
                                value={formData.numero}
                                onChange={handleChange}
                                isInvalid={!!errors.numero}
                                placeholder="1234"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.numero}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                
                <Row>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Comuna *</Form.Label>
                            <Form.Control
                                type="text"
                                name="comuna"
                                value={formData.comuna}
                                onChange={handleChange}
                                isInvalid={!!errors.comuna}
                                placeholder="Tu comuna"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.comuna}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Ciudad *</Form.Label>
                            <Form.Control
                                type="text"
                                name="ciudad"
                                value={formData.ciudad}
                                onChange={handleChange}
                                isInvalid={!!errors.ciudad}
                                placeholder="Tu ciudad"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.ciudad}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Código Postal</Form.Label>
                            <Form.Control
                                type="text"
                                name="codigoPostal"
                                value={formData.codigoPostal}
                                onChange={handleChange}
                                placeholder="12345"
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </div>

            {/* Método de Pago */}
            <div className="form-section">
                <h4>💳 Método de Pago</h4>
                
                <Form.Group className="mb-3">
                    <Form.Check
                        type="radio"
                        id="tarjeta"
                        name="metodoPago"
                        value="tarjeta"
                        checked={formData.metodoPago === 'tarjeta'}
                        onChange={handleChange}
                        label="Tarjeta de Crédito/Débito"
                    />
                </Form.Group>

                {formData.metodoPago === 'tarjeta' && (
                    <>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Número de Tarjeta *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="numeroTarjeta"
                                        value={formData.numeroTarjeta}
                                        onChange={handleChange}
                                        isInvalid={!!errors.numeroTarjeta}
                                        placeholder="1234 5678 9012 3456"
                                        maxLength={19}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.numeroTarjeta}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nombre en la Tarjeta *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="nombreTarjeta"
                                        value={formData.nombreTarjeta}
                                        onChange={handleChange}
                                        isInvalid={!!errors.nombreTarjeta}
                                        placeholder="Como aparece en la tarjeta"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.nombreTarjeta}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        
                        <Row>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Mes *</Form.Label>
                                    <Form.Select
                                        name="expiracionMes"
                                        value={formData.expiracionMes}
                                        onChange={handleChange}
                                        isInvalid={!!errors.expiracionMes}
                                    >
                                        <option value="">Mes</option>
                                        {Array.from({ length: 12 }, (_, i) => (
                                            <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                                                {String(i + 1).padStart(2, '0')}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.expiracionMes}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Año *</Form.Label>
                                    <Form.Select
                                        name="expiracionAno"
                                        value={formData.expiracionAno}
                                        onChange={handleChange}
                                        isInvalid={!!errors.expiracionAno}
                                    >
                                        <option value="">Año</option>
                                        {Array.from({ length: 10 }, (_, i) => {
                                            const year = new Date().getFullYear() + i;
                                            return (
                                                <option key={year} value={year}>
                                                    {year}
                                                </option>
                                            );
                                        })}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.expiracionAno}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>CVV *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="cvv"
                                        value={formData.cvv}
                                        onChange={handleChange}
                                        isInvalid={!!errors.cvv}
                                        placeholder="123"
                                        maxLength={4}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.cvv}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                    </>
                )}
            </div>

            {/* Comentarios */}
            <div className="form-section">
                <h4>💬 Comentarios (Opcional)</h4>
                <Form.Group className="mb-3">
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="comentarios"
                        value={formData.comentarios}
                        onChange={handleChange}
                        placeholder="Instrucciones especiales para la entrega..."
                    />
                </Form.Group>
            </div>

            {/* Botón de envío */}
            <div className="checkout-actions">
                <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={processingPayment}
                    className="w-100"
                >
                    {processingPayment ? (
                        <>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                className="me-2"
                            />
                            Procesando Pago...
                        </>
                    ) : (
                        `Pagar ${new Intl.NumberFormat('es-CL', {
                            style: 'currency',
                            currency: 'CLP'
                        }).format(getCartTotal())}`
                    )}
                </Button>
            </div>
        </Form>
    );
};

export default CheckoutForm;
```

---

Esta documentación cubre los aspectos más importantes del código del proyecto. ¿Te gustaría que profundice en alguna sección específica o que agregue información sobre algún otro componente?