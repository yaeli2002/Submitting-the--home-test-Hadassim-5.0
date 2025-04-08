import mongoose from "mongoose";
import { SupplierModel } from "../models/Supplier.model";
import { AdminModel } from "../models/Admin.model";



export async function getSupplierById(id: string | mongoose.Types.ObjectId) {
  return await SupplierModel.findById(id)
    .populate({ path: "supplierProducts", model: "products" })
    .populate({
      path: "incomingOrders",
      model: "orders",
      populate: {
        path: "products.product",
        model: "products",
      },
    });
}

export async function getAllSuppliers() {
  return await SupplierModel.find({})
  .populate({ path: "supplierProducts", model: "products" })
  .populate({
    path: "incomingOrders",
    model: "orders",
    populate: {
      path: "products.product",
      model: "products",
    },
  });
}
export async function getAdminById(id: string | mongoose.Types.ObjectId) {
  return await AdminModel.findById(id).populate({
    path: "outgoingOrders",
    model: "orders",
    populate: {
      path: "products.product",
      model: "products",
    },
  });
}
export async function getSupplierByEmail(email: string) {
  return await SupplierModel.findOne({ email })
    .populate({ path: "supplierProducts", model: "products" })
    .populate({
      path: "incomingOrders",
      model: "orders",
      populate: {
        path: "products.product",
        model: "products",
      },
    });
}
export async function getAdminByEmail(email: string) {
  return await AdminModel.findOne({ email }).populate({
    path: "outgoingOrders",
    model: "orders",
    populate: {
      path: "products.product",
      model: "products",
    },
  });
}

export async function updateSupplier(
  id: string | mongoose.Types.ObjectId,
  data: {
    password?: string;
    phone?: string;
    supplierName?: string;
  }
) {
  const updated = await SupplierModel.findByIdAndUpdate(id, data);
  return updated;
}

export async function createSupplier(data: {
  email: string;
  password: string;
  phone: string;
  supplierName?: string;
}) {
  const supplier = await SupplierModel.create(data);
  return supplier;
}

export async function getSupplierByEmailOrname(email: string, supplierName: string) {
  const supplier = await SupplierModel.findOne({
    $or: [{ email }, { supplierName }],
  });
  return supplier;
}
