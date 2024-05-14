import { Routes, Route, Navigate } from "react-router-dom";

import AdminHome from "../pages/Home/AdminHome";
import useAppContext from "../hooks/useAppContext";
import TeacherHome from "../pages/Home/TeacherHome";
import ParentHome from "../pages/Home/ParentHome";
import StudentAttendance from "../pages/Teacher/StudentAttendance";

const HomeRoute = () => {
  const {
    authState: { user },
  } = useAppContext();

  return (
    <Routes>
      {(() => {
        switch (user?.role) {
          case "admin":
            return (
              <>
                <Route path="/" element={<AdminHome />} />
              </>
            );
          case "teacher":
            return (
              <>
                <Route path="/" element={<TeacherHome />} />
                <Route
                  path="/student-attendance"
                  element={<StudentAttendance />}
                />
              </>
            );
          default:
            return (
              <>
                <Route path="/" element={<ParentHome />} />
                <Route path="/students" element={<StudentAttendance />} />
              </>
            );
        }
      })()}
      <Route path="*" element={<Navigate to="/" replace />} />{" "}
    </Routes>
  );
};

export default HomeRoute;
