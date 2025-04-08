import axios from "axios";
import axiosInstance from "../libs/axiosInstance";
import { NOTIFICATIONS } from "../constants/notifications";
import { Part1Question, Passage } from "../@type/question.type";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

// Generic error handler for API requests
const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    throw new Error(
      error.response?.data?.message ||
        `${NOTIFICATIONS.ERROR.SERVER} (${error.response?.status})` ||
        NOTIFICATIONS.ERROR.SYSTEM
    );
  }
  throw new Error(NOTIFICATIONS.ERROR.UNDEFINED);
};

// GET - Fetch all questions
export const fetchQuestions = async (filters?: {
  part?: string;
  search?: string;
  page?: number;
  limit?: number;
}) => {
  try {
    // Build query parameters
    const params = new URLSearchParams();
    if (filters?.part) params.append("part", filters.part);
    if (filters?.search) params.append("search", filters.search);
    if (filters?.page) params.append("page", String(filters.page));
    if (filters?.limit) params.append("limit", String(filters.limit));

    const { data } = await axiosInstance.get(API_ENDPOINTS.ADMIN.GET_QUESTIONS, { params });
    return data.data;
  } catch (error) {
    handleApiError(error);
  }
};

// GET - Fetch a single question by ID
export const fetchQuestionById = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(API_ENDPOINTS.ADMIN.GET_QUESTION_BY_ID(id));
    return data.data;
  } catch (error) {
    handleApiError(error);
  }
};

// POST - Create a new Part 1 or Part 2 question
export const createPart1or2Question = async (question: Partial<Part1Question>) => {
  try {
    const { data } = await axiosInstance.post(API_ENDPOINTS.ADMIN.CREATE_PART1_2_QUESTION, question);
    return data.data;
  } catch (error) {
    handleApiError(error);
  }
};

// POST - Create a new Part 3 or Part 4 passage with questions
export const createPart3or4Passage = async (passage: Partial<Passage>) => {
  try {
    const { data } = await axiosInstance.post(API_ENDPOINTS.ADMIN.CREATE_PART3_4_PASSAGE, passage);
    return data.data;
  } catch (error) {
    handleApiError(error);
  }
};

// PUT - Update an existing Part 1 or Part 2 question
export const updatePart1or2Question = async (id: string, question: Partial<Part1Question>) => {
  try {
    const { data } = await axiosInstance.put(API_ENDPOINTS.ADMIN.UPDATE_PART1_2_QUESTION(id), question);
    return data.data;
  } catch (error) {
    handleApiError(error);
  }
};

// PUT - Update an existing Part 3 or Part 4 passage with questions
export const updatePart3or4Passage = async (id: string, passage: Partial<Passage>) => {
  try {
    const { data } = await axiosInstance.put(API_ENDPOINTS.ADMIN.UPDATE_PART3_4_PASSAGE(id), passage);
    return data.data;
  } catch (error) {
    handleApiError(error);
  }
};

// DELETE - Delete a question or passage by ID
export const deleteQuestion = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(API_ENDPOINTS.ADMIN.DELETE_QUESTION(id));
    return data.data;
  } catch (error) {
    handleApiError(error);
  }
};

// POST - Upload image for questions (especially for Part 1)
export const uploadQuestionImage = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("image", file);
    
    const { data } = await axiosInstance.post(API_ENDPOINTS.ADMIN.UPLOAD_QUESTION_IMAGE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    
    return data.data;
  } catch (error) {
    handleApiError(error);
  }
};

// GET - Fetch dashboard statistics
export const fetchAdminDashboardStats = async () => {
  try {
    const { data } = await axiosInstance.get(API_ENDPOINTS.ADMIN.GET_DASHBOARD_STATS);
    return data.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Generic admin API functions for other entities
export const fetchAdminResource = async (
  resource: string,
  filters?: Record<string, any>
) => {
  try {
    const { data } = await axiosInstance.get(API_ENDPOINTS.ADMIN.GET_RESOURCE(resource), { params: filters });
    return data.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const createAdminResource = async (
  resource: string,
  payload: Record<string, any>
) => {
  try {
    const { data } = await axiosInstance.post(API_ENDPOINTS.ADMIN.CREATE_RESOURCE(resource), payload);
    return data.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateAdminResource = async (
  resource: string,
  id: string,
  payload: Record<string, any>
) => {
  try {
    const { data } = await axiosInstance.put(API_ENDPOINTS.ADMIN.UPDATE_RESOURCE(resource, id), payload);
    return data.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteAdminResource = async (resource: string, id: string) => {
  try {
    const { data } = await axiosInstance.delete(API_ENDPOINTS.ADMIN.DELETE_RESOURCE(resource, id));
    return data.data;
  } catch (error) {
    handleApiError(error);
  }
};