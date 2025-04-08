import Dashboard from "../pages/Admin/Dashboard";
import QuestionsManagement from "../pages/Admin/Questions";
import Part1_2Form from "../pages/Admin/Questions/Part1_2Form";
import Part3_4Form from "../pages/Admin/Questions/Part3_4Form";
import QuestionView from "../pages/Admin/Questions/QuestionView";

const adminRoutes = [
  {
    path: "/admin/dashboard",
    element: <Dashboard />,
    requiresAdmin: true,
  },
  {
    path: "/admin/questions",
    element: <QuestionsManagement />,
    requiresAdmin: true,
  },
  {
    path: "/admin/questions/view/:id",
    element: <QuestionView />,
    requiresAdmin: true,
  },
  {
    path: "/admin/questions/part1-2/create",
    element: <Part1_2Form />,
    requiresAdmin: true,
  },
  {
    path: "/admin/questions/part1-2/edit/:id",
    element: <Part1_2Form />,
    requiresAdmin: true,
  },
  {
    path: "/admin/questions/part3-4/create",
    element: <Part3_4Form />,
    requiresAdmin: true,
  },
  {
    path: "/admin/questions/part3-4/edit/:id",
    element: <Part3_4Form />,
    requiresAdmin: true,
  },
];

export default adminRoutes;
