// Base question interface
export interface BaseQuestion {
  id?: string;
  questionText: string;
  options: string[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  createdAt?: string;
  updatedAt?: string;
}

// Part 1 & 2 question interface
export interface Part1Question extends BaseQuestion {
  part: 'Part 1' | 'Part 2';
  imageUrl?: string; // Optional for Part 1
}

// Part 3 & 4 passage interface
export interface Passage {
  id?: string;
  passageText: string;
  questions: BaseQuestion[];
  part: 'Part 3' | 'Part 4';
  createdAt?: string;
  updatedAt?: string;
}

// API response interfaces
export interface QuestionsResponse {
  success: boolean;
  data: {
    questions: (Part1Question | Passage)[];
    total: number;
  };
  message?: string;
}

export interface QuestionResponse {
  success: boolean;
  data: Part1Question | Passage;
  message?: string;
}

// Filter options
export interface QuestionFilter {
  part?: 'Part 1' | 'Part 2' | 'Part 3' | 'Part 4';
  page?: number;
  limit?: number;
  search?: string;
}