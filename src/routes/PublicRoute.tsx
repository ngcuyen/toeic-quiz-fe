import { Route } from 'react-router-dom';
import Home from '../pages/Home';


export default function PublicRoute() {
  return (
    <>
      <Route path="/" element={<Home />} />
      {/* <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/about" element={<AboutPage />} /> */}
    </>
  );
}
