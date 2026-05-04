import "./Item.css";

export const Item = ({ name, description, price, image, children }) => {
  return (
    <article className="card">
      <img src={image} alt={`foto de ${name}`} />
      
      <h3>{name}</h3>
      
      {/* descripcion del casco */}
      <p className="description">{description}</p>
      
      {/* $ en dolares */}
      <p className="price">US$ {price}</p>
      
      {children}
    </article>
  );
};
