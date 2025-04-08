import dotenv from "dotenv";
import mongoose from "mongoose";
import { AdminModel } from "./models/Admin.model";
import { SupplierModel } from "./models/Supplier.model";
dotenv.config();

export async function insertSampleAccounts(): Promise<void> {
  const existing = await AdminModel.findOne({ email: "admin@hotmail.com" });
  if (!existing) {
    await AdminModel.create({
      _id: new mongoose.Types.ObjectId("67f4eb59a1511ac53c5d54e6"),
      email: "admin@hotmail.com",
      password: "$2b$10$qLF8jcuTZo14tKcUPjRg9OBkEmz93kbeMvTgjvWGVmx8MqfP7FLKS", // 123456Aa!
      phone: "123123",
      role: "admin",
      supplierName: "ron",
      supplierProducts: [],
      deleted: false,
      createdAt: new Date(1744104281035),
      updatedAt: new Date(1744110729222),
      outgoingOrders: [],
    });
    console.log("Sample admin inserted.");
  }
  const existingSupplier = await SupplierModel.findOne({ email: "supplier@hotmail.com" });
  if (!existingSupplier) {
    await SupplierModel.create({
      _id: new mongoose.Types.ObjectId("67f4eb7fa1511ac53c5d54eb"),
      email: "supplier@hotmail.com",
      password: "$2b$10$uK1uoGEqkujG4CfCdl6VYOKPGyQqDW6czIqytTlr2jrPKsMfUJi9e", // 123456
      phone: "0502901992",
      role: "supplier",
      supplierName: "nadav",
      supplierProducts: [],
      deleted: false,
      incomingOrders: [],
      createdAt: new Date(1744104319875),
      updatedAt: new Date(1744110729217),
    });
    console.log("Supplier inserted.");
  }
}
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("MongoDB connected");
    await insertSampleAccounts();
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
