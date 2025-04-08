import { RequestHandler } from "express";

export const supplierGuardMiddleware: RequestHandler = (req, res, next) => {
  try {
    if ((req as any).user?.role !== "supplier") {
      res.status(403).json({ message: "Forbidden" });
      return;
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
