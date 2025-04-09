import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, XCircle } from "lucide-react";
import { Question } from "../../../../@type/question.type";
import { getParagraphById } from "../../../../api/paragraphApi";
import { deleteQuizSession, updateQuizSession } from "../../../../api/quiz-sessionApi";
import ReadingParts from "../ReadingPart";
import { toast } from "react-toastify";
import ConfirmModal from "../ConfimModal";

interface ReadingTestCardProps {
  part1Questions: Question[];
  part2Questions: Question[];
  part3Questions: Question[];
}

const ReadingTestCard: React.FC<ReadingTestCardProps> = ({
  part1Questions,
  part2Questions,
  part3Questions,
}) => {
  const location = useLocation();
  const { quizSessionId } = location.state || {};
  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState(75 * 60);
  //Lưu câu trả lời của người dùng
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [showConfirmExit, setShowConfirmExit] = useState(false);
  const [paragraphMap, setParagraphMap] = useState<Record<string, string>>({});

  const hasQuestions =
    part1Questions.length > 0 || part2Questions.length > 0 || part3Questions.length > 0;

  // Countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmit();
    }
  }, [timeLeft]);

  // Load paragraph cho Part 3
  useEffect(() => {
    const loadParagraphs = async () => {
      const uniqueIds = Array.from(
        new Set(part3Questions.map((q) => q.paragraph_id).filter(Boolean))
      );
      const paragraphNames: Record<string, string> = {};

      await Promise.all(
        uniqueIds.map(async (id) => {
          try {
            const paragraph = await getParagraphById(id);
            paragraphNames[id] = paragraph?.name || "Đoạn văn không tồn tại";
          } catch (error) {
            console.error("Lỗi khi tải đoạn văn:", error);
            paragraphNames[id] = "Đoạn văn không tồn tại";
          }
        })
      );
      setParagraphMap(paragraphNames);
    };

    if (part3Questions.length > 0) {
      loadParagraphs();
    }
  }, [part3Questions]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  //Xử lý nộp bài
  const handleSubmit = async () => {
    if (!quizSessionId) return;

    const allQuestions = [...part1Questions, ...part2Questions, ...part3Questions];
    let correctCount = 0;
    let unansweredCount = 0;

    allQuestions.forEach((question) => {
      const selectedValue = userAnswers[question._id];

      if (!selectedValue) {
        unansweredCount += 1;
        return;
      }

      if (selectedValue?.trim() === question.answer) {
        correctCount += 1;
      }
    });

    // Nếu còn câu chưa làm, báo lỗi và không nộp
    if (unansweredCount > 0) {
      toast.error(`Bạn còn ${unansweredCount} câu chưa trả lời. Vui lòng hoàn thành trước khi nộp bài.`);
      return;
    }

    const now = new Date().toISOString();

    const result = await updateQuizSession(quizSessionId, {
      end_time: now,
      score: `${correctCount}/${allQuestions.length}`,
    });

    if (result) {
      console.log("User answers:", userAnswers);
      navigate("/test-result", { state: { quizSessionId, userAnswers } });
    } else {
      toast.error("Có lỗi xảy ra khi nộp bài!");
    }
  };

  const handleExitTest = async () => {
    if (!quizSessionId) return;
    const success = await deleteQuizSession(quizSessionId);
    if (success) {
      navigate("/");
    } else {
      alert("Có lỗi xảy ra khi thoát bài!");
    }
  };

  return (
    <>
      <p className="text-center text-orange-500 font-semibold text-lg">
        Thời gian còn lại: {formatTime(timeLeft)}
      </p>
      <div className="text-center text-orange-500 font-bold text-3xl mb-6">---</div>

      <ReadingParts
        part1Questions={part1Questions}
        part2Questions={part2Questions}
        part3Questions={part3Questions}
        paragraphMap={paragraphMap}
        userAnswers={userAnswers}
        setUserAnswers={setUserAnswers}
      />

      {hasQuestions && (
        <div className="flex justify-end mt-10 mb-3">
          <button
            onClick={() => setShowConfirmExit(true)}
            className="flex items-center gap-2 px-5 py-3 font-medium bg-orange-600 text-white rounded-lg hover:bg-orange-700"
          >
            <XCircle size={20} /> THOÁT LÀM BÀI
          </button>
          <button
            onClick={() => setShowConfirmSubmit(true)}
            className="flex items-center gap-2 px-5 py-3 font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 ml-4"
          >
            <CheckCircle size={20} /> NỘP BÀI
          </button>
        </div>
      )}

      <ConfirmModal
        show={showConfirmSubmit}
        title="Xác nhận nộp bài"
        description="Bạn có chắc chắn muốn nộp bài? Bạn sẽ không thể thay đổi câu trả lời sau khi nộp."
        onCancel={() => setShowConfirmSubmit(false)}
        onConfirm={() => {
          setShowConfirmSubmit(false);
          handleSubmit();
        }}
      />

      <ConfirmModal
        show={showConfirmExit}
        title="Xác nhận thoát làm bài"
        description="Bạn có chắc chắn muốn thoát? Bài làm hiện tại sẽ bị xóa."
        onCancel={() => setShowConfirmExit(false)}
        onConfirm={handleExitTest}
        confirmButtonColor="bg-orange-600 hover:bg-orange-700"
      />
    </>
  );
};

export default ReadingTestCard;
