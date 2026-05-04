import { Count } from "../Count/Count";
import "./ItemDetail.css"; 

export const ItemDetail = ({ item }) => {
  
  const onAdd = (quantity) => {
    console.log(`Agregado al carrito: ${item.name} - Cantidad: ${quantity}`);
  };

  // si el item no carga, muestro mensaje
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
          <div className="product-card-mini">
            
            <img 
              src={item.image} 
              alt={item.name} 
              className="mini-img" 
            />
            
            <div className="mini-content">
              <span className="mini-price">US$ {item.price}</span>
              
              <Count stock={item.stock || 10} initial={1} onAdd={onAdd} />
              
              <button className="btn-confirm" onClick={() => onAdd(1)}>
                Agregar al carrito 🛒
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};