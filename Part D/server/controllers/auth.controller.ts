import { Request, Response } from "express";
import * as AuthDAL from "../dal/auth.dal";
import { badRequest, created, internalServerError, ok } from "../responses";
import { encryptToken } from "../utils";

export async function registerSupplier(request: Request, response: Response) {
  try {
    const data = request.body;
    const existingSupllier = await AuthDAL.getSupplierByEmailOrname(data.email, data.supplierName);
    if (existingSupllier) {
      response.status(400).json(badRequest("Email or name already exists"));
      return;
    }
    const supplier = await AuthDAL.createSupplier(data);
    response.status(201).json(created(supplier, "Supplier created successfully"));
  } catch (e: any) {
    response.status(500).json(internalServerError(e.message));
  }
}

export async function login(request: Request, response: Response) {
  try {
    const { email, password } = request.body;
    const supplier = await AuthDAL.getSupplierByEmail(email);
    const admin = await AuthDAL.getAdminByEmail(email);
    if (!supplier && !admin) {
      response.status(400).json(badRequest("Invalid email or password"));
      return;
    }
    const isMatch = supplier
      ? supplier.comparePassword(password)
      : admin!.comparePassword(password);

    if (!isMatch) {
      response.status(400).json(badRequest("Invalid email or password"));
      return;
    }

    const token = encryptToken({
      _id: supplier ? supplier._id : admin!._id,
      role: supplier === null ? "admin" : "supplier",
    });
    response.status(200).json(ok({ token }, "Login successful"));
  } catch (e: any) {
    response.status(500).json(internalServerError(e.message));
  }
}

export async function me(request: Request, response: Response) {
  try {
    const user = (request as any).user;
    if (!user) {
      response.status(401).json(badRequest("Unauthorized"));
      return;
    }
    let userDocument;
    if (user.role === "supplier") {
      userDocument = await AuthDAL.getSupplierById(user._id);
    } else {
      userDocument = await AuthDAL.getAdminById(user._id);
    }
    response.status(200).json(ok(userDocument, "User fetched successfully"));
  } catch (e: any) {
    response.status(500).json(internalServerError(e.message));
  }
}
