// ============================================
// ✅ CONFIRMACIÓN DE PAGO - SUCCESS COMPONENT
// ============================================
// Pantalla de confirmación después del pago exitoso

import React from 'react';
import { formatCLP } from '../../data';
import './../../pages/productos/CheckoutSuccess.css';

const CheckoutSuccess = ({ orderData, onClose }) => {
  const { 
    ordenId, 
    total, 
    cliente, 
    transactionToken, 
    paymentMethod = 'WebPay Plus', 
    status = 'AUTHORIZED' 
  } = orderData;

  const handlePrint = () => {
    window.print();
  };

  const handleNewPurchase = () => {
    onClose();
    // Redirigir a productos o home
    window.location.href = '/productos';
  };

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
          <h2>¡Pago Exitoso!</h2>
          <p className="success-message">
            Tu pedido ha sido procesado correctamente y será enviado a la brevedad.
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
                {status === 'AUTHORIZED' ? 'Autorizado ✅' : status}
              </span>
            </div>
            {transactionToken && (
              <div className="info-item">
                <strong>Token de Transacción:</strong>
                <span className="transaction-token">{transactionToken.substring(0, 20)}...</span>
              </div>
            )}
            <div className="info-item">
              <strong>Cliente:</strong>
              <span>{cliente.nombre} {cliente.apellidos}</span>
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
                {cliente.departamento && `, Depto ${cliente.departamento}`}<br/>
                {cliente.comuna}, {cliente.region}<br/>
                Código Postal: {cliente.codigoPostal}
              </p>
              {cliente.indicaciones && (
                <p>
                  <strong>Indicaciones:</strong><br/>
                  {cliente.indicaciones}
                </p>
              )}
            </div>
            <div className="delivery-estimate">
              <p>
                <strong>⏰ Tiempo estimado de entrega:</strong><br/>
                3-5 días hábiles
              </p>
            </div>
          </div>

          <div className="next-steps">
            <h3>📧 Próximos Pasos</h3>
            <ul>
              <li>Recibirás un email de confirmación en {cliente.email}</li>
              <li>Te notificaremos cuando tu pedido sea despachado</li>
              <li>Podrás hacer seguimiento con el número de orden {ordenId}</li>
            </ul>
          </div>

          <div className="success-actions">
            <button className="btn-print" onClick={handlePrint}>
              🖨️ Imprimir Comprobante
            </button>
            <button className="btn-new-purchase" onClick={handleNewPurchase}>
              🛍️ Seguir Comprando
            </button>
            <button className="btn-close" onClick={onClose}>
              ✖️ Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;