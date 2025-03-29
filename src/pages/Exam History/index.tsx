import React from "react";
import { CheckCircle, ClipboardList, BookOpen, Calendar } from "lucide-react";

interface ExamHistory {
  id: number;
  title: string;
  date: string;
  correctAnswers: number;
  totalQuestions: number;
}

const examHistoryData: ExamHistory[] = [
  { id: 1, title: "Toeic Reading Test 1", date: "2025-03-25", correctAnswers: 45, totalQuestions: 100 },
  { id: 2, title: "Toeic Reading Test 2", date: "2025-03-20", correctAnswers: 90, totalQuestions: 120 },
  { id: 3, title: "Toeic Reading Test 3", date: "2025-03-15", correctAnswers: 78, totalQuestions: 100 },
];

const ExamHistoryList: React.FC = () => {
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
<div className="max-w-7xl mx-auto p-6">
  <div className="grid grid-cols-3 gap-6">
    {/* Exam History Section (2/3 chiều rộng) */}
    <div className="col-span-2 bg-white shadow-lg rounded-lg p-6">
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
    <div className="col-span-1 bg-white shadow-lg rounded-lg p-5">
      {/* <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2 mb-4">
        <ClipboardList className="w-6 h-6 text-blue-500" /> Thống kê bài kiểm tra
      </h2> */}
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
