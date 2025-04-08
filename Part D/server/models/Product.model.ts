import mongoose from "mongoose";

export interface IProduct extends mongoose.Document {
  name: string;
  price: number;
  minimumOrder: number;
  supplier: mongoose.Schema.Types.ObjectId;
}

const ProductSchema = new mongoose.Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    minimumOrder: {
      type: Number,
      required: true,
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const ProductModel = mongoose.model<IProduct>("products", ProductSchema);
