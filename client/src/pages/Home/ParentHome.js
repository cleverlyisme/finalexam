import { toast } from "sonner";
import { Row, Col } from "reactstrap";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import useAppContext from "../../hooks/useAppContext";
import Layout from "../../components/Layout";
// import Transcript from "../Transcript";
import Schedule from "../../components/Schedule";
import Block from "../../components/common/Block";
import ProfileContainer from "../../components/ProfileContainer";
// import LastestHighlightOrEvent from "../../components/LastestHighlightOrEvent";
// import TeacherOfClassVertical from "../../components/TeacherOfClassVertical";
// import Email from "../../components/Email";
import StudentDayOff from "../../components/StudentDayOff";
import Transcript from "./components/Transcript";

const ParentHome = () => {
  const navigate = useNavigate();
  const {
    authState: { user },
  } = useAppContext();

  console.log({ user });

  return (
    <Layout>
      <div className="mb-2">
        <Row>
          <Col md={4} className="d-flex flex-column">
            <ProfileContainer className="mb-4" user={user} />
            <StudentDayOff dayOffs={user?.student?.dayOffs} />
          </Col>

          <Col md={8}>
            <Block
              title="Thời khóa biểu"
              icon="fas fa-calendar-week"
              className="mb-4"
            >
              <Schedule classRoom={user?.student?.mainClass?._id} isComponent />
            </Block>

            <Block
              title="Bảng điểm kì học gần nhất"
              icon="fas fa-file-alt"
              className="mb-4"
            >
              <Transcript studentId={user?.student?._id} isComponent />
            </Block>
          </Col>
        </Row>
        <Row>
          <Col md={4} className="mb-4">
            {/* <TeacherOfClassVertical classRoom={user.classRoom} /> */}
          </Col>
          <Col md={4} className="d-flex flex-column mb-4">
            {/* <LastestHighlightOrEvent isHighlight className="flex-grow-1" /> */}
          </Col>
          <Col md={4} className="mb-4">
            {/* <Email studentId={user?.student?._id} /> */}
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default ParentHome;
