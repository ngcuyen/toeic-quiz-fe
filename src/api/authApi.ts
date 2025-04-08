import axios from "axios";
import { NOTIFICATIONS } from "../constants/notifications";
import { LoginType } from "../schemas/auth.schema";
import { removeTokenInCookies, setTokenToCookies } from "../libs/token";
import { AuthResponse } from "../@type/auth-response.type";
import { API_ENDPOINTS } from "../constants/apiEndpoints";
import axiosInstance from "../libs/axiosInstance";
import { useAuthStore } from "../store/auth.store";


// Login action
export const loginAction = async (formData: LoginType) => {
    try {
      // Send request to server
      const response = await axios.post<AuthResponse>(
        API_ENDPOINTS.USERS.LOGIN,
        formData
      );
      // Success
      const { access_token, refresh_token } = response.data.data;
      console.log("Access token, ref",access_token, refresh_token);
      // Check the tokens are exist
      if (!access_token || !refresh_token) {
        throw new Error(NOTIFICATIONS.AUTH.TOKEN_MISSED);
      }
  
      // Set access token & refresh token to Cookies
      setTokenToCookies("access_token", access_token);
      setTokenToCookies("refresh_token", refresh_token);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message ||
            NOTIFICATIONS.ERROR.SERVER + error.response?.status ||
            NOTIFICATIONS.ERROR.SYSTEM
        );
      }
      throw new Error(NOTIFICATIONS.ERROR.UNDEFINED);
    }
  };
  
export const logoutAction = async () => {
try {
    // Send request to server
    await axiosInstance.post(`/users/logout`);
} catch (error) {
    // Handle error
    if (axios.isAxiosError(error)) {
    throw new Error(
        error.response?.data?.message ||
        NOTIFICATIONS.ERROR.SERVER + error.response?.status ||
        NOTIFICATIONS.ERROR.SYSTEM
    );
    }
    throw new Error(NOTIFICATIONS.ERROR.UNDEFINED);
} finally {
    // Remove access token & refresh token from Cookies
    removeTokenInCookies();
    // Remove user from store
    useAuthStore.getState().logout();
    // Redirect to login page
    window.location.href = "/login";
}
};