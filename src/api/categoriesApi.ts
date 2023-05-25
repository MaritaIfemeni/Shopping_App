import axios, { AxiosError, AxiosResponse } from "axios";
import { Category } from "../types/Category";

const API_BASE_URL = "https://api.escuelajs.co/api/v1/categories";

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

export const fetchCategoriesApi = async () => {
  return makeApiCall<Category[]>({
    method: "GET",
    url: "/",
  });
};
