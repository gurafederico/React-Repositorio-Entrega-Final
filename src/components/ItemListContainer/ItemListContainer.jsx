import { useEffect, useState } from "react";
import { ItemList } from "../ItemList/ItemList";

export const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  /* pedido al archivo local */
  useEffect(() => {
    setLoading(true);

    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log("hubo un error:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>cargando...</p>;

  return (
    <section>
      <ItemList products={products} />
    </section>
  );
};