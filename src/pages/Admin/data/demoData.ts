import { 
  Part1Question, 
  Part2Question, 
  Part3Question, 
  Part4Question, 
  QuestionStats
} from '../types/questionTypes';

// Demo Part 1 Questions (Picture-based)
export const demoPart1Questions: Part1Question[] = [
  {
    id: 'p1-001',
    question: 'Look at the picture. What is the woman doing?',
    imageUrl: 'https://via.placeholder.com/400x300?text=Office+Scene',
    choices: {
      A: 'She is typing on a computer.',
      B: 'She is talking on the phone.',
      C: 'She is writing in a notebook.',
      D: 'She is presenting a chart.',
    },
    correctAnswer: 'A',
    status: 'active',
    createdAt: new Date('2023-06-10'),
    updatedAt: new Date('2023-06-12'),
  },
  {
    id: 'p1-002',
    question: 'Look at the picture. Where are the people?',
    imageUrl: 'https://via.placeholder.com/400x300?text=Meeting+Room',
    choices: {
      A: 'In a restaurant.',
      B: 'In a conference room.',
      C: 'In a classroom.',
      D: 'At a train station.',
    },
    correctAnswer: 'B',
    status: 'active',
    createdAt: new Date('2023-06-15'),
    updatedAt: new Date('2023-06-15'),
  },
  {
    id: 'p1-003',
    question: 'Look at the picture. What is on the table?',
    imageUrl: 'https://via.placeholder.com/400x300?text=Office+Desk',
    choices: {
      A: 'A laptop and coffee mug.',
      B: 'Books and folders.',
      C: 'A printer and scanner.',
      D: 'Office supplies and papers.',
    },
    correctAnswer: 'A',
    status: 'draft',
    createdAt: new Date('2023-06-20'),
    updatedAt: new Date('2023-06-20'),
  },
];

// Demo Part 2 Questions (Question-response)
export const demoPart2Questions: Part2Question[] = [
  {
    id: 'p2-001',
    question: 'Where is the marketing report?',
    choices: {
      A: 'It\'s on your desk.',
      B: 'Yes, it was very good.',
      C: 'The marketing team wrote it.',
      D: 'We\'ll discuss it tomorrow.',
    },
    correctAnswer: 'A',
    status: 'active',
    createdAt: new Date('2023-06-11'),
    updatedAt: new Date('2023-06-11'),
  },
  {
    id: 'p2-002',
    question: 'When will the conference call start?',
    choices: {
      A: 'The conference room.',
      B: 'In about 15 minutes.',
      C: 'Mr. Johnson is hosting it.',
      D: 'To discuss the new project.',
    },
    correctAnswer: 'B',
    status: 'active',
    createdAt: new Date('2023-06-16'),
    updatedAt: new Date('2023-06-16'),
  },
  {
    id: 'p2-003',
    question: 'Who is the new project manager?',
    choices: {
      A: 'It starts next week.',
      B: 'In the meeting room.',
      C: 'Ms. Thompson from HR.',
      D: 'It\'s about the new software.',
    },
    correctAnswer: 'C',
    status: 'draft',
    createdAt: new Date('2023-06-21'),
    updatedAt: new Date('2023-06-21'),
  },
];

// Demo Part 3 Questions (Conversations)
export const demoPart3Questions: Part3Question[] = [
  {
    id: 'p3-001',
    passage: 'Man: I\'m thinking about upgrading our office equipment. What do you suggest?\nWoman: Well, we should definitely replace the printers. They break down constantly.\nMan: What about the computers? Do you think we need new ones?\nWoman: The computers are still working fine, but we might need more monitors for the new hires.',
    conversationType: 'business',
    questions: [
      {
        id: 'p3-001-q1',
        questionText: 'What are the speakers mainly discussing?',
        choices: {
          A: 'Hiring new employees',
          B: 'Office equipment upgrades',
          C: 'Computer software issues',
          D: 'Budget constraints',
        },
        correctAnswer: 'B',
      },
      {
        id: 'p3-001-q2',
        questionText: 'What does the woman suggest replacing?',
        choices: {
          A: 'Computers',
          B: 'Monitors',
          C: 'Printers',
          D: 'Office furniture',
        },
        correctAnswer: 'C',
      },
      {
        id: 'p3-001-q3',
        questionText: 'What does the woman say about the computers?',
        choices: {
          A: 'They need to be upgraded.',
          B: 'They\'re working fine.',
          C: 'They\'re too expensive.',
          D: 'They\'re difficult to use.',
        },
        correctAnswer: 'B',
      },
    ],
    status: 'active',
    createdAt: new Date('2023-06-12'),
    updatedAt: new Date('2023-06-13'),
  },
  {
    id: 'p3-002',
    passage: 'Woman: I noticed you weren\'t at the team meeting this morning.\nMan: Yes, I had to finish the quarterly report for the CEO.\nWoman: You missed some important announcements about the company retreat.\nMan: Oh really? Can you fill me in on the details?',
    conversationType: 'business',
    questions: [
      {
        id: 'p3-002-q1',
        questionText: "Why wasn't the man at the meeting?",
        choices: {
          A: "He was on vacation.",
          B: "He was sick.",
          C: "He was working on a report.",
          D: "He forgot about it.",
        },
        correctAnswer: "C",
      },
      {
        id: 'p3-002-q2',
        questionText: 'What did the team meeting include information about?',
        choices: {
          A: 'A new client',
          B: 'The company retreat',
          C: 'Quarterly reports',
          D: 'Office renovations',
        },
        correctAnswer: 'B',
      },
      {
        id: 'p3-002-q3',
        questionText: 'What will probably happen next?',
        choices: {
          A: 'The woman will give the man details about the retreat.',
          B: 'The man will apologize for missing the meeting.',
          C: 'The woman will reschedule the meeting.',
          D: 'The man will show the woman his report.',
        },
        correctAnswer: 'A',
      },
    ],
    status: 'draft',
    createdAt: new Date('2023-06-17'),
    updatedAt: new Date('2023-06-17'),
  },
];

// Demo Part 4 Questions (Short talks)
export const demoPart4Questions: Part4Question[] = [
  {
    id: 'p4-001',
    passage: 'Attention all employees: This is a reminder that the company parking garage will be closed for maintenance this weekend, starting Friday at 8:00 PM and reopening Monday at 6:00 AM. During this time, you may use the public parking lot across the street. The company will reimburse parking fees if you submit your receipt to the accounting department by the end of next week. We apologize for any inconvenience this may cause.',
    talkType: 'announcement',
    questions: [
      {
        id: 'p4-001-q1',
        questionText: 'What is being closed?',
        choices: {
          A: 'The office building',
          B: 'The company parking garage',
          C: 'The accounting department',
          D: 'The public parking lot',
        },
        correctAnswer: 'B',
      },
      {
        id: 'p4-001-q2',
        questionText: 'When will the maintenance be completed?',
        choices: {
          A: 'Friday at 8:00 PM',
          B: 'Sunday evening',
          C: 'Monday at 6:00 AM',
          D: 'End of next week',
        },
        correctAnswer: 'C',
      },
      {
        id: 'p4-001-q3',
        questionText: 'What does the company offer to do?',
        choices: {
          A: 'Provide shuttle service',
          B: 'Reimburse parking fees',
          C: 'Pay for car maintenance',
          D: 'Give employees time off',
        },
        correctAnswer: 'B',
      },
    ],
    status: 'active',
    createdAt: new Date('2023-06-14'),
    updatedAt: new Date('2023-06-14'),
  },
  {
    id: 'p4-002',
    passage: "Welcome to today's lunch and learn session about our new project management software. Over the next hour, I'll demonstrate the key features that will help streamline our workflow. The software will be implemented next month, but you can start familiarizing yourself with it now by accessing the training portal on our intranet. We've also scheduled hands-on training sessions throughout the next two weeks. Please sign up for at least one session through the HR portal. If you have any questions after today's demonstration, please email the IT support team.",
    talkType: 'lecture',
    questions: [
      {
        id: 'p4-002-q1',
        questionText: 'What is the purpose of the talk?',
        choices: {
          A: 'To announce a new HR policy',
          B: 'To demonstrate new software',
          C: "To discuss the company's workflow",
          D: 'To introduce a new IT support team',
        },
        correctAnswer: 'B',
      },
      {
        id: 'p4-002-q2',
        questionText: 'When will the software be implemented?',
        choices: {
          A: 'Immediately',
          B: 'In two weeks',
          C: 'Next month',
          D: 'After all training is complete',
        },
        correctAnswer: 'C',
      },
      {
        id: 'p4-002-q3',
        questionText: 'How can employees sign up for training sessions?',
        choices: {
          A: 'Through the IT support team',
          B: 'On the company intranet',
          C: 'By email',
          D: 'Through the HR portal',
        },
        correctAnswer: 'D',
      },
    ],
    status: 'active',
    createdAt: new Date('2023-06-19'),
    updatedAt: new Date('2023-06-19'),
  },
];

// Demo stats for dashboard
export const demoQuestionStats: QuestionStats = {
  part1: {
    total: 15,
    active: 11,
    draft: 4,
  },
  part2: {
    total: 20,
    active: 17,
    draft: 3,
  },
  part3: {
    total: 8,
    active: 5,
    draft: 3,
  },
  part4: {
    total: 10,
    active: 7,
    draft: 3,
  },
  part5: {
    total: 12,
    active: 9,
    draft: 3,
  },
  part6: {
    total: 18,
    active: 14,
    draft: 4,
  },
  part7: {
    total: 22,
    active: 19,
    draft: 3,
  },
};