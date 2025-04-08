import { IOrder } from "./order.types";
import { IUser } from "./user.types";

export interface IAdmin extends IUser {
    role: "admin"; // Overrides the role to "admin"
    outgoingOrders: IOrder[]; // Populated with full order objects
  }