import { toast } from "sonner";
import { Row, Col } from "reactstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminCard from "./AdminCard";
import Tooltip from "../common/Tooltip";
import useAppContext from "../../hooks/useAppContext";
import { getReports } from "../../services/admin.service";

const renderTooltipPermission = () => (
  <Tooltip key="permission" id="permission">
    <p className="mb-2">Học sinh nghỉ có phép</p>
  </Tooltip>
);

const renderTooltipNoPermission = () => (
  <Tooltip key="noPermission" id="noPermission">
    <p className="mb-2">Học sinh nghỉ không có phép</p>
  </Tooltip>
);

const AdminReport = (props) => {
  const {
    loadingState: { setIsLoading },
  } = useAppContext();
  const navigate = useNavigate();
  const [reports, setReports] = useState({});

  const loadData = async () => {
    setIsLoading(true);
    try {
      const response = await getReports();
      const data = response.data;
      setReports(data);
    } catch (err) {
      toast.error(err?.response?.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Row>
      {renderTooltipPermission()}
      {renderTooltipNoPermission()}
      <Col md={6} lg={3} className="mb-4">
        <AdminCard
          color="primary"
          detail="Xem danh sách"
          onDetailClick={() => navigate("/students")}
        >
          <i className="fas fa-users" /> Tổng số học sinh:{" "}
          {reports.numberOfStudents}
        </AdminCard>
      </Col>
      <Col md={6} lg={3} className="mb-4">
        <AdminCard
          color="success"
          detail="Xem danh sách"
          onDetailClick={() => navigate("/teachers")}
        >
          <i className="fas fa-chalkboard-teacher" /> Tổng số giáo viên:{" "}
          {reports.numberOfTeachers}
        </AdminCard>
      </Col>
      <Col md={6} lg={3} className="mb-4">
        <AdminCard
          color="warning"
          detail="Xem danh sách"
          onDetailClick={() => navigate("/gradeAndClass")}
        >
          <i className="fas fa-school" /> Lớp học: {reports.numberOfClasses}
        </AdminCard>
      </Col>
      <Col md={6} lg={3} className="mb-4">
        <AdminCard
          color="danger"
          onDetailClick={() => navigate("/studentOffToday")}
        >
          <i className="fas fa-user-times mr-4" />
          <span className="mr-4">Học sinh nghỉ học:</span>
          <span>{reports.studentsOff?.withPermission}</span>
          <i
            className="fas fa-user-plus mr-4 ml-2"
            data-tip="permission"
            data-for="permission"
          />
          <span className="text-white">
            {reports.studentsOff?.withoutPermission}
          </span>
          <i
            className="fas fa-user-minus ml-2"
            data-tip="noPermission"
            data-for="noPermission"
          />
        </AdminCard>
      </Col>
    </Row>
  );
};

export default AdminReport;
