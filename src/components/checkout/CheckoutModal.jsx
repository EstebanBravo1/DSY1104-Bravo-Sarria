// ============================================
// MODAL UNIFICADO - CHECKOUT Y SUCCESS
// ============================================
// Componente que maneja ambos estados en un solo modal

import React, { useState } from 'react';
import CheckoutForm from './CheckoutForm';
import CheckoutSuccess from './CheckoutSuccess';

const CheckoutModal = ({ isOpen, onClose, onPaymentComplete }) => {
  const [step, setStep] = useState('checkout'); // 'checkout' | 'success'
  const [orderData, setOrderData] = useState(null);

  // Manejar pago exitoso
  const handlePaymentSuccess = (data) => {
    setOrderData(data);
    setStep('success');
    
    // Notificar al componente padre
    if (onPaymentComplete) {
      onPaymentComplete(data);
    }
  };

  // Cerrar modal y resetear
  const handleClose = () => {
    setStep('checkout');
    setOrderData(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {step === 'checkout' && (
        <CheckoutForm 
          isOpen={true}
          onClose={handleClose}
          onSuccess={handlePaymentSuccess}
        />
      )}
      
      {step === 'success' && orderData && (
        <CheckoutSuccess 
          orderData={orderData}
          onClose={handleClose}
        />
      )}
    </>
  );
};

export default CheckoutModal;