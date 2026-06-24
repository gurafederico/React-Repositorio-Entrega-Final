import { useEffect } from "react";
import { replace, useNavigate, useParams } from "react-router-dom";

export const ProductSuccess = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <section className="success-page">
      <div className="success-icon">✅</div>

      <h2>Producto cargado con éxito</h2>
      <p>ID de producto: {id}</p>
      <p>Puede cargar otro haciendo click en el botón.</p>

      <div className="success-actions" style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
        {/* boton para cargar otro producto */}
        <button
          className="btn bg-primary primary"
          onClick={() => navigate("/admin/products/new", { replace: true })}
        >
          Cargar nuevo producto
        </button>

        {/* boton para regresar al Dashboard */}
        <button
          className="btn bg-secondary secondary"
          onClick={() => navigate("/admin", { replace: true })}
        >
          Volver al Dashboard
        </button>
      </div>
    </section>
  );
};