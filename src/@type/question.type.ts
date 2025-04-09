export type Question = {
    _id: string
    question_text: string
    paragraph_id: string
    category_id: string 
    image_url?: string
    opt_a: string
    opt_b: string
    opt_c: string
    opt_d: string
    answer: string
}

// 👉 Dùng khi tạo mới câu hỏi (không cần _id)
export type QuestionCreate = Omit<Question, "_id">;

// Question có thêm trường created_at
export type QuestionWithDate = Question & {
    created_at: string;
};


  