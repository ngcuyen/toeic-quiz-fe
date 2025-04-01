export const API_BASE_URL = "http://localhost:8080/api/v1";

export const API_ENDPOINTS = {
  AUTH: {
    GET_USERS: `${API_BASE_URL}/auth/users`,
    GET_USER_BY_ID: (id: string) => `${API_BASE_URL}/auth/users/${id}`,
    UPDATE_USER: (id: string) => `${API_BASE_URL}/auth/users/${id}`,
    DELETE_USER: (id: string) => `${API_BASE_URL}/auth/users/${id}`,
    GET_ROLES: `${API_BASE_URL}/auth/roles`,
    UPDATE_ROLE: (id: string) => `${API_BASE_URL}/auth/roles/${id}`,
    DELETE_ROLE: (id: string) => `${API_BASE_URL}/auth/roles/${id}`,
    RESET_PASSWORD: `${API_BASE_URL}/auth/password/reset`,
  },
  OAUTH: {
    GOOGLE_AUTH: `${API_BASE_URL}/auth/google`,
    GOOGLE_CALLBACK: `${API_BASE_URL}/auth/google/callback`,
    FACEBOOK_AUTH: `${API_BASE_URL}/auth/facebook`,
    FACEBOOK_CALLBACK: `${API_BASE_URL}/auth/facebook/callback`,
    GITHUB_AUTH: `${API_BASE_URL}/auth/github`,
    GITHUB_CALLBACK: `${API_BASE_URL}/auth/github/callback`,
  },
  USERS: {
    LOGIN: `${API_BASE_URL}/users/login`,
    REGISTER: `${API_BASE_URL}/users/register`,
    LOGOUT: `${API_BASE_URL}/users/logout`,
    REFRESH_TOKEN: `${API_BASE_URL}/users/token/refresh`,
    VERIFY_OTP: `${API_BASE_URL}/users/otp/authenticate`,
    RESEND_OTP: `${API_BASE_URL}/users/otp/revalidate`,
    FORGOT_PASSWORD: `${API_BASE_URL}/users/password/forgot`,
    VERIFY_FORGOT_PASSWORD: `${API_BASE_URL}/users/password/forgot/authenticate`,
    RESET_PASSWORD: `${API_BASE_URL}/users/password/reset`,
    CHANGE_PASSWORD: `${API_BASE_URL}/users/password/change`,
    GET_PROFILE: `${API_BASE_URL}/users/@me/profile`,
    UPDATE_PROFILE: `${API_BASE_URL}/users/@me/profile`,
    UPLOAD_AVATAR: `${API_BASE_URL}/users/@me/avatar`,
    CHECK_TOKEN: `${API_BASE_URL}/users/token/check`,
  }
} as const;
