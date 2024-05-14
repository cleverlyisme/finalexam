import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Auth/Login";

const LoginRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default LoginRoute;
