import AdminRoutes from "./AdminRoutes";
import ParentRoutes from "./ParenRoutes";
import TeacherRoutes from "./TeacherRoutes";
import useAppContext from "../hooks/useAppContext";

const MainRoutes = () => {
  const {
    authState: { user },
  } = useAppContext();

  return user?.role === "admin" ? (
    <AdminRoutes />
  ) : user?.role === "teacher" ? (
    <TeacherRoutes />
  ) : (
    <ParentRoutes />
  );
};

export default MainRoutes;
