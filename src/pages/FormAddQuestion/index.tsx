import { useEffect, useState } from "react";
import CreateQuesPart3 from "../../components/admin/CreateQuestionPart3";
import { getCategory } from "../../api/categoryApi";
import { Category } from "../../@type/category.type"; // import kiểu Category
import CreateQuesPart1_2 from "../../components/admin/Create Question Part 1_2";

const FormAddQuestion = () => {
  const [questionType, setQuestionType] = useState("");
  const [categories, setCategories] = useState<Category[]>([]); // Đúng kiểu Category[]
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const data = await getCategory();
        setCategories(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message); // lấy message thật nếu muốn hiển thị chi tiết
        } else {
          setError("Không thể lấy danh mục");
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchCategories();
  }, []);
  
  // Tìm category tương ứng với questionType
  const selectedCategory = categories.find((category) => category.name === questionType);

  return (
    <>
      {/* Phần chọn loại câu hỏi */}
      <div className="max-w-[470px] mx-auto px-5 py-6 bg-white rounded-2xl shadow-md space-y-3">
        <label htmlFor="questionType" className="block text-lg text-center uppercase text-orange-600 font-bold">
          Chọn loại câu hỏi
        </label>
        <select
          id="questionType"
          value={questionType}
          onChange={(e) => setQuestionType(e.target.value)}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>
            Chọn loại câu hỏi
          </option>
          {loading && <option disabled>Đang tải...</option>}
          {error && <option disabled>{error}</option>}
          {categories.map((category) => (
            <option key={category._id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Hiển thị form tương ứng với loại câu hỏi */}
      {(questionType === "Part 1" || questionType === "Part 2") && selectedCategory && (
        <div className="mt-8">
          <CreateQuesPart1_2
            categoryId={selectedCategory._id}
            categoryName={selectedCategory.name} 
          />
        </div>
      )}
      {questionType === "Part 3"  && selectedCategory && (
        <div className="mt-8">
          <CreateQuesPart3 
            categoryId={selectedCategory._id}
          />
        </div>
      )}
    </>
  );
};

export default FormAddQuestion;
