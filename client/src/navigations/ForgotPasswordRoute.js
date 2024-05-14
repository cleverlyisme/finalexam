import { Routes, Route, Navigate } from "react-router-dom";

import ForgotPassword from "../pages/Auth/ForgotPassword";

const LoginRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<ForgotPassword />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default LoginRoute;
