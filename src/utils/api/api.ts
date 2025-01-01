import axios from "axios";
import { apiErrorHandler } from "./apiErrorHandler";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const JWT_TOKEN_STORAGE_KEY = "ck-jwt-token";
const apiService = axios.create({ baseURL: BASE_URL ?? "" });

apiService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(JWT_TOKEN_STORAGE_KEY);

    if (token) {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiService.interceptors.response.use(
  (config) => config,
  (error) => {
    apiErrorHandler(error);
    return Promise.reject(error);
  }
);

export default apiService;
