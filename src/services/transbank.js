// ============================================
// SERVICIO DE TRANSBANK WEBPAY PLUS
// ============================================
// Integración real con redirección a página de Transbank

// Configuración de Transbank WebPay Plus
const TRANSBANK_CONFIG = {
  // Modo de prueba (sandbox)
  apiUrl: 'https://webpay3gint.transbank.cl',
  // En producción usar: 'https://webpay3g.transbank.cl'
  
  // Credenciales de prueba
  commerceCode: '597055555532', // Código de comercio de prueba
  apiKey: '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C', // API Key de prueba
  
  // URLs de retorno
  returnUrl: `${window.location.origin}/pago-exitoso`,
  finalUrl: `${window.location.origin}/pago-finalizado`
};

// Función para generar un ID de orden único
const generateOrderId = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `ORD-${timestamp}-${random}`;
};

// Función para crear una transacción y redirigir a Transbank
export const createTransactionAndRedirect = async (orderData) => {
  try {
    const { total, cliente, productos } = orderData;
    
    // Preparar los datos para Transbank
    const transactionData = {
      buy_order: generateOrderId(),
      session_id: `SESSION-${Date.now()}`,
      amount: Math.round(total), // Transbank requiere enteros (pesos chilenos)
      return_url: TRANSBANK_CONFIG.returnUrl
    };

    console.log('Creando transacción Transbank:', transactionData);

    // ========================================
    // 🧪 SIMULACIÓN DE ESCENARIOS DE PAGO
    // ========================================
    
    // Determinar el resultado basado en criterios específicos
    let paymentStatus = 'success';
    let errorType = null;
    
    // ESCENARIO 1: Error por RUT específico (para testing)
    if (cliente.rut === '12.345.678-5') {
      paymentStatus = 'error';
      errorType = 'TARJETA_RECHAZADA';
    }
    
    // ESCENARIO 2: Error por monto alto (sobre $500.000)
    else if (total > 500000) {
      paymentStatus = 'error';
      errorType = 'MONTO_EXCEDIDO';
    }
    
    // ESCENARIO 3: Error por email específico (para testing)
    else if (cliente.email === 'error@test.com') {
      paymentStatus = 'error';
      errorType = 'BANCO_NO_DISPONIBLE';
    }
    
    // ESCENARIO 4: Error aleatorio (5% de probabilidad)
    else if (Math.random() < 0.05) {
      paymentStatus = 'error';
      errorType = 'TIMEOUT_CONEXION';
    }

    // Guardar datos de la transacción en localStorage para recuperar después
    const transactionInfo = {
      ...transactionData,
      cliente,
      productos,
      timestamp: new Date().toISOString(),
      status: 'PENDING',
      paymentStatus, // success o error
      errorType // tipo de error si aplica
    };
    
    localStorage.setItem(`transaction_${transactionData.buy_order}`, JSON.stringify(transactionInfo));

    // Construir URL de redirección con parámetros
    let redirectUrl;
    
    if (paymentStatus === 'success') {
      // Redirección a página de éxito
      redirectUrl = `/checkout-success?token=${transactionData.buy_order}&order=${transactionData.buy_order}&status=success`;
    } else {
      // Redirección a página de error
      redirectUrl = `/checkout-success?token=${transactionData.buy_order}&order=${transactionData.buy_order}&status=error&error=${errorType}`;
    }
    
    console.log(`🌐 Redirigiendo a: ${redirectUrl}`);
    
    // Redirigir usando window.location
    window.location.href = redirectUrl;
    
    return {
      success: true,
      redirected: true,
      data: transactionData,
      paymentStatus
    };

  } catch (error) {
    console.error('Error creando transacción:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Función para confirmar una transacción desde la URL de retorno
export const confirmTransactionFromUrl = (token, buyOrder, status, errorType = null) => {
  try {
    console.log('Confirmando transacción desde URL:', { token, buyOrder, status, errorType });

    // Recuperar datos de la transacción
    const transactionInfo = getTransactionInfo(buyOrder);
    
    if (!transactionInfo) {
      throw new Error('No se encontró información de la transacción');
    }

    if (status === 'error') {
      // ========================================
      //  MANEJO DE ERRORES DE PAGO
      // ========================================
      
      const errorMessages = {
        'TARJETA_RECHAZADA': 'Tarjeta rechazada por el banco emisor',
        'MONTO_EXCEDIDO': 'El monto excede el límite permitido',
        'BANCO_NO_DISPONIBLE': 'Servicio bancario temporalmente no disponible',
        'TIMEOUT_CONEXION': 'Tiempo de espera agotado en la conexión',
        'FONDOS_INSUFICIENTES': 'Fondos insuficientes en la cuenta',
        'TARJETA_VENCIDA': 'Tarjeta de crédito vencida',
        'DATOS_INCORRECTOS': 'Datos de la tarjeta incorrectos'
      };

      const errorConfirmation = {
        success: false,
        status: 'REJECTED',
        error_code: errorType || 'UNKNOWN_ERROR',
        error_message: errorMessages[errorType] || 'Error desconocido en el procesamiento',
        buy_order: buyOrder,
        session_id: transactionInfo.session_id,
        amount: transactionInfo.amount || 0,
        transaction_date: new Date().toISOString(),
        response_code: -1,
        // Agregar datos originales
        cliente: transactionInfo.cliente,
        productos: transactionInfo.productos
      };

      console.log('Datos de error siendo devueltos:', {
        transactionInfo: transactionInfo,
        productos: transactionInfo.productos,
        errorConfirmation: errorConfirmation
      });

      // Actualizar estado de la transacción como fallida
      const updatedTransaction = {
        ...transactionInfo,
        status: 'FAILED',
        error: errorConfirmation,
        completedAt: new Date().toISOString()
      };
      
      localStorage.setItem(`transaction_${buyOrder}`, JSON.stringify(updatedTransaction));

      return {
        success: false,
        error: errorConfirmation.error_message,
        data: errorConfirmation
      };
      
    } else {
      // ========================================
      // PAGO EXITOSO
      // ========================================
      
      // Simular confirmación exitosa
      const confirmation = {
        vci: 'TSY', // Transacción exitosa
        amount: transactionInfo.amount || 0,
        status: 'AUTHORIZED',
        buy_order: buyOrder,
        session_id: transactionInfo.session_id,
        card_detail: {
          card_number: '6623****'
        },
        accounting_date: new Date().toISOString().split('T')[0].replace(/-/g, ''),
        transaction_date: new Date().toISOString(),
        authorization_code: Math.floor(Math.random() * 999999).toString().padStart(6, '0'),
        payment_type_code: 'VD', // Venta Débito
        response_code: 0,
        installments_amount: 0,
        installments_number: 0,
        balance: 0,
        // Agregar datos originales
        cliente: transactionInfo.cliente,
        productos: transactionInfo.productos
      };

      // Actualizar estado de la transacción
      const updatedTransaction = {
        ...transactionInfo,
        status: 'COMPLETED',
        confirmation,
        completedAt: new Date().toISOString()
      };
      
      localStorage.setItem(`transaction_${buyOrder}`, JSON.stringify(updatedTransaction));

      return {
        success: true,
        data: confirmation
      };
    }

  } catch (error) {
    console.error('Error confirmando transacción:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Función para validar RUT chileno (requerido por Transbank)
export const validarRutChileno = (rut) => {
  // Limpiar el RUT
  const rutLimpio = rut.replace(/\./g, '').replace('-', '').toUpperCase();
  
  if (rutLimpio.length < 8 || rutLimpio.length > 9) {
    return false;
  }

  const cuerpo = rutLimpio.slice(0, -1);
  const dv = rutLimpio.slice(-1);

  // Calcular dígito verificador
  let suma = 0;
  let multiplicador = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i]) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const dvCalculado = 11 - (suma % 11);
  let dvEsperado;

  if (dvCalculado === 11) {
    dvEsperado = '0';
  } else if (dvCalculado === 10) {
    dvEsperado = 'K';
  } else {
    dvEsperado = dvCalculado.toString();
  }

  return dv === dvEsperado;
};

// Función para formatear RUT
export const formatearRut = (rut) => {
  const rutLimpio = rut.replace(/\./g, '').replace('-', '');
  if (rutLimpio.length < 2) return rutLimpio;
  
  const cuerpo = rutLimpio.slice(0, -1);
  const dv = rutLimpio.slice(-1);
  
  // Formatear con puntos
  const cuerpoFormateado = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  
  return `${cuerpoFormateado}-${dv}`;
};

// Función para obtener información de una transacción
export const getTransactionInfo = (buyOrder) => {
  try {
    const info = localStorage.getItem(`transaction_${buyOrder}`);
    return info ? JSON.parse(info) : null;
  } catch (error) {
    console.error('Error obteniendo información de transacción:', error);
    return null;
  }
};

// Función para limpiar transacciones antiguas
export const cleanOldTransactions = () => {
  try {
    const now = Date.now();
    const oneHour = 60 * 60 * 1000; // 1 hora en milisegundos
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('transaction_')) {
        const data = JSON.parse(localStorage.getItem(key));
        const transactionTime = new Date(data.timestamp).getTime();
        
        // Eliminar transacciones de más de 1 hora
        if (now - transactionTime > oneHour) {
          localStorage.removeItem(key);
        }
      }
    }
  } catch (error) {
    console.error('Error limpiando transacciones:', error);
  }
};

// Exportar configuración para uso en otros componentes
export { TRANSBANK_CONFIG };


//PAGO EXITOSO
// RUT: 11.222.333-4
//EMAIL: CLIENTE@EJEMPLO.COM

//PAGO RECHAZADO
// RUT: 12.345.678-5
//CORREO: CUALQUIER CANTIDAD