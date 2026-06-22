import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { db } from "../../../firebase/config"; // Tu config de firebase
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import "./AdminProductsList.css";

export const AdminProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const currentMode = location.state?.mode || "edit";

  // 1. cargar productos de Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(docs);
      } catch (error) {
        console.error("Error al traer productos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // eliminar un producto
  const handleDelete = async (id, name) => {
    const confirmDelete = window.confirm(`¿Seguro que querés eliminar ${name}?`);
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "products", id));
      // actuliza el estado local para quitarlo de la lista sin recargar
      setProducts(products.filter(prod => prod.id !== id));
      alert("Producto eliminado con éxito");
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("No se pudo eliminar el producto");
    }
  };

  if (loading) return <p>Cargando productos...</p>;

  return (
    <div className="admin-list-container">
      <h2>Gestión de Productos</h2>
      <button onClick={() => navigate("/admin/dashboard")} className="btn-back">
        Volver al Dashboard
      </button>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod.id}>
              <td>
                <img src={prod.image} alt={prod.name} className="admin-thumb" />
              </td>
              <td>{prod.name}</td>
              <td>{prod.category}</td>
              <td>${prod.price}</td>
              <td>
                {/* click para ir al formulario*/}
                {currentMode === "edit" && (
                  <button
                    onClick={() => navigate(`/admin/products/edit/${prod.id}`)}
                    className="btn-edit"
                  >
                    ✏️ Modificar
                  </button>
                )}
                {currentMode === "delete" && (
                  <button
                    onClick={() => handleDelete(prod.id, prod.name)}
                    className="btn-delete"
                  >
                    🗑️ Eliminar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};