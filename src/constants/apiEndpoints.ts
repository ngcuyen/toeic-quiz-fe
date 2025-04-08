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
  },
  ADMIN: {
    // Questions management
    GET_QUESTIONS: `${API_BASE_URL}/admin/questions`,
    GET_QUESTION_BY_ID: (id: string) => `${API_BASE_URL}/admin/questions/${id}`,
    CREATE_PART1_2_QUESTION: `${API_BASE_URL}/admin/questions/part1-2`,
    UPDATE_PART1_2_QUESTION: (id: string) => `${API_BASE_URL}/admin/questions/part1-2/${id}`,
    CREATE_PART3_4_PASSAGE: `${API_BASE_URL}/admin/questions/part3-4`,
    UPDATE_PART3_4_PASSAGE: (id: string) => `${API_BASE_URL}/admin/questions/part3-4/${id}`,
    DELETE_QUESTION: (id: string) => `${API_BASE_URL}/admin/questions/${id}`,
    UPLOAD_QUESTION_IMAGE: `${API_BASE_URL}/admin/questions/upload-image`,
    
    // Dashboard statistics
    GET_DASHBOARD_STATS: `${API_BASE_URL}/admin/dashboard/stats`,
    
    // User management
    GET_USERS: `${API_BASE_URL}/admin/users`,
    GET_USER_BY_ID: (id: string) => `${API_BASE_URL}/admin/users/${id}`,
    UPDATE_USER: (id: string) => `${API_BASE_URL}/admin/users/${id}`,
    DELETE_USER: (id: string) => `${API_BASE_URL}/admin/users/${id}`,
    
    // Generic resource endpoints
    GET_RESOURCE: (resource: string) => `${API_BASE_URL}/admin/${resource}`,
    GET_RESOURCE_BY_ID: (resource: string, id: string) => `${API_BASE_URL}/admin/${resource}/${id}`,
    CREATE_RESOURCE: (resource: string) => `${API_BASE_URL}/admin/${resource}`,
    UPDATE_RESOURCE: (resource: string, id: string) => `${API_BASE_URL}/admin/${resource}/${id}`,
    DELETE_RESOURCE: (resource: string, id: string) => `${API_BASE_URL}/admin/${resource}/${id}`,
  }
} as const;
