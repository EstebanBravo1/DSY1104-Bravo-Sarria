// tests/03-mocks.test.js
// 🎓 PRUEBAS CON MOCKS PARA ESTUDIANTES
// IE2.3.1: Simulaciones y espías

/* global describe, it, expect, spyOn */
// ↑ Esta línea le dice al editor que estas funciones están disponibles globalmente

describe('🔵 NIVEL 3: Mocks y Simulaciones', function() {
  
  it('✅ Puede simular el comportamiento de una función', function() {
    // Objeto con una función
    var calculadora = {
      sumar: function(a, b) {
        return a + b;
      }
    };
    
    // Crear un espía (spy) para monitorear la función
    spyOn(calculadora, 'sumar').and.returnValue(100);
    
    // Usar la función
    var resultado = calculadora.sumar(5, 3);
    
    // Verificar que fue llamada y que devolvió lo que queríamos
    expect(calculadora.sumar).toHaveBeenCalled();
    expect(calculadora.sumar).toHaveBeenCalledWith(5, 3);
    expect(resultado).toBe(100);
  });

  it('✅ Puede contar cuántas veces se llama una función', function() {
    var contador = {
      incrementar: function() {
        return 1;
      }
    };
    
    // Espía que permite que la función original funcione
    spyOn(contador, 'incrementar').and.callThrough();
    
    // Llamar la función varias veces
    contador.incrementar();
    contador.incrementar();
    contador.incrementar();
    
    // Verificar cuántas veces fue llamada
    expect(contador.incrementar).toHaveBeenCalledTimes(3);
  });

  it('✅ Puede simular localStorage', function() {
    // Crear un mock simple de localStorage
    var mockStorage = {
      datos: {},
      setItem: function(clave, valor) {
        this.datos[clave] = valor;
      },
      getItem: function(clave) {
        return this.datos[clave] || null;
      },
      removeItem: function(clave) {
        delete this.datos[clave];
      }
    };
    
    // Probar el mock
    mockStorage.setItem('nombre', 'Juan');
    expect(mockStorage.getItem('nombre')).toBe('Juan');
    
    mockStorage.removeItem('nombre');
    expect(mockStorage.getItem('nombre')).toBe(null);
  });

  it('✅ Puede simular una llamada asíncrona', function(done) {
    // Función que simula una llamada a una API
    function obtenerDatos() {
      return new Promise(function(resolve) {
        setTimeout(function() {
          resolve({ mensaje: 'Datos obtenidos' });
        }, 100);
      });
    }
    
    // Probar la función asíncrona
    obtenerDatos().then(function(datos) {
      expect(datos.mensaje).toBe('Datos obtenidos');
      done(); // Importante: decirle a Jasmine que terminó la prueba asíncrona
    });
  });
});