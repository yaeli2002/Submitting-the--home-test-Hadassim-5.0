import React from "react";
import AuthGuard from "@/guards/AuthGuard";
import { useAuth } from "@/context/auth.context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function HomePage() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen py-8">
      <div className="w-full max-w-4xl p-6 bg-white rounded shadow">
        <h1 className="text-3xl font-bold mb-6 text-center">Welcome {user?.email}</h1>

        {/* Admin View */}
        {user?.role === "admin" && (
          <Card>
            <CardHeader>
              <CardTitle>Your Store</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                As an admin, you can manage your store and create orders from suppliers.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Suppliers:</strong> View and manage all suppliers.
                </li>
                <li>
                  <strong>Create Orders:</strong> Place orders for products from suppliers.
                </li>
                <li>
                  <strong>Profile:</strong> Manage your account details.
                </li>
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Supplier View */}
        {user?.role === "supplier" && (
          <Card>
            <CardHeader>
              <CardTitle>Incoming Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                As a supplier, you are waiting for orders from admins. Manage your products and fulfill orders.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Products:</strong> Add and manage your products.
                </li>
                <li>
                  <strong>Orders:</strong> View and fulfill incoming orders from admins.
                </li>
                <li>
                  <strong>Profile:</strong> Manage your account details.
                </li>
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Default View */}
        {!user && (
          <p className="text-gray-700 text-center">
            Please log in to access your account and view your dashboard.
          </p>
        )}
      </div>
    </div>
  );
}

export default AuthGuard(HomePage);