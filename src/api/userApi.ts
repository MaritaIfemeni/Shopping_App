import axios, { AxiosError } from "axios";

const API_BASE_URL = "https://api.escuelajs.co/api/v1/products/";
const handleAxiosError = (error: AxiosError) => {
  throw error;
};
