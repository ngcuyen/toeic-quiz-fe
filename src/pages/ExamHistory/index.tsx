import React, { useEffect, useState } from "react";
import { CheckCircle, ClipboardList, BookOpen, Calendar } from "lucide-react";
import { getAllQuizSessions } from "../../api/quiz-sessionApi";
import { getExamById } from "../../api/examApi";
import { QuizSession } from "../../@type/quiz-session.type";

interface ExamHistory {
  id: string;
  title: string;
  date: string;
  correctAnswers: number;
  totalQuestions: number;
}

const ExamHistoryList: React.FC = () => {
  const [examHistoryData, setExamHistoryData] = useState<ExamHistory[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const sessions: QuizSession[] = (await getAllQuizSessions()) ?? [];

      if (Array.isArray(sessions)) {
        const mapped = await Promise.all(
          sessions.map(async (session): Promise<ExamHistory> => {
            let title = session.exam_id;
            try {
              const exam = await getExamById(session.exam_id);
              title = exam?.title || session.exam_id;
            } catch {
              console.warn(`Không thể lấy exam với ID: ${session.exam_id}`);
            }

            return {
              id: session._id,
              title,
              date: session.start_time.split("T")[0],
              correctAnswers: parseInt(String(session.score).split("/")[0]) || 0,
              totalQuestions: parseInt(String(session.score).split("/")[1]) || 0,
            };
          })
        );

        setExamHistoryData(mapped);
      } else {
        console.warn("Dữ liệu không phải là mảng:", sessions);
      }
    };

    fetchData();
  }, []);
  
  const totalExams = examHistoryData.length;
  const aboveAverageExams = examHistoryData.filter(
    (exam) => exam.correctAnswers / exam.totalQuestions > 0.5
  ).length;

  const currentMonth = new Date().getMonth();
  const examsThisMonth = examHistoryData.filter((exam) => {
    const examDate = new Date(exam.date);
    return examDate.getMonth() === currentMonth;
  }).length;

  const stats = [
    {
      id: 1,
      title: "Tổng số bài đã làm",
      value: totalExams,
      icon: BookOpen,
      color: "text-blue-500",
    },
    {
      id: 2,
      title: "Số bài trên điểm trung bình",
      value: aboveAverageExams,
      icon: CheckCircle,
      color: "text-green-500",
    },
    {
      id: 3,
      title: "Số bài đã làm trong tháng này",
      value: examsThisMonth,
      icon: Calendar,
      color: "text-orange-500",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex gap-6 items-start">
            {/* Exam History Section (2/3 chiều rộng) */}
            <div className="flex-1 bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2 mb-4">
                    <ClipboardList className="w-6 h-6 text-orange-500" /> LỊCH SỬ CÁC BÀI ĐÃ LÀM
                </h2>
                <ul>
                    {examHistoryData.map((exam) => (
                    <li
                        key={exam.id}
                        className="flex justify-between items-center p-4 border-b last:border-none hover:bg-gray-100 transition"
                    >
                        <div>
                        <p className="font-medium text-gray-800">{exam.title}</p>
                        <p className="text-gray-500 text-sm">Date: {exam.date}</p>
                        </div>
                        <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700 font-medium">
                            {exam.correctAnswers}/{exam.totalQuestions}
                        </span>
                        </div>
                    </li>
                    ))}
                </ul>
            </div>

            {/* Statistics Section (1/3 chiều rộng) */}
            <div className="bg-white shadow-lg rounded-lg p-5 self-start">
                <div className="space-y-3 bg-gray-100 rounded-lg p-2">
                    {stats.map((stat) => (
                    <div key={stat.id} className="flex items-center p-4">
                        <stat.icon className={`w-9 h-9 ${stat.color}`} />
                        <div className="ml-4 leading-tight">
                        <p className="font-semibold text-gray-700">{stat.title}</p>
                        <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default ExamHistoryList;
