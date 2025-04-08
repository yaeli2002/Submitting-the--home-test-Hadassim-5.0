import React, { createContext, useContext, useEffect, useState } from "react";
import { IUser } from "../types/user.types";
import { ISupplier } from "../types/supplier.types";

import {
  login as loginService,
  register,
  getMe,
  getSupplierById,
  getSuppliers,
} from "../network/auth.service";
import { IProduct } from "@/types/product.types";
import { IOrder } from "@/types/order.types";
import { IAdmin } from "@/types/admin.types";

interface IAuthContext {
  user: IUser | null;
  token: string | null;
  error: string | null;
  loading: boolean;
  registerSupplier: (data: RegisterRequest) => Promise<IUser>;
  addProductToSupplierLocally: (data: IProduct) => Promise<void>;
  addOrderToAdminLocally: (data: IOrder) => Promise<void>;
  updateOrderForAdminLocally: (data: IOrder) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  fetchSupplierById: (id: string) => Promise<ISupplier | null>;
  fetchSuppliers: () => Promise<ISupplier[] | null>;
  logout: () => void;
  isAuthenticated: () => boolean;
}

interface RegisterRequest {
  email: string;
  password: string;
  phone: string;
  supplierName?: string;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Function to register a supplier
  const registerSupplier = async (data: RegisterRequest) => {
    try {
      setLoading(true);
      const response = await register(data);
      if (response.status === 201) {
        return response.data;
      } else {
        setError(response.message);
        throw new Error(response.message);
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateOrderForAdminLocally = async (data: IOrder) => {
    setUser((prevUser) => {
      if (prevUser && prevUser.role === "admin") {
        return {
          ...prevUser,
          outgoingOrders: (prevUser as IAdmin).outgoingOrders.map((order) =>
            order._id === data._id ? data : order
          ),
        };
      }
      return prevUser;
    });
  };
  const addOrderToAdminLocally = async (data: IOrder) => {
    setUser((prevUser) => {
      if (prevUser && prevUser.role === "admin") {
        return {
          ...prevUser,
          outgoingOrders: [...(prevUser as IAdmin).outgoingOrders, data],
        };
      }
      return prevUser;
    });
  };
  const addProductToSupplierLocally = async (data: IProduct) => {
    setUser((prevUser) => {
      if (prevUser && prevUser.role === "supplier") {
        return {
          ...prevUser,
          supplierProducts: [...(prevUser as ISupplier).supplierProducts, data],
        };
      }
      return prevUser;
    });
  };

  // Function to log in
  const login = async (email: string, password: string) => {
    setLoading(true);
    const response = await loginService({ email, password });
    if (response.status === 200) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
    } else {
      setError(response.message);
      throw new Error(response.message);
    }
    setLoading(false);
  };

  // Function to log out
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  const fetchSupplierById = async (id: string) => {
    try {
      const response = await getSupplierById(id);
      if (response.status === 200) {
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching supplier by ID:", error);
      return null;
    }
  };
  const fetchSuppliers = async () => {
    const response = await getSuppliers();
    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  };

  // Function to check if the user is authenticated
  const isAuthenticated = () => !!token;

  // Function to fetch the current user
  const fetchUser = async () => {
    if (!token) return;
    const response = await getMe();
    if (response.status === 200) {
      setUser(response.data);
    } else {
      logout();
    }
  };

  // Effect to check for a token and fetch user data on mount
  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        registerSupplier,
        login,
        logout,
        isAuthenticated,
        error,
        loading,
        fetchSupplierById,
        fetchSuppliers,
        addProductToSupplierLocally,
        addOrderToAdminLocally,
        updateOrderForAdminLocally,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
