import mongoose from "mongoose";
import { comparePassword, hashPassword } from "../utils";

export interface ISupplier extends mongoose.Document {
  email: string;
  password: string;
  supplierName?: string;
  phone: string;
  role: "supplier";
  deleted: boolean;
  supplierProducts: mongoose.Schema.Types.ObjectId[];
  incomingOrders: mongoose.Schema.Types.ObjectId[];
  comparePassword: (password: string) => boolean;
}

const SupplierSchema = new mongoose.Schema<ISupplier>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    role: {
      type: String,
      enum: ["supplier"],
      default: "supplier",
    },
    supplierName: {
      type: String,
      required: false,
    },
    supplierProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
      },
    ],
    deleted: {
      type: Boolean,
      default: false,
    },
    incomingOrders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "orders",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

SupplierSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = hashPassword(this.password);
  }
  next();
});
SupplierSchema.methods.comparePassword = function (password: string) {
  return comparePassword(password, this.password);
};

export const SupplierModel = mongoose.model<ISupplier>("suppliers", SupplierSchema);
