import { Routes, Route, Navigate } from "react-router-dom";

import AdminHome from "../pages/Home/AdminHome";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminHome />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AdminRoutes;
