import axios from "axios";
import { API_ENDPOINTS } from "../constants/apiEndpoints";
import { axiosConfig } from "../configs/axiosConfig";
import { Category } from "../@type/category.type";

export const getCategory = async (): Promise<Category[]> => {
  try {
    const response = await axios.get(API_ENDPOINTS.CATEGORY.GET_ALLS, axiosConfig);

    // ✅ Truy cập đúng vào mảng items
    return response.data.data.items;
  } catch (error) {
    // ✅ Xử lý lỗi không cần ép kiểu any
    if (axios.isAxiosError(error)) {
      console.error("Lỗi từ server khi lấy category:", error.response?.data || error.message);
    } else {
      console.error("Lỗi không xác định:", error);
    }
    throw error; // Ném lỗi ra ngoài để component có thể catch
  }
};
