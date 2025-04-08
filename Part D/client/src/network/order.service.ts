import { IOrder } from "../types/order.types";
import { getRequest, postRequest, putRequest } from "./index";

export async function getAllOrders() {
  return await getRequest<IOrder[]>("/orders");
}

export async function getOrdersBySupplier(supplierId: string) {
  return await getRequest<IOrder[]>(`/orders/supplier/${supplierId}`);
}

export async function createOrder(data: any) {
  return await postRequest<IOrder, any>("/orders", data);
}

export async function updateOrderStatus(
  orderId: string,
  status: "pending" | "completed" | "canceled" | "accepted"
) {
  return await putRequest<IOrder, { status: string }>(`/orders/${orderId}/status`, {
    status,
  });
}
