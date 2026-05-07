import { useCart } from "../Context/CartContext";
import { Link } from "react-router-dom";
import "./Cart.css"; 

export const Cart = () => {
  
  
  const { cart, clearCart, getCartTotal, removeItem, addToCart, decreaseQuantity } = useCart();

  if (cart.length === 0) {
    return (
      <div className="empty-cart-msg">
        <h2>EL CARRITO ESTA VACIO</h2>
        <Link to="/" className="btn-back">Volver a los productos</Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1 className="cart-title">TU PEDIDO</h1>
      
      <div className="cart-list">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            
            <img src={item.image} alt={item.name} className="cart-img-mini" />
            
            <div className="cart-item-info">
              <h3>{item.name}</h3>
              
              {/* cantidad con botones + y - */}
              <div className="cart-qty-selector">
                <button 
                  className="btn-qty" 
                  onClick={() => decreaseQuantity(item.id)}
                >
                  -
                </button>
                <span className="qty-number">{item.quantity}</span>
                <button 
                  className="btn-qty" 
                  onClick={() => addToCart(item, 1)}
                >
                  +
                </button>
              </div>
              
              <button 
                className="btn-delete-item" 
                onClick={() => removeItem(item.id)}
              >
                Eliminar articulo 🗑️
              </button>
            </div>

            <div className="cart-item-price">
              <p className="price-unit">PRECIO: US$ {item.price}</p>
              <p className="price-subtotal">SUBTOTAL: US$ {item.price * item.quantity}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-total-section">
        <h2 className="total-text">TOTAL: US$ {getCartTotal()}</h2>
        
        <div className="cart-buttons-container">
          <button onClick={clearCart} className="btn-clear">
            VACIAR CARRITO
          </button>
          
          <button 
            className="btn-checkout" 
            onClick={() => alert("¡Pedido procesado! Touchdown 🏈")}
          >
            FINALIZAR COMPRA
          </button>
        </div>
      </div>
    </div>
  );
};