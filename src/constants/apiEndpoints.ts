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
  CATEGORY: {
    GET_ALLS: `${API_BASE_URL}/categories`,
    GET_BY_ID: (id: string) => `${API_BASE_URL}/categories/${id}`,
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
  QUESTIONS: {
    GET_ALLS: `${API_BASE_URL}/questions`,
    GET_BY_ID: (id: string) => `${API_BASE_URL}/questions/${id}`,
    CREATE: `${API_BASE_URL}/questions`,
  },
  UPLOADS: {
    UPLOAD_BUG: `${API_BASE_URL}/uploads/bug`,  // Upload bug image
    UPLOAD_SOLUTION: `${API_BASE_URL}/uploads/solution`,  // Upload solution image
  },
  EXAMS: {
    GET_ALLS: `${API_BASE_URL}/exams`,
    CREATE: `${API_BASE_URL}/exams`,
    GET_BY_ID: (id: string) => `${API_BASE_URL}/exams/${id}`,
  },
  EXAM_QUESTIONS: {
    GET_ALLS: `${API_BASE_URL}/exam-questions`,
    // CREATE: (examId: string) => `${API_BASE_URL}/exams/${examId}/questions`,
  },
  QUIZ_SESSIONS: {
    GET_ALLS: `${API_BASE_URL}/quiz-sessions`,
    GET_BY_ID: (id: string) => `${API_BASE_URL}/quiz-sessions/${id}`,
    CREATE: `${API_BASE_URL}/quiz-sessions`,
    UPDATE: (id: string) => `${API_BASE_URL}/quiz-sessions/${id}`,
    DELETE: (id: string) => `${API_BASE_URL}/quiz-sessions/${id}`,
  },
  PARAGRAPHS: {
    GET_ALLS: `${API_BASE_URL}/paragraphs`,
    GET_BY_ID: (id: string) => `${API_BASE_URL}/paragraphs/${id}`,
    CREATE: `${API_BASE_URL}/paragraphs`,
  }
} as const;
