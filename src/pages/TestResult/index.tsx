import React, { useEffect, useState } from "react";
import { CheckCircle, Timer, BarChart3, RotateCcw } from "lucide-react";
import { useLocation } from "react-router-dom";
import { getQuizSessionById } from "../../api/quiz-sessionApi";
import { QuizSession } from "../../@type/quiz-session.type";

const TestResult: React.FC = () => {
  // Lấy quizSessionId từ state của location
  const location = useLocation();
  const { quizSessionId } = location.state || {};
  const [quizSession, setQuizSession] = useState<QuizSession | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (quizSessionId) {
        const data = await getQuizSessionById(quizSessionId);
        setQuizSession(data);
      }
    };

    fetchData();
  }, [quizSessionId]);

  if (!quizSession) {
    return <p className="text-center mt-10 text-gray-500">Đang tải kết quả...</p>;
  }

  const start = new Date(quizSession.start_time);
  const end = new Date(quizSession.end_time);
  const timeTaken = new Date(end.getTime() - start.getTime()).toISOString().substr(11, 8); // HH:mm:ss
  const scoreString = quizSession.score || "0/1"; // fallback để tránh chia 0
  const [correctStr, totalStr] = scoreString.split("/");
  const correct = parseInt(correctStr, 10);
  const total = parseInt(totalStr, 10);
  const percentage = total > 0 ? ((correct / total) * 100).toFixed(0) : "0";

  const getPerformanceLabel = () => {
    const p = parseInt(percentage);
    if (p >= 90) return "Xuất sắc 🎉";
    if (p >= 75) return "Rất tốt 👍";
    if (p >= 50) return "Tạm ổn 👌";
    return "Cần cải thiện 💪";
  };


  return (
    <div className="max-w-4xl mx-auto my-[60px] bg-white shadow-lg rounded-2xl p-9 border border-gray-100">
      <h2 className="text-3xl font-bold text-center text-orange-500 mb-6 uppercase">
        Kết Quả Bài Thi Reading
      </h2>

      <div className="space-y-5 text-center">
        <div className="flex items-center justify-center gap-3 text-green-600">
          <CheckCircle className="w-6 h-6" />
          <p className="text-xl font-semibold">
            {correct}/{total} câu đúng
          </p>
        </div>

        {/* Thời gian + độ chính xác chung 1 hàng */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <div className="flex items-center gap-2 text-blue-600">
            <Timer className="w-6 h-6" />
            <p className="text-xl font-semibold">
              Thời gian: {timeTaken}
            </p>
          </div>

          <div className="flex items-center gap-2 text-yellow-600">
            <BarChart3 className="w-6 h-6" />
            <p className="text-xl font-semibold">
              Độ chính xác: {percentage}%
            </p>
          </div>
        </div>

        <p className="text-lg font-medium text-gray-700 italic">
          Đánh giá:{" "}
          <span className="text-orange-500 font-bold">{getPerformanceLabel()}</span>
        </p>

        <div className="flex justify-center gap-4 mt-6">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl shadow"
            onClick={() => window.location.href = "/practice"}
          >
            <RotateCcw className="w-5 h-5" />
            Luyện lại
          </button>

          <button
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl shadow"
            onClick={() => alert("Tính năng xem đáp án đang phát triển")}
          >
            <BarChart3 className="w-5 h-5" />
            Xem đáp án
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestResult;
