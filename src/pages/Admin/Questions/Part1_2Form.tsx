import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Save, Trash2, Upload } from "lucide-react";
import { mockPart1Questions } from "../../../mocks/questions.mock";
import { Part1Question } from "../../../@type/question.type";

// Form validation schema
const part1_2Schema = z.object({
  part: z.enum(["Part 1", "Part 2"]),
  questionText: z
    .string()
    .min(5, "Question text is required and must be at least 5 characters"),
  optionA: z.string().min(1, "Option A is required"),
  optionB: z.string().min(1, "Option B is required"),
  optionC: z.string().min(1, "Option C is required"),
  optionD: z.string().min(1, "Option D is required"),
  correctAnswer: z.enum(["A", "B", "C", "D"]),
  // Image is optional and will be handled separately
});

type Part1_2FormValues = z.infer<typeof part1_2Schema>;

const Part1_2Form = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [loading, setLoading] = useState(isEditMode);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<Part1_2FormValues>({
    resolver: zodResolver(part1_2Schema),
    defaultValues: {
      part: "Part 1",
      questionText: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      correctAnswer: "A",
    },
  });

  const selectedPart = watch("part");

  useEffect(() => {
    if (isEditMode) {
      // In a real app, this would be an API call
      setLoading(true);
      setTimeout(() => {
        const question = mockPart1Questions.find((q) => q.id === id);
        if (question) {
          reset({
            part: question.part,
            questionText: question.questionText,
            optionA: question.options[0],
            optionB: question.options[1],
            optionC: question.options[2],
            optionD: question.options[3],
            correctAnswer: question.correctAnswer,
          });

          if (question.imageUrl) {
            setImagePreview(question.imageUrl);
          }
        }
        setLoading(false);
      }, 500);
    }
  }, [id, isEditMode, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const onSubmit = async (data: Part1_2FormValues) => {
    try {
      // Prepare the question object
      const questionData: Partial<Part1Question> = {
        part: data.part,
        questionText: data.questionText,
        options: [data.optionA, data.optionB, data.optionC, data.optionD],
        correctAnswer: data.correctAnswer,
      };

      // In a real app, this would be an API call to upload the image and save the question
      console.log("Submitting question:", questionData);
      console.log("Image file:", imageFile);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Success message and redirect
      alert(`Question ${isEditMode ? "updated" : "created"} successfully!`);
      navigate("/admin/questions");
    } catch (error) {
      console.error("Error submitting question:", error);
      alert("An error occurred. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
        <p className="mt-2 text-gray-600">Loading question data...</p>
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
          {isEditMode ? "Edit" : "Create"} Part 1 & 2 Question
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Question Part
            </label>
            <Controller
              name="part"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Part 1">Part 1</option>
                  <option value="Part 2">Part 2</option>
                </select>
              )}
            />
            {errors.part && (
              <p className="mt-1 text-sm text-red-600">{errors.part.message}</p>
            )}
          </div>

          {selectedPart === "Part 1" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image Upload (Optional for Part 1)
              </label>
              <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-4">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Question"
                      className="max-h-40 max-w-full object-contain"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-2 flex text-sm text-gray-600">
                      <label
                        htmlFor="image-upload"
                        className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 hover:text-blue-500"
                      >
                        <span>Upload an image</span>
                        <input
                          id="image-upload"
                          name="image-upload"
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={handleImageChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Question Text
          </label>
          <Controller
            name="questionText"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                rows={3}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter the question text"
              />
            )}
          />
          {errors.questionText && (
            <p className="mt-1 text-sm text-red-600">
              {errors.questionText.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Option A
            </label>
            <Controller
              name="optionA"
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
            {errors.optionA && (
              <p className="mt-1 text-sm text-red-600">
                {errors.optionA.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Option B
            </label>
            <Controller
              name="optionB"
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
            {errors.optionB && (
              <p className="mt-1 text-sm text-red-600">
                {errors.optionB.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Option C
            </label>
            <Controller
              name="optionC"
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
            {errors.optionC && (
              <p className="mt-1 text-sm text-red-600">
                {errors.optionC.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Option D
            </label>
            <Controller
              name="optionD"
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
            {errors.optionD && (
              <p className="mt-1 text-sm text-red-600">
                {errors.optionD.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Correct Answer
          </label>
          <Controller
            name="correctAnswer"
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
          {errors.correctAnswer && (
            <p className="mt-1 text-sm text-red-600">
              {errors.correctAnswer.message}
            </p>
          )}
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
                {isEditMode ? "Update" : "Save"} Question
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Part1_2Form;
