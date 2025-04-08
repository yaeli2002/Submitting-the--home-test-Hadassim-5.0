import { postRequest, getRequest } from "./index";
import { IUser } from "../types/user.types";
import { ISupplier } from "@/types/supplier.types";

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  email: string;
  password: string;
  phone: string;
  supplierName?: string;
}

export async function login(data: LoginRequest) {
  return await postRequest<{ token: string }, LoginRequest>("/auth/login", data);
}

export async function register(data: RegisterRequest) {
  return await postRequest<IUser, RegisterRequest>("/auth/register", data);
}

export async function getMe() {
  return await getRequest<IUser>("/auth/me");
}

export async function getSupplierById(id: string) {
  return await getRequest<ISupplier>(`/auth/supplier/${id}`);
}

export async function getSuppliers() {
  return await getRequest<ISupplier[]>(`/auth/suppliers`);
}