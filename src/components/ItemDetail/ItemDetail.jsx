/* ItemDetail.jsx*/

import { useState } from "react"; 
import { Count } from "../Count/Count";
import { useCart } from "../../Context/CartContext"; 
import { Link } from "react-router-dom";
import "./ItemDetail.css"; 

export const ItemDetail = ({ item }) => {

  const contextValues = useCart();
  
  
  const { addToCart, isInCart } = contextValues;
  const [agregado, setAgregado] = useState(false); 

  const onAdd = (quantity) => {
    addToCart(item, quantity);
    setAgregado(true);
  };

  
  const yaEsta = (typeof isInCart === "function") ? isInCart(item.id) : false;

  return (
    <div className="detail-master-container">
      <div className="detail-box">
        <div className="info-side">
          <h2 className="team-title">{item.name}</h2>
          <p className="description-text">{item.detail || item.description}</p>
        </div>

        <div className="card-side">
          <img src={item.image} alt={item.name} className="mini-img" />
          <div className="mini-content">
            <span className="mini-price">US$ {item.price}</span>
            
            { (agregado || yaEsta) ? (
              <div className="confirmacion-agregado">
                <p>🏈 ¡Producto en el carrito! 🏈</p>
                <Link to="/carrito" className="btn-ir-carrito">
                  Ir al carrito 🛒
                </Link>
              </div>
            ) : (
              <Count stock={item.stock || 10} initial={1} onAdd={onAdd} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};