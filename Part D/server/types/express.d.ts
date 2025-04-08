import { Request } from "express";
import { UserToken } from "../types";

declare module "express-serve-static-core" {
  interface Request {
    user?: UserToken;
  }
}
