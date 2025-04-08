import Home from '../pages/Home';
import Signin from '../pages/Signin';

const publicRoutes = [
  {
    path: '/',
    element: <Home />,
    requiresUser: true, // ✅ Đánh dấu route cần UserLayout
    requiresAdmin: false,
  },
  {
    path: '/login',
    element: <Signin />,
    requiresUser: false, // ✅ Đánh dấu route cần UserLayout
    requiresAdmin: false,
  },
];

export default publicRoutes;
