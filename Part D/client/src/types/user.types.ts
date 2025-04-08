export interface IUser {
  _id: string;
  email: string;
  role: "admin" | "supplier";
  createdAt: string;
  updatedAt: string;
}
