import * as yup from "yup";
import { toast } from "sonner";
import { withFormik, Form, Field } from "formik";
import React, { useEffect, useState } from "react";
import { Input, Label, FormGroup, Button, Row, Col } from "reactstrap";

import Layout from "./Layout";
import YearSelected from "./selecteds/YearSelected";
import FilterSelected from "./selecteds/FilterSelected";
import Feedback from "./common/Feedback";
import LabelRequired from "./common/LabelRequired";
import AllClassSelected from "./selecteds/AllClassSelected";
import BackBtn from "./buttons/BackBtn";
import Schedule from "./Schedule";
import { getAllSubjects } from "../services/information.service";
import {
  createTeacher,
  getTeacher,
  updateProfile,
  updateTeacher,
} from "../services/teacher.service";

const genderOptions = [
  { value: false, label: "Nữ" },
  { value: true, label: "Nam" },
];

const yearOfBirthRegex = /^\d{4}$/g;
const phoneNumberRegex = /^0\d{9}$/g;

const Teacher = (props) => {
  const { id } = props;

  const [filterSubject, setFilterSubject] = useState([]);
  const [mainTeacherOfClassValue, setMainTeacherOfClassValue] = useState(null);
  const [teacherOfClassesValue, setTeacherOfClassesValue] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    if (!props.isProfile) {
      try {
        const res = await getAllSubjects();
        const subjects = res.data.map((subject) => ({
          label: subject,
          value: subject,
        }));
        setFilterSubject(subjects);
      } catch (err) {
        toast.error("Lỗi trong khi lấy dữ liệu các môn");
      }
    }

    if (id) {
      try {
        const res = await getTeacher(id);
        const data = res.data;
        props.setFieldValue("fullName", data.fullName);
        props.setFieldValue("yearOfBirth", data.yearOfBirth);
        props.setFieldValue("gender", data.gender);
        props.setFieldValue("email", data.email);
        props.setFieldValue("phoneNumber", data.phoneNumber);
        props.setFieldValue("mainTeacher", data.mainTeacherOfClass && true);
        props.setFieldValue("mainTeacherOfClass", data.mainTeacherOfClass._id);
        setMainTeacherOfClassValue({
          label: data.mainTeacherOfClass.name,
          value: data.mainTeacherOfClass._id,
        });
        props.setFieldValue("subject", data.subject);
        props.setFieldValue(
          "teacherOfClasses",
          data.teacherOfClasses?.map((item) => item._id)
        );
        setTeacherOfClassesValue(
          data.teacherOfClasses?.map((item) => ({
            label: item.name,
            value: item._id,
          }))
        );
        console.log({ res });
      } catch (err) {
        toast.error("Lỗi trong khi lấy dữ liệu giáo viên");
      }
    }
  };

  const {
    fullName,
    yearOfBirth,
    gender,
    email,
    phoneNumber,
    mainTeacher,
    mainTeacherOfClass,
    subject,
    teacherOfClasses,
  } = props.values;

  return (
    <Layout>
      <Form className="mb-2">
        <Row>
          <Col md={12} className="d-flex align-items-start">
            <div className="flex-grow-1">
              <h5 className="mb-2">
                {id ? "CẬP NHẬT" : "TẠO MỚI"}{" "}
                {props.isProfile ? "PROFILE" : "GIÁO VIÊN"}
              </h5>
            </div>

            {!id && (
              <BackBtn title="trang chủ" onClick={() => props.navigate("/")} />
            )}
          </Col>
          <Col md={4} className="text-right"></Col>
        </Row>

        <Row>
          <Col md={6}>
            <FormGroup>
              <LabelRequired>Họ và tên giáo viên</LabelRequired>
              <Field
                name="fullName"
                render={({ field }) => (
                  <Input {...field} placeholder="Họ và tên giáo viên" />
                )}
              />
              {props.touched.fullName && (
                <Feedback>{props.errors.fullName}</Feedback>
              )}
            </FormGroup>

            <FormGroup>
              <LabelRequired>Năm sinh</LabelRequired>
              <YearSelected
                name="yearOfBirth"
                onChange={(e) => props.setFieldValue("yearOfBirth", e.value)}
                value={
                  yearOfBirth && {
                    label: yearOfBirth,
                    value: yearOfBirth,
                  }
                }
              />
              {props.touched.yearOfBirth && (
                <Feedback>{props.errors.yearOfBirth}</Feedback>
              )}
            </FormGroup>

            <FormGroup>
              <LabelRequired>Giới tính</LabelRequired>
              <FilterSelected
                name="gender"
                placeholder="Chọn giới tính"
                options={genderOptions}
                onChange={(e) => props.setFieldValue("gender", e.value)}
                value={
                  gender !== null && {
                    value: gender,
                    label: gender ? "Nam" : "Nữ",
                  }
                }
              />
              {props.touched.gender && (
                <Feedback>{props.errors.gender}</Feedback>
              )}
            </FormGroup>

            <FormGroup>
              <LabelRequired>Email</LabelRequired>
              <Field
                name="email"
                render={({ field }) => <Input {...field} placeholder="Email" />}
              />
              {props.touched.email && <Feedback>{props.errors.email}</Feedback>}
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <LabelRequired>Số điện thoại</LabelRequired>
              <Field
                name="phoneNumber"
                render={({ field }) => (
                  <Input {...field} placeholder="Số điện thoại" />
                )}
              />
              {props.touched.phoneNumber && (
                <Feedback>{props.errors.phoneNumber}</Feedback>
              )}
            </FormGroup>

            <FormGroup className="d-flex flex-column">
              <div className="d-flex">
                <Label className="mr-2">Chủ nhiệm</Label>
                <Input
                  type="checkbox"
                  id="mainTeacher"
                  onChange={(e) => {
                    props.setFieldValue("mainTeacher", e.target.checked);
                    if (!e.target.checked) {
                      props.setFieldValue("mainTeacherOfClass", "");
                    }
                  }}
                  checked={mainTeacher}
                  disabled={props.isProfile}
                />
              </div>
              <div>
                <AllClassSelected
                  isDisabled={!props.values.mainTeacher || props.isProfile}
                  onChange={(e) => {
                    props.setFieldValue("mainTeacherOfClass", e.value);
                    setMainTeacherOfClassValue(e);
                  }}
                  value={mainTeacherOfClassValue}
                  viewOnly={props.isProfile}
                />
                {props.touched.mainTeacherOfClass && (
                  <Feedback>{props.errors.mainTeacherOfClass}</Feedback>
                )}
              </div>
            </FormGroup>
            <FormGroup>
              <LabelRequired>Dạy môn</LabelRequired>
              <FilterSelected
                placeholder="Select subject"
                className="flex-grow-1 mr-1"
                options={filterSubject}
                onChange={(e) => {
                  props.setFieldValue("subject", e.value);
                }}
                value={subject && { value: subject, label: subject }}
                isDisabled={props.isProfile}
              />
              {props.touched.subject && (
                <Feedback>{props.errors.subject}</Feedback>
              )}
            </FormGroup>
            <FormGroup className="d-flex flex-column">
              <Label>Các lớp đang dạy</Label>
              <AllClassSelected
                isMulti
                onChange={(e) => {
                  props.setFieldValue(
                    "teacherOfClasses",
                    e ? e.map((item) => item.value) : []
                  );
                  setTeacherOfClassesValue(e ? e : []);
                }}
                value={
                  teacherOfClassesValue.length > 0 && teacherOfClassesValue
                }
                isDisabled={props.isProfile}
                viewOnly={props.isProfile}
              />
              {props.touched.teacherOfClasses && (
                <Feedback>{props.errors.teacherOfClasses}</Feedback>
              )}
            </FormGroup>
          </Col>
        </Row>

        {/* {id && <Schedule teacherId={id} />} */}

        <Button color="success" onClick={props.handleSubmit}>
          {id ? "Cập nhật" : "Tạo mới"}
        </Button>
      </Form>
    </Layout>
  );
};

export default withFormik({
  mapPropsToValues: () => ({
    fullName: "",
    yearOfBirth: "",
    gender: null,
    email: "",
    phoneNumber: "",
    mainTeacher: false,
    mainTeacherOfClass: "",
    subject: "",
    teacherOfClass: [],
  }),
  validationSchema: yup.object().shape({
    fullName: yup.string().required("Họ và tên không được để trống"),
    yearOfBirth: yup
      .string()
      .required("Năm sinh không được để trống")
      .matches(yearOfBirthRegex, "Năm sinh không hợp lệ"),
    gender: yup.boolean().required("Giới tính không được để trống"),
    email: yup
      .string()
      .required("Email không được để trống")
      .email("Email không hợp lệ"),
    phoneNumber: yup
      .string()
      .required("Số điện thoại không được để trống")
      .matches(phoneNumberRegex, "Số điện thoại không hợp lệ"),
    mainTeacher: yup.boolean(),
    mainTeacherOfClass: yup.string().when("mainTeacher", {
      is: true,
      then: () => yup.string().required("Chọn lớp đang chủ nhiệm"),
    }),
    subject: yup.string().required("Môn học không được để trống"),
    teacherOfClasses: yup
      .array()
      .required("Các lớp đang dạy không được để trống")
      .min(1, "Các lớp đang dạy không được để trống"),
  }),
  handleSubmit: async (values, { props }) => {
    try {
      const id = props.id;
      await (id
        ? (props.isProfile ? updateProfile : updateTeacher)(id, values)
        : createTeacher(values));
      !id && props.navigate("/teachers");
      toast.success(`Đã ${id ? "cập nhật thông tin" : "tạo mới"} giáo viên`);
    } catch (err) {
      toast.error(err?.response?.data || err?.message);
    }
  },
})(Teacher);
