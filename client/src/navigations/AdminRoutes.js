import { Routes, Route, Navigate } from "react-router-dom";

import Fee from "../pages/Admin/Fee/Fee";
import AdminHome from "../pages/Home/AdminHome";
import TeacherList from "../pages/Admin/Teacher/TeacherList";
import TeacherDetail from "../pages/Admin/Teacher/TeacherDetail";
import StudentList from "../pages/Admin/Student/StudentList";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminHome />} />
      <Route path="/fees" element={<Fee />} />
      <Route path="/teachers" element={<TeacherList />} />
      <Route path="/teachers/edit/:id" element={<TeacherDetail />} />
      <Route path="/teachers/create" element={<TeacherDetail />} />
      <Route path="/students" element={<StudentList />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AdminRoutes;
