// tests/02-arrays.test.js
// 🎓 PRUEBAS CON ARRAYS PARA ESTUDIANTES
// IE2.2.1: Pruebas unitarias con listas

/* global describe, it, expect */
// ↑ Esta línea le dice al editor que estas funciones están disponibles globalmente

describe('🟡 NIVEL 2: Trabajando con Arrays', function() {
  
  it('✅ Puede contar elementos en un array', function() {
    var frutas = ['manzana', 'pera', 'naranja'];
    
    expect(frutas.length).toBe(3);
    
    // Agregar elemento
    frutas.push('banana');
    expect(frutas.length).toBe(4);
  });

  it('✅ Puede buscar un elemento en un array', function() {
    var numeros = [1, 2, 3, 4, 5];
    
    function buscarNumero(lista, numero) {
      return lista.indexOf(numero) !== -1;
    }
    
    expect(buscarNumero(numeros, 3)).toBe(true);
    expect(buscarNumero(numeros, 10)).toBe(false);
  });

  it('✅ Puede filtrar elementos de un array', function() {
    var numeros = [1, 2, 3, 4, 5, 6];
    
    function soloNumerosPares(lista) {
      return lista.filter(function(num) {
        return num % 2 === 0;
      });
    }
    
    var pares = soloNumerosPares(numeros);
    expect(pares).toEqual([2, 4, 6]);
    expect(pares.length).toBe(3);
  });

  it('✅ Puede sumar todos los números de un array', function() {
    var precios = [1000, 1500, 800, 2000];
    
    function sumarTodos(lista) {
      var total = 0;
      for (var i = 0; i < lista.length; i++) {
        total += lista[i];
      }
      return total;
    }
    
    expect(sumarTodos(precios)).toBe(5300);
    expect(sumarTodos([])).toBe(0);
    expect(sumarTodos([100])).toBe(100);
  });
});