import React, { useEffect, useState } from "react";
import { Plus, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAllQuestions } from "../../api/questionApi";
import { QuestionWithDate } from "../../@type/question.type";
import { getCategoryById } from "../../api/categoryApi";

const QuestionList: React.FC = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<QuestionWithDate[]>([]);
  const [categoryNames, setCategoryNames] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getAllQuestions();
        setQuestions(data);

        const categoryIds = [...new Set(data.map(q => q.category_id))];
        const categories = await Promise.all(
          categoryIds.map(async (categoryId) => {
            try {
              const category = await getCategoryById(categoryId);
              return { id: categoryId, name: category.name };
            } catch (error) {
              console.error(`Không lấy được category cho id ${categoryId}`, error);
              return { id: categoryId, name: "Không xác định" };
            }
          })
        );
        
        const categoryNameMap = categories.reduce((acc, category) => {
          acc[category.id] = category.name;
          return acc;
        }, {} as { [key: string]: string });

        setCategoryNames(categoryNameMap);

      } catch (error) {
        console.error("Không thể lấy danh sách câu hỏi:", error);
      }
    };

    fetchQuestions();
  }, []);

  const renderTypeLabel = (categoryId: string) => {
    switch (categoryId) {
      case "67f10a6aa871470f766f4524": // Part 1
        return { label: "Part 1", style: "bg-green-100 text-green-700" };
      case "67f10a6fa871470f766f4525": // Part 2
        return { label: "Part 2", style: "bg-yellow-100 text-yellow-700" };
      case "67f10a74a871470f766f4526": // Part 3
        return { label: "Part 3", style: "bg-purple-100 text-purple-700" };
      default:
        return { label: "Khác", style: "bg-gray-100 text-gray-700" }; // Nếu không tìm thấy ID nào khớp
    }
  };
  
  return (
    <div className="px-6 pb-6 pt-1 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-7">
        <h1 className="text-2xl font-bold text-gray-800">📋 Danh sách câu hỏi</h1>
        <button
          onClick={() => navigate("/admin/create-question")}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg shadow transition"
        >
          <Plus className="w-5 h-5" />
          Thêm câu hỏi
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-xl">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="py-3 pl-5 w-12">STT</th> {/* Cột số thứ tự nhỏ lại */}
              <th className="py-3 px-6">Nội dung câu hỏi</th>
              <th className="py-3 px-6 text-center">Đáp án đúng</th>
              <th className="py-3 px-6 text-center">Loại câu hỏi</th>
              <th className="py-3 px-6">Ngày tạo</th>
              <th className="py-3 px-6 text-center">Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(questions) && questions.map((q, index) => {
              const { style } = renderTypeLabel(q.category_id); // Trực tiếp lấy label và style từ renderTypeLabel
              const categoryName = categoryNames[q.category_id] || "Không xác định"; // Lấy category name từ categoryNames

              return (
                <tr key={q._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-center">{index + 1}</td> {/* Hiển thị số thứ tự */}
                  <td className="px-6 py-4 max-w-xs truncate">{q.question_text}</td>
                  <td className="px-6 py-4 text-center font-bold text-blue-600">{q.answer}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${style}`}>
                      {categoryName}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {q.created_at ? new Date(q.created_at).toLocaleDateString("vi-VN") : "N/A"}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-blue-600 hover:text-blue-800 transition">
                      <ChevronRight className="w-5 h-5 inline" />
                    </button>
                  </td>
                </tr>
              );
            })}
            {questions.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">
                  Không có câu hỏi nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuestionList;
