import { toast } from "sonner";
import { Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";

import useAppContext from "../../hooks/useAppContext";
import Transcript from "../Transcript";
import Layout from "../../components/Layout";
import Schedule from "../../components/Schedule";
import AdminBlock from "../../components/Admin/AdminBlock";
import ProfileContainer from "../../components/ProfileContainer";
import LastestHighlightOrEvent from "../../components/LastestHighlightOrEvent";
import TeacherOfClassVertical from "../../components/TeacherOfClassVertical";
import Email from "../../components/Email";
import StudentDayOff from "../../components/StudentDayOff";

const ParentHome = () => {
  const navigate = useNavigate();
  const {
    authState: { user, signOut },
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
      <div className="mb-2">
        <Row>
          <Col md={4} className="d-flex flex-column">
            <ProfileContainer className="mb-4" />
            <StudentDayOff dayOff={user.dayOff} />
          </Col>

          <Col md={8}>
            <AdminBlock
              title="Thời khóa biểu"
              icon="fas fa-calendar-week"
              className="mb-4"
            >
              <Schedule classRoom={user.classRoom} isComponent />
            </AdminBlock>

            <AdminBlock
              title="Bảng điểm"
              icon="fas fa-file-alt"
              className="mb-4"
            >
              <Transcript studentId={user._id} isComponent />
            </AdminBlock>
          </Col>
        </Row>
        <Row>
          <Col md={4} className="mb-4">
            <TeacherOfClassVertical classRoom={user.classRoom} />
          </Col>
          <Col md={4} className="d-flex flex-column mb-4">
            <LastestHighlightOrEvent isHighlight className="flex-grow-1" />
          </Col>
          <Col md={4} className="mb-4">
            <Email studentId={user._id} />
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default ParentHome;
