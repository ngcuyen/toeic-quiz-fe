export interface BaseQuestion {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  status: 'draft' | 'active' | 'archived';
}

export interface ChoiceQuestion extends BaseQuestion {
  question: string;
  choices: { A: string; B: string; C: string; D: string };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
}

export interface Part1Question extends ChoiceQuestion {
  imageUrl: string;
}

export type Part2Question = ChoiceQuestion;

export interface SubQuestion {
  id?: string;
  questionText: string;
  choices: { A: string; B: string; C: string; D: string };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
}

export interface PassageBasedQuestion extends BaseQuestion {
  passage: string;
  audioUrl?: string;
  questions: SubQuestion[];
}

export interface Part3Question extends PassageBasedQuestion {
  conversationType: 'business' | 'general' | 'academic';
}

export interface Part4Question extends PassageBasedQuestion {
  talkType: 'announcement' | 'advertisement' | 'news' | 'lecture' | 'other';
}