import { useNavigate, useParams } from "react-router-dom";
import "./ProductFormContainer.css";
import { useState, useEffect } from "react";
import { ProductFormUI } from "./ProductFormUI";
import { validateProduct } from "../../utils/validateProduct";
import { uploadImage } from "../../services/uploadImage";
import { createProduct } from "../../services/productsService";
import { db } from "../../firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export const ProductFormContainer = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    detail: "",
    image: "",
  });

  useEffect(() => {
    if (isEditMode) {
      const getProductData = async () => {
        try {
          const docRef = doc(db, "products", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setProduct({ id: docSnap.id, ...docSnap.data() });
          } else {
            alert("El producto no existe");
            navigate("/admin/products");
          }
        } catch (error) {
          console.error("Error al traer producto:", error);
        }
      };
      getProductData();
    }
  }, [id, isEditMode, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    const chosenFile = e.target.files[0] || null;
    setFile(chosenFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const newErrors = validateProduct({
      ...product,
      file: isEditMode ? (file || "has-existing-image") : file
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      let imageUrl = product.image;

      if (file) {
        imageUrl = await uploadImage(file);
      }

      const productData = {
        ...product,
        price: Number(product.price),
        image: imageUrl,
      };

      if (isEditMode) {
        // modo edicion : actualizamos en firebase
        const docRef = doc(db, "products", id);
        await updateDoc(docRef, productData);
        alert("Producto modificado con éxito");
        navigate("/admin/products", { replace: true });
      } else {
        // modo creacion: alta tradicional
        const newId = await createProduct(productData);
        setProduct({ name: "", price: "", category: "", description: "", detail: "", image: "" });
        setFile(null);
        navigate(`/admin/products/success/${newId}`, { replace: true });
      }

    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container-wrapper">
      <ProductFormUI
        product={product}
        errors={errors}
        loading={loading}
        onChange={handleChange}
        onFileChange={handleFileChange}
        onSubmit={handleSubmit}
        isEditMode={isEditMode}
      />
    </div>
  );
};