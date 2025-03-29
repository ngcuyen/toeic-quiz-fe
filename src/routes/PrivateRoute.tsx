import ExamHistoryList from "../pages/Exam History";
import ReadingTest from "../pages/Reading Test";


const privateRoutes = [
  {
    path: '/readingg-test',
    element: <ReadingTest />,
    requiresUser: true, // 
  },
  {
    path: '/history-exam',
    element: <ExamHistoryList />,
    requiresUser: true, // 
  },
];

export default privateRoutes;
