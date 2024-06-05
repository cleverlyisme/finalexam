import { Col, Row } from "reactstrap";

import Layout from "../../../components/Layout";
import FeeInfor from "./components/FeeInfor";
import useAppContext from "../../../hooks/useAppContext";
import PaidFees from "./components/PaidFees";
import FeeList from "./components/FeeList";
import { useEffect } from "react";
import { toast } from "sonner";

const Fee = () => {
  const {
    authState: { user },
  } = useAppContext();

  useEffect(() => toast.error("Có lỗi xảy ra!"))

  return (
    <Layout>
      <div className="mb-2 px-4">
        <Row>
          <Col md={4} className="d-flex flex-column">
            <FeeInfor className="mb-4" student={user?.student} />
            {/* <StudentDayOff dayOff={user?.student?.dayOff} /> */}
          </Col>

          <Col md={8}>
            <PaidFees title="Bảng điểm" icon="fas fa-file-alt" className="mb-4">
              {/* <Transcript studentId={user._id} isComponent /> */}
            </PaidFees>
          </Col>
        </Row>
        <div>
            <FeeList></FeeList>
        </div>
      </div>
    </Layout>
  );
};

export default Fee;
