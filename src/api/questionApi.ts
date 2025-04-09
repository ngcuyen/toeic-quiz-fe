import { API_ENDPOINTS } from "../constants/apiEndpoints";
import { Question, QuestionCreate, QuestionWithDate } from "../@type/question.type"; // Import kiểu Question
import { ERROR_TOAST, NOTIFICATIONS } from "../constants/notifications"; // Import thông báo
import axiosInstance from "../libs/axiosInstance"; // Đảm bảo sử dụng axiosInstance nếu có interceptor
import { AxiosError } from "axios";

// Hàm tạo câu hỏi mới
export const createQuestion = async (question: QuestionCreate) => {
  try {
    // Kiểm tra xem question có đầy đủ các trường bắt buộc không
    if (!question.question_text || !question.opt_a || !question.opt_b || !question.opt_c || !question.opt_d || !question.answer || !question.category_id) {
      throw new Error("Missing required fields.");
    }

    // Gửi request POST để thêm câu hỏi mới
    const response = await axiosInstance.post(API_ENDPOINTS.QUESTIONS.CREATE, question);
    
    // Hiển thị thông báo thành công
    console.log(NOTIFICATIONS.QUESTION.TOAST.title);
    
    return response.data;
  } catch (error: unknown) {
    // Kiểm tra nếu error là AxiosError
    if (error instanceof AxiosError) {
      // Xử lý lỗi Axios
      console.error("Lỗi khi tạo câu hỏi:", error);

      // Hiển thị thông báo lỗi từ response của Axios
      const errorMessage = error.response?.data?.message || NOTIFICATIONS.ERROR.SYSTEM;
      console.error(ERROR_TOAST(errorMessage));
      
      // Có thể đưa ra thông báo hoặc thông báo qua UI ở đây
    } else {
      // Xử lý lỗi không phải AxiosError
      console.error("Lỗi không phải là AxiosError:", error);
      console.error(ERROR_TOAST(NOTIFICATIONS.ERROR.UNDEFINED));
    }

    // Ném lỗi để gọi hàm bên ngoài có thể xử lý nếu cần
    throw error;
  }
};


// Hàm lấy câu hỏi theo ID
export const getQuestionById = async (id: string): Promise<Question> => {
    try {
      // Gửi request GET để lấy câu hỏi theo id
      const response = await axiosInstance.get(API_ENDPOINTS.QUESTIONS.GET_BY_ID(id));
    
      // Kiểm tra xem API có trả về dữ liệu trong `response.data.data` không
      return response.data.data; // Lấy dữ liệu từ `response.data.data`
    } catch (error: unknown) {
      // Kiểm tra nếu error là AxiosError
      if (error instanceof AxiosError) {
        // Xử lý lỗi Axios
        console.error("Lỗi khi lấy câu hỏi theo ID:", error);
    
        // Hiển thị thông báo lỗi từ response của Axios
        const errorMessage = error.response?.data?.message || NOTIFICATIONS.ERROR.SYSTEM;
        console.error(ERROR_TOAST(errorMessage));
      } else {
        // Xử lý lỗi không phải AxiosError
        console.error("Lỗi không phải là AxiosError:", error);
        console.error(ERROR_TOAST(NOTIFICATIONS.ERROR.UNDEFINED));
      }
    
      // Ném lỗi để gọi hàm bên ngoài có thể xử lý nếu cần
      throw error;
    }
  };
  

  // Hàm lấy tất cả câu hỏi
  export const getAllQuestions = async (): Promise<QuestionWithDate[]> => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.QUESTIONS.GET_ALLS);
  
      const items = response.data?.data?.items; // <== sửa tại đây
  
      if (!Array.isArray(items)) {
        console.error("Dữ liệu trả về không phải là mảng:", response.data?.data);
        return [];
      }
  
      return items;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error("Lỗi khi lấy danh sách câu hỏi:", error);
        const errorMessage = error.response?.data?.message || NOTIFICATIONS.ERROR.SYSTEM;
        console.error(ERROR_TOAST(errorMessage));
      } else {
        console.error("Lỗi không phải là AxiosError:", error);
        console.error(ERROR_TOAST(NOTIFICATIONS.ERROR.UNDEFINED));
      }
      throw error;
    }
  };
  
  

