import { Router } from "express";
import * as OrderController from "../controllers/order.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminGuardMiddleware } from "../middlewares/admin-guard.middleware";

const router = Router();

// Protected route to create an order (admin only)
router.post("/", authMiddleware, adminGuardMiddleware, OrderController.createOrderController);

// Public route to view all orders
router.get("/", OrderController.getOrdersController);

// Public route to view orders for a specific supplier
router.get("/supplier/:supplierId", OrderController.getSupplierOrdersController);

// Protected route to update order status
router.put("/:orderId/status", authMiddleware, OrderController.updateOrderStatusController);

export default router;
