import { useState } from "react";
import { Plus } from "lucide-react";
import { createQuestion } from "../../../api/questionApi";
import { createParagraph } from "../../../api/paragraphApi";
import { toast } from "react-toastify";

interface CreateQuesPart3Props {
  categoryId: string;
}

const CreateQuesPart3: React.FC<CreateQuesPart3Props> = ({ categoryId }) => {
  const [paragraph, setParagraph] = useState("");
  const [numQuestions, setNumQuestions] = useState(0);
  const [questions, setQuestions] = useState<
    { question: string; options: string[]; correctAnswer: number | null }[]
  >([]);

  const handleNumQuestionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(e.target.value) || 0;
    setNumQuestions(count);
    const updatedQuestions = Array.from({ length: count }, (_, i) => ({
      question: questions[i]?.question || "",
      options: questions[i]?.options || ["", "", "", ""],
      correctAnswer: questions[i]?.correctAnswer ?? null,
    }));
    setQuestions(updatedQuestions);
  };

  const handleQuestionChange = (index: number, value: string) => {
    const updated = [...questions];
    updated[index].question = value;
    setQuestions(updated);
  };

  const handleOptionChange = (
    questionIndex: number,
    optionIndex: number,
    value: string
  ) => {
    const updated = [...questions];
    updated[questionIndex].options[optionIndex] = value;
    setQuestions(updated);
  };

  const handleCorrectAnswerChange = (questionIndex: number, value: number) => {
    const updated = [...questions];
    updated[questionIndex].correctAnswer = value;
    setQuestions(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!paragraph.trim()) {
      alert("Vui lòng nhập đoạn văn.");
      return;
    }
  
    if (numQuestions <= 0 || questions.length === 0) {
      toast.error("Vui lòng nhập ít nhất một câu hỏi.");
      return;
    }
  
    try {
      const trimmedParagraph = paragraph.trim();
      if (!trimmedParagraph) {
        toast.error("Vui lòng nhập đoạn văn.");
        return;
      }
      // 1. Tạo đoạn văn
      const createdParagraph = await createParagraph(paragraph);
  
      if (!createdParagraph?._id) {
        toast.error("Không thể tạo đoạn văn.");
        return;
      }
  
      const paragraphId = createdParagraph._id;
      // const categoryId = "67f10a74a871470f766f4526";
  
      // 2. Gửi từng câu hỏi
      for (const q of questions) {
        const { question, options, correctAnswer } = q;
  
        if (
          !question.trim() ||
          options.some(opt => !opt.trim()) ||
          correctAnswer === null
        ) {
          toast.error("Vui lòng điền đầy đủ thông tin cho các câu hỏi.");
          return;
        }
  
        await createQuestion({
          question_text: question,
          opt_a: options[0],
          opt_b: options[1],
          opt_c: options[2],
          opt_d: options[3],
          answer: ["A", "B", "C", "D"][correctAnswer],
          image_url: "",
          paragraph_id: paragraphId,
          category_id: categoryId,
        });
      }
  
      toast.success("Tạo câu hỏi thành công!");
      setParagraph("");
      setNumQuestions(0);
      setQuestions([]);
    } catch (error) {
      console.error("Lỗi khi tạo câu hỏi:", error);
      toast.error("Đã xảy ra lỗi khi tạo câu hỏi.");
    }
  };
  

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow space-y-6"
    >
      <h2 className="text-xl font-bold">Thêm mới câu hỏi đoạn văn (Part 3)</h2>

      {/* Đoạn văn */}
      <div>
        <label className="block mb-1 font-medium">Nhập đoạn văn</label>
        <textarea
          className="w-full p-3 border rounded-lg"
          rows={5}
          value={paragraph}
          onChange={(e) => setParagraph(e.target.value)}
          placeholder="Nhập đoạn văn..."
        />
      </div>

      {/* Số lượng câu hỏi */}
      <div>
        <label className="block mb-1 font-medium">Số lượng câu hỏi</label>
        <input
          type="number"
          min={1}
          value={numQuestions || ""}
          onChange={handleNumQuestionsChange}
          className="w-32 p-2 border rounded-lg"
          placeholder="0"
        />
      </div>

      {/* Danh sách câu hỏi */}
      <div className="space-y-8">
        {questions.map((q, index) => (
          <div key={index} className="border-t pt-4">
            <h3 className="font-semibold mb-2">Câu hỏi {index + 1}</h3>
            <div className="mb-3">
              <input
                type="text"
                value={q.question}
                onChange={(e) => handleQuestionChange(index, e.target.value)}
                className="w-full p-2 border rounded-lg"
                placeholder="Nhập nội dung câu hỏi"
              />
            </div>
            <div className="space-y-2">
              {q.options.map((opt, optIdx) => (
                <div key={optIdx} className="flex items-center gap-3">
                  <input
                    type="radio"
                    name={`correctAnswer-${index}`}
                    checked={q.correctAnswer === optIdx}
                    onChange={() => handleCorrectAnswerChange(index, optIdx)}
                    className="accent-blue-600"
                  />
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) =>
                      handleOptionChange(index, optIdx, e.target.value)
                    }
                    className="flex-1 p-2 border rounded-lg"
                    placeholder={`Đáp án ${String.fromCharCode(65 + optIdx)}`}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="text-right">
        <button
          type="submit"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <Plus size={18} />
          Thêm câu hỏi
        </button>
      </div>
    </form>
  );
};

export default CreateQuesPart3;
