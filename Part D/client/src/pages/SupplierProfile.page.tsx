import React from "react";
import { useAuth } from "../context/auth.context";
import SupplierDetails from "@/components/SupplierDetails.component";
import ProductList from "@/components/ProductList.component";
import OrderList from "@/components/OrderList.component";
import { ISupplier } from "@/types/supplier.types";
import SupplierGuard from "@/guards/SupplierGuard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { useOrders } from "@/context/order.context";

function SupplierProfilePage() {
  const { user } = useAuth();
  const { changeOrderStatus } = useOrders();

  async function changeStatus() {
    try {
      await changeOrderStatus("orderId", "accepted");
      alert("Order status changed successfully!");
    } catch (error) {
      console.error("Error changing order status:", error);
      alert("Failed to change order status.");
    }
  }
  if (!user || user.role !== "supplier") {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-600">
          You must be logged in as a supplier to view this page.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen w-screen">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Supplier Profile</h1>
        <div className="space-y-8">
          <SupplierDetails user={user as ISupplier} />
          <div className="flex justify-end">
            <Button>
              <Link to="/add-product" className="text-white">
                Add New Product
              </Link>
            </Button>
          </div>
          <ProductList products={(user as ISupplier).supplierProducts} />
          <OrderList onAcceptOrder={changeStatus} orders={(user as ISupplier).incomingOrders} />
        </div>
      </div>
    </div>
  );
}

export default SupplierGuard(SupplierProfilePage);
