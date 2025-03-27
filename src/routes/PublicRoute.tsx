import Home from '../pages/Home';

const publicRoutes = [
  {
    path: '/',
    element: <Home />,
    requiresUser: true, // ✅ Đánh dấu route cần UserLayout
  },
  // Thêm các route khác nếu cần
];

export default publicRoutes;
