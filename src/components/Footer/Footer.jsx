import "./Footer.css";
import { FaInstagram, FaWhatsapp } from "react-icons/fa"; 

export const Footer = () => {
  return (
    <footer className="footer-container">
      <p>© 2026 Gridiron Store Argentina &trade; |</p>
      <nav>
        <ul className="nav-list">
          <li>
            <a href="https://instagram.com/tu_usuario" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="social-icon" /> Instagram
            </a>
          </li>
          <li>
            <a href="https://wa.me/tu_numero_de_telefono" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp className="social-icon" /> WhatsApp
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
};