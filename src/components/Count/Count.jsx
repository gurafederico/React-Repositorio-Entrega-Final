import "./Count.css";


export const Count = ({ stock, onAdd }) => {
  
  return (
    <div className="count-container-simple">
      <button 
        className="btn-confirm" 
        onClick={() => onAdd(1)} 
        disabled={stock <= 0}
      >
        {stock <= 0 ? "SIN STOCK" : "AGREGAR AL CARRITO 🛒"}
      </button>
    </div>
  );
};