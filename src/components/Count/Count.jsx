import "./Count.css";

// Recibimos stock y onAdd por props desde ItemDetail
export const Count = ({ stock, onAdd }) => {
  
  return (
    <div className="count-container-simple">
      <button 
        className="btn-confirm" 
        // Ejecutamos onAdd mandando siempre 1 unidad por defecto
        onClick={() => onAdd(1)} 
        disabled={stock <= 0}
      >
        {stock <= 0 ? "SIN STOCK" : "AGREGAR AL CARRITO 🛒"}
      </button>
    </div>
  );
};