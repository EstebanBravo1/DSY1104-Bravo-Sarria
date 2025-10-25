// ============================================
// PÁGINA DE ÉXITO/ERROR TRANSBANK
// ============================================
// Página independiente que se muestra después de la redirección de Transbank

import React, { useEffect, useState } from 'react';
import { confirmTransactionFromUrl, getTransactionInfo } from '../../services/transbank';
import { formatCLP } from '../../data';
import './CheckoutSuccess.css';

// Función auxiliar para formatear precio de forma segura
const formatearPrecioSeguro = (precio) => {
  const valor = Number(precio);
  if (isNaN(valor) || valor === null || valor === undefined) {
    console.warn('Precio inválido:', precio);
    return '$0';
  }
  return formatCLP(valor);
};

// Función auxiliar para procesar productos de forma segura
const procesarProducto = (producto, index) => {
  const nombre = producto.name || producto.nombre || `Producto ${index + 1}`;
  const cantidad = Number(producto.quantity || producto.cantidad) || 1;
  const precio = Number(producto.price || producto.precio) || 0;
  
  console.log('Procesando producto:', { 
    original: producto, 
    procesado: { nombre, cantidad, precio },
    total: precio * cantidad 
  });
  
  return { nombre, cantidad, precio };
};

const TransbankSuccessPage = () => {
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentError, setPaymentError] = useState(null);

  useEffect(() => {
    // Obtener parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token') || urlParams.get('token_ws') || urlParams.get('TBK_TOKEN');
    const buyOrder = urlParams.get('order') || urlParams.get('buy_order') || urlParams.get('TBK_ORDER');
    const status = urlParams.get('status') || 'success'; // Por defecto éxito
    const errorType = urlParams.get('error_type') || urlParams.get('error'); // Tipo de error específico

    console.log('Procesando pago con parámetros:', { 
      token, 
      buyOrder, 
      status, 
      errorType 
    });

    if (!token || !buyOrder) {
      setError('Parámetros de transacción inválidos');
      setLoading(false);
      return;
    }

    // Confirmar la transacción (éxito o error)
    const confirmResult = confirmTransactionFromUrl(token, buyOrder, status, errorType);
    
    if (confirmResult.success) {
      // ========================================
      // PAGO EXITOSO
      // ========================================
      const transactionInfo = getTransactionInfo(buyOrder);
      
      if (transactionInfo) {
        setOrderData({
          ordenId: buyOrder,
          total: confirmResult.data.amount || 0,
          cliente: confirmResult.data.cliente || transactionInfo.cliente || {},
          transactionToken: token,
          paymentMethod: 'Transbank WebPay Plus',
          status: 'AUTHORIZED',
          authorizationCode: confirmResult.data.authorization_code,
          transactionDate: confirmResult.data.transaction_date,
          cardNumber: confirmResult.data.card_detail?.card_number,
          productos: confirmResult.data.productos || transactionInfo.productos || []
        });
      } else {
        setError('No se encontró información de la transacción');
      }
    } else {
      // ========================================
      // ERROR EN EL PAGO
      // ========================================
      const transactionInfo = getTransactionInfo(buyOrder);
      
      console.log('Datos para error de pago:', {
        confirmResult,
        transactionInfo,
        productos_confirm: confirmResult.data?.productos,
        productos_transaction: transactionInfo?.productos
      });
      
      setPaymentError({
        errorCode: confirmResult.data?.error_code || 'UNKNOWN_ERROR',
        errorMessage: confirmResult.error || 'Error desconocido en el procesamiento',
        buyOrder: buyOrder,
        amount: confirmResult.data?.amount || (transactionInfo ? transactionInfo.amount : 0),
        cliente: confirmResult.data?.cliente || (transactionInfo ? transactionInfo.cliente : {}),
        productos: confirmResult.data?.productos || (transactionInfo ? transactionInfo.productos : [])
      });
    }
    
    setLoading(false);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleNewPurchase = () => {
    // Redirigir a la página principal
    window.location.href = '/';
  };

  const handleViewProducts = () => {
    // Redirigir a productos
    window.location.href = '/productos';
  };

  const handleRetry = () => {
    // Volver al carrito para intentar nuevamente
    window.location.href = '/carrito';
  };

  const handleContactSupport = () => {
    // Ir a la página de contacto
    window.location.href = '/contacto';
  };

  if (loading) {
    return (
      <div className="success-overlay">
        <div className="success-container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <h2>Confirmando pago...</h2>
            <p>Por favor espera mientras verificamos tu transacción con Transbank.</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="success-overlay">
        <div className="success-container">
          <div className="error-container">
            <div className="error-icon">❌</div>
            <h2>Error en la transacción</h2>
            <p>{error}</p>
            <button onClick={handleNewPurchase} className="error-button">
              Volver al inicio
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ========================================
  // PANTALLA DE ERROR DE PAGO
  // ========================================
  if (paymentError) {
    return (
      <div className="success-overlay">
        <div className="success-container error-payment">
          <div className="error-icon-large">
            <div className="error-mark">
              <svg viewBox="0 0 52 52">
                <circle cx="26" cy="26" r="25" fill="none"/>
                <path fill="none" d="M16 16 l20 20 m0 -20 l-20 20"/>
              </svg>
            </div>
          </div>

          <div className="error-content">
            <h2>Pago No Procesado</h2>
            <p className="error-message">
              Tu pago no pudo ser procesado por el siguiente motivo:
            </p>

            <div className="error-details">
              <div className="error-alert">
                <strong>Error:</strong> {paymentError.errorMessage}
              </div>
              
              <div className="error-info">
                <div className="info-item">
                  <strong>Código de Error:</strong>
                  <span className="error-code">{paymentError.errorCode}</span>
                </div>
                <div className="info-item">
                  <strong>Orden de Compra:</strong>
                  <span className="order-number">{paymentError.buyOrder}</span>
                </div>
                <div className="info-item">
                  <strong>Monto Intentado:</strong>
                  <span className="amount-failed">{formatCLP(paymentError.amount)}</span>
                </div>
                {paymentError.cliente && paymentError.cliente.rut && (
                  <div className="info-item">
                    <strong>Cliente:</strong>
                    <span>
                      {(paymentError.cliente.nombres || paymentError.cliente.nombre || '')} {' '}
                      {(paymentError.cliente.apellidos || paymentError.cliente.apellido || '')}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {paymentError.productos && paymentError.productos.length > 0 && (
              <div className="products-failed">
                <h3>Productos en el Carrito</h3>
                <div className="products-list">
                  {paymentError.productos.map((producto, index) => {
                    const { nombre, cantidad, precio } = procesarProducto(producto, index);
                    return (
                      <div key={index} className="product-item">
                        <span className="product-name">{nombre}</span>
                        <span className="product-quantity">x{cantidad}</span>
                        <span className="product-price">
                          {formatearPrecioSeguro(precio * cantidad)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="error-suggestions">
              <h3>¿Qué puedes hacer?</h3>
              <ul>
                <li>Verifica que los datos de tu tarjeta sean correctos</li>
                <li>Asegúrate de tener fondos suficientes</li>
                <li>Contacta a tu banco si el problema persiste</li>
                <li>Intenta nuevamente con otra tarjeta</li>
              </ul>
            </div>

            <div className="error-actions">
              <button onClick={handleRetry} className="retry-button">
                🔄 Intentar Nuevamente
              </button>
              <button onClick={handleContactSupport} className="support-button">
                📞 Contactar Soporte
              </button>
              <button onClick={handleNewPurchase} className="home-button">
                🏠 Volver al Inicio
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ========================================
  // PANTALLA DE ÉXITO
  // ========================================
  if (!orderData) {
    return (
      <div className="success-overlay">
        <div className="success-container">
          <div className="error-container">
            <div className="error-icon">⚠️</div>
            <h2>No se encontraron datos</h2>
            <p>No se pudieron recuperar los datos de la transacción.</p>
            <button onClick={handleNewPurchase} className="error-button">
              Volver al inicio
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { 
    ordenId, 
    total, 
    cliente, 
    transactionToken, 
    paymentMethod, 
    status,
    authorizationCode,
    transactionDate,
    cardNumber,
    productos 
  } = orderData;

  return (
    <div className="success-overlay">
      <div className="success-container">
        <div className="success-icon">
          <div className="checkmark">
            <svg viewBox="0 0 52 52">
              <circle cx="26" cy="26" r="25" fill="none"/>
              <path fill="none" d="m14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
          </div>
        </div>

        <div className="success-content">
          <h2>¡Pago Exitoso con Transbank!</h2>
          <p className="success-message">
            Tu pedido ha sido procesado correctamente a través de WebPay Plus.
          </p>

          <div className="order-info">
            <div className="info-item">
              <strong>Número de Orden:</strong>
              <span className="order-number">{ordenId}</span>
            </div>
            <div className="info-item">
              <strong>Total Pagado:</strong>
              <span className="total-paid">{formatCLP(total)}</span>
            </div>
            <div className="info-item">
              <strong>Método de Pago:</strong>
              <span className="payment-method">{paymentMethod}</span>
            </div>
            <div className="info-item">
              <strong>Estado:</strong>
              <span className={`payment-status ${status.toLowerCase()}`}>
                {status === 'AUTHORIZED' ? 'Autorizado ' : status}
              </span>
            </div>
            {authorizationCode && (
              <div className="info-item">
                <strong>Código de Autorización:</strong>
                <span className="auth-code">{authorizationCode}</span>
              </div>
            )}
            {transactionDate && (
              <div className="info-item">
                <strong>Fecha de Transacción:</strong>
                <span className="transaction-date">
                  {new Date(transactionDate).toLocaleString('es-CL')}
                </span>
              </div>
            )}
            {cardNumber && (
              <div className="info-item">
                <strong>Tarjeta:</strong>
                <span className="card-number">**** **** **** {cardNumber}</span>
              </div>
            )}
            <div className="info-item">
              <strong>Token de Transacción:</strong>
              <span className="transaction-token">{transactionToken.substring(0, 20)}...</span>
            </div>
            <div className="info-item">
              <strong>Cliente:</strong>
              <span>
                {(cliente.nombres || cliente.nombre || '')} {' '}
                {(cliente.apellidos || cliente.apellido || '')}
              </span>
            </div>
            <div className="info-item">
              <strong>RUT:</strong>
              <span>{cliente.rut}</span>
            </div>
            <div className="info-item">
              <strong>Email:</strong>
              <span>{cliente.email}</span>
            </div>
          </div>

          <div className="delivery-info">
            <h3>📦 Información de Entrega</h3>
            <div className="delivery-address">
              <p>
                <strong>Dirección:</strong><br/>
                {cliente.calle} {cliente.numero}
                {cliente.departamento && `, Depto. ${cliente.departamento}`}<br/>
                {cliente.comuna}, {cliente.region}<br/>
                Código Postal: {cliente.codigoPostal}
              </p>
              {cliente.indicaciones && (
                <p>
                  <strong>Indicaciones:</strong><br/>
                  {cliente.indicaciones}
                </p>
              )}
              <p>
                <strong>Teléfono:</strong> {cliente.telefono}
              </p>
            </div>
          </div>

          {productos && productos.length > 0 && (
            <div className="products-summary">
              <h3>🛍️ Productos Comprados</h3>
              <div className="products-list">
                {productos.map((producto, index) => {
                  const { nombre, cantidad, precio } = procesarProducto(producto, index);
                  return (
                    <div key={index} className="product-item">
                      <span className="product-name">{nombre}</span>
                      <span className="product-quantity">x{cantidad}</span>
                      <span className="product-price">
                        {formatearPrecioSeguro(precio * cantidad)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="next-steps">
            <h3>📋 Próximos Pasos</h3>
            <ul>
              <li>Recibirás un email de confirmación en los próximos minutos</li>
              <li>Tu pedido será preparado y enviado en 1-2 días hábiles</li>
              <li>Te notificaremos cuando tu pedido esté en camino</li>
              <li>Puedes seguir el estado de tu pedido con el número: <strong>{ordenId}</strong></li>
            </ul>
          </div>

          <div className="success-actions">
            <button onClick={handlePrint} className="print-button">
              🖨️ Imprimir Comprobante
            </button>
            <button onClick={handleViewProducts} className="continue-button">
              🛍️ Ver Más Productos
            </button>
            <button onClick={handleNewPurchase} className="home-button">
              🏠 Volver al Inicio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransbankSuccessPage;