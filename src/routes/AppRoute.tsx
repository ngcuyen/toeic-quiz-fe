// src/routes/Route.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserLayout from '../layouts/user';
import publicRoutes from './PublicRoute';
import { Fragment } from 'react/jsx-runtime';
import privateRoutes from './PrivateRoute';
import adminRoutes from './AdminRoute';


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
        
        {/* Admin routes */}
        {adminRoutes.map((route, index) => {
          // Use the specified layout or fall back to Fragment
          const Layout = route.layout || (route.requiresUser ? UserLayout : Fragment);

          return (
            <Route
              key={`admin-${index}`}
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
