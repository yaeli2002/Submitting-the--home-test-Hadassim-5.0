import { IProduct } from "./product.types";
import { ISupplier } from "./supplier.types";

export interface IOrder {
  _id: string;
  date: string; // ISO string format
  status: "pending" | "completed" | "canceled" | "accepted";
  products: {quantity: number, product: IProduct}[]; // Populated with full product objects
  supplier: ISupplier; // Populated with full supplier object
}
