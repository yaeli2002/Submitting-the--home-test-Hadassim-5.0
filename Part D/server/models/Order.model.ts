import mongoose from "mongoose";

export interface IOrder extends mongoose.Document {
  date: Date;
  status: string;
  products: {
    product: mongoose.Schema.Types.ObjectId;
    quantity: number;
  }[];
  supplier: mongoose.Schema.Types.ObjectId;
}

const OrderSchema = new mongoose.Schema<IOrder>(
  {
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "canceled", "accepted"],
      default: "pending",
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
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

export const OrderModel = mongoose.model<IOrder>("orders", OrderSchema);