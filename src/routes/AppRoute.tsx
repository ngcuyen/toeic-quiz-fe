// src/routes/Route.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserLayout from '../layouts/user';
import publicRoutes from './PublicRoute';
import { Fragment } from 'react/jsx-runtime';
import privateRoutes from './PrivateRoute';


const AppRoute = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        {publicRoutes.map((route, index) => {
          // Chọn layout dựa trên requiresUser
          const Layout = route.requiresUser ? UserLayout : Fragment;

          return (
            <Route
              key={index}
              path={route.path}
              element={<Layout>{route.element}</Layout>}
            />
          );
        })}

        {/* Private routes */}
        {privateRoutes.map((route, index) => {
          // Chọn layout dựa trên requiresUser
          const Layout = route.requiresUser ? UserLayout : Fragment;

          return (
            <Route
              key={index}
              path={route.path}
              element={<Layout>{route.element}</Layout>}
            />
          );
        })}
      </Routes>
    </Router>
  );
};

export default AppRoute;
