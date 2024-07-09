import { toast } from "sonner";
import { Col, Row } from "reactstrap";
import { useEffect, useState } from "react";

import Layout from "../../../components/Layout";
import FeeInfor from "./components/FeeInfor";
import useAppContext from "../../../hooks/useAppContext";
import PaidFees from "./components/PaidFees";
import FeeList from "./components/FeeList";
import { getStudentFeeLatest } from "../../../services/information.service";

const Fee = () => {
  const {
    authState: { user },
  } = useAppContext();

  const [data, setData] = useState({
    paid: [],
    notPaid: [],
  });

  const getData = async () => {
    try {
      const response = await getStudentFeeLatest();
      const data = response.data;

      setData(data);
    } catch (err) {
      toast.error(err?.response?.data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout>
      <div className="mb-2 px-4">
        <Row>
          <Col md={4} className="d-flex flex-column">
            <FeeInfor className="mb-4" student={user?.student} />
          </Col>

          <Col md={8}>
            <PaidFees
              icon="fas fa-file-alt"
              className="mb-4"
              fees={data.paid}
            />
          </Col>
        </Row>
        <div>
          <FeeList fees={data.notPaid} />
        </div>
      </div>
    </Layout>
  );
};

export default Fee;
