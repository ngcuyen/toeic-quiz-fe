import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import { mockPassages } from "../../../mocks/questions.mock";
import { Passage } from "../../../@type/question.type";

// Define the schema for a single question
const questionSchema = z.object({
  questionText: z
    .string()
    .min(5, "Question text is required and must be at least 5 characters"),
  optionA: z.string().min(1, "Option A is required"),
  optionB: z.string().min(1, "Option B is required"),
  optionC: z.string().min(1, "Option C is required"),
  optionD: z.string().min(1, "Option D is required"),
  correctAnswer: z.enum(["A", "B", "C", "D"]),
});

// Form validation schema for the entire passage
const part3_4Schema = z.object({
  part: z.enum(["Part 3", "Part 4"]),
  passageText: z
    .string()
    .min(10, "Passage text is required and must be at least 10 characters"),
  questions: z
    .array(questionSchema)
    .min(1, "At least one question is required")
    .max(5, "Maximum 5 questions allowed"),
});

type Part3_4FormValues = z.infer<typeof part3_4Schema>;

const Part3_4Form = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [loading, setLoading] = useState(isEditMode);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Part3_4FormValues>({
    resolver: zodResolver(part3_4Schema),
    defaultValues: {
      part: "Part 3",
      passageText: "",
      questions: [
        {
          questionText: "",
          optionA: "",
          optionB: "",
          optionC: "",
          optionD: "",
          correctAnswer: "A",
        },
        {
          questionText: "",
          optionA: "",
          optionB: "",
          optionC: "",
          optionD: "",
          correctAnswer: "A",
        },
        {
          questionText: "",
          optionA: "",
          optionB: "",
          optionC: "",
          optionD: "",
          correctAnswer: "A",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  useEffect(() => {
    if (isEditMode) {
      // In a real app, this would be an API call
      setLoading(true);
      setTimeout(() => {
        const passage = mockPassages.find((p) => p.id === id);
        if (passage) {
          // Transform the data to match the form structure
          const formattedQuestions = passage.questions.map((q) => ({
            questionText: q.questionText,
            optionA: q.options[0],
            optionB: q.options[1],
            optionC: q.options[2],
            optionD: q.options[3],
            correctAnswer: q.correctAnswer,
          }));

          reset({
            part: passage.part,
            passageText: passage.passageText,
            questions: formattedQuestions,
          });
        }
        setLoading(false);
      }, 500);
    }
  }, [id, isEditMode, reset]);

  const addQuestion = () => {
    append({
      questionText: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      correctAnswer: "A",
    });
  };

  const onSubmit = async (data: Part3_4FormValues) => {
    try {
      // Transform the form data to match the API structure
      const passageData: Partial<Passage> = {
        part: data.part,
        passageText: data.passageText,
        questions: data.questions.map((q, index) => ({
          id: `temp-${index}`, // This would be handled by the backend
          questionText: q.questionText,
          options: [q.optionA, q.optionB, q.optionC, q.optionD],
          correctAnswer: q.correctAnswer,
        })),
      };

      // In a real app, this would be an API call
      console.log("Submitting passage:", passageData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Success message and redirect
      alert(`Passage ${isEditMode ? "updated" : "created"} successfully!`);
      navigate("/admin/questions");
    } catch (error) {
      console.error("Error submitting passage:", error);
      alert("An error occurred. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
        <p className="mt-2 text-gray-600">Loading passage data...</p>
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
        <h1 className="text-2xl font-bold text-gray-800">
          {isEditMode ? "Edit" : "Create"} Part 3 & 4 Passage
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Passage Part
          </label>
          <Controller
            name="part"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Part 3">Part 3</option>
                <option value="Part 4">Part 4</option>
              </select>
            )}
          />
          {errors.part && (
            <p className="mt-1 text-sm text-red-600">{errors.part.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Passage Text
          </label>
          <Controller
            name="passageText"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                rows={5}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter the passage text"
              />
            )}
          />
          {errors.passageText && (
            <p className="mt-1 text-sm text-red-600">
              {errors.passageText.message}
            </p>
          )}
        </div>

        <div className="border-t pt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Questions</h2>
            <button
              type="button"
              onClick={addQuestion}
              disabled={fields.length >= 5}
              className="flex items-center text-sm bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus size={16} className="mr-1" />
              Add Question
            </button>
          </div>

          {errors.questions?.message && (
            <p className="mt-1 text-sm text-red-600 mb-4">
              {errors.questions.message}
            </p>
          )}

          {fields.map((field, index) => (
            <div
              key={field.id}
              className="mb-8 p-4 border border-gray-200 rounded-lg bg-gray-50"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-gray-800">
                  Question {index + 1}
                </h3>
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Question Text
                  </label>
                  <Controller
                    name={`questions.${index}.questionText`}
                    control={control}
                    render={({ field }) => (
                      <textarea
                        {...field}
                        rows={2}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter the question text"
                      />
                    )}
                  />
                  {errors.questions?.[index]?.questionText && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.questions[index]?.questionText?.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Option A
                    </label>
                    <Controller
                      name={`questions.${index}.optionA`}
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter option A"
                        />
                      )}
                    />
                    {errors.questions?.[index]?.optionA && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.questions[index]?.optionA?.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Option B
                    </label>
                    <Controller
                      name={`questions.${index}.optionB`}
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter option B"
                        />
                      )}
                    />
                    {errors.questions?.[index]?.optionB && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.questions[index]?.optionB?.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Option C
                    </label>
                    <Controller
                      name={`questions.${index}.optionC`}
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter option C"
                        />
                      )}
                    />
                    {errors.questions?.[index]?.optionC && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.questions[index]?.optionC?.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Option D
                    </label>
                    <Controller
                      name={`questions.${index}.optionD`}
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter option D"
                        />
                      )}
                    />
                    {errors.questions?.[index]?.optionD && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.questions[index]?.optionD?.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Correct Answer
                  </label>
                  <Controller
                    name={`questions.${index}.correctAnswer`}
                    control={control}
                    render={({ field }) => (
                      <div className="flex space-x-4">
                        {["A", "B", "C", "D"].map((option) => (
                          <label key={option} className="flex items-center">
                            <input
                              type="radio"
                              className="form-radio h-4 w-4 text-blue-600"
                              value={option}
                              checked={field.value === option}
                              onChange={() => field.onChange(option)}
                            />
                            <span className="ml-2 text-gray-700">{option}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  />
                  {errors.questions?.[index]?.correctAnswer && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.questions[index]?.correctAnswer?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => navigate("/admin/questions")}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
          >
            {isSubmitting ? (
              <>
                <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-solid border-white border-r-transparent"></div>
                Saving...
              </>
            ) : (
              <>
                <Save size={18} className="mr-2" />
                {isEditMode ? "Update" : "Save"} Passage
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Part3_4Form;
