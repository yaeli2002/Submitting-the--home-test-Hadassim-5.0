import { Route, Routes, useLocation } from "react-router";
import "./App.css";
import WelcomePage from "./pages/Welcome.page";
import HomePage from "./pages/Home.page";
import LoginPage from "./pages/Login.page";
import RegisterPage from "./pages/Register.page";
import AddProductPage from "./pages/AddProduct.page";
import ProfilePage from "./pages/Profile.page";
import AdminCreateOrderPage from "./pages/AdminCreateOrder.page";
import SuppliersPage from "./pages/SuppliersPage.page";
import Toolbar from "./components/Toolbar.component";
function App() {
  const location = useLocation();

  // Hide toolbar on login and register pages
  const hideToolbar = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="min-h-screen bg-gray-100 w-screen">
      {!hideToolbar && <Toolbar />}
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/suppliers" element={<SuppliersPage />} />
        <Route path="/create-order/:supplierId" element={<AdminCreateOrderPage />} />
        <Route path="/add-product" element={<AddProductPage />} />
        <Route path="/products" element={<div>Products</div>} />
        <Route path="/orders" element={<div>Orders</div>} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;