// src/routes/Route.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';


const AppRoute = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <>{PublicRoute()}</>

        {/* Private routes */}
        <Route path="/admin/*" element={<PrivateRoute />} />
      </Routes>
    </Router>
  );
};

export default AppRoute;
