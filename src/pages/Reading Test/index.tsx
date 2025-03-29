import React, { useState, useEffect } from "react";

const ReadingTest: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(75 * 60); // 75 minutes countdown
  const currentDate = new Date().toLocaleDateString("vi-VN");

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

  const questions = [
    {
      id: 1,
      question: "We got a very good _____ when we bought that three-piece suite for half its usual price.",
      options: ["deal", "dealing", "dealer", "dealt"],
      correct: 0,
    },
    {
      id: 2,
      question: "No matter what the brand, computers purchased at this shop will be _____ free of charge for a full year from the date of purchase.",
      options: ["service", "servicing", "to service", "serviced"],
      correct: 3,
    },
    {
      id: 3,
      question: "All vehicles manufactured by Corona Motors are _____ inspected before they are released for sale on the open market.",
      options: ["stringently", "strongly", "impartially", "equally"],
      correct: 0,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-8 ">
      <h1 className="text-2xl font-bold text-center mb-2">PART 5</h1>
      <p className="text-gray-700 text-center mb-4 font-medium">Directions: A word or phrase is missing in each of the sentences below. Four answer choices are given below each sentence. Select the best answer to complete the sentence. Then mark the letter (A), (B), (C), or (D) on your answer sheet.</p>
      <p className="text-center text-gray-600">Ngày thi: {currentDate}</p>
      <p className="text-center text-red-500 font-semibold text-lg">Thời gian còn lại: {formatTime(timeLeft)}</p>
      <p className="text-center text-gray-700 mb-6">Số lượng câu hỏi: 120</p>

      <div className="space-y-6">
        {questions.map((q) => (
          <div key={q.id} className="border p-4 rounded-lg shadow-sm bg-gray-50">
            <p className="font-medium text-lg mb-2">{q.id}. {q.question}</p>
            <div className="space-y-2">
              {q.options.map((option, index) => (
                <label key={index} className="block cursor-pointer flex items-center gap-2">
                  <input type="radio" name={`question-${q.id}`} className="form-radio" />
                  <span className="text-gray-800">{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReadingTest;
