import { ISupplier } from "./supplier.types";

export interface IProduct {
  _id: string;
  name: string;
  price: number;
  minimumOrder: number;
  supplier: ISupplier; // Populated with full supplier object
  deleted: boolean;
}