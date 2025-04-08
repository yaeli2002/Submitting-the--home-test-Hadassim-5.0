import React from "react";
import { useAuth } from "@/context/auth.context";
import OrderList from "@/components/OrderList.component";
import { useOrders } from "@/context/order.context";
import { IAdmin } from "@/types/admin.types";
import AdminGuard from "@/guards/AdminGuard";

function AdminProfilePage() {
  const { user } = useAuth();
  const { changeOrderStatus } = useOrders();

  async function handleCompleteOrder(orderId: string) {
    try {
      await changeOrderStatus(orderId, "completed");
      alert("Order status changed to completed!");
    } catch (error) {
      console.error("Error changing order status:", error);
      alert("Failed to change order status.");
    }
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-600">
          You must be logged in as an admin to view this page.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen w-screen">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Admin Profile</h1>
        <div className="space-y-8">
          <OrderList
            orders={(user as IAdmin).outgoingOrders}
            onCompleteOrder={handleCompleteOrder}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminGuard(AdminProfilePage);