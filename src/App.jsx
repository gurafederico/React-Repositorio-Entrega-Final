import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { Count } from "./components/Count/Count";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";

import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer.jsx";
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer.jsx";
import { Cart } from "./components/Cart/Cart.jsx";
import { ProductFormContainer } from "./components/adminComponents/ProductFormContainer.jsx";
import { ProductSuccess } from "./components/adminComponents/ProductSuccess.jsx";
// componente para listar, editar y borrar productos
import { AdminProductsList } from "./components/adminComponents/AdminProductsList/AdminProductsList.jsx";
import { CartProvider } from "./Context/CartContext.jsx";
import { PublicLayout } from "./layouts/PublicLayout";
import { AdminLayout } from "./layouts/AdminLayout";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { Dashboard } from "./components/adminComponents/Dashboard/Dashboard.jsx";
import { AuthProvider } from "./Context/AuthContext";
import { Login } from './components/Login/Login';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          {/* ----------------------rutas publicas -------------------------*/}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<ItemListContainer />} />
            {/* Ruta opcional para filtrar categorias */}
            <Route path="/category/:category" element={<ItemListContainer />} />
            <Route path="/product/:id" element={<ItemDetailContainer />} />
            <Route path="/carrito" element={<Cart />} />
          </Route>

          <Route path="/admin/login" element={<Login />} />

          {/* ----------------------------- admin --------------------------- */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            {/* Si el admin esta logueado, redirige a la ruta /admin/dashboard */}
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />

            {/* rutas para la administracion */}
            <Route path="products" element={<AdminProductsList />} />
            <Route path="products/edit/:id" element={<ProductFormContainer />} />

            <Route path="products/new" element={<ProductFormContainer />} />
            <Route path="products/success/:id" element={<ProductSuccess />} />
          </Route>
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;