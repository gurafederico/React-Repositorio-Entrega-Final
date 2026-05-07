import { Link } from "react-router-dom";
import "./Nav.css";
import { useCart } from "../Context/CartContext";

export const Nav = () => {
  
  const { getCartQuantity } = useCart();

  return (
    <nav>
      <ul className="nav-list">
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/carrito"}>
            
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