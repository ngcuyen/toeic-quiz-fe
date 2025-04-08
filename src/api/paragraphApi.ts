import { API_ENDPOINTS } from "../constants/apiEndpoints";
import { Paragraph } from "../@type/paragraph.type";
import { AxiosError } from "axios";
import { ERROR_TOAST } from "../constants/notifications";
import axiosInstance from "../libs/axiosInstance";

// Tạo mới một đoạn văn
export const createParagraph = async (name: string): Promise<Paragraph | null> => {
  try {
    console.log("📦 Sending paragraph:", { name });
    const response = await axiosInstance.post(API_ENDPOINTS.PARAGRAPHS.CREATE, { name });
    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      console.error("💥 Server response:", error.response.data);
      ERROR_TOAST(error.response.data?.message || "Lỗi khi tạo đoạn văn.");
    } else {
      ERROR_TOAST("Lỗi hệ thống khi tạo đoạn văn.");
    }
    return null;
  }
};

// Lấy đoạn văn theo ID
export const getParagraphById = async (id: string): Promise<Paragraph | null> => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.PARAGRAPHS.GET_BY_ID(id));
    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      ERROR_TOAST(error.response.data?.message || "Không tìm thấy đoạn văn.");
    } else {
      ERROR_TOAST("Lỗi hệ thống khi lấy đoạn văn.");
    }
    return null;
  }
};
