import React, { useState, useEffect } from 'react';
import { useCart } from '../../hooks';
import { formatCLP } from '../../data';
import { useAuth } from '../../context/AuthContext';
// Importamos solo las utilidades de validación, ya no la transacción
import { validarRutChileno, formatearRut } from '../../services/transbank';
import { SALES_API_URL } from '../../config/api';
import '../../pages/productos/checkout.css';

const CheckoutForm = ({ isOpen, onClose }) => {
  const { cartItems, getTotal } = useCart();
  const { isLoggedIn, getDatosCheckout } = useAuth();
  
  const validCartItems = cartItems ? cartItems.filter(item => item && item.nombre && item.precio) : [];
  
  const [formData, setFormData] = useState({
    nombre: '', apellidos: '', rut: '', telefono: '', email: '',
    calle: '', numero: '', departamento: '', comuna: '', region: 'Región Metropolitana de Santiago', codigoPostal: '', indicaciones: ''
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  // Autocompletar datos cuando se abre el modal
  useEffect(() => {
    if (isOpen && isLoggedIn) {
      const datosUsuario = getDatosCheckout();
      console.log('Datos del usuario para checkout:', datosUsuario);
      if (datosUsuario) {
        setFormData(prev => ({ ...prev, ...datosUsuario }));
      }
    }
  }, [isOpen, isLoggedIn, getDatosCheckout]);

  // Cerrar con tecla ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen && !isProcessing) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }
  }, [isOpen, isProcessing, onClose]);

  // Totales
  const subtotal = getTotal();
  const descuentos = validCartItems.reduce((total, item) => {
    if (!item || !item.precio || !item.cantidad) return total;
    const descuento = item.descuento || 0;
    return total + (item.precio * item.cantidad * (descuento / 100));
  }, 0);
  const envio = subtotal > 50000 ? 0 : 5000;
  const totalFinal = subtotal - descuentos + envio;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    
    if (name === 'rut') {
      formattedValue = formatearRut(value);
    }
    
    setFormData(prev => ({ ...prev, [name]: formattedValue }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // ✅ AQUÍ ESTÁ LA VALIDACIÓN QUE FALTABA
  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
    if (!formData.apellidos.trim()) newErrors.apellidos = 'Los apellidos son obligatorios';
    if (!formData.rut.trim()) newErrors.rut = 'El RUT es obligatorio';
    else if (!validarRutChileno(formData.rut)) newErrors.rut = 'RUT inválido';
    if (!formData.telefono.trim()) newErrors.telefono = 'El teléfono es obligatorio';
    if (!formData.email.trim()) newErrors.email = 'El email es obligatorio';
    
    if (!formData.calle.trim()) newErrors.calle = 'La calle es obligatoria';
    if (!formData.numero.trim()) newErrors.numero = 'El número es obligatorio';
    if (!formData.comuna.trim()) newErrors.comuna = 'La comuna es obligatoria';

    setErrors(newErrors); // Ahora sí usamos setErrors
    return Object.keys(newErrors).length === 0;
  };

  // ✅ ENVÍO AL BACKEND (Microservicio de Ventas)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsProcessing(true);
    
    try {
      // 1. Preparar datos para el backend
      const saleRequest = {
        clienteNombre: `${formData.nombre} ${formData.apellidos}`,
        clienteEmail: formData.email,
        total: totalFinal,
        productos: validCartItems.map(item => ({
          codigo: item.codigo,
          cantidad: item.cantidad,
          precio: item.precio
        }))
      };

      console.log('📤 Enviando venta al Microservicio (8081)...');

      // 2. Llamada a tu API Java
      const response = await fetch(`${SALES_API_URL}/init`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(saleRequest)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Error en el servidor de ventas');
      }

      const data = await response.json();
      console.log('✅ Token recibido, redirigiendo a Transbank...');

      // 3. Redirección Automática a Transbank
      const form = document.createElement("form");
      form.method = "POST";
      form.action = data.url;
      
      const tokenInput = document.createElement("input");
      tokenInput.type = "hidden";
      tokenInput.name = "token_ws";
      tokenInput.value = data.token;
      
      form.appendChild(tokenInput);
      document.body.appendChild(form);
      form.submit();

    } catch (error) {
      console.error('❌ Error:', error);
      alert(`Error al iniciar el pago: ${error.message}`);
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;
  if (validCartItems.length === 0) return null;

  // Cerrar al hacer clic en el overlay (fondo oscuro)
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('checkout-overlay') && !isProcessing) {
      onClose();
    }
  };

  return (
    <div className="checkout-overlay" onClick={handleOverlayClick}>
      <div className="checkout-container">
        <div className="checkout-header">
          <h2>Finalizar Compra</h2>
          <button className="checkout-close" onClick={onClose} disabled={isProcessing}>×</button>
        </div>

        <div className="checkout-content">
          {/* RESUMEN */}
          <div className="order-summary">
            <h3>Resumen del Pedido</h3>
            
            {/* Lista de productos */}
            <div className="order-items">
              {validCartItems.map((item, index) => (
                <div key={index} className="order-item">
                  <img src={`/src/assets/${item.imagen}`} alt={item.nombre} className="order-item-image" />
                  <div className="item-info">
                    <span className="item-name">{item.nombre}</span>
                    <span className="item-quantity">x{item.cantidad}</span>
                  </div>
                  <span className="item-price">{formatCLP(item.precio * item.cantidad)}</span>
                </div>
              ))}
            </div>

            {/* Totales */}
            <div className="order-totals">
              <div className="total-line">
                <span>Subtotal:</span>
                <span>{formatCLP(subtotal)}</span>
              </div>
              {descuentos > 0 && (
                <div className="total-line discount">
                  <span>Descuentos:</span>
                  <span>-{formatCLP(descuentos)}</span>
                </div>
              )}
              <div className="total-line">
                <span>Envío:</span>
                <span>{envio === 0 ? 'Gratis' : formatCLP(envio)}</span>
              </div>
              <div className="total-line final-total">
                <span>Total a pagar:</span>
                <span>{formatCLP(totalFinal)}</span>
              </div>
            </div>
            <div className="payment-info mt-3">
                <small>Serás redirigido a Webpay para completar el pago de forma segura.</small>
            </div>
          </div>

          {/* FORMULARIO COMPLETO */}
          <form className="checkout-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <h3>Información del Cliente</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Nombre *</label>
                  <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} className={errors.nombre ? 'error' : ''} />
                  {errors.nombre && <span className="error-message">{errors.nombre}</span>}
                </div>
                <div className="form-group">
                  <label>Apellidos *</label>
                  <input type="text" name="apellidos" value={formData.apellidos} onChange={handleInputChange} className={errors.apellidos ? 'error' : ''} />
                  {errors.apellidos && <span className="error-message">{errors.apellidos}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>RUT *</label>
                  <input type="text" name="rut" value={formData.rut} onChange={handleInputChange} className={errors.rut ? 'error' : ''} placeholder="12.345.678-9" />
                  {errors.rut && <span className="error-message">{errors.rut}</span>}
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} className={errors.email ? 'error' : ''} />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
              </div>
               
               <div className="form-group">
                  <label>Teléfono *</label>
                  <input type="tel" name="telefono" value={formData.telefono} onChange={handleInputChange} className={errors.telefono ? 'error' : ''} />
                  {errors.telefono && <span className="error-message">{errors.telefono}</span>}
               </div>
            </div>

            <div className="form-section">
              <h3>Dirección de Entrega</h3>
              <div className="form-row">
                <div className="form-group flex-2">
                  <label>Calle *</label>
                  <input type="text" name="calle" value={formData.calle} onChange={handleInputChange} className={errors.calle ? 'error' : ''} />
                  {errors.calle && <span className="error-message">{errors.calle}</span>}
                </div>
                <div className="form-group">
                  <label>Número *</label>
                  <input type="text" name="numero" value={formData.numero} onChange={handleInputChange} className={errors.numero ? 'error' : ''} />
                  {errors.numero && <span className="error-message">{errors.numero}</span>}
                </div>
              </div>
              
              <div className="form-row">
                 <div className="form-group">
                    <label>Comuna *</label>
                    <input type="text" name="comuna" value={formData.comuna} onChange={handleInputChange} className={errors.comuna ? 'error' : ''} />
                    {errors.comuna && <span className="error-message">{errors.comuna}</span>}
                 </div>
              </div>
            </div>

            <button type="submit" className="checkout-submit" disabled={isProcessing}>
              {isProcessing ? 'Conectando con el Banco...' : `Pagar ${formatCLP(totalFinal)}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;