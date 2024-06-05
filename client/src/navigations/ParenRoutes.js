import { Routes, Route, Navigate } from "react-router-dom";

import ParentHome from "../pages/Home/ParentHome";
import Fee from "../pages/Parent/Fee/Fee";

const ParentRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ParentHome />} />
      <Route path="/fees" element={<Fee />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default ParentRoutes;
