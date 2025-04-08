import { IProduct } from "../types/product.types";
import { getRequest, postRequest, putRequest, deleteRequest } from "./index";

export async function getAllProducts() {
  return await getRequest<IProduct[]>("/products");
}

export async function getSupplierProducts(supplierId: string) {
  return await getRequest<IProduct[]>(`/products/supplier/${supplierId}`);
}
export async function getProductById(productId: string) {
  return await getRequest<IProduct>(`/products/${productId}`);
}

export async function createProduct(data: any) {
  return await postRequest<IProduct, any>("/products", data);
}

export async function updateProduct(productId: string, data: Partial<IProduct>) {
  return await putRequest<IProduct, Partial<IProduct>>(`/products/${productId}`, data);
}

export async function deleteProduct(productId: string) {
  return await deleteRequest<IProduct>(`/products/${productId}`);
}
