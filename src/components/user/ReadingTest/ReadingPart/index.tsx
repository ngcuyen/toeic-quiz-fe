import React from "react";
import { Question } from "../../../../@type/question.type";

interface ReadingPartsProps {
  part1Questions: Question[];
  part2Questions: Question[];
  part3Questions: Question[];
  paragraphMap: Record<string, string>;
  userAnswers: Record<string, string>;
  setUserAnswers: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

const ReadingParts: React.FC<ReadingPartsProps> = ({
  part1Questions,
  part2Questions,
  part3Questions,
  paragraphMap,
  userAnswers,
  setUserAnswers,
}) => {
  return (
    <>
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
                        checked={userAnswers[question._id] === letter}
                        onChange={() => setUserAnswers(prev => ({ ...prev, [question._id]: letter }))}
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
                        checked={userAnswers[question._id] === letter}
                        onChange={() => setUserAnswers(prev => ({ ...prev, [question._id]: letter }))}
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
                          checked={userAnswers[question._id] === letter}
                          onChange={() => setUserAnswers(prev => ({ ...prev, [question._id]: letter }))}
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
    </>
  );
};

export default ReadingParts;
