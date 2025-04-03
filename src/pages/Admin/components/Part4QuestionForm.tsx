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
  CFormTextarea,
  CFormSelect,
  CButton,
  CTable,
  CAlert,
} from "@coreui/react";
import { Part4Question, SubQuestion } from "../types/questionTypes";
import { demoPart4Questions } from "../data/demoData";
import "../admin.css";
const Part4QuestionForm: React.FC = () => {
  const [questions, setQuestions] =
    useState<Part4Question[]>(demoPart4Questions);
  const [currentQuestion, setCurrentQuestion] = useState<Part4Question>({
    passage: "",
    talkType: "announcement",
    questions: Array(3).fill({
      questionText: "",
      choices: { A: "", B: "", C: "", D: "" },
      correctAnswer: "A",
    }),
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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    subIndex?: number
  ) => {
    const { name, value } = e.target;
    if (subIndex !== undefined) {
      const updatedSubQuestions = [...currentQuestion.questions];
      if (name.startsWith("choice")) {
        const choice = name.split("_")[1] as "A" | "B" | "C" | "D";
        updatedSubQuestions[subIndex] = {
          ...updatedSubQuestions[subIndex],
          choices: {
            ...updatedSubQuestions[subIndex].choices,
            [choice]: value,
          },
        };
      } else {
        updatedSubQuestions[subIndex] = {
          ...updatedSubQuestions[subIndex],
          [name]: value,
        };
      }
      setCurrentQuestion({
        ...currentQuestion,
        questions: updatedSubQuestions,
      });
    } else {
      setCurrentQuestion({ ...currentQuestion, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Chờ API từ backend
    const newQuestion: Part4Question = {
      ...currentQuestion,
      id: `p4-${Math.floor(Math.random() * 1000)
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
      passage: "",
      talkType: "announcement",
      questions: Array(3).fill({
        questionText: "",
        choices: { A: "", B: "", C: "", D: "" },
        correctAnswer: "A",
      }),
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
              {mode === "create" ? "Tạo" : "Chỉnh sửa"} Câu hỏi Part 4
            </strong>
          </CCardHeader>
          <CCardBody>
            {alert.visible && (
              <CAlert color={alert.color}>{alert.message}</CAlert>
            )}
            <CForm onSubmit={handleSubmit}>
              <CRow className="mb-3">
                <CCol md={12}>
                  <CFormLabel>Đoạn thông báo</CFormLabel>
                  <CFormTextarea
                    name="passage"
                    value={currentQuestion.passage}
                    onChange={handleInputChange}
                    rows={4}
                    required
                    placeholder="Nhập đoạn thông báo..."
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormLabel>Loại thông báo</CFormLabel>
                  <CFormSelect
                    name="talkType"
                    value={currentQuestion.talkType}
                    onChange={handleInputChange}
                  >
                    <option value="announcement">Thông báo</option>
                    <option value="advertisement">Quảng cáo</option>
                    <option value="news">Tin tức</option>
                    <option value="lecture">Bài giảng</option>
                    <option value="other">Khác</option>
                  </CFormSelect>
                </CCol>
                <CCol md={6}>
                  <CFormLabel>Trạng thái</CFormLabel>
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
              {currentQuestion.questions.map((subQ, index) => (
                <CRow key={index} className="mb-3 border-top pt-3">
                  <CCol md={12}>
                    <CFormLabel>Câu hỏi {index + 1}</CFormLabel>
                    <CFormInput
                      name="questionText"
                      value={subQ.questionText}
                      onChange={(e) => handleInputChange(e, index)}
                      required
                      placeholder={`Câu hỏi ${index + 1}`}
                    />
                  </CCol>
                  <CCol md={6}>
                    <CFormLabel className="mt-2">Đáp án</CFormLabel>
                    {["A", "B", "C", "D"].map((choice) => (
                      <CFormInput
                        key={choice}
                        name={`choice_${choice}`}
                        value={
                          subQ.choices[choice as keyof typeof subQ.choices]
                        }
                        onChange={(e) => handleInputChange(e, index)}
                        className="mb-2"
                        placeholder={`Đáp án ${choice}`}
                        required
                      />
                    ))}
                  </CCol>
                  <CCol md={6}>
                    <CFormLabel className="mt-2">Đáp án đúng</CFormLabel>
                    <CFormSelect
                      name="correctAnswer"
                      value={subQ.correctAnswer}
                      onChange={(e) => handleInputChange(e, index)}
                    >
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                    </CFormSelect>
                  </CCol>
                </CRow>
              ))}
              <CButton type="submit" color="primary">
                {mode === "create" ? "Tạo câu hỏi" : "Cập nhật câu hỏi"}
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
        <CCard className="mb-4 shadow-sm">
          <CCardHeader className="bg-primary text-white">
            <strong>Danh sách câu hỏi Part 4</strong>
          </CCardHeader>
          <CCardBody>
            <CTable hover responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Đoạn thông báo</th>
                  <th>Số câu hỏi</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {questions.map((q) => (
                  <tr key={q.id}>
                    <td>{q.id}</td>
                    <td>{q.passage.substring(0, 50)}...</td>
                    <td>{q.questions.length}</td>
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

export default Part4QuestionForm;
