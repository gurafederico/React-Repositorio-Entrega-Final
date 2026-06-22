import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { useAuth } from "../../../Context/AuthContext";

export const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();

      navigate("/admin/login");
    } catch (error) {
      console.error("Error al cerrar sesión desde el Dashboard:", error);
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h2>Panel de administración</h2>

        <div className="header-actions">
          <Link className="btn primary" to="/">
            Volver a la tienda
          </Link>
          <button className="btn bg-delete primary" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </header>

      <section className="dashboard-actions">
        <h3>Acciones rápidas</h3>

        <div className="actions-grid">
          {/* para agregar un producto de la db*/}
          <Link to="/admin/products/new" className="action-card">
            ➕ Cargar
          </Link>

          {/* para modificar un producto de la db*/}
          <Link to="/admin/products" state={{ mode: "edit" }} className="action-card">
            ✏️ Modificar
          </Link>

          {/* para eliminar un producto de la db* */}
          <Link to="/admin/products" state={{ mode: "delete" }} className="action-card">
            🗑️ Eliminar
          </Link>
        </div>
      </section>

      <section className="dashboard-help">
        <h3>Ayuda</h3>
        <p>Desde este panel podés gestionar los productos de la tienda.</p>
      </section>
    </div>
  );
};