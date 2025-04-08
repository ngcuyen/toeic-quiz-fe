import { useEffect, useState } from "react";
import QuestionTypeCard from "../QuestionTypeCard";
import { getAllExams } from "../../../api/examApi";
import { Exam } from "../../../@type/exam.type";
import { getAllExamQuestions } from "../../../api/exam-questionsApi";
import { ExamQuestions } from "../../../@type/exam-questions.type";
import { useNavigate } from "react-router-dom";
import { createQuizSession } from "../../../api/quiz-sessionApi";

const QuestionTypeList = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [examQuestions, setExamQuestions] = useState<ExamQuestions[]>([]);
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
  const navigate = useNavigate();

  // Lấy danh sách các EXAM
  useEffect(() => {
    const fetchExams = async () => {
      const data = await getAllExams();
      console.log("📦 EXAMS API RESPONSE:", data);
      if (data) {
        setExams(data);
      }
    };

    // Lấy danh sách các EXAM QUESTIONS
    const fetchExamQuestions = async () => {
      const data = await getAllExamQuestions(); // Giả sử bạn gọi hàm này từ API
      console.log("📦 Exam Questions API RESPONSE:", data);

      if (data && Array.isArray(data.items)) {
        setExamQuestions(data.items); // Lấy mảng từ data.items
      } else {
        console.error("Data is not an array:", data);
        setExamQuestions([]); // Nếu dữ liệu không phải mảng, gán mảng rỗng
      }
    };

    fetchExams();
    fetchExamQuestions();
  }, []);

  useEffect(() => {
    // Khi cả exams và examQuestions đều đã có dữ liệu, bạn có thể tắt trạng thái loading
    if (exams.length > 0 && examQuestions.length > 0) {
      setLoading(false);
    }
  }, [exams, examQuestions]);

  const baseQuestionTypes = [
    {
      part: "Test 1",
      exercises: 22,
      time: 75,
      views: 50742,
      completed: 0,
      total: 26,
      color: "bg-gradient-to-b from-red-300 to-red-500"
    },
    {
      part: "Test 2",
      exercises: 22,
      time: 75,
      views: 54892,
      completed: 0,
      total: 26,
      color: "bg-gradient-to-b from-purple-300 to-purple-500"
    },
    {
      part: "Test 3",
      exercises: 22,
      time: 75,
      views: 38140,
      completed: 0,
      total: 26,
      color: "bg-gradient-to-b from-yellow-300 to-yellow-500"
    },
    {
      part: "Test 4",
      exercises: 22,
      time: 75,
      views: 12149,
      completed: 0,
      total: 26,
      color: "bg-gradient-to-b from-blue-300 to-blue-500"
    }
  ];

  // Tạo một danh sách các question_id cho mỗi exam_id
  const getQuestionsForExam = (examId: string) => {
    if (Array.isArray(examQuestions)) {
      const filteredQuestions = examQuestions.filter((question) => question.exam_id === examId);
      // Lấy các question_id từ filteredQuestions
      return filteredQuestions.map((question) => question.question_id);
    } else {
      console.error("examQuestions is not an array:", examQuestions);
      return []; // Trả về mảng rỗng nếu không phải mảng
    }
  };

  // Hàm xử lý khi click vào QuestionTypeCard
  const handleCardClick = async (examId: string) => { 
    if (!examId) {
      console.error("Exam ID không hợp lệ:", examId);
      return; // Ngừng thực hiện nếu examId không hợp lệ
    }
  
    // Lọc ra các questionIds tương ứng với examId
    const filteredQuestions = examQuestions
      .filter((question) => question.exam_id === examId);
  
    console.log(`Exam ID: ${examId} - Questions:`, filteredQuestions);
  
    // Tạo quiz session mới
    const newQuizSession = await createQuizSession({
      user_id: "", // Bạn cần thay đổi cái này bằng cách lấy user_id từ context hoặc state
      exam_id: examId,
      start_time: new Date().toISOString(),
      end_time: "", 
      score: "" // Điểm số ban đầu, có thể cập nhật sau
    });

    if (newQuizSession) {
      console.log("Tạo quiz-session thành công:", newQuizSession);
      // Chuyển hướng tới trang /reading-test và truyền quiz-session_id và questions vào state
      navigate("/reading-test", { state: { quizSessionId: newQuizSession._id, questions: filteredQuestions } });
    } else {
      console.error("Không thể tạo quiz session.");
    }
  };

  return (
    <div className="container mx-auto max-w-7xl pt-6 pb-10 px-8 ">
      <h2 className="text-3xl font-bold mb-10">Luyện READING
      <span className="w-[120px] h-1 bg-orange-500 mt-1 block"></span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[58px]">
        {loading ? (
          <div>Đang tải...</div>
        ) : (
          baseQuestionTypes.map((item, index) => {
            const exam = exams[index]; // Lấy exam tương ứng với phần baseQuestionTypes
            const questionIds = exam ? getQuestionsForExam(exam._id) : []; // Lấy các question_id của exam hiện tại        
            // console.log("Question IDs:", questionIds); // Log questionIds
            return (
              <QuestionTypeCard
                key={exam._id}
                part={item.part}
                title={exams[index]?.title || "Đang tải..."}
                exercises={item.exercises}
                time={item.time}
                views={item.views}
                completed={item.completed}
                total={item.total}
                color={item.color}
                questionIds={questionIds} // Truyền danh sách question_id cho card
                onClick={() => handleCardClick(exam._id)} // Sự kiện click vào card
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default QuestionTypeList;
