import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useProducts } from "../context/product.context";
import SupplierGuard from "@/guards/SupplierGuard";
import { useNavigate } from "react-router";

function AddProductPage() {
  const { addProduct, loading, error } = useProducts();
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [minimumOrder, setMinimumOrder] = useState<number | "">("");

  const nav = useNavigate()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addProduct({
        name,
        price: Number(price),
        minimumOrder: Number(minimumOrder),
      });
      alert("Product added successfully!");
      setName("");
      setPrice("");
      setMinimumOrder("");
      nav("/profile");
    } catch (e) {
      alert("Failed to add product. Please check your input.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 w-screen">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Add Product</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <Input
              id="price"
              type="number"
              placeholder="Enter product price"
              value={price}
              onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
              required
            />
          </div>
          <div>
            <label htmlFor="minimumOrder" className="block text-sm font-medium text-gray-700">
              Minimum Order Quantity
            </label>
            <Input
              id="minimumOrder"
              type="number"
              placeholder="Enter minimum order quantity"
              value={minimumOrder}
              onChange={(e) => setMinimumOrder(e.target.value === "" ? "" : Number(e.target.value))}
              required
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Adding Product..." : "Add Product"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default SupplierGuard(AddProductPage);
