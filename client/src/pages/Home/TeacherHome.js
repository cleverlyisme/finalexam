import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import useAppContext from "../../hooks/useAppContext";
import Layout from "../../components/Layout";

const TeacherHome = () => {
  const navigate = useNavigate();
  const {
    authState: { signOut },
    loadingState: { setIsLoading },
  } = useAppContext();

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      signOut();

      toast.success("Đã đăng xuất khỏi tài khoản");
      navigate("/");
    } catch (err) {
      toast.error(err?.response?.data);
    }
    setIsLoading(false);
  };

  return (
    <Layout>
      <div className="w-full h-screen d-flex flex-column justify-content-center align-items-center gap-4">
        <div>Bạn đang đăng nhập với tư cách giáo viên</div>
        <button onClick={handleSignOut} className="btn btn-primary">
          Đăng xuất
        </button>
      </div>
    </Layout>
  );
};

export default TeacherHome;
