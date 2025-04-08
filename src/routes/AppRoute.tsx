// src/routes/Route.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLayout from "../layouts/user";
import AdminLayout from "../layouts/admin";
import publicRoutes from "./PublicRoute";
import { Fragment } from "react/jsx-runtime";
import privateRoutes from "./PrivateRoute";
import adminRoutes from "./AdminRoute";

const AppRoute = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        {publicRoutes.map((route, index) => {
          // Choose layout based on requiresUser
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
          // Choose layout based on requiresUser
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
          return (
            <Route
              key={`admin-${index}`}
              path={route.path}
              element={<AdminLayout>{route.element}</AdminLayout>}
            />
          );
        })}
      </Routes>
    </Router>
  );
};

export default AppRoute;
