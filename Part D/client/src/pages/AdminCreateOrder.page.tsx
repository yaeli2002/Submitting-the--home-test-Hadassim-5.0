import React, { useEffect, useState } from "react";
import { useOrders } from "@/context/order.context";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ISupplier } from "@/types/supplier.types";
import { IProduct } from "@/types/product.types";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "@/context/auth.context";
import AdminGuard from "@/guards/AdminGuard";

function AdminCreateOrderPage() {
  const { addOrder, loading, error, setError } = useOrders();
  const { fetchSupplierById, user } = useAuth();
  const { supplierId } = useParams();
  const [selectedProducts, setSelectedProducts] = useState<
    { product: IProduct; quantity: number }[]
  >([]);
  const [orderDate, setOrderDate] = useState<string>("");
  const [supplier, setSupplier] = useState<ISupplier | null>(null);

  const nav = useNavigate();
  useEffect(() => {
    if (supplierId) {
      setError(null);
      (async () => {
        const response = await fetchSupplierById(supplierId);
        if (!response) {
          alert("Supplier not found");
          nav("/suppliers");
          return;
        }
        if (response.supplierProducts.length === 0) {
          alert("No products available for this supplier");
          nav("/suppliers");
          return;
        }
        setSupplier(response);
      })();
    } else {
      alert("Supplier ID is missing");
      nav("/home");
    }
  }, [supplierId]);

  const handleAddProduct = (product: IProduct) => {
    const existingProduct = selectedProducts.find((p) => p.product._id === product._id);
    if (existingProduct) {
      setSelectedProducts((prev) =>
        prev.map((p) => (p.product._id === product._id ? { ...p, quantity: p.quantity + 1 } : p))
      );
    } else {
      setSelectedProducts((prev) => [...prev, { product, quantity: 1 }]);
    }
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    setSelectedProducts((prev) =>
      prev.map((p) => (p.product._id === productId ? { ...p, quantity: Math.max(1, quantity) } : p))
    );
  };

  const handleRemoveProduct = (productId: string) => {
    setSelectedProducts((prev) => prev.filter((p) => p.product._id !== productId));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const products = selectedProducts.map((p) => ({
        product: p.product._id as any,
        quantity: p.quantity,
      }));
      await addOrder({
        supplierId: supplier!._id,
        products,
        date: new Date(orderDate).toISOString(),
      });
      alert("Order created successfully!");
      setSelectedProducts([]);
      setOrderDate("");
      nav("/profile");
    } catch (err) {
      alert("Failed to create order. Please try again.");
    }
  };
  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen py-8">
      <div className="w-full max-w-4xl p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Create Order for {supplier?.supplierName}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Supplier Products */}
          <Card>
            <CardHeader>
              <CardTitle>Supplier Products</CardTitle>
            </CardHeader>
            <CardContent>
              {supplier?.supplierProducts.length === 0 ? (
                <p className="text-gray-600">This supplier has no products available.</p>
              ) : (
                <ul className="space-y-4">
                  {supplier?.supplierProducts.map((product) => (
                    <li key={product._id} className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold">{product.name}</h3>
                        <p className="text-gray-700">
                          <strong>Price:</strong> ${product.price.toFixed(2)}
                        </p>
                      </div>
                      <Button onClick={() => handleAddProduct(product)}>Add</Button>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          {/* Selected Products */}
          {selectedProducts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Selected Products</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {selectedProducts.map((p) => (
                    <li key={p.product._id} className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold">{p.product.name}</h3>
                        <p className="text-gray-700">
                          <strong>Price:</strong> ${p.product.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          value={p.quantity}
                          onChange={(e) =>
                            handleQuantityChange(p.product._id, parseInt(e.target.value, 10))
                          }
                          className="w-20"
                          min={1}
                        />
                        <Button
                          variant="destructive"
                          onClick={() => handleRemoveProduct(p.product._id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Order Details */}
          <div>
            <label htmlFor="orderDate" className="block text-sm font-medium text-gray-700">
              Order Date
            </label>
            <Input
              id="orderDate"
              type="date"
              value={orderDate}
              onChange={(e) => setOrderDate(e.target.value)}
              required
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-sm text-red-500">{error}</p>}

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating Order..." : "Create Order"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AdminGuard(AdminCreateOrderPage);
