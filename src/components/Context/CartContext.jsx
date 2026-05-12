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

  const addToCart = (product, quantity) => {
    
    const itemInCart = cart.find(item => String(item.id) === String(product.id));
    
    if (itemInCart) {
      const updatedCart = cart.map(item =>
        String(item.id) === String(product.id)
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      setCart(updatedCart);
    } else {
      setCart(prevCart => [...prevCart, { ...product, quantity }]);
    }
  };

  const decreaseQuantity = (id) => {
    const itemInCart = cart.find(item => String(item.id) === String(id));
    
    if (itemInCart && itemInCart.quantity > 1) {
      const updatedCart = cart.map(item =>
        String(item.id) === String(id)
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      setCart(updatedCart);
    } else {
      removeItem(id);
    }
  };

  const clearCart = () => setCart([]);

  const removeItem = (id) => {
    const cartWithoutItem = cart.filter(item => String(item.id) !== String(id));
    setCart(cartWithoutItem);
  };

  const getCartQuantity = () =>
    cart.reduce((acc, item) => acc + item.quantity, 0);

  const getCartTotal = () =>
    cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, decreaseQuantity, clearCart, getCartQuantity, getCartTotal, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}