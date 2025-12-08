import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext'; // Para vaciar el carrito
import { formatCLP } from '../../data';
import { SALES_API_URL } from '../../config/api';
import './CheckoutSuccess.css';

const TransbankSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('loading'); // loading, success, rejected, error
  const [saleData, setSaleData] = useState(null);
  const { clearCart } = useCart();
  const hasConfirmed = useRef(false); // Para evitar doble confirmación

  // Webpay devuelve 'token_ws' (éxito) o 'TBK_TOKEN' (anulado por usuario)
  const token = searchParams.get('token_ws') || searchParams.get('TBK_TOKEN');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      return;
    }

    // Evitar múltiples confirmaciones (React StrictMode ejecuta useEffect dos veces)
    if (hasConfirmed.current) return;

    // Llamar a nuestro Microservicio de Ventas para confirmar
    const confirmarVenta = async () => {
      hasConfirmed.current = true;

      try {
        console.log("🔄 Confirmando venta con token:", token);
        
        const response = await fetch(`${SALES_API_URL}/commit`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: token })
        });

        if (!response.ok) {
          console.error("❌ Error HTTP:", response.status);
          setStatus('error');
          return;
        }

        const data = await response.json();
        console.log("✅ Respuesta Confirmación:", data);

        if (data.estado === 'PAGADO') {
          setStatus('success');
          setSaleData(data);
          clearCart(); // ¡Vaciamos el carrito local!
        } else if (data.estado === 'ERROR') {
          console.error("❌ Error del servidor:", data.error);
          setStatus('error');
        } else {
          setStatus('rejected');
        }

      } catch (error) {
        console.error("❌ Error confirmando:", error);
        setStatus('error');
      }
    };

    // Ejecutar solo una vez
    confirmarVenta();
  }, [token, clearCart]);

  // --- RENDERIZADO ---

  if (status === 'loading') {
    return (
      <div className="success-overlay"><div className="success-container"><h2 className="text-center mt-5">Verificando pago con el banco...</h2></div></div>
    );
  }

  if (status === 'rejected' || status === 'error') {
    return (
      <div className="success-overlay">
        <div className="success-container error-payment">
          <div className="error-content text-center">
            <h2>❌ Pago Rechazado o Anulado</h2>
            <p>La transacción no pudo completarse.</p>
            <Link to="/carrito" className="retry-button">Volver al Carrito</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="success-overlay">
      <div className="success-container">
        <div className="success-icon">
          <div className="checkmark">✔</div>
        </div>
        <div className="success-content">
          <h2>¡Pago Exitoso!</h2>
          <p className="success-message">Tu compra ha sido registrada correctamente.</p>

          {saleData && (
            <div className="order-info">
              <div className="info-item">
                <strong>Nº Orden:</strong> <span>{saleData.id}</span>
              </div>
              <div className="info-item">
                <strong>Monto:</strong> <span>{formatCLP(saleData.total)}</span>
              </div>
              <div className="info-item">
                <strong>Estado:</strong> <span className="text-success">PAGADO</span>
              </div>
              <div className="info-item">
                <strong>Cliente:</strong> <span>{saleData.clienteNombre}</span>
              </div>
            </div>
          )}

          <div className="success-actions">
            <Link to="/productos" className="home-button">Seguir Comprando</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransbankSuccessPage;