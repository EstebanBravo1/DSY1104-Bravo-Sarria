// ============================================
// UTILIDADES PARA VALIDACIÓN DE RUT
// ============================================
// Funciones auxiliares para validar RUT chileno (requerido por Transbank)

/**
 * Valida si un RUT chileno es válido
 * @param {string} rut - RUT en formato XX.XXX.XXX-X o XXXXXXXX-X
 * @returns {boolean} - true si el RUT es válido
 */
export const validarRutChileno = (rut) => {
  // Limpiar el RUT (quitar puntos y guiones)
  const rutLimpio = rut.replace(/\./g, '').replace('-', '').toUpperCase();
  
  // Validar longitud
  if (rutLimpio.length < 8 || rutLimpio.length > 9) {
    return false;
  }

  // Separar cuerpo y dígito verificador
  const cuerpo = rutLimpio.slice(0, -1);
  const dv = rutLimpio.slice(-1);

  // Validar que el cuerpo sean solo números
  if (!/^\d+$/.test(cuerpo)) {
    return false;
  }

  // Calcular dígito verificador esperado
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

/**
 * Formatea un RUT chileno con puntos y guión
 * @param {string} rut - RUT sin formato
 * @returns {string} - RUT formateado (XX.XXX.XXX-X)
 */
export const formatearRut = (rut) => {
  // Limpiar el RUT
  const rutLimpio = rut.replace(/\./g, '').replace('-', '').toUpperCase();
  
  if (rutLimpio.length < 2) return rutLimpio;
  
  // Separar cuerpo y dígito verificador
  const cuerpo = rutLimpio.slice(0, -1);
  const dv = rutLimpio.slice(-1);
  
  // Formatear con puntos (agregar punto cada 3 dígitos de derecha a izquierda)
  const cuerpoFormateado = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  
  return `${cuerpoFormateado}-${dv}`;
};
