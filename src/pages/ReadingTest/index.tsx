import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Question } from "../../@type/question.type";
import { getCategory } from "../../api/categoryApi";
import { Category } from "../../@type/category.type";
import { getQuestionById } from "../../api/questionApi";
import ReadingTestCard from "../../components/user/ReadingTestCard";

const ReadingTest = () => {
  const currentDate = new Date().toLocaleDateString("vi-VN");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [part1Questions, setPart1Questions] = useState<Question[]>([]);
  const [part2Questions, setPart2Questions] = useState<Question[]>([]);
  const [part3Questions, setPart3Questions] = useState<Question[]>([]);

  // Lấy dữ liệu câu hỏi từ state (truyền qua navigate)
  const location = useLocation();  
  const { questions: questionsFromState } = location.state || {};


  useEffect(() => {
    console.log("questionsFromState:", questionsFromState); // Log câu hỏi từ state
  
    const fetchDetailedQuestions = async () => {
      try {
        if (questionsFromState.length > 0) {
          const detailedQuestions: Question[] = [];
  
          // Lặp qua các question_id và lấy câu hỏi chi tiết từ API
          for (const item of questionsFromState) {
            const question = await getQuestionById(item.question_id); // Lấy câu hỏi chi tiết
  
            // Kiểm tra nếu question có thuộc tính `data` sau khi gọi getQuestionById
            if (question) {
              detailedQuestions.push(question); // Nếu có, đẩy vào danh sách câu hỏi chi tiết
            } else {
              console.error("Không có dữ liệu câu hỏi với ID:", item.question_id);
            }
          }
  
          console.log("Dữ liệu câu hỏi chi tiết:", detailedQuestions); // Log dữ liệu
          setQuestions(detailedQuestions); // Set vào state câu hỏi chi tiết
        }
      } catch (error) {
        console.error("Lỗi khi lấy câu hỏi chi tiết:", error);
      }
    };
  
    fetchDetailedQuestions();
  }, [questionsFromState]);
  

  useEffect(() => {
    console.log("Fetching categories..."); // Log khi bắt đầu lấy danh mục
    const fetchCategories = async () => {
      try {
        const categoryData = await getCategory();
        setCategories(categoryData);
        console.log("Categories fetched:", categoryData); // Log khi lấy danh mục xong
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    console.log("questions:", questions); // Log câu hỏi hiện tại
    console.log("categories:", categories); // Log danh mục hiện tại
    if (categories.length > 0 && questions.length > 0) {
      // Phân loại câu hỏi theo category_id
      const part1: Question[] = [];
      const part2: Question[] = [];
      const part3: Question[] = [];

      questions.forEach((question) => {
        const category = categories.find(
          (category) => category._id === question.category_id
        );

        if (category) {
          if (category.name === "Part 1") {
            part1.push(question);
          } else if (category.name === "Part 2") {
            part2.push(question);
          } else if (category.name === "Part 3") {
            part3.push(question);
          }
        }
      });

      setPart1Questions(part1);
      setPart2Questions(part2);
      setPart3Questions(part3);
    }
  }, [questions, categories]);

  useEffect(() => {
    const questionIds = questions.map((q) => q._id);
    const duplicates = questionIds.filter((id, index) => questionIds.indexOf(id) !== index);
    if (duplicates.length > 0) {
      console.warn('Có câu hỏi bị trùng lặp:', duplicates);
    }
  }, [questions]);


  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-4">ĐỀ THI READING</h1>
      <p className="text-center text-gray-600">Ngày thi: {currentDate}</p>
      <p className="text-center text-gray-700">Số lượng câu hỏi: {questions.length}</p>


      <ReadingTestCard
        part1Questions={part1Questions}
        part2Questions={part2Questions}
        part3Questions={part3Questions}
      />
    </div>
  );
};

export default ReadingTest;
