import { IProduct } from "./product.types";
import { IOrder } from "./order.types";
import { IUser } from "./user.types";

export interface ISupplier extends IUser {
    role: "supplier"; // Overrides the role to "supplier"
    supplierName?: string;
    phone: string;
    supplierProducts: IProduct[]; // Populated with full product objects
    incomingOrders: IOrder[]; // Populated with full order objects
  }