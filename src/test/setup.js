// setup.js - Configuración inicial para tests
console.log('🔧 Configuración de testing cargada para el editor');

// Configuración global para Jasmine
if (typeof jasmine !== 'undefined') {
  // Timeout por defecto para tests asíncronos
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  
  // Configurar Jasmine para que sea más descriptivo
  jasmine.getEnv().configure({
    random: false,
    failSpecWithNoExpectations: false
  });
}

// Mock básico de localStorage para tests
if (typeof window !== 'undefined' && !window.localStorage) {
  window.localStorage = {
    data: {},
    setItem: function(key, value) {
      this.data[key] = value;
    },
    getItem: function(key) {
      return this.data[key] || null;
    },
    removeItem: function(key) {
      delete this.data[key];
    },
    clear: function() {
      this.data = {};
    }
  };
}

// Función helper para resetear datos entre tests
function resetTestData() {
  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.clear();
  }
}

// Hacer disponible globalmente para los tests
if (typeof window !== 'undefined') {
  window.resetTestData = resetTestData;
}