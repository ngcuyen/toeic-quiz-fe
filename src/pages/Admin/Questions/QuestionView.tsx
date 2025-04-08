import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { fetchQuestionById } from "../../../api/adminApi";
import { Part1Question, Passage } from "../../../@type/question.type";
import { ERROR_TOAST, SUCCESS_TOAST } from "../../../constants/notifications";

const QuestionView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState<Part1Question | Passage | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadQuestion = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const data = await fetchQuestionById(id);
        setQuestion(data);
        SUCCESS_TOAST("Question loaded successfully");
      } catch (error) {
        const errorMessage =
          (error as Error).message || "Failed to load question";
        setError(errorMessage);
        ERROR_TOAST(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadQuestion();
  }, [id]);

  const isPassage = question && "passageText" in question;

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
        <p className="mt-2 text-gray-600">Loading question data...</p>
      </div>
    );
  }

  if (error || !question) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate("/admin/questions")}
            className="mr-4 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Question Details</h1>
        </div>
        <div className="text-center py-10 bg-red-50 rounded-lg">
          <p className="text-red-500">
            {error || "Question not found. It may have been deleted."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate("/admin/questions")}
          className="mr-4 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Question Details</h1>
      </div>

      <div className="mb-6">
        <div className="inline-block px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800 mb-4">
          {question.part}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                {isPassage ? "Passage Text" : "Question Text"}
              </h2>
              <div className="p-4 bg-gray-50 rounded-lg whitespace-pre-wrap">
                {isPassage ? question.passageText : question.questionText}
              </div>
            </div>

            {isPassage ? (
              <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-2">
                  Questions ({question.questions.length})
                </h2>
                <div className="space-y-4">
                  {question.questions.map((subQuestion, index) => (
                    <div key={subQuestion.id} className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2">
                        Question {index + 1}: {subQuestion.questionText}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {subQuestion.options.map((option, optIndex) => (
                          <div
                            key={optIndex}
                            className={`p-2 rounded ${
                              String.fromCharCode(65 + optIndex) ===
                              subQuestion.correctAnswer
                                ? "bg-green-100 border border-green-300"
                                : "bg-gray-50"
                            }`}
                          >
                            <span className="font-semibold mr-2">
                              {String.fromCharCode(65 + optIndex)}:
                            </span>
                            {option}
                            {String.fromCharCode(65 + optIndex) ===
                              subQuestion.correctAnswer && (
                              <span className="ml-2 text-green-600 text-sm font-semibold">
                                (Correct)
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-2">
                  Answer Options
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {question.options.map((option, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded ${
                        String.fromCharCode(65 + index) ===
                        question.correctAnswer
                          ? "bg-green-100 border border-green-300"
                          : "bg-gray-50"
                      }`}
                    >
                      <span className="font-semibold mr-2">
                        {String.fromCharCode(65 + index)}:
                      </span>
                      {option}
                      {String.fromCharCode(65 + index) ===
                        question.correctAnswer && (
                        <span className="ml-2 text-green-600 text-sm font-semibold">
                          (Correct)
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            {!isPassage && question.imageUrl && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">
                  Question Image
                </h2>
                <div className="border rounded-lg overflow-hidden">
                  <img
                    src={question.imageUrl}
                    alt="Question"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            )}

            <div className="bg-gray-50 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                Question Details
              </h2>
              <div className="space-y-2">
                <div>
                  <span className="font-medium text-gray-600">ID:</span>{" "}
                  <span className="text-gray-800">{question.id}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Created:</span>{" "}
                  <span className="text-gray-800">
                    {question.createdAt
                      ? new Date(question.createdAt).toLocaleString()
                      : "N/A"}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">
                    Last Updated:
                  </span>{" "}
                  <span className="text-gray-800">
                    {question.updatedAt
                      ? new Date(question.updatedAt).toLocaleString()
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col space-y-2">
              <button
                onClick={() =>
                  navigate(
                    isPassage
                      ? `/admin/questions/part3-4/edit/${question.id}`
                      : `/admin/questions/part1-2/edit/${question.id}`
                  )
                }
                className="w-full py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
              >
                Edit Question
              </button>
              <button
                onClick={() => navigate("/admin/questions")}
                className="w-full py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
              >
                Back to Questions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionView;
