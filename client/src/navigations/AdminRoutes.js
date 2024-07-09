import { Routes, Route, Navigate } from "react-router-dom";

import AdminHome from "../pages/Home/AdminHome";
import Fee from "../pages/Admin/Fee/Fee";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminHome />} />
      <Route path="/fees" element={<Fee />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AdminRoutes;
