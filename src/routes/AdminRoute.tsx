import { ReactNode } from "react";
import { RouteProps } from "./types"; // Giả sử RouteProps được định nghĩa trong file types
import AdminLayout from "../pages/admin/components/AdminLayout";
import Dashboard from "../pages/admin/components/Dashboard"; // Sửa import Dashboard
import Part1QuestionForm from "../pages/admin/components/Part1QuestionForm";
import Part2QuestionForm from "../pages/admin/components/Part2QuestionForm";
import Part3QuestionForm from "../pages/admin/components/Part3QuestionForm";
import Part4QuestionForm from "../pages/admin/components/Part4QuestionForm";

// Định nghĩa kiểu RouteProps nếu chưa có trong file types
interface RouteProps {
  path: string;
  element: ReactNode;
  requiresUser: boolean;
  layout?: React.ComponentType<{ children: ReactNode }>;
}

const adminRoutes: RouteProps[] = [
  {
    path: "/admin",
    element: <Dashboard />,
    requiresUser: true, // Đặt thành true vì đây là khu vực admin, thường yêu cầu xác thực
    layout: AdminLayout,
  },
  {
    path: "/admin/questions/part1",
    element: <Part1QuestionForm />,
    requiresUser: true,
    layout: AdminLayout,
  },
  {
    path: "/admin/questions/part2",
    element: <Part2QuestionForm />,
    requiresUser: true,
    layout: AdminLayout,
  },
  {
    path: "/admin/questions/part3",
    element: <Part3QuestionForm />,
    requiresUser: true,
    layout: AdminLayout,
  },
  {
    path: "/admin/questions/part4",
    element: <Part4QuestionForm />,
    requiresUser: true,
    layout: AdminLayout,
  },
];

export default adminRoutes;
