import React, { createContext, useContext, useEffect, useState } from "react";
import { IProduct } from "../types/product.types";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getSupplierProducts,
} from "../network/product.service";
import { useAuth } from "./auth.context";

interface IProductsContext {
  products: IProduct[];
  product: IProduct | null;
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  fetchProductById: (productId: string) => Promise<void>;
  fetchSupplierProducts: (supplierId: string) => Promise<IProduct[]>;
  addProduct: (data: Partial<IProduct>) => Promise<void>;
  editProduct: (productId: string, data: Partial<IProduct>) => Promise<void>;
  removeProduct: (productId: string) => Promise<void>;
}

const ProductsContext = createContext<IProductsContext | undefined>(undefined);

export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { addProductToSupplierLocally } = useAuth();

  // Fetch all products
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    const response = await getAllProducts();
    if (response.status === 200) {
      setProducts(response.data);
    } else {
      setError(response.message);
    }
    setLoading(false);
  };

  const fetchSupplierProducts = async (supplierId: string) => {
    const response = await getSupplierProducts(supplierId);
    if (response.status === 200) {
      return response.data
    } else {
      setError(response.message);
      return []
    }
  }

  // Fetch a single product by ID
  const fetchProductById = async (productId: string) => {
    setLoading(true);
    setError(null);
    const response = await getProductById(productId);
    if (response.status === 200) {
      setProduct(response.data);
    } else {
      setError(response.message);
    }
    setLoading(false);
  };

  // Add a new product
  const addProduct = async (data: Partial<IProduct>) => {
    setLoading(true);
    setError(null);
    const response = await createProduct(data as IProduct);
    if (response.status === 201) {
      setProducts((prev) => [...prev, response.data]);
      addProductToSupplierLocally(response.data);
    } else {
      setError(response.message);
    }
    setLoading(false);
  };

  // Edit an existing product
  const editProduct = async (productId: string, data: Partial<IProduct>) => {
    setLoading(true);
    setError(null);
    const response = await updateProduct(productId, data);
    if (response.status === 200) {
      setProducts((prev) =>
        prev.map((product) => (product._id === productId ? response.data : product))
      );
    } else {
      setError(response.message);
    }
    setLoading(false);
  };

  // Remove a product
  const removeProduct = async (productId: string) => {
    setLoading(true);
    setError(null);
    const response = await deleteProduct(productId);
    if (response.status === 200) {
      setProducts((prev) => prev.filter((product) => product._id !== productId));
    } else {
      setError(response.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        product,
        loading,
        error,
        fetchProducts,
        fetchProductById,
        addProduct,
        editProduct,
        removeProduct,
        fetchSupplierProducts
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = (): IProductsContext => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
};
