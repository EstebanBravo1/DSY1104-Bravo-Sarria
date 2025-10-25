import { createContext, useContext, useState, useEffect } from 'react';


const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    // Cargar carrito desde localStorage al iniciar
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Guardar en localStorage cada vez que cambie el carrito
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Agregar producto al carrito
  const addToCart = (producto, cantidad = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.codigo === producto.codigo);
      
      if (existingItem) {
        // Si ya existe, aumentar la cantidad
        return prevItems.map(item =>
          item.codigo === producto.codigo
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      } else {
        // Si no existe, agregarlo
        return [...prevItems, { ...producto, cantidad }];
      }
    });
  };

  // Quitar producto del carrito
  const removeFromCart = (codigo) => {
    setCartItems(prevItems => prevItems.filter(item => item.codigo !== codigo));
  };

  // Actualizar cantidad de un producto
  const updateQuantity = (codigo, cantidad) => {
    if (cantidad <= 0) {
      removeFromCart(codigo);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.codigo === codigo ? { ...item, cantidad } : item
      )
    );
  };

  // Vaciar carrito
  const clearCart = () => {
    setCartItems([]);
  };

  // Calcular total
  const getTotal = () => {
    return cartItems.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  };

  // Obtener cantidad total de items
  const getItemCount = () => {
    return cartItems.reduce((count, item) => count + item.cantidad, 0);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotal,
    getItemCount
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Hook personalizado para usar el contexto del carrito
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return context;
}
