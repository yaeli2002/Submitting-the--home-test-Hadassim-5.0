import { Router } from "express";
import {
  createProduct,
  getProduct,
  getAllProducts,
  getSupplierProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller";
import { supplierGuardMiddleware as supplierGuard } from "../middlewares/supplier-guard.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

// Public route to get all products
router.get("/", getAllProducts);

router.get("/supplier/:supplierId", getSupplierProducts);

// Public route to get a single product by ID
router.get("/:productId", getProduct);

// Protected route to create a product (supplier only)
router.post("/", authMiddleware, supplierGuard, createProduct);

// Protected route to update a product (supplier only)
router.put("/:productId", authMiddleware, supplierGuard, updateProduct);

// Protected route to delete a product (supplier only)
router.delete("/:productId", authMiddleware, supplierGuard, deleteProduct);

export default router;
