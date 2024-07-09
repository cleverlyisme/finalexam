import _ from "lodash";
import { toast } from "sonner";
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Table, Row, Col, Label } from "reactstrap";

import BackBtn from "../../../components/buttons/BackBtn";
import { getStudentTranscriptLatest } from "../../../services/information.service";

import { subjects } from "../../../utils/constants";

const Bold = styled.span`
  font-weight: 500;
`;

const Transcript = (props) => {
  const studentId = props.match?.params?.studentId;
  const { role, subject } = props;
  const [data, setData] = useState([]);
  const subjectName = [
    "math",
    "literature",
    "english",
    "physics",
    "chemistry",
    "biology",
    "geography",
    "history",
    "law",
    "music",
    "art",
    "sport",
  ];

  const getData = async () => {
    const id = studentId || props.studentId;

    try {
      const response = await getStudentTranscriptLatest();
      const data = response.data;

      subjectName.map((item, index) => {
        data.scores[item].subject = subjects[index];
      });
      setData(data);
    } catch (err) {
      toast.error(err?.response?.data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="mb-2">
      {!props.isComponent && (
        <>
          <Row>
            <Col md={8} className="d-flex align-items-start">
              <h5 className="flex-grow-1">
                BẢNG ĐIỂM{" "}
                {data?.semester?.from &&
                  data?.semester?.semester &&
                  `${data?.semester?.from}-${data?.semester?.to} ${data?.semester?.semester}`}
              </h5>
              <BackBtn
                title={
                  role === "admin" ? "chi tiết học sinh" : "danh sách học sinh"
                }
                onClick={
                  () => {}
                  // history.push(
                  //     role === "admin"
                  //         ? `/user/student/edit/${studentId}`
                  //         : "/students"
                  // )
                }
              />
            </Col>
          </Row>

          <Row className="mb-2">
            <Col md={12}>
              <Label>Tên học sinh: {data?.name}</Label>
            </Col>
          </Row>
        </>
      )}

      {data && data.scores && Object.keys(data.scores).length > 0 && (
        <Row className="mb-2">
          <Col md={props.isComponent ? 12 : 8}>
            <div>
              <div className="flex gap-4 mb-2">
                <div className="space-x-2">
                  <span>Học kì:</span>
                  <Bold>{data?.semester?.semester}</Bold>
                </div>
                <div className="space-x-2">
                  <span>Năm học:</span>
                  <Bold>
                    {data?.semester?.from + " - " + data?.semester?.to}
                  </Bold>
                </div>
              </div>
              <Table bordered striped hover size="sm" responsive>
                <thead>
                  <tr>
                    {["Môn học", "Hệ số 1", "Hệ số 2", "Hệ số 3"].map(
                      (item, index) => (
                        <th key={index}>{item}</th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {Object.values(data.scores).map((item, index) => (
                    <tr key={index}>
                      <td>{item.subject}</td>
                      <td>
                        {item.x1.filter((score) => score > -1).join(", ")}
                      </td>
                      <td>
                        {item.x2.filter((score) => score > -1).join(", ")}
                      </td>
                      <td>
                        {item.x3.filter((score) => score > -1).join(", ")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Transcript;
