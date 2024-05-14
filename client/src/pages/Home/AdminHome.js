import { toast } from "sonner";
import { useState } from "react";
import { Col, Row } from "reactstrap";

import Layout from "../../components/Layout";
import AdminReport from "../../components/Admin/AdminReport";
import AdminChart from "../../components/Admin/AdminChart";
import LastestHighlightOrEvent from "../../components/LastestHighlightOrEvent";
import Calendar from "../../components/Admin/Calendar";

import useAppContext from "../../hooks/useAppContext";
import { getLastestHighlights } from "../../services/highlight.service";
import { getLastestEvents } from "../../services/event.service";

const AdminHome = () => {
  const {
    loadingState: { setIsLoading },
  } = useAppContext();
  const [data, setData] = useState([]);

  const loadData = async (isHighlight) => {
    setIsLoading(true);
    try {
      const response = isHighlight
        ? await getLastestHighlights()
        : await getLastestEvents();
      const data = response.data;
      setData(data);
    } catch (err) {
      toast.error(err?.response?.data);
    }
    setIsLoading(false);
  };

  return (
    <Layout>
      <div className="px-4">
        <AdminReport />
        <AdminChart />
        <Row>
          <Col md={12} xl={4} className="mb-4">
            <Calendar loadData={loadData} />
          </Col>

          <Col md={6} xl={4} className="mb-4">
            <LastestHighlightOrEvent
              isHighlight
              loadData={loadData}
              data={data}
            />
          </Col>

          <Col md={6} xl={4} className="mb-4">
            <LastestHighlightOrEvent loadData={loadData} data={data} />
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default AdminHome;
