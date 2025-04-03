import React, { useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormLabel,
  CFormInput,
  CFormSelect,
  CButton,
  CTable,
  CAlert,
} from "@coreui/react";
import { Part1Question } from "../types/questionTypes";
import { demoPart1Questions } from "../data/demoData";
import "../admin.css";
const Part1QuestionForm: React.FC = () => {
  const [questions, setQuestions] =
    useState<Part1Question[]>(demoPart1Questions);
  const [currentQuestion, setCurrentQuestion] = useState<Part1Question>({
    question: "",
    imageUrl: "",
    choices: { A: "", B: "", C: "", D: "" },
    correctAnswer: "A",
    status: "draft",
  });
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [alert, setAlert] = useState<{
    visible: boolean;
    message: string;
    color: string;
  }>({
    visible: false,
    message: "",
    color: "success",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name.startsWith("choice")) {
      const choice = name.split("_")[1] as "A" | "B" | "C" | "D";
      setCurrentQuestion({
        ...currentQuestion,
        choices: { ...currentQuestion.choices, [choice]: value },
      });
    } else {
      setCurrentQuestion({ ...currentQuestion, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Chờ API từ backend
    const newQuestion: Part1Question = {
      ...currentQuestion,
      id: `p1-${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setQuestions([...questions, newQuestion]);
    setAlert({
      visible: true,
      message: "Tạo câu hỏi thành công!",
      color: "success",
    });
    resetForm();
    setTimeout(() => setAlert({ ...alert, visible: false }), 3000);
  };

  const resetForm = () => {
    setCurrentQuestion({
      question: "",
      imageUrl: "",
      choices: { A: "", B: "", C: "", D: "" },
      correctAnswer: "A",
      status: "draft",
    });
    setMode("create");
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4 shadow-sm">
          <CCardHeader className="bg-primary text-white">
            <strong>
              {mode === "create" ? "Tạo" : "Chỉnh sửa"} Câu hỏi Part 1
            </strong>
          </CCardHeader>
          <CCardBody>
            {alert.visible && (
              <CAlert color={alert.color}>{alert.message}</CAlert>
            )}
            <CForm onSubmit={handleSubmit}>
              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormLabel>Câu hỏi</CFormLabel>
                  <CFormInput
                    name="question"
                    value={currentQuestion.question}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Look at the picture. What is the woman doing?"
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel>URL Hình ảnh</CFormLabel>
                  <CFormInput
                    name="imageUrl"
                    value={currentQuestion.imageUrl}
                    onChange={handleInputChange}
                    required
                    placeholder="https://example.com/image.jpg"
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormLabel>Đáp án</CFormLabel>
                  {["A", "B", "C", "D"].map((choice) => (
                    <CFormInput
                      key={choice}
                      name={`choice_${choice}`}
                      value={
                        currentQuestion.choices[
                          choice as keyof typeof currentQuestion.choices
                        ]
                      }
                      onChange={handleInputChange}
                      className="mb-2"
                      placeholder={`Đáp án ${choice}`}
                      required
                    />
                  ))}
                </CCol>
                <CCol md={6}>
                  <CFormLabel>Đáp án đúng</CFormLabel>
                  <CFormSelect
                    name="correctAnswer"
                    value={currentQuestion.correctAnswer}
                    onChange={handleInputChange}
                  >
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </CFormSelect>
                  <CFormLabel className="mt-3">Trạng thái</CFormLabel>
                  <CFormSelect
                    name="status"
                    value={currentQuestion.status}
                    onChange={handleInputChange}
                  >
                    <option value="draft">Bản nháp</option>
                    <option value="active">Hoạt động</option>
                    <option value="archived">Lưu trữ</option>
                  </CFormSelect>
                </CCol>
              </CRow>
              <CButton type="submit" color="primary">
                {mode === "create" ? "Tạo câu hỏi" : "Cập nhật câu hỏi"}
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
        <CCard className="mb-4 shadow-sm">
          <CCardHeader className="bg-primary text-white">
            <strong>Danh sách câu hỏi Part 1</strong>
          </CCardHeader>
          <CCardBody>
            <CTable hover responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Câu hỏi</th>
                  <th>Đáp án đúng</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {questions.map((q) => (
                  <tr key={q.id}>
                    <td>{q.id}</td>
                    <td>{q.question}</td>
                    <td>
                      {q.correctAnswer} - {q.choices[q.correctAnswer]}
                    </td>
                    <td>
                      <span
                        className={`badge bg-${
                          q.status === "active"
                            ? "success"
                            : q.status === "draft"
                            ? "warning"
                            : "secondary"
                        }`}
                      >
                        {q.status === "draft"
                          ? "Bản nháp"
                          : q.status === "active"
                          ? "Hoạt động"
                          : "Lưu trữ"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Part1QuestionForm;
