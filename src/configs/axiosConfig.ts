import { API_BASE_URL } from "../constants/apiEndpoints";

export const axiosConfig = {
    baseURL: API_BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  };