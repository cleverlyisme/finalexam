import { Routes, Route, Navigate } from "react-router-dom";

import TeacherHome from "../pages/Home/TeacherHome";
import StudentAttendance from "../pages/Teacher/StudentAttendance";

const TeacherRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<TeacherHome />} />
      <Route path="/student-attendance" element={<StudentAttendance />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default TeacherRoutes;
