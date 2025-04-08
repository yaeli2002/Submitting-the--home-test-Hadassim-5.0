import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IProduct } from "../types/product.types";

interface ProductListProps {
  products: IProduct[];
}

export default function ProductList({ products }: ProductListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Products</CardTitle>
      </CardHeader>
      <CardContent className=" overflow-y-scroll max-h-[500px]">
        {products.length === 0 ? (
          <p className="text-gray-600">You have no products listed.</p>
        ) : (
          <ul className="space-y-4">
            {products.map((product) => (
              <li key={product._id} className="p-4 border rounded shadow-sm">
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p className="text-gray-700">
                  <strong>Price:</strong> ${product.price.toFixed(2)}
                </p>
                <p className="text-gray-700">
                  <strong>Minimum Order:</strong> {product.minimumOrder}
                </p>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
