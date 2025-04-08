import { Request, Response } from "express";
import * as ProductDAL from "../dal/product.dal";
import { badRequest, created, internalServerError, ok } from "../responses";

export async function createProduct(request: Request, response: Response) {
  try {
    const product = request.body;
    const supplierId = (request as any).user?._id;
    if (!supplierId || !product) {
      response.status(400).json(badRequest("Supplier ID and product data are required"));
      return;
    }
    const newProduct = await ProductDAL.addProduct(supplierId, product);
    response.status(201).json(created(newProduct, "Product created successfully"));
  } catch (e: any) {
    response.status(500).json(internalServerError(e.message));
  }
}

export async function getProduct(request: Request, response: Response) {
  try {
    const { productId } = request.params;
    const product = await ProductDAL.getProductById(productId);
    if (!product) {
      response.status(404).json(badRequest("Product not found"));
      return;
    }
    response.status(200).json(ok(product, "Product fetched successfully"));
  } catch (e: any) {
    response.status(500).json(internalServerError(e.message));
  }
}

export async function getSupplierProducts(request: Request, response: Response) {
  try {
    const { supplierId } = request.params;
    const products = await ProductDAL.getSupplierProducts(supplierId);
    if (!products) {
      response.status(404).json(badRequest("Products not found"));
      return;
    }
    response.status(200).json(ok(products, "Products fetched successfully"));
  } catch (e: any) {
    response.status(500).json(internalServerError(e.message));
  }
}

export async function getAllProducts(request: Request, response: Response) {
  try {
    const products = await ProductDAL.getAllProducts();
    response.status(200).json(ok(products, "Products fetched successfully"));
  } catch (e: any) {
    response.status(500).json(internalServerError(e.message));
  }
}

export async function updateProduct(request: Request, response: Response) {
  try {
    const { productId } = request.params;
    const productData = request.body;
    const updatedProduct = await ProductDAL.updateProduct(productId, productData);
    if (!updatedProduct) {
      response.status(404).json(badRequest("Product not found"));
      return;
    }
    response.status(200).json(ok(updatedProduct, "Product updated successfully"));
  } catch (e: any) {
    response.status(500).json(internalServerError(e.message));
  }
}

export async function deleteProduct(request: Request, response: Response) {
  try {
    const { productId } = request.params;
    const deletedProduct = await ProductDAL.deleteProduct(productId);
    if (!deletedProduct) {
      response.status(404).json(badRequest("Product not found"));
      return;
    }
    response.status(200).json(ok(deletedProduct, "Product deleted successfully"));
  } catch (e: any) {
    response.status(500).json(internalServerError(e.message));
  }
}
