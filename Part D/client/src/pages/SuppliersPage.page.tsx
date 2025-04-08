import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/auth.context";
import { ISupplier } from "@/types/supplier.types";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AdminGuard from "@/guards/AdminGuard";

function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<ISupplier[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { fetchSuppliers } = useAuth();
  useEffect(() => {
    const loadSuppliers = async () => {
      try {
        const response = await fetchSuppliers();
        if (!response) {
          setError("No suppliers found");
          return;
        }
        setSuppliers(response);
      } catch (err) {
        setError("Failed to load suppliers. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadSuppliers();
  }, [fetchSuppliers]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-600">Loading suppliers...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-red-500">{error}</p>
        <Button className="mt-4">
          <Link to="/home" className="text-white">
            Go to Home
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen py-8">
      <div className="w-full max-w-4xl p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">Suppliers</h1>
        {suppliers.length === 0 ? (
          <p className="text-gray-600 text-center">No suppliers found.</p>
        ) : (
          <ul className="space-y-4">
            {suppliers.map((supplier) => (
              <li
                key={supplier._id}
                className="p-4 border rounded shadow-sm flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-bold">{supplier.supplierName}</h3>
                  <p className="text-gray-700">
                    <strong>Email:</strong> {supplier.email}
                  </p>
                  <p className="text-gray-700">
                    <strong>Phone:</strong> {supplier.phone || "N/A"}
                  </p>
                </div>
                <Button>
                  <Link to={`/create-order/${supplier._id}`} className="text-white">
                    Create Order
                  </Link>
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AdminGuard(SuppliersPage);