import { API_ENDPOINTS } from '../constants/apiEndpoints'; // Đảm bảo đường dẫn đúng tới file chứa API_ENDPOINTS
import { ExamQuestions } from '../@type/exam-questions.type';
import axiosInstance from '../libs/axiosInstance';

// Type cho response khi lấy tất cả exam questions
export type ExamQuestionsResponse = {
  items: ExamQuestions[]; // Đảm bảo kiểu trả về có `items`
  page: number;
  per_page: number;
  total_pages: number;
  total_items: number;
};

/**
 * Lấy tất cả exam questions từ API
 * @returns {Promise<ExamQuestionsResponse | null>} Danh sách exam questions hoặc null nếu có lỗi
 */
export const getAllExamQuestions = async (): Promise<ExamQuestionsResponse | null> => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.EXAM_QUESTIONS.GET_ALLS);
      console.log("📦 Exam Questions API RESPONSE:", response.data); // Log để kiểm tra dữ liệu trả về
      return response.data.data || []; // Trả về dữ liệu từ 'data', hoặc mảng rỗng nếu không có dữ liệu
    } catch (error) {
      console.error('Lỗi khi lấy exam questions:', error);
      return null;
    }
  };
  
  
