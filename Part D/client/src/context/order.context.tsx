import React, { createContext, useContext, useEffect, useState } from "react";
import { IOrder } from "../types/order.types";
import {
  getAllOrders,
  getOrdersBySupplier,
  createOrder,
  updateOrderStatus,
} from "../network/order.service";
import { useAuth } from "./auth.context";

interface IOrdersContext {
  orders: IOrder[];
  order: IOrder | null;
  loading: boolean;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  fetchOrders: () => Promise<void>;
  fetchOrdersBySupplier: (supplierId: string) => Promise<void>;
  addOrder: (data: Partial<IOrder> & { supplierId: string }) => Promise<void>;
  changeOrderStatus: (
    orderId: string,
    status: "pending" | "completed" | "canceled" | "accepted"
  ) => Promise<void>;
}

const OrdersContext = createContext<IOrdersContext | undefined>(undefined);

export const OrdersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [order, setOrder] = useState<IOrder | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { addOrderToAdminLocally, updateOrderForAdminLocally } = useAuth();

  // Fetch all orders
  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    const response = await getAllOrders();
    if (response.status === 200) {
      setOrders(response.data);
    } else {
      setError(response.message);
    }
    setLoading(false);
  };

  // Fetch orders by supplier
  const fetchOrdersBySupplier = async (supplierId: string) => {
    setLoading(true);
    setError(null);
    const response = await getOrdersBySupplier(supplierId);
    if (response.status === 200) {
      setOrders(response.data);
    } else {
      setError(response.message);
    }
    setLoading(false);
  };

  // Add a new order
  const addOrder = async (data: Partial<IOrder> & { supplierId: string }) => {
    setLoading(true);
    setError(null);
    const response = await createOrder(data);
    if (response.status === 201) {
      setOrders((prev) => [...prev, response.data]);
      addOrderToAdminLocally(response.data);
    } else {
      setError(response.message);
    }
    setLoading(false);
  };

  // Change the status of an order
  const changeOrderStatus = async (
    orderId: string,
    status: "pending" | "completed" | "canceled" | "accepted"
  ) => {
    setLoading(true);
    setError(null);
    const response = await updateOrderStatus(orderId, status);
    if (response.status === 200) {
      setOrders((prev) => prev.map((order) => (order._id === orderId ? response.data : order)));
      updateOrderForAdminLocally(response.data);
    } else {
      setError(response.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <OrdersContext.Provider
      value={{
        orders,
        order,
        loading,
        error,
        fetchOrders,
        fetchOrdersBySupplier,
        addOrder,
        changeOrderStatus,
        setError,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = (): IOrdersContext => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrdersProvider");
  }
  return context;
};
