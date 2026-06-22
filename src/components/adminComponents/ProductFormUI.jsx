import { useNavigate } from "react-router-dom";
import "./ProductFormUI.css";

export const ProductFormUI = ({
  product,
  errors,
  loading,
  onChange,
  onFileChange,
  onSubmit,
}) => {
  const navigate = useNavigate();

  const isEditing = !!product.id || !!product.image;

  return (
    <section>
      <form className="product-form" onSubmit={onSubmit}>
        <h2>{isEditing ? "Modificar Producto" : "Agregar nuevo producto"}</h2>

        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={onChange}
            required
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div>
          <label>Precio:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={onChange}
            min="0"
            required
          />
          {errors.price && <p className="error">{errors.price}</p>}
        </div>

        <div>
          <label>Categoría:</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={onChange}
            required
          />
          {errors.category && <p className="error">{errors.category}</p>}
        </div>

        <div>
          <label>Descripción:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={onChange}
            required
          />
          {errors.description && <p className="error">{errors.description}</p>}
        </div>

        <div>
          <label>Detalle:</label>
          <textarea
            name="detail"
            value={product.detail || ""}
            onChange={onChange}
            required
          />
          {errors.detail && <p className="error">{errors.detail}</p>}
        </div>

        <div>
          <label>Imagen:</label>

          {isEditing && product.image && (
            <div className="current-image-preview" style={{ marginBottom: '10px' }}>
              <p style={{ fontSize: '0.85rem', color: '#666', margin: '0 0 5px 0' }}>Imagen actual:</p>
              <img
                src={product.image}
                alt="Vista previa del producto"
                style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ddd' }}
              />
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={onFileChange}
            required={!isEditing}
          />
          {errors.file && <p className="error">{errors.file}</p>}
        </div>

        {/* contenedor de botones alineados */}
        <div className="form-actions">
          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Guardar"}
          </button>

          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => navigate(-1)} // retorna a la pagina anterior en el historial
          >
            Volver
          </button>
        </div>

        {errors.general && <p className="error">{errors.general}</p>}
      </form>
    </section>
  );
};