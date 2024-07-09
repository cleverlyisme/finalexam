import { Col, Row } from "reactstrap";
import Layout from "../../../components/Layout";

const Fee = () => {
  return (
    <Layout>
      <div className="flex flex-colo p-8 gap-6">
        <h2>Quản lý học phí</h2>
        <Row className="w-full">
          <Col xs={6} className="flex justify-center">
            Danh sách học phí hết hạn
          </Col>

          <Col xs={6} className="flex justify-center">
            Danh sách học phí còn hạn
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default Fee;
