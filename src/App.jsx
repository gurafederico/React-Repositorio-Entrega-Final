import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./Context/CartContext";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";
import { Cart } from "./components/Cart/Cart";
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        
        <Header />

        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/product/:id" element={<ItemDetailContainer />} />
        </Routes>
        
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;