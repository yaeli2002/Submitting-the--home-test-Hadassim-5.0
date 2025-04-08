import mongoose from "mongoose";
import { comparePassword, hashPassword } from "../utils";

export interface IAdmin extends mongoose.Document {
  email: string;
  password: string;
  role: "admin";
  outgoingOrders: mongoose.Schema.Types.ObjectId[];
  comparePassword: (password: string) => boolean;
}

const AdminSchema = new mongoose.Schema<IAdmin>(
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
    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
    },
    outgoingOrders: [
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

AdminSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = hashPassword(this.password);
  }
  next();
});

AdminSchema.methods.comparePassword = function (password: string) {
  return comparePassword(password, this.password);
};
export const AdminModel = mongoose.model<IAdmin>("admins", AdminSchema);
