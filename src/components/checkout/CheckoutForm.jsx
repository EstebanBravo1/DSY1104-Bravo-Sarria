// ============================================
// PASARELA DE PAGO - CHECKOUT COMPONENT
// ============================================
// Formulario completo de pago con validación

import React, { useState } from 'react';
import { useCart } from '../../hooks';
import { formatCLP } from '../../data';
import { createTransactionAndRedirect, validarRutChileno, formatearRut } from '../../services/transbank';
import '../../pages/productos/checkout.css';

const CheckoutForm = ({ isOpen, onClose,}) => {
  const { cartItems, getTotal } = useCart();
  
  // Verificación de seguridad para cartItems
  const validCartItems = cartItems ? cartItems.filter(item => item && item.nombre && item.precio) : [];
  
  const [formData, setFormData] = useState({
    // Información del cliente
    nombre: '',
    apellidos: '',
    rut: '',
    telefono: '',
    email: '',
    
    // Dirección de entrega
    calle: '',
    numero: '',
    departamento: '',
    comuna: '',
    region: 'Región Metropolitana de Santiago',
    codigoPostal: '',
    indicaciones: ''
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  // Calcular totales
  const subtotal = getTotal();
  const descuentos = validCartItems.reduce((total, item) => {
    // Validar que el item exista y tenga las propiedades necesarias
    if (!item || !item.precio || !item.cantidad) {
      return total;
    }
    const descuento = item.descuento || 0;
    return total + (item.precio * item.cantidad * (descuento / 100));
  }, 0);
  const envio = subtotal > 50000 ? 0 : 5000; // Envío gratis sobre $50.000
  const totalFinal = subtotal - descuentos + envio;

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Formatear RUT automáticamente
    let formattedValue = value;
    if (name === 'rut') {
      formattedValue = formatearRut(value);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
    
    // Limpiar error del campo al escribir
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

    // Campos obligatorios
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
    if (!formData.apellidos.trim()) newErrors.apellidos = 'Los apellidos son obligatorios';
    if (!formData.rut.trim()) newErrors.rut = 'El RUT es obligatorio';
    else if (!validarRutChileno(formData.rut)) newErrors.rut = 'RUT inválido';
    if (!formData.telefono.trim()) newErrors.telefono = 'El teléfono es obligatorio';
    if (!formData.email.trim()) newErrors.email = 'El email es obligatorio';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido';
    
    // Dirección
    if (!formData.calle.trim()) newErrors.calle = 'La calle es obligatoria';
    if (!formData.numero.trim()) newErrors.numero = 'El número es obligatorio';
    if (!formData.comuna.trim()) newErrors.comuna = 'La comuna es obligatoria';
    if (!formData.codigoPostal.trim()) newErrors.codigoPostal = 'El código postal es obligatorio';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Procesar pago con Transbank (redirección inmediata)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsProcessing(true);
    
    try {
      // Preparar datos de la orden para Transbank
      const orderData = {
        total: totalFinal,
        cliente: formData,
        productos: validCartItems.map(item => ({
          codigo: item.codigo,
          nombre: item.nombre,
          precio: item.precio,
          cantidad: item.cantidad,
          descuento: item.descuento || 0
        }))
      };

      console.log('🏦 Procesando pago con Transbank - Redirección inmediata');

      // Crear transacción y redirigir inmediatamente a página de éxito
      const result = await createTransactionAndRedirect(orderData);
      
      if (!result.success) {
        throw new Error(result.error || 'Error al crear la transacción');
      }

      // Si llegamos aquí, significa que la redirección falló
      console.log('⚠️ La redirección no se completó correctamente');
      
    } catch (error) {
      console.error('❌ Error procesando pago:', error);
      
      // Mostrar error específico al usuario
      const errorMessage = error.message || 'Error al procesar el pago. Intente nuevamente.';
      alert(`Error en el pago: ${errorMessage}`);
      
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  // Verificar si hay items válidos en el carrito
  if (validCartItems.length === 0) {
    return (
      <div className="checkout-overlay">
        <div className="checkout-container">
          <div className="checkout-header">
            <h2>Carrito Vacío</h2>
            <button className="checkout-close" onClick={onClose}>×</button>
          </div>
          <div className="checkout-content">
            <p>No hay productos válidos en tu carrito.</p>
            <button onClick={onClose} className="checkout-submit">
              Volver a la tienda
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-overlay">
      <div className="checkout-container">
        <div className="checkout-header">
          <h2>Finalizar Compra</h2>
          <button className="checkout-close" onClick={onClose}>×</button>
        </div>

        <div className="checkout-content">
          {/* RESUMEN DEL PEDIDO */}
          <div className="order-summary">
            <h3>Resumen del Pedido</h3>
            <div className="order-items">
              {validCartItems.map(item => (
                <div key={item.codigo} className="order-item">
                  <img 
                    src={`/src/assets/${item.imagen}`} 
                    alt={item.nombre}
                    className="order-item-image"
                  />
                  <div className="order-item-details">
                    <h4>{item.nombre}</h4>
                    <p>Cantidad: {item.cantidad}</p>
                    {(item.descuento || 0) > 0 && (
                      <span className="discount-badge">
                        -{item.descuento || 0}% OFF
                      </span>
                    )}
                  </div>
                  <div className="order-item-price">
                    {(item.descuento || 0) > 0 && (
                      <span className="original-price">
                        {formatCLP(item.precio * item.cantidad)}
                      </span>
                    )}
                    <span className="final-price">
                      {formatCLP(item.precio * item.cantidad * (1 - (item.descuento || 0) / 100))}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* TOTALES */}
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
                <span>{envio === 0 ? 'GRATIS' : formatCLP(envio)}</span>
              </div>
              <div className="total-line final-total">
                <span>Total a pagar:</span>
                <span>{formatCLP(totalFinal)}</span>
              </div>
            </div>
            
            {/* INFORMACIÓN DE TRANSBANK */}
            <div className="payment-info">
              <div className="transbank-info">
                <span className="transbank-logo">🏦</span>
                <div className="transbank-text">
                  <strong>Pago seguro con Transbank</strong>
                  <p>Tu pago será procesado de forma segura a través de WebPay Plus. Aceptamos tarjetas de débito y crédito.</p>
                </div>
              </div>
            </div>
          </div>

          {/* FORMULARIO */}
          <form className="checkout-form" onSubmit={handleSubmit}>
            {/* INFORMACIÓN DEL CLIENTE */}
            <div className="form-section">
              <h3>Información del Cliente</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Nombre *</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className={errors.nombre ? 'error' : ''}
                    placeholder="Ingresa tu nombre"
                  />
                  {errors.nombre && <span className="error-message">{errors.nombre}</span>}
                </div>
                <div className="form-group">
                  <label>Apellidos *</label>
                  <input
                    type="text"
                    name="apellidos"
                    value={formData.apellidos}
                    onChange={handleInputChange}
                    className={errors.apellidos ? 'error' : ''}
                    placeholder="Ingresa tus apellidos"
                  />
                  {errors.apellidos && <span className="error-message">{errors.apellidos}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>RUT *</label>
                  <input
                    type="text"
                    name="rut"
                    value={formData.rut}
                    onChange={handleInputChange}
                    className={errors.rut ? 'error' : ''}
                    placeholder="12.345.678-9"
                  />
                  {errors.rut && <span className="error-message">{errors.rut}</span>}
                </div>
                <div className="form-group">
                  <label>Teléfono *</label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    className={errors.telefono ? 'error' : ''}
                    placeholder="+56 9 1234 5678"
                  />
                  {errors.telefono && <span className="error-message">{errors.telefono}</span>}
                </div>
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? 'error' : ''}
                  placeholder="tu@email.com"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
            </div>

            {/* DIRECCIÓN DE ENTREGA */}
            <div className="form-section">
              <h3>Dirección de Entrega</h3>
              <div className="form-row">
                <div className="form-group flex-2">
                  <label>Calle *</label>
                  <input
                    type="text"
                    name="calle"
                    value={formData.calle}
                    onChange={handleInputChange}
                    className={errors.calle ? 'error' : ''}
                    placeholder="Nombre de la calle"
                  />
                  {errors.calle && <span className="error-message">{errors.calle}</span>}
                </div>
                <div className="form-group">
                  <label>Número *</label>
                  <input
                    type="text"
                    name="numero"
                    value={formData.numero}
                    onChange={handleInputChange}
                    className={errors.numero ? 'error' : ''}
                    placeholder="123"
                  />
                  {errors.numero && <span className="error-message">{errors.numero}</span>}
                </div>
                <div className="form-group">
                  <label>Depto (opcional)</label>
                  <input
                    type="text"
                    name="departamento"
                    value={formData.departamento}
                    onChange={handleInputChange}
                    placeholder="Ej: 603"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Región *</label>
                  <select
                    name="region"
                    value={formData.region}
                    onChange={handleInputChange}
                  >
                    <option value="Región Metropolitana de Santiago">Región Metropolitana de Santiago</option>
                    <option value="Región de Valparaíso">Región de Valparaíso</option>
                    <option value="Región del Biobío">Región del Biobío</option>
                    <option value="Región de la Araucanía">Región de la Araucanía</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Comuna *</label>
                  <input
                    type="text"
                    name="comuna"
                    value={formData.comuna}
                    onChange={handleInputChange}
                    className={errors.comuna ? 'error' : ''}
                    placeholder="Comuna"
                  />
                  {errors.comuna && <span className="error-message">{errors.comuna}</span>}
                </div>
                <div className="form-group">
                  <label>Código Postal *</label>
                  <input
                    type="text"
                    name="codigoPostal"
                    value={formData.codigoPostal}
                    onChange={handleInputChange}
                    className={errors.codigoPostal ? 'error' : ''}
                    placeholder="7500000"
                  />
                  {errors.codigoPostal && <span className="error-message">{errors.codigoPostal}</span>}
                </div>
              </div>

              <div className="form-group">
                <label>Indicaciones para la entrega (opcional)</label>
                <textarea
                  name="indicaciones"
                  value={formData.indicaciones}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Ej: Entre calles, color del edificio, no tiene timbre..."
                ></textarea>
              </div>
            </div>

            {/* BOTÓN DE PAGO */}
            <button 
              type="submit" 
              className="checkout-submit"
              disabled={isProcessing || validCartItems.length === 0}
            >
              {isProcessing ? (
                <>
                  <span className="loading-spinner"></span>
                  Procesando con Transbank...
                </>
              ) : (
                <>
                  🏦 Pagar con WebPay Plus {formatCLP(totalFinal)}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;