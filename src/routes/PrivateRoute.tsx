import ExamHistoryList from "../pages/ExamHistory";
import FormAddQuestion from "../pages/FormAddQuestion";
import ReadingTest from "../pages/ReadingTest";
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
    path: '/admin/dashboard',
    element: <FormAddQuestion />,
    requiresUser: false, 
    requiresAdmin: true,
  },
];

export default privateRoutes;
