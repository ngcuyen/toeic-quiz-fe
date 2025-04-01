import axios from "axios";
import { getTokenFromCookies, setTokenToCookies } from "./token";
import { ERROR_TOAST, NOTIFICATIONS } from "../constants/notifications";
import { axiosConfig } from "../configs/axiosConfig";

const axiosInstance = axios.create(axiosConfig);

// Function refresh token
const refreshAccessToken = async () => {
  try {
    const refreshToken = getTokenFromCookies("refresh_token"); // Lấy refresh token từ cookies

    if (!refreshToken) {
      throw new Error(NOTIFICATIONS.AUTH.TOKEN_MISSED);
    }

    const response = await axiosInstance.post("/users/token/refresh", { refresh_token: refreshToken });
    const { access_token, refresh_token: newRefreshToken } = response.data.data;

    if (!access_token || !newRefreshToken) {
      throw new Error(NOTIFICATIONS.AUTH.TOKEN_MISSED);
    }

    // Set the new access token & refresh token to Cookies
    setTokenToCookies("access_token", access_token);
    setTokenToCookies("refresh_token", newRefreshToken);

    return access_token;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
        if (error.response?.status === 401 || error.response?.status === 403) {
            ERROR_TOAST("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.");
        } else {
            ERROR_TOAST(
                error.response?.data?.message ||
                NOTIFICATIONS.ERROR.SERVER + error.response?.status ||
                NOTIFICATIONS.ERROR.SYSTEM
            );
        }
    }
    setTokenToCookies("access_token", ""); // Delete token to avoid loop
    setTokenToCookies("refresh_token", "");
    window.location.href = "/login";
    return null;
  }
};

// Request Interceptor: Add token into headers when send the request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getTokenFromCookies("access_token"); // Get sccess_token from cookies

    if (token && token !== undefined) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle error status 401 and refresh token automatically
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
        originalRequest._retry = true;
  
        const newToken = await refreshAccessToken();
        if (!newToken) {
          return Promise.reject(error); // Nếu refresh thất bại, không retry
        }
  
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      }
  
      return Promise.reject(error);
    }
);

export default axiosInstance;