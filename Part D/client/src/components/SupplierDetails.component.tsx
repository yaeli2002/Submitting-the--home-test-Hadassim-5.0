import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ISupplier } from "../types/supplier.types";

interface SupplierDetailsProps {
  user: ISupplier;
}

export default function SupplierDetails({ user }: SupplierDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Supplier Details</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">
          <strong>Name:</strong> {user.supplierName || "N/A"}
        </p>
        <p className="text-gray-700">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="text-gray-700">
          <strong>Phone:</strong> {user.phone || "N/A"}
        </p>
        <p className="text-gray-700">
          <strong>Role:</strong> {user.role}
        </p>
        <p className="text-gray-700">
          <strong>Account Created:</strong> {new Date(user.createdAt).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );
}