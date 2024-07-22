import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Row, Col, Alert } from "reactstrap";

import Layout from "../../../components/Layout";
import CreateBtnBig from "../../../components/buttons/CreateBtnBig";
import BackBtn from "../../../components/buttons/BackBtn";
import DeleteBtn from "../../../components/buttons/DeleteBtn";
import SearchBox from "../../../components/common/SearchBox";
import FilterSelected from "../../../components/selecteds/FilterSelected";
import NewTabLink from "../../../components/common/NewTabLink";
import Pagination from "../../../components/common/Pagination";
import useAppContext from "../../../hooks/useAppContext";
import { deleteTeacher, getTeachers } from "../../../services/teacher.service";
import { getAllClasses } from "../../../services/class.service";
import { getAllSubjects } from "../../../services/information.service";

const TeacherList = (props) => {
  const navigate = useNavigate();
  const [searchString, setSearchString] = useState("");
  const [optionClass, setOptionClass] = useState("");
  const [optionSubject, setOptionSubject] = useState("");
  const [filterClassTeacher, setFilterClassTeacher] = useState([]);
  const [filterSubject, setFilterSubject] = useState([]);
  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [totalUser, setTotalUser] = useState(0);
  const [isOpen, toggle] = useState(false);

  const {
    loadingState: { setIsLoading },
    modalState: { setModal },
  } = useAppContext();

  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await getTeachers({
        search: searchString,
        filterClass: optionClass,
        filterSubject: optionSubject,
        currentPage,
      });
      const dataResponse = response.data;
      setData(dataResponse.data);
      setTotalPage(dataResponse.totalPage);
      setTotalUser(dataResponse.totalTeacher);
    } catch (err) {
      toast.error("Lỗi trong khi lấy dữ liệu giáo viên");
      console.log({ err });
    }
    setIsLoading(false);
  };

  const getFilters = async () => {
    try {
      const resClass = await getAllClasses();
      setFilterClassTeacher(
        resClass.data.map((c) => ({ label: c.name, value: c.name }))
      );
      const resSubject = await getAllSubjects();
      setFilterSubject(
        resSubject.data.map((subject) => ({ label: subject, value: subject }))
      );
    } catch (err) {
      toast.error("Lỗi trong khi lấy dữ liệu môn học và lớp");
      console.log({ err });
    }
  };

  useEffect(() => {
    getFilters();
  }, []);

  useEffect(() => {
    getData();
  }, [optionClass, optionSubject, currentPage]);

  const handleDeleteTeacher = async (id) => {
    setIsLoading(true);
    try {
      await deleteTeacher(id);
      await getData();
      toast.success("Xóa giáo viên thành công");
    } catch (err) {
      toast.error("Lỗi trong khi xóa giáo viên");
      console.log({ err });
    }
    setIsLoading(false);
  };

  return (
    <Layout>
      <div>
        <Row className="mb-2">
          <Col md={7}>
            <h5>
              DANH SÁCH GIÁO VIÊN{" "}
              {/* {props.year && `${props.year}-${props.year + 1}`} */}
            </h5>
          </Col>
          <Col md={5} className="text-md-right text-md-left">
            <CreateBtnBig
              title="giáo viên"
              className="mr-2"
              onClick={() => navigate("/teachers/create")}
            />
            <BackBtn title="trang chủ" onClick={() => navigate("/")} />
          </Col>
        </Row>
        <Row className="mb-2">
          <Col md={6}>
            <SearchBox
              onChange={(e) => setSearchString(e.target.value)}
              onSearch={() => {
                if (currentPage !== 1) {
                  setCurrentPage(1);
                } else {
                  getData();
                }
              }}
            />
          </Col>
          <Col md={3}>
            <FilterSelected
              isClearable
              placeholder="Lọc theo môn học"
              className="mb-2"
              options={filterSubject}
              onChange={(e) => {
                setCurrentPage(1);
                if (e) {
                  setOptionSubject(e.value);
                } else {
                  setOptionSubject("");
                }
              }}
            />
          </Col>
          <Col md={3}>
            <FilterSelected
              isClearable
              placeholder="Lọc theo lớp"
              options={filterClassTeacher}
              onChange={(e) => {
                setCurrentPage(1);
                if (e) {
                  setOptionClass(e.value);
                } else {
                  setOptionClass("");
                }
              }}
              value={
                optionClass && {
                  value: optionClass,
                  label: optionClass,
                }
              }
            />
          </Col>
        </Row>
        <Row className="mb-2">
          <Col md={12} className="text-right">
            <b>Tổng số giáo viên: {totalUser}</b>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {data && data.length > 0 ? (
              <Table bordered striped hover size="sm" responsive>
                <thead>
                  <tr>
                    {[
                      "Tên",
                      "Giới tính",
                      "Năm sinh",
                      "Email",
                      "Số điện thoại",
                      "Môn học",
                      "Các lớp đang dạy",
                      "Lớp chủ nhiệm",
                      "",
                    ].map((item, index) => (
                      <th key={index} className="align-top">
                        {item}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((teacher, index) => (
                    <tr key={index}>
                      <td>
                        <NewTabLink
                          title={teacher.fullName}
                          to={`/teachers/edit/${teacher._id}`}
                        />
                      </td>
                      <td>{teacher.gender ? "Nam" : "Nữ"}</td>
                      <td>{teacher.yearOfBirth}</td>
                      <td>{teacher.email}</td>
                      <td>{teacher.phoneNumber}</td>
                      <td>{teacher.subject}</td>
                      <td>
                        {teacher.teacherOfClasses
                          ?.map((c) => c.name)
                          .join(", ")}
                      </td>
                      <td>{teacher.mainTeacherOfClass.name}</td>
                      <td className="text-center">
                        <DeleteBtn
                          onClick={() => {
                            setModal({
                              isOpen: true,
                              message: "Bạn có chắc muốn xóa giáo viên này ?",
                              type: "warning",
                              onConfirm: () => handleDeleteTeacher(teacher._id),
                            });
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <Alert color="primary">Không có giáo viên</Alert>
            )}
          </Col>
        </Row>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPage={totalPage}
        />
      </div>
    </Layout>
  );
};

export default TeacherList;
