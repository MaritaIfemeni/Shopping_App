import axios, { AxiosError, AxiosResponse } from "axios";

import { NewProduct } from "../types/NewProduct";
import { UpdatedProduct } from "../types/UpdatedProduct";
import { Product } from "../types/Product";

const API_BASE_URL = "https://api.escuelajs.co/api/v1/products/";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

const handleAxiosError = (error: AxiosError) => {
  throw error;
};

const makeApiCall = async <T>(config: any): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance(config);
    return response.data;
  } catch (error: any) {
    handleAxiosError(error);
    return Promise.reject(error);
  }
};

export const fetchAllProductsApi = async () => {
  return makeApiCall<Product[]>({
    method: "GET",
    url: "/",
  });
};

export const createNewProductApi = async (product: NewProduct) => {
  return makeApiCall<Product>({
    method: "POST",
    url: "/",
    data: product,
  });
};

export const updateProductApi = async (product: UpdatedProduct) => {
  return makeApiCall<Product>({
    method: "PUT",
    url: `/${product.id}`,
    data: product.data,
  });
};

export const deleteProductApi = async (id: number) => {
  return makeApiCall<{ result: boolean; id: number }>({
    method: "DELETE",
    url: `/${id}`,
  });
};
