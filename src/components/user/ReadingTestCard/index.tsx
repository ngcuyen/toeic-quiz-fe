import React, { useEffect, useState } from "react";
import { Question } from "../../../@type/question.type";
import { getParagraphById } from "../../../api/paragraphApi";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteQuizSession, updateQuizSession } from "../../../api/quiz-sessionApi";
import { CheckCircle, XCircle } from "lucide-react";

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
  const [timeLeft, setTimeLeft] = useState(75 * 60); // 75 minutes countdown
  const hasQuestions = part1Questions.length > 0 || part2Questions.length > 0 || part3Questions.length > 0;
  const [paragraphMap, setParagraphMap] = useState<Record<string, string>>({});
  
  useEffect(() => {
    const loadParagraphs = async () => {
      const uniqueIds = Array.from(new Set(part3Questions.map(q => q.paragraph_id).filter(Boolean)));
      const paragraphNames: Record<string, string> = {};

      await Promise.all(
        uniqueIds.map(async (id) => {
          try {
            const paragraph = await getParagraphById(id);
            if (paragraph && paragraph.name) {
              paragraphNames[id] = paragraph.name;
            } else {
              paragraphNames[id] = "Đoạn văn không tồn tại";
            }
          } catch (error) {
            console.error("Failed to fetch paragraph", id, error);
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

  const handleSubmit = async () => {
    if (!quizSessionId) return;
  
    const allQuestions = [...part1Questions, ...part2Questions, ...part3Questions];
    let correctCount = 0;
  
    allQuestions.forEach((question) => {
      const selectedValue = (
        document.querySelector(`input[name="question-${question._id}"]:checked`) as HTMLInputElement
      )?.value;
      
      if (selectedValue && selectedValue.trim() === question.answer) {
        correctCount += 1;
      }
    });
  
    const now = new Date().toISOString();
  
    const result = await updateQuizSession(quizSessionId, {
      end_time: now,
      score: `${correctCount}/${allQuestions.length}`,
    });
  
    console.log(">> Update result:", result);

    if (result) {
      navigate("/test-result", { state: { quizSessionId } });
    } else {
      alert("Có lỗi xảy ra khi nộp bài!");
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmit();
    }
  }, [timeLeft]);

  const [showConfirmExit, setShowConfirmExit] = useState(false);

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
      <p className="text-center text-orange-500 font-semibold text-lg">Thời gian còn lại: {formatTime(timeLeft)}</p>
      <div className="text-center text-orange-500 font-bold text-3xl mb-6">---</div>

      {/* PART 1 */}
      <h1 className="text-2xl font-bold text-center mb-2">PART 1</h1>
      <p className="text-gray-700 text-center italic mb-4 font-medium">
        Directions: A word or phrase is missing in each of the sentences below.
        Four answer choices are given below each sentence. Select the best
        answer to complete the sentence. Then mark the letter (A), (B), (C), or (D) on your answer sheet.
      </p>
      <div className="space-y-6">
        {part1Questions.length > 0 ? (
          part1Questions.map((question, index) => (
            <div key={`part1-${question._id}-${index}`} className="border p-5 rounded-lg shadow-sm bg-gray-50">
              <p className="font-medium text-lg mb-3">
                {index + 1}. {question.question_text}
              </p>
              <div className="space-y-3">
                {["A", "B", "C", "D"].map((letter, idx) => {
                  const option = question[`opt_${letter.toLowerCase()}` as "opt_a" | "opt_b" | "opt_c" | "opt_d"];
                  return (
                    <label key={idx} className="block cursor-pointer flex items-center gap-2">
                      <input
                        type="radio"
                        name={`question-${question._id}`}
                        value={letter}
                        className="form-radio"
                      />
                      <span className="text-gray-800">{option}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Không có câu hỏi cho phần này.</p>
        )}
      </div>

      {/* PART 2 */}
      <h1 className="text-2xl font-bold text-center mt-9 mb-2">PART 2</h1>
      <p className="text-gray-700 text-center italic mb-4 font-medium">
        Directions: Choose the best answer to describe the picture.
      </p>
      <div className="grid grid-cols-2 gap-6">
        {part2Questions.length > 0 ? (
          part2Questions.map((question, index) => (
            <div key={`part2-${question._id}-${index}`} className="border p-5 rounded-lg shadow-sm bg-gray-50 text-left">
              <img src={question.image_url} alt={`Question ${question._id}`} className="w-1/2 h-auto mb-4" />      
              <p className="font-medium text-lg mb-3">
                {index + 1}. {question.question_text}
              </p>
              <div className="space-y-3">
                {["A", "B", "C", "D"].map((letter, idx) => {
                  const option = question[`opt_${letter.toLowerCase()}` as "opt_a" | "opt_b" | "opt_c" | "opt_d"];
                  return (
                    <label key={idx} className="block cursor-pointer flex items-center gap-2">
                      <input
                        type="radio"
                        name={`question-${question._id}`}
                        value={letter}
                        className="form-radio"
                      />
                      <span className="text-gray-800">{option}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Không có câu hỏi cho phần này.</p>
        )}
      </div>

      {/* PART 3 */}
      <h1 className="text-2xl font-bold text-center mt-9 mb-2">PART 3</h1>
      <p className="text-gray-700 text-center italic mb-4 font-medium">
        Directions: Read the text below and select the best answer for each blank.
      </p>
      {Object.entries(
        part3Questions.reduce((groups, question) => {
          const id = question.paragraph_id || "unknown";
          if (!groups[id]) groups[id] = [];
          groups[id].push(question);
          return groups;
        }, {} as Record<string, Question[]>)
      ).map(([pid, questions]) => (
        <div key={pid} className="mb-8">
          <div className="border p-4 rounded-lg shadow-sm bg-gray-50 text-left mb-4">
            <p className="mb-2 underline"><strong>PARAGRAPH</strong></p>
            <p className="font-semibold">{paragraphMap[pid] || "Đoạn văn không tồn tại"}</p>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-6">
            {questions.map((question, index) => (
              <div key={`part3-${question._id}-${index}`} className="border p-5 rounded-lg shadow-sm bg-gray-50">
                <p className="font-medium text-lg mb-3">
                  {index + 1}. {question.question_text}
                </p>
                <div className="space-y-3">
                {["A", "B", "C", "D"].map((letter, idx) => {
                  const option = question[`opt_${letter.toLowerCase()}` as "opt_a" | "opt_b" | "opt_c" | "opt_d"];
                  return (
                    <label key={idx} className="block cursor-pointer flex items-center gap-2">
                      <input
                        type="radio"
                        name={`question-${question._id}`}
                        value={letter}
                        className="form-radio"
                      />
                      <span className="text-gray-800">{option}</span>
                    </label>
                  );
                })}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Buttons */}
      {hasQuestions && (
        <div className="flex justify-end mt-10 mb-3">
          <button
            onClick={() => setShowConfirmExit(true)}
            className="flex items-center gap-2 px-5 py-3 font-medium bg-orange-600 text-white rounded-lg hover:bg-orange-700"
          >
            <XCircle size={20} /> THOÁT LÀM BÀI
          </button>
          <button 
            onClick={handleSubmit}
            className="flex items-center gap-2 px-5 py-3 font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 ml-4">
            <CheckCircle size={20} /> NỘP BÀI
          </button>

          {showConfirmExit && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-lg font-bold mb-4 text-gray-800">Xác nhận thoát bài</h2>
                <p className="mb-6 text-gray-600">Bạn có chắc chắn muốn thoát? Bài làm hiện tại sẽ bị xóa.</p>
                <div className="flex justify-end gap-4">
                  <button
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                    onClick={() => setShowConfirmExit(false)}
                  >
                    Hủy
                  </button>
                  <button
                    className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
                    onClick={handleExitTest}
                  >
                    Xác nhận
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}  
    </>
  );
};

export default ReadingTestCard;
