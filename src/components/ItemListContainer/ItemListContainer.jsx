import { useEffect, useState } from "react";
import { ItemList } from "../ItemList/ItemList";
import { getProducts } from "../../services/productsService";
import { useParams } from "react-router-dom";
import "../../App.css";

export const ItemListContainer = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    //getProducts consulta con firestore pasando la categoria
    getProducts(category)
      .then((data) => setProducts(data))
      .catch((err) => console.log("Error al traer datos de Firestore:", err))
      .finally(() => setLoading(false));
  }, [category]);

  if (loading) return <p className="loading-text">Cargando Gridiron Store...</p>;

  return (
    <section className="store-section">
      {/*titulo dinamico sigue dependiendo de los seleccionado en URL */}
      <h2 className="category-title">
        {category ? category.toUpperCase() : "TODOS LOS PRODUCTOS"}
      </h2>

      <ItemList products={products} />
    </section>
  );
};