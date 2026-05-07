import { useState } from "react"; // Importamos el hook
import { Count } from "../Count/Count";
import "./ItemDetail.css"; 
import { useCart } from "../Context/CartContext";

export const ItemDetail = ({ item }) => {
  const { addToCart } = useCart();
  const [agregado, setAgregado] = useState(false); 

  const onAdd = (quantity) => {
    addToCart(item, quantity);
    
    
    setAgregado(true);

    
    setTimeout(() => {
      setAgregado(false);
    }, 2500);

    console.log(`Agregado al carrito: ${item.name} - cantidad: ${quantity}`);
  };

  if (!item) {
    return (
      <div className="detail-master-container">
        <h2 style={{ color: "white" }}>Cargando producto...</h2>
      </div>
    );
  }

  return (
    <div className="detail-master-container">
      <div className="detail-box">
        
        <div className="info-side">
          <h2 className="team-title">{item.name}</h2>
          <p className="description-text">
            {item.detail || item.description}
          </p>
        </div>

        <div className="card-side">
          <img 
            src={item.image} 
            alt={item.name} 
            className="mini-img" 
          />
          
          <div className="mini-content">
            <span className="mini-price">US$ {item.price}</span>
            
            <Count 
              stock={item.stock || 10} 
              initial={1} 
              onAdd={onAdd} 
            />

            {/* cartel si se hace click en el boton dea agregar */}
            {agregado && (
              <div className="confirmacion-agregado">
                <p>🏈 ¡Sumaste el producto al carrito! 🏈</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};