import { Request, Response } from "express";
import * as OrderDal from "../dal/order.dal";
import { badRequest, created, internalServerError, notFound, ok } from "../responses";

export async function createOrderController(request: Request, response: Response) {
  try {
    const { supplierId, products } = request.body;

    if (!supplierId || !products || !Array.isArray(products) || products.length === 0) {
      response.status(400).json(badRequest("Supplier ID and products are required"));
      return;
    }

    const adminId = (request as any).user?._id; // Assuming `authMiddleware` attaches the admin user to the request
    const newOrder = await OrderDal.createOrder(supplierId, products, adminId);

    response.status(201).json(created(newOrder, "Order created successfully"));
  } catch (e: any) {
    response.status(500).json(internalServerError(e.message));
  }
}

export async function getOrdersController(request: Request, response: Response) {
  try {
    const orders = await OrderDal.getAllOrders();

    if (!orders || orders.length === 0) {
      response.status(404).json(notFound("No orders found"));
      return;
    }

    response.status(200).json(ok(orders, "Orders fetched successfully"));
  } catch (e: any) {
    response.status(500).json(internalServerError(e.message));
  }
}

export async function getSupplierOrdersController(request: Request, response: Response) {
  try {
    const { supplierId } = request.params;

    if (!supplierId) {
      response.status(400).json(badRequest("Supplier ID is required"));
      return;
    }

    const orders = await OrderDal.getOrdersBySupplier(supplierId);

    if (!orders || orders.length === 0) {
      response.status(404).json(badRequest("No orders found for this supplier"));
      return;
    }

    response.status(200).json(ok(orders, "Orders fetched successfully"));
  } catch (e: any) {
    response.status(500).json(internalServerError(e.message));
  }
}

export async function updateOrderStatusController(request: Request, response: Response) {
  try {
    const { orderId } = request.params;
    const { status } = request.body;

    if (!["pending", "completed", "canceled"].includes(status)) {
      response.status(400).json(badRequest("Invalid status value"));
      return;
    }

    const updatedOrder = await OrderDal.updateOrderStatus(orderId, status);

    if (!updatedOrder) {
      response.status(404).json(badRequest("Order not found"));
      return;
    }

    response.status(200).json(ok(updatedOrder, "Order status updated successfully"));
  } catch (e: any) {
    response.status(500).json(internalServerError(e.message));
  }
}
