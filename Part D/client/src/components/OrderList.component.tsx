import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IOrder } from "@/types/order.types";
import { useAuth } from "@/context/auth.context";

interface OrderListProps {
  orders: IOrder[];
  onAcceptOrder?: (orderId: string) => Promise<void>;
  onCompleteOrder?: (orderId: string) => Promise<void>;
}

export default function OrderList({ orders, onAcceptOrder, onCompleteOrder }: OrderListProps) {
  const { user } = useAuth();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{user?.role === "admin" ? "Outgoing Orders" : "Incoming Orders"}</CardTitle>
      </CardHeader>
      <CardContent>
        {orders.length === 0 ? (
          <p className="text-gray-600">
            {user?.role === "admin"
              ? "You have no outgoing orders."
              : "You have no incoming orders."}
          </p>
        ) : (
          <ul className="space-y-4">
            {orders.map((order) => (
              <li key={order._id} className="p-4 border rounded shadow-sm">
                <h3 className="text-lg font-bold">Order ID: {order._id}</h3>
                <p className="text-gray-700">
                  <strong>Status:</strong> {order.status}
                </p>
                <p className="text-gray-700">
                  <strong>Date:</strong> {new Date(order.date).toLocaleDateString()}
                </p>
                <p className="text-gray-700">
                  <strong>Products:</strong> {order.products.length} items
                </p>
                {user?.role === "supplier" && order.status === "pending" && (
                  <Button
                    className="mt-2"
                    onClick={() => onAcceptOrder && onAcceptOrder(order._id)}
                  >
                    Accept Order
                  </Button>
                )}
                {user?.role === "admin" && order.status !== "completed" && (
                  <Button
                    className="mt-2"
                    onClick={() => onCompleteOrder && onCompleteOrder(order._id)}
                  >
                    Mark as Completed
                  </Button>
                )}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
