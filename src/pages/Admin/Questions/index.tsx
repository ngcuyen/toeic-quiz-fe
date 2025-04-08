import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, Edit, Trash2, Eye } from "lucide-react";
import {
  getAllQuestions,
  getQuestionsByPart,
} from "../../../mocks/questions.mock";
import {
  Part1Question,
  Passage,
  QuestionFilter,
} from "../../../@type/question.type";

const QuestionsManagement = () => {
  const [questions, setQuestions] = useState<(Part1Question | Passage)[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<QuestionFilter>({
    part: undefined,
    search: "",
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    // Simulate API call with loading state
    setLoading(true);
    setTimeout(() => {
      let filteredQuestions;

      if (filters.part) {
        filteredQuestions = getQuestionsByPart(filters.part);
      } else {
        filteredQuestions = getAllQuestions();
      }

      // Apply search filter if provided
      if (filters.search) {
        filteredQuestions = filteredQuestions.filter((q) => {
          if ("passageText" in q) {
            return (
              q.passageText
                .toLowerCase()
                .includes(filters.search!.toLowerCase()) ||
              q.questions.some((subQ) =>
                subQ.questionText
                  .toLowerCase()
                  .includes(filters.search!.toLowerCase())
              )
            );
          } else {
            return q.questionText
              .toLowerCase()
              .includes(filters.search!.toLowerCase());
          }
        });
      }

      setQuestions(filteredQuestions);
      setLoading(false);
    }, 500); // Simulate network delay
  }, [filters]);

  const handleFilterChange = (
    part?: "Part 1" | "Part 2" | "Part 3" | "Part 4"
  ) => {
    setFilters((prev) => ({ ...prev, part, page: 1 }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, search: e.target.value, page: 1 }));
  };

  const handleDelete = (id: string | undefined) => {
    if (!id) return;

    // In a real app, this would be an API call
    const confirmed = window.confirm(
      "Are you sure you want to delete this question?"
    );
    if (confirmed) {
      // Filter out the deleted question
      const updatedQuestions = questions.filter((q) => q.id !== id);
      setQuestions(updatedQuestions);
      // Here you would make an API call to delete the question
      console.log(`Question ${id} deleted`);
    }
  };

  const renderQuestionRow = (question: Part1Question | Passage) => {
    const isPassage = "passageText" in question;
    const questionText = isPassage
      ? question.passageText.substring(0, 100) + "..."
      : question.questionText;
    const questionCount = isPassage ? question.questions.length : 1;

    return (
      <tr key={question.id} className="border-b hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap">
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
            {question.part}
          </span>
        </td>
        <td className="px-6 py-4">
          <div className="line-clamp-2">{questionText}</div>
        </td>
        <td className="px-6 py-4 text-center">{questionCount}</td>
        <td className="px-6 py-4 text-center">
          {question.createdAt
            ? new Date(question.createdAt).toLocaleDateString()
            : "N/A"}
        </td>
        <td className="px-6 py-4">
          <div className="flex justify-center space-x-2">
            <Link
              to={`/admin/questions/view/${question.id}`}
              className="p-1 text-blue-600 hover:text-blue-800"
              title="View"
            >
              <Eye size={18} />
            </Link>
            <Link
              to={
                isPassage
                  ? `/admin/questions/part3-4/edit/${question.id}`
                  : `/admin/questions/part1-2/edit/${question.id}`
              }
              className="p-1 text-yellow-600 hover:text-yellow-800"
              title="Edit"
            >
              <Edit size={18} />
            </Link>
            <button
              onClick={() => handleDelete(question.id)}
              className="p-1 text-red-600 hover:text-red-800"
              title="Delete"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
          Question Management
        </h1>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <Link
            to="/admin/questions/part1-2/create"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-center"
          >
            Add Part 1 & 2 Question
          </Link>
          <Link
            to="/admin/questions/part3-4/create"
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-center"
          >
            Add Part 3 & 4 Passage
          </Link>
        </div>
      </div>

      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search questions..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.search}
            onChange={handleSearchChange}
          />
        </div>

        <div className="flex items-center">
          <Filter size={18} className="text-gray-500 mr-2" />
          <select
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.part || ""}
            onChange={(e) =>
              handleFilterChange((e.target.value as any) || undefined)
            }
          >
            <option value="">All Parts</option>
            <option value="Part 1">Part 1</option>
            <option value="Part 2">Part 2</option>
            <option value="Part 3">Part 3</option>
            <option value="Part 4">Part 4</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Loading questions...</p>
        </div>
      ) : questions.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-gray-500">
            No questions found. Try adjusting your filters or add new questions.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Part
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Question/Passage
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Questions
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created Date
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {questions.map(renderQuestionRow)}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination - simplified for this example */}
      <div className="mt-6 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Showing {Math.min(1, questions.length)} to{" "}
          {Math.min(filters.limit || 10, questions.length)} of{" "}
          {questions.length} results
        </div>
        <div className="flex space-x-1">
          <button
            className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50"
            disabled={filters.page === 1}
            onClick={() =>
              setFilters((prev) => ({
                ...prev,
                page: Math.max(1, (prev.page || 1) - 1),
              }))
            }
          >
            Previous
          </button>
          <button
            className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50"
            disabled={questions.length < (filters.limit || 10)}
            onClick={() =>
              setFilters((prev) => ({ ...prev, page: (prev.page || 1) + 1 }))
            }
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionsManagement;
