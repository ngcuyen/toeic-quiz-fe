import { API_ENDPOINTS } from "../constants/apiEndpoints"; // Import các API endpoints
import { Exam } from "../@type/exam.type";
import axiosInstance from "../libs/axiosInstance";
import axios from "axios";

// Hàm tạo mới một exam
export const createExam = async (examData: Omit<Exam, '_id'>): Promise<Exam | null> => {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.EXAMS.CREATE, examData);
      const newExam: Exam = response.data.data; // Giả sử data của exam nằm trong response.data.data
      return newExam;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {  // Đảm bảo sử dụng axios.isAxiosError
        console.error("Error creating exam:", error.response?.data?.message || error.message);
      }
      return null;
    }
  };

  // Hàm lấy danh sách tất cả exams
  export const getAllExams = async (): Promise<Exam[]> => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.EXAMS.GET_ALLS);
      return response.data.data.items; // ✅ chỉ return items
    } catch (error) {
      console.error("Error fetching exams:", error);
      return [];
    }
  };

  // Hàm lấy thông tin 1 bài thi theo ID
export const getExamById = async (id: string): Promise<Exam | null> => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.EXAMS.GET_BY_ID(id));
    return response.data.data as Exam;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Lỗi khi lấy exam theo ID:", error.response?.data?.message || error.message);
    } else {
      console.error("Lỗi không xác định:", error);
    }
    return null;
  }
};
