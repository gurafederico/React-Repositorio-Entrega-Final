import { Link } from "react-router-dom"; 
import { Nav } from "../Nav/Nav";
import "./Header.css";

export const Header = () => {
  return (
    <header className="Header">
      {}
      <Link to="/" className="LogoContainer">
        <img src="/logo.jpg" alt="Logo NFL Store" />
        <span className="HeaderTitle">Gridiron Store</span>
      </Link>
      
      <Nav />
    </header>
  );
};