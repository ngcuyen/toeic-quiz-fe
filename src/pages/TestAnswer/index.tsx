import React, { useEffect, useState } from "react";
import { CheckCircle, Circle } from "lucide-react";
import { useLocation } from "react-router-dom";

import { getAllExamQuestions } from "../../api/exam-questionsApi";
import { getQuestionById } from "../../api/questionApi";
import { getCategory } from "../../api/categoryApi";
import { getParagraphById } from "../../api/paragraphApi";

import { Question } from "../../@type/question.type";
import { Category } from "../../@type/category.type";

type Answer = {
  _id: string;
  text: string;
};

type ExtendedQuestion = Question & {
  answers: Answer[];
};

const TestAnswer: React.FC = () => {
  let globalIndex = 0;

  // Lấy dữ liệu từ location.state khi chuyển trang
  const location = useLocation();
  const { examId, userAnswers } = location.state || {};

  // State
  const [, setCategories] = useState<Category[]>([]);
  const [questionIds, setQuestionIds] = useState<string[]>([]);
  const [questions, setQuestions] = useState<ExtendedQuestion[]>([]);
  const [part1Questions, setPart1Questions] = useState<Question[]>([]);
  const [part2Questions, setPart2Questions] = useState<Question[]>([]);
  const [part3Questions, setPart3Questions] = useState<Question[]>([]);
  const [paragraphMap, setParagraphMap] = useState<Record<string, string>>({});

  // Lấy danh sách các câu hỏi thuộc bài thi
  useEffect(() => {
    const fetchExamQuestions = async () => {
      const res = await getAllExamQuestions();
      if (res && Array.isArray(res.items)) {
        const matchedQuestions = res.items.filter(
          (item) => item.exam_id?.toString() === examId?.toString()
        );
        if (matchedQuestions.length > 0) {
          const ids = matchedQuestions.map((item) => item.question_id);
          setQuestionIds(ids);
        }
      }
    };

    if (examId) {
      fetchExamQuestions();
    }
  }, [examId]);

  // Lấy chi tiết từng câu hỏi theo ID
  useEffect(() => {
    const fetchQuestionsByIds = async () => {
      const convertQuestion = (q: Question): ExtendedQuestion => ({
        ...q,
        answers: [
          { _id: "A", text: q.opt_a },
          { _id: "B", text: q.opt_b },
          { _id: "C", text: q.opt_c },
          { _id: "D", text: q.opt_d },
        ],
      });

      try {
        const result = await Promise.all(questionIds.map(getQuestionById));
        const converted = result.map(convertQuestion);
        setQuestions(converted);
      } catch (error) {
        console.error("❌ Lỗi khi lấy danh sách câu hỏi:", error);
      }
    };

    if (questionIds.length > 0) {
      fetchQuestionsByIds();
    }
  }, [questionIds]);

  // Phân loại câu hỏi theo Part
  useEffect(() => {
    const fetchCategoriesAndDivideQuestions = async () => {
      try {
        const categoriesRes = await getCategory();
        setCategories(categoriesRes);

        const part1 = categoriesRes.find((c) => c.name === "Part 1");
        const part2 = categoriesRes.find((c) => c.name === "Part 2");
        const part3 = categoriesRes.find((c) => c.name === "Part 3");

        if (part1?._id) {
          setPart1Questions(questions.filter((q) => q.category_id === part1._id));
        }
        if (part2?._id) {
          setPart2Questions(questions.filter((q) => q.category_id === part2._id));
        }
        if (part3?._id) {
          setPart3Questions(questions.filter((q) => q.category_id === part3._id));
        }
      } catch (err) {
        console.error("❌ Lỗi khi phân loại câu hỏi:", err);
      }
    };

    if (questions.length > 0) {
      fetchCategoriesAndDivideQuestions();
    }
  }, [questions]);

  // Lấy thông tin đoạn văn cho Part 3
  useEffect(() => {
    const fetchParagraphs = async () => {
      const paragraphIds = Array.from(
        new Set(part3Questions.map((q) => q.paragraph_id).filter(Boolean))
      );

      const newMap: Record<string, string> = {};
      await Promise.all(
        paragraphIds.map(async (id) => {
          if (id && !paragraphMap[id]) {
            const res = await getParagraphById(id);
            if (res) newMap[id] = res.name;
          }
        })
      );

      setParagraphMap((prev) => ({ ...prev, ...newMap }));
    };

    if (part3Questions.length > 0) {
      fetchParagraphs();
    }
  }, [part3Questions]);

  // Render một câu hỏi
  const renderQuestion = (q: ExtendedQuestion, index: number) => {
    const selectedAnswerId = userAnswers?.[q._id];
    const answers = q.answers || [];

    return (
      <div key={q._id} className="space-y-3 border rounded-xl p-4 shadow-sm">
        {q.image_url && (
          <img
            src={q.image_url}
            alt={`Question ${index + 1} image`}
            className="w-1/2 h-auto rounded-md mb-2"
          />
        )}
        <p className="text-lg font-semibold text-gray-800">
          {index + 1}. {q.question_text}
        </p>
        <ul className="space-y-2">
          {answers.map((answer) => {
            const isCorrect = answer._id === q.answer;
            const isSelected = answer._id === selectedAnswerId;

            let borderColor = "border-gray-300";
            let bgColor = "bg-white";
            let textColor = "text-gray-800";

            if (isCorrect) {
              borderColor = "border-green-500";
              bgColor = "bg-green-50";
              textColor = "text-green-600";
            } else if (isSelected) {
              borderColor = "border-red-400";
              bgColor = "bg-red-50";
              textColor = "text-red-600";
            }

            return (
              <li
                key={answer._id}
                className={`flex items-center gap-3 px-4 py-2 border ${borderColor} ${bgColor} rounded-lg`}
              >
                {isSelected ? (
                  <CheckCircle className={`w-5 h-5 ${textColor}`} />
                ) : (
                  <Circle className={`w-5 h-5 ${textColor}`} />
                )}
                <span className={`text-base ${textColor}`}>{answer.text}</span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto my-10 p-6 space-y-10">
      <h2 className="text-3xl font-bold text-center text-orange-500 uppercase">
        Đáp Án Bài Làm
      </h2>

      {/* Part 1 */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-gray-700">Part 1 - Incomplete Sentences</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {part1Questions.map((q) => renderQuestion(q as ExtendedQuestion, globalIndex++))}  
        </div>
      </div>

      {/* Part 2 */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-gray-700">Part 2 - Photo Questions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {part2Questions.map((q) => renderQuestion(q as ExtendedQuestion, globalIndex++))}
        </div>
      </div>

      {/* Part 3 - Group theo paragraph */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-700">Part 3 - Reading Paragraph</h3>
        {Object.entries(
          part3Questions.reduce((acc, question) => {
            const pid = question.paragraph_id || "no_paragraph";
            if (!acc[pid]) acc[pid] = [];
            acc[pid].push(question);
            return acc;
          }, {} as Record<string, Question[]>)
        ).map(([pid, questionsInParagraph]) => (
          <div key={pid} className="space-y-4">
            {pid !== "no_paragraph" && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 px-4 py-2 rounded">
                <p className="underline text-xl text-yellow-800 mb-1">
                  <strong>PARAGRAPH:</strong>
                </p>
                <p className="text-lg font-medium text-yellow-700">
                  {paragraphMap[pid] || "Đang tải..."}
                </p>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {questionsInParagraph.map((q) =>
                renderQuestion(q as ExtendedQuestion, globalIndex++)
            )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestAnswer;
