import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import { useCart } from "../../Context/CartContext";
import { getCategories } from "../../services/productsService";

export const Nav = () => {
  const { getCartQuantity } = useCart();
  const totalItems = getCartQuantity();


  const [categories, setCategories] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);


  useEffect(() => {
    getCategories().then((data) => setCategories(data));
  }, []);

  // Funciones para abrir/cerrar el menú
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const closeDropdown = () => setDropdownOpen(false);

  return (
    <nav>
      <ul className="nav-list">
        <li>
          <Link to="/" onClick={closeDropdown}>HOME 🏈</Link>
        </li>

        <li>
          <Link to="/carrito" onClick={closeDropdown}>
            CARRITO <span>🛒</span>
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems}</span>
            )}
          </Link>
        </li>

        {/* menu desplagable */}
        <li className="dropdown-container">
          <button className="dropdown-button" onClick={toggleDropdown}>
            Categorias▾
          </button>

          {dropdownOpen && (
            <ul className="dropdown-menu">
              {categories.map((cat) => (
                <li key={cat}>
                  <Link to={`/category/${cat}`} onClick={closeDropdown}>
                    {cat.toUpperCase()}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};