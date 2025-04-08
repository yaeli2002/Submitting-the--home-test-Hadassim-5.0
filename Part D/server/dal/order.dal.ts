import { OrderModel } from "../models/Order.model";
import { SupplierModel } from "../models/Supplier.model";
import { AdminModel } from "../models/Admin.model";

/**
 * Create a new order and associate it with a supplier and admin.
 */
export async function createOrder(supplierId: string, products: string[], adminId?: string) {
  let newOrder = await OrderModel.create({
    supplier: supplierId,
    products,
  });

  // Add the order to the supplier's incoming orders
  await SupplierModel.findByIdAndUpdate(supplierId, {
    $push: { incomingOrders: newOrder._id },
  });

  // Add the order to the admin's outgoing orders (if adminId is provided)
  if (adminId) {
    await AdminModel.findByIdAndUpdate(adminId, {
      $push: { outgoingOrders: newOrder._id },
    });
  }
  newOrder = await OrderModel.populate(newOrder, {
    path: "products.product",
    model: "products",
  });

  return newOrder;
}

/**
 * Get all orders with populated fields.
 */
export async function getAllOrders() {
  return await OrderModel.find()
    .populate({
      path: "products.product",
      model: "products",
    })
    .populate("supplier");
}

/**
 * Get orders for a specific supplier.
 */
export async function getOrdersBySupplier(supplierId: string) {
  return await OrderModel.find({ supplier: supplierId })
    .populate({
      path: "products.product",
      model: "products",
    })
    .populate("supplier");
}

/**
 * Update the status of an order.
 */
export async function updateOrderStatus(
  orderId: string,
  status: "pending" | "completed" | "canceled"
) {
  return await OrderModel.findByIdAndUpdate(
    orderId,
    { status },
    { new: true } // Return the updated document
  ).populate({
    path: "products.product",
    model: "products",
  });
}
