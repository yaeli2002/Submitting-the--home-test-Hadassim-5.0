import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import axios from "axios";
import { AuthProvider } from "./context/auth.context.tsx";
import { ProductsProvider } from "./context/product.context.tsx";
import { OrdersProvider } from "./context/order.context.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <ProductsProvider>
        <OrdersProvider>
          <App />
        </OrdersProvider>
      </ProductsProvider>
    </AuthProvider>
  </BrowserRouter>
);

axios.defaults.baseURL = "http://localhost:5001/api";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
