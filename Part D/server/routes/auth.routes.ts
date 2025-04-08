import { Router } from "express";
import { registerSupplier, login, me } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { getAllSuppliers, getSupplierById } from "../dal/auth.dal";
import { notFound, ok } from "../responses";

const router = Router();

// Public route for supplier registration
router.post("/register", registerSupplier);

// Public route for login
router.post("/login", login);

router.get("/supplier/:id", async (req, res) => {
  try {
    const supplier = await getSupplierById(req.params.id);
    res.status(200).json(ok(supplier, "Supplier fetched successfully"));
  } catch (E) {
    res.status(500).json(notFound("Supplier not found"));
  }
});

router.get("/suppliers", async (req, res) => {
  try {
    const suppliers = await getAllSuppliers();
    res.status(200).json(ok(suppliers, "Suppliers fetched successfully"));
  }
  catch (E) {   
    res.status(500).json(notFound("Suppliers not found"));
  }
});
// Protected route to get the current user's details
router.get("/me", authMiddleware, me);

export default router;
