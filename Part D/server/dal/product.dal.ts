import { ProductModel } from "../models/Product.model";
import { SupplierModel } from "../models/Supplier.model";

export async function getSupplierProducts(supplierId: string) {
  const products = await ProductModel.find({ supplier: supplierId, deleted: false });
  return products;
}
export async function getProductById(productId: string) {
  const product = await ProductModel.findById(productId);
  return product;
}
export async function getAllProducts() {
  const products = await ProductModel.find({ deleted: false });
  return products;
}

export async function addProduct(supplierId: string, product: any) {
  const added = await ProductModel.create({...product, supplier: supplierId});
  // update supplier, add proeduct to supplier
  const supplier = await SupplierModel.findByIdAndUpdate(supplierId, {
    $push: { supplierProducts: added._id },
  });
  return added;
}

export async function updateProduct(productId: string, product: any) {
  const removed = await ProductModel.findByIdAndUpdate(productId, {
    $set: product,
  });
  return removed;
}

export async function deleteProduct(productId: string) {
  const removed = await ProductModel.findByIdAndUpdate(productId, {
    $set: { deleted: true },
  });
  return removed;
}
