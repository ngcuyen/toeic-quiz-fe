import { Part1Question, Passage } from '../@type/question.type';

// Mock data for Part 1 & 2 questions
export const mockPart1Questions: Part1Question[] = [
  {
    id: '1',
    part: 'Part 1',
    questionText: 'Look at the picture and choose the statement that best describes what you see.',
    imageUrl: '/images/questions/part1-sample.jpg',
    options: [
      'The man is sitting at a desk.',
      'The man is standing near a window.',
      'The man is typing on a computer.',
      'The man is talking on the phone.'
    ],
    correctAnswer: 'C',
    createdAt: '2023-10-15T08:30:00Z',
    updatedAt: '2023-10-15T08:30:00Z'
  },
  {
    id: '2',
    part: 'Part 1',
    questionText: 'Look at the picture and choose the statement that best describes what you see.',
    imageUrl: '/images/questions/part1-sample2.jpg',
    options: [
      'The people are in a meeting room.',
      'The people are at a restaurant.',
      'The people are waiting at a bus stop.',
      'The people are in a library.'
    ],
    correctAnswer: 'A',
    createdAt: '2023-10-16T09:15:00Z',
    updatedAt: '2023-10-16T09:15:00Z'
  },
  {
    id: '3',
    part: 'Part 2',
    questionText: 'Where is the conference being held?',
    options: [
      'In the main auditorium.',
      'At the city convention center.',
      'In the hotel ballroom.',
      'At the university campus.'
    ],
    correctAnswer: 'B',
    createdAt: '2023-10-17T10:45:00Z',
    updatedAt: '2023-10-17T10:45:00Z'
  },
  {
    id: '4',
    part: 'Part 2',
    questionText: 'When will the report be finished?',
    options: [
      'By the end of the day.',
      'Next Monday morning.',
      'In two weeks.',
      'It was completed yesterday.'
    ],
    correctAnswer: 'A',
    createdAt: '2023-10-18T14:20:00Z',
    updatedAt: '2023-10-18T14:20:00Z'
  }
];

// Mock data for Part 3 & 4 passages
export const mockPassages: Passage[] = [
  {
    id: '1',
    part: 'Part 3',
    passageText: 'In this conversation, two colleagues are discussing a project deadline and the resources they need to complete it on time.',
    questions: [
      {
        id: '5',
        questionText: 'What is the main concern of the speakers?',
        options: [
          'Meeting the project deadline.',
          'Hiring new team members.',
          'The quality of the work.',
          'The budget constraints.'
        ],
        correctAnswer: 'A'
      },
      {
        id: '6',
        questionText: 'What does the woman suggest?',
        options: [
          'Extending the deadline.',
          'Working overtime.',
          'Reducing the project scope.',
          'Asking for additional resources.'
        ],
        correctAnswer: 'D'
      },
      {
        id: '7',
        questionText: 'What will the man probably do next?',
        options: [
          'Submit a budget request.',
          'Talk to the project manager.',
          'Start working on the project immediately.',
          'Schedule a team meeting.'
        ],
        correctAnswer: 'B'
      }
    ],
    createdAt: '2023-10-19T11:30:00Z',
    updatedAt: '2023-10-19T11:30:00Z'
  },
  {
    id: '2',
    part: 'Part 4',
    passageText: 'This is an announcement about changes to the company\'s vacation policy. Starting next month, employees will be able to carry over up to five unused vacation days to the next calendar year. Additionally, the company is introducing a new personal day benefit that provides two extra days off per year for personal matters.',
    questions: [
      {
        id: '8',
        questionText: 'What is the announcement mainly about?',
        options: [
          'A new office location.',
          'Changes to the vacation policy.',
          'The company\'s annual performance.',
          'A new hiring initiative.'
        ],
        correctAnswer: 'B'
      },
      {
        id: '9',
        questionText: 'How many vacation days can be carried over?',
        options: [
          'None.',
          'Two days.',
          'Five days.',
          'Ten days.'
        ],
        correctAnswer: 'C'
      },
      {
        id: '10',
        questionText: 'When will the new policy take effect?',
        options: [
          'Immediately.',
          'Next week.',
          'Next month.',
          'Next year.'
        ],
        correctAnswer: 'C'
      }
    ],
    createdAt: '2023-10-20T13:45:00Z',
    updatedAt: '2023-10-20T13:45:00Z'
  }
];

// Function to get all questions (both types)
export const getAllQuestions = () => {
  return [...mockPart1Questions, ...mockPassages];
};

// Function to filter questions by part
export const getQuestionsByPart = (part: string) => {
  if (part === 'Part 1' || part === 'Part 2') {
    return mockPart1Questions.filter(q => q.part === part);
  } else if (part === 'Part 3' || part === 'Part 4') {
    return mockPassages.filter(p => p.part === part);
  }
  return getAllQuestions();
};