import { useState, useContext, createContext } from 'react';

export const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const isInCart = (id) => {
    return cart.some(item => String(item.id) === String(id));
  };

  const addToCart = (product, quantity) => {
    if (isInCart(product.id)) {
      setCart(prevCart =>
        prevCart.map(item =>
          String(item.id) === String(product.id)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCart(prevCart => [...prevCart, { ...product, quantity }]);
    }
  };

  
  const decreaseQuantity = (id) => {
  setCart(prevCart =>
    prevCart
      .map(item =>
        String(item.id) === String(id)
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter(item => item.quantity > 0)
  );
};

  const removeItem = (id) => {
    setCart(cart.filter(item => String(item.id) !== String(id)));
  };

  const clearCart = () => setCart([]);

  const getCartQuantity = () => cart.reduce((acc, item) => acc + item.quantity, 0);
  const getCartTotal = () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      isInCart, 
      removeItem, 
      decreaseQuantity,
      clearCart, 
      getCartQuantity, 
      getCartTotal 
    }}>
      {children}
    </CartContext.Provider>
  );
};