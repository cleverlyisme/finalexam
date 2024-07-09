import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Table, Row, Col, Label, Alert, Button } from "reactstrap";

import NewTabLink from "./common/NewTabLink";
import useAppContext from "../hooks/useAppContext";
import {
  getScheduleByClass,
  getScheduleByTeacher,
} from "../services/schedule.service";
import { toast } from "sonner";

const Schedule = ({ classRoom, role, teacherId, time, isComponent }) => {
  const navigate = useNavigate();
  const {
    loadingState: { setIsLoading },
  } = useAppContext();
  const [data, setData] = useState({});

  const loadData = async () => {
    setIsLoading(true);
    try {
      const response = classRoom
        ? await getScheduleByClass(classRoom)
        : await getScheduleByTeacher(teacherId);
      const data = response.data;
      setData(data);
    } catch (err) {
      toast.error(err?.response?.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [classRoom, teacherId]);

  return (
    <div className="mb-2">
      <Row>
        <Col md={12}>
          {!isComponent && (
            <>
              {!teacherId ? (
                <Label>
                  Thời khóa biểu lớp {classRoom}{" "}
                  {time.year &&
                    time.semester &&
                    `${time.year}-${time.year + 1} ${time.semester}`}{" "}
                  {}
                </Label>
              ) : (
                <Label>
                  Thời khóa biểu giáo viên {data.name}{" "}
                  {time.year &&
                    time.semester &&
                    `${time.year}-${time.year + 1} ${time.semester}`}
                </Label>
              )}
            </>
          )}

          {data && data.schedule && Object.keys(data.schedule).length > 0 ? (
            <>
              <Table bordered striped hover size="sm" responsive>
                <thead>
                  <tr>
                    {[
                      "Thứ hai",
                      "Thứ ba",
                      "Thứ tư",
                      "Thứ năm",
                      "Thứ sáu",
                      "Thứ bảy",
                    ].map((day, index) => (
                      <th key={index}>{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[0, 1, 2, 3, 4].map((number) => (
                    <tr key={number}>
                      {["mon", "tue", "wed", "thu", "fri", "sat"].map(
                        (item, index) => (
                          <td
                            key={index}
                            style={{
                              height: "33.33px",
                            }}
                          >
                            {data.schedule[item]["morning"][number]}
                          </td>
                        )
                      )}
                    </tr>
                  ))}
                  <br />
                  {[0, 1, 2, 3].map((number) => (
                    <tr key={number}>
                      {["mon", "tue", "wed", "thu", "fri", "sat"].map(
                        (item, index) => (
                          <td
                            key={index}
                            style={{
                              height: "33.33px",
                            }}
                          >
                            {data.schedule[item]["afternoon"][number]}
                          </td>
                        )
                      )}
                    </tr>
                  ))}
                </tbody>
              </Table>
              {teacherId && (
                <NewTabLink
                  title="Chỉnh sửa"
                  to={`/updateSchedule/${classRoom}`}
                />
              )}
            </>
          ) : (
            <>
              {!teacherId && (
                <Alert color="primary">
                  Lớp học này chưa có thời khóa biểu
                </Alert>
              )}
              {role === "admin" && !teacherId && (
                <Button
                  color="success"
                  onClick={() => navigate(`/updateSchedule/${classRoom}`)}
                >
                  Tạo mới
                </Button>
              )}
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Schedule;
