import { toast } from "sonner";
import { useState } from "react";
import { Col, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";

import useAppContext from "../../hooks/useAppContext";
import Layout from "../../components/Layout";
import Schedule from "../../components/Schedule";
import StudentOff from "./components/StudentOff";
import Block from "../../components/common/Block";
import ProfileContainer from "../../components/ProfileContainer";
import LastestHighlightOrEvent from "../../components/LastestHighlightOrEvent";
import { getLastestHighlights } from "../../services/highlight.service";

const TeacherHome = () => {
  const navigate = useNavigate();
  const {
    authState: { user },
    loadingState: { setIsLoading },
  } = useAppContext();
  console.log({ user });

  const [data, setData] = useState([]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const response = await getLastestHighlights();
      const data = response.data;
      setData(data);
    } catch (err) {
      toast.error(err?.response?.data);
    }
    setIsLoading(false);
  };

  return (
    <Layout>
      <div className="mb-2">
        <Row>
          <Col md={4} className="mb-4">
            <ProfileContainer user={user} />
          </Col>

          <Col md={4} className="d-flex flex-column mb-4">
            {user?.mainTeacherOfClass &&
              user?.mainTeacherOfClass.name.trim() && <StudentOff />}
            <Block
              title="Thời khóa biểu"
              icon="fas fa-calendar-week"
              className="flex-grow-1"
            >
              <Schedule teacherId={user?._id} isComponent />
            </Block>
          </Col>

          <Col md={4} className="mb-4 d-flex flex-column">
            <LastestHighlightOrEvent
              isHighlight
              loadData={loadData}
              data={data}
              noHeight
              className="flex-grow-1"
            />
          </Col>

          {user?.mainTeacherOfClass && user?.mainTeacherOfClass.name.trim() && (
            <>
              <Col md={12} className="mb-4">
                {/* <TeacherMainClass userInformation={user} /> */}
              </Col>
              <Col md={12} className="mb-4">
                <Block
                  title={`Danh sách giáo viên lớp ${user?.mainTeacherOfClass.name}`}
                  icon="fas fa-list"
                >
                  {/* <TeacherOfClass
                                    classRoom={user.mainTeacherOfClass}
                                    noLabel
                                /> */}
                </Block>
              </Col>
            </>
          )}
        </Row>
      </div>
    </Layout>
  );
};

export default TeacherHome;
