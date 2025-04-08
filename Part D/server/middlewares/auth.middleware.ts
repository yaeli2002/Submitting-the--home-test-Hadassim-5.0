import { RequestHandler } from "express";
import { decryptToken, getTokenFromHeader } from "../utils";
import { UserToken } from "../types";

export const authMiddleware: RequestHandler = (req, res, next) => {
  try {
    const token = getTokenFromHeader(req);
    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const user = decryptToken<UserToken>(token);

    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    (req as any).user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
