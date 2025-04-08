import { QuizSession } from "../@type/quiz-session.type";   
import { API_ENDPOINTS } from "../constants/apiEndpoints"; 
import axiosInstance from "../libs/axiosInstance";
import { getTokenFromCookies } from "../libs/token";

interface CreateQuizSessionPayload {
  user_id: string;
  exam_id: string;
  start_time: string;
  end_time: string;
  score?: string;
}

// Tạo mới quiz-session
export const createQuizSession = async (data: CreateQuizSessionPayload): Promise<QuizSession | null> => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.QUIZ_SESSIONS.CREATE, data);
    return response.data.data as QuizSession;
  } catch (error) {
    console.error("Lỗi khi tạo quiz session:", error);
    return null;
  }
};

// Cập nhật quiz-session
export const updateQuizSession = async (id: string, data: Partial<CreateQuizSessionPayload>): Promise<QuizSession | null> => {
  try {
    const token = getTokenFromCookies("access_token");
    console.log("📩 Gửi yêu cầu cập nhật quiz session:", { id, data });
    const response = await axiosInstance.put(
      API_ENDPOINTS.QUIZ_SESSIONS.UPDATE(id),
      data,
      {
        headers: {
          ...(token && { Authorization: `Bearer ${token}` })
        }
      }
    );
    console.log("✅ Cập nhật thành công:", response.data.data);
    return response.data.data as QuizSession;
  } catch (error) {
    console.error("Lỗi khi cập nhật quiz session:", error);
    return null;
  }
};

// Lấy tất cả quiz sessions
export const getAllQuizSessions = async (): Promise<QuizSession[] | null> => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.QUIZ_SESSIONS.GET_ALLS);
    const data = response.data.data;

    if (Array.isArray(data.items)) {
      return data.items as QuizSession[];
    } else {
      console.warn("⚠️ `items` không phải là mảng:", data.items);
      return null;
    }
  } catch (error) {
    console.error("Lỗi khi lấy danh sách quiz sessions:", error);
    return null;
  }
};


// Lấy quiz session theo ID
export const getQuizSessionById = async (id: string): Promise<QuizSession | null> => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.QUIZ_SESSIONS.GET_BY_ID(id));
    return response.data.data as QuizSession;
  } catch (error) {
    console.error(`Lỗi khi lấy quiz session với ID ${id}:`, error);
    return null;
  }
};

// Xóa quiz session
export const deleteQuizSession = async (id: string): Promise<boolean> => {
  try {
    const token = getTokenFromCookies("access_token");
    const response = await axiosInstance.delete(
      API_ENDPOINTS.QUIZ_SESSIONS.DELETE(id),
      {
        headers: {
          ...(token && { Authorization: `Bearer ${token}` })
        }
      }
    );
    console.log("🗑️ Xóa quiz session thành công:", response.data);
    return true;
  } catch (error) {
    console.error(`❌ Lỗi khi xóa quiz session với ID ${id}:`, error);
    return false;
  }
};
