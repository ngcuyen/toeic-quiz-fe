export type QuizSession = {
    _id: string
    user_id: string
    exam_id: string
    start_time: string 
    end_time: string
    score?: string
}