// tests/04-proyecto.test.js
// 🎓 PRUEBAS RELACIONADAS CON EL PROYECTO
// IE2.2.1 y IE2.3.1: Casos reales del e-commerce

/* global describe, it, expect */
// ↑ Esta línea le dice al editor que estas funciones están disponibles globalmente

describe('🟣 NIVEL 4: Casos del Proyecto Real', function() {
  
  it('✅ Puede formatear precios en pesos chilenos', function() {
    function formatearPrecio(precio) {
      return '$' + precio.toLocaleString('es-CL');
    }
    
    expect(formatearPrecio(1000)).toBe('$1.000');
    expect(formatearPrecio(15000)).toBe('$15.000');
    expect(formatearPrecio(500)).toBe('$500');
  });

  it('✅ Puede crear un producto válido', function() {
    function crearProducto(codigo, nombre, precio, categoria) {
      return {
        codigo: codigo,
        nombre: nombre,
        precio: precio,
        categoria: categoria,
        stock: 0,
        activo: true
      };
    }
    
    var manzana = crearProducto('FR001', 'Manzana Roja', 1500, 'frutas');
    
    expect(manzana.codigo).toBe('FR001');
    expect(manzana.nombre).toBe('Manzana Roja');
    expect(manzana.precio).toBe(1500);
    expect(manzana.categoria).toBe('frutas');
    expect(manzana.activo).toBe(true);
  });

  it('✅ Puede calcular el total del carrito de compras', function() {
    var carrito = [
      { producto: 'Manzana', precio: 1000, cantidad: 2 },
      { producto: 'Pan', precio: 800, cantidad: 1 },
      { producto: 'Leche', precio: 1200, cantidad: 3 }
    ];
    
    function calcularTotal(items) {
      var total = 0;
      for (var i = 0; i < items.length; i++) {
        total += items[i].precio * items[i].cantidad;
      }
      return total;
    }
    
    var total = calcularTotal(carrito);
    expect(total).toBe(6400); // (1000*2) + (800*1) + (1200*3)
  });

  it('✅ Puede buscar productos por nombre', function() {
    var productos = [
      { codigo: 'FR001', nombre: 'Manzana Roja', categoria: 'frutas' },
      { codigo: 'FR002', nombre: 'Manzana Verde', categoria: 'frutas' },
      { codigo: 'VE001', nombre: 'Lechuga', categoria: 'verduras' },
      { codigo: 'PA001', nombre: 'Pan Integral', categoria: 'panaderia' }
    ];
    
    function buscarProductos(lista, termino) {
      return lista.filter(function(producto) {
        return producto.nombre.toLowerCase().includes(termino.toLowerCase());
      });
    }
    
    var manzanas = buscarProductos(productos, 'manzana');
    expect(manzanas.length).toBe(2);
    expect(manzanas[0].nombre).toContain('Manzana');
    
    var pan = buscarProductos(productos, 'pan');
    expect(pan.length).toBe(1);
    expect(pan[0].codigo).toBe('PA001');
  });

  it('✅ Puede validar datos de usuario', function() {
    function validarUsuario(usuario) {
      var errores = [];
      
      if (!usuario.nombre || usuario.nombre.trim() === '') {
        errores.push('Nombre es requerido');
      }
      
      if (!usuario.email || !usuario.email.includes('@')) {
        errores.push('Email inválido');
      }
      
      if (!usuario.telefono || usuario.telefono.length < 8) {
        errores.push('Teléfono debe tener al menos 8 dígitos');
      }
      
      return {
        valido: errores.length === 0,
        errores: errores
      };
    }
    
    // Usuario válido
    var usuarioValido = {
      nombre: 'Juan Pérez',
      email: 'juan@email.com',
      telefono: '987654321'
    };
    
    var resultado1 = validarUsuario(usuarioValido);
    expect(resultado1.valido).toBe(true);
    expect(resultado1.errores.length).toBe(0);
    
    // Usuario inválido
    var usuarioInvalido = {
      nombre: '',
      email: 'email-sin-arroba',
      telefono: '123'
    };
    
    var resultado2 = validarUsuario(usuarioInvalido);
    expect(resultado2.valido).toBe(false);
    expect(resultado2.errores.length).toBe(3);
  });
});