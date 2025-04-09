import Dashboard from "../pages/Dashbroad";
import ExamHistoryList from "../pages/ExamHistory";
import FormAddQuestion from "../pages/FormAddQuestion";
import QuestionList from "../pages/QuestionList";
import ReadingTest from "../pages/ReadingTest";
import TestAnswer from "../pages/TestAnswer";
import TestResult from "../pages/TestResult";


const privateRoutes = [
  {
    path: '/reading-test',
    element: <ReadingTest />,
    requiresUser: true, 
    requiresAdmin: false,
  },
  {
    path: '/history-exam',
    element: <ExamHistoryList />,
    requiresUser: true, 
    requiresAdmin: false,
  },
  {
    path: '/test-result',
    element: <TestResult />,
    requiresUser: true, 
    requiresAdmin: false,
  },
  {
    path: '/test-answer',
    element: <TestAnswer />,
    requiresUser: true, 
    requiresAdmin: false,
  },
  {
    path: '/admin/dashboard',
    element: <Dashboard />,
    requiresUser: false, 
    requiresAdmin: true,
  },
  {
    path: '/admin/question-list',
    element: <QuestionList />,
    requiresUser: false, 
    requiresAdmin: true,
  },
  {
    path: '/admin/create-question',
    element: <FormAddQuestion />,
    requiresUser: false, 
    requiresAdmin: true,
  },
];

export default privateRoutes;