import { useState } from "react";
import { ImageIcon, Plus } from "lucide-react";
import { createQuestion } from "../../../api/questionApi";
import { API_ENDPOINTS } from "../../../constants/apiEndpoints";
import { AxiosError } from "axios";
import { QuestionCreate } from "../../../@type/question.type";
import { toast } from "react-toastify";

interface CreateQuesPart1_2Props {
  categoryId: string;
  categoryName: string;
}

const CreateQuesPart1_2: React.FC<CreateQuesPart1_2Props> = ({ categoryId, categoryName }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [urlInput, setUrlInput] = useState<string>("");
  const [urlError, setUrlError] = useState<string>("");

  // Hàm xử lý khi người dùng thay đổi đáp án
  const handleOptionChange = (value: string, index: number) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

// Hàm xử lý khi người dùng tải lên hình ảnh
const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files ? e.target.files[0] : null;
  if (file) {
    setImage(file);

    const formData = new FormData();
    formData.append("image", file); // Dùng tên 'image' để gửi file tới backend

    try {
      const endpoint = categoryName === "Part 1"
        ? API_ENDPOINTS.UPLOADS.UPLOAD_BUG
        : API_ENDPOINTS.UPLOADS.UPLOAD_SOLUTION;

      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.url) {
          setImageUrl(data.url);  // Lưu URL của ảnh vào state
          console.log("Ảnh đã được tải lên:", data.url);
        }
      } else {
        console.error("Có lỗi khi tải ảnh lên backend");
      }
    } catch (error) {
      console.error("Có lỗi khi tải ảnh lên:", error);
    }
  }
};

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Hàm xử lý khi người dùng nhấn nút "Thêm câu hỏi"
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    let finalImageUrl = imageUrl;

    if (categoryName === "Part 2") {
      if (!image && !isValidUrl(urlInput)) {
        setUrlError("Vui lòng tải ảnh lên hoặc nhập URL ảnh hợp lệ.");
        return;
      }
      if (!image && isValidUrl(urlInput)) {
        finalImageUrl = urlInput;
      }
    }
    setUrlError("");

    // Chuẩn bị dữ liệu câu hỏi theo kiểu Question
    const data: QuestionCreate = {
      question_text: question,
      paragraph_id: "",
      category_id: categoryId,
      image_url: categoryName === "Part 1" ? "" : finalImageUrl,
      opt_a: options[0],
      opt_b: options[1],
      opt_c: options[2],
      opt_d: options[3],
      answer: String.fromCharCode(65 + (correctAnswer || 0)),
    };
  
    try {
      const result = await createQuestion(data);
      console.log("Câu hỏi đã được thêm:", result);
      // Hiển thị toast thành công
      toast.success("Đã thêm câu hỏi thành công!", {
        position: "top-right",
        autoClose: 3000,
      });

      setQuestion("");
      setOptions(["", "", "", ""]);
      setCorrectAnswer(null);
      setImage(null);
      setImageUrl("");
      setUrlInput("");
    } catch (error) {
      console.error("Có lỗi khi thêm câu hỏi:", error);
    
      if (error instanceof AxiosError && error.response) {
        // In ra dữ liệu lỗi chi tiết từ backend
        console.log("Thông tin lỗi từ backend:", error.response.data);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow space-y-6">
      <h2 className="text-xl font-bold">Thêm mới câu hỏi trắc nghiệm (Part 1)</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Nội dung câu hỏi bên trái */}
        <div className="md:col-span-2 space-y-4">
          <div>
            <label className="block mb-1 font-medium">Nội dung câu hỏi</label>
            <textarea
              className="w-full p-3 border rounded-lg"
              rows={4}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Nhập câu hỏi..."
            />
          </div>

          {/* Hiển thị phần tải ảnh chỉ khi categoryId là "Part 2" */}
          {categoryName === "Part 2" && (
            <div>
              <label className="block mb-1 font-medium">Tải hình ảnh</label>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                />
                {image && (
                  <ImageIcon className="text-green-600" size={20} />
                )}
              </div>
              {image && (
                <div className="mt-2">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="w-full h-auto max-h-64 object-contain rounded border"
                  />
                </div>
              )}
              {!image && (
                <div className="mt-4">
                  <label className="block mb-1 font-medium">Hoặc nhập URL ảnh</label>
                  <input
                    type="text"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="w-full p-2 border rounded-lg"
                  />
                  {urlError && <p className="text-red-500 text-sm mt-1">{urlError}</p>}
                </div>
              )}              
            </div>
          )}
        </div>

        {/* Đáp án bên phải */}
        <div className="space-y-3">
          <label className="block mb-1 font-medium">Các đáp án</label>
          {options.map((option, index) => (
            <div key={index} className="flex items-center gap-3">
              <input
                type="radio"
                name="correctAnswer"
                checked={correctAnswer === index}
                onChange={() => setCorrectAnswer(index)}
                className="accent-blue-600"
              />
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(e.target.value, index)}
                className="flex-1 p-2 border rounded-lg"
                placeholder={`Đáp án ${String.fromCharCode(65 + index)}`}
              />
            </div>
          ))}
        </div>
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

export default CreateQuesPart1_2;
