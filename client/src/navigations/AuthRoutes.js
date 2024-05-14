import { Routes, Route } from "react-router-dom";

import LoginRoute from "./LoginRoute";
import ForgotPasswordRoute from "./ForgotPasswordRoute";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginRoute />} />
      <Route path="/forgot-password" element={<ForgotPasswordRoute />} />
      <Route path="*" element={<LoginRoute />} />
    </Routes>
  );
};

export default AuthRoutes;
