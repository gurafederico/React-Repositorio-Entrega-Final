import { Link } from "react-router-dom";
import "./Nav.css";
/* 1. Importamos el hook del contexto */
import { useCart } from "../Context/CartContext";

export const Nav = () => {
  /* 2. Extraemos la función que cuenta la cantidad total */
  const { getCartQuantity } = useCart();

  return (
    <nav>
      <ul className="nav-list">
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/carrito"}>
            {/* 3. Mostramos el número dinámicamente */}
            CARRITO <span>🛒</span>
            {getCartQuantity() > 0 && (
              <span className="cart-badge">{getCartQuantity()}</span>
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
};