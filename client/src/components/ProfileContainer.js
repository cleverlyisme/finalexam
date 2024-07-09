import React from "react";
import moment from "moment";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Block from "./common/Block";

const Bold = styled.span`
  font-weight: 500;
`;

const ProfileContainer = (props) => {
  const { user } = props;

  const profileTitle = (
    <div className="d-flex align-items-center">
      <i className="fas fa-user mr-2" />
      <span>Thông tin cá nhân</span>
      <div className="flex-grow-1 text-right">
        <Link to="/profile">Edit</Link>
      </div>
    </div>
  );

  return (
    <div className={props.className && props.className}>
      <Block title={profileTitle}>
        {user?.role === "teacher" ? (
          <div>
            <p>
              Họ và tên: <Bold>{user?.fullName}</Bold>
            </p>
            <p>
              Giới tính: <Bold>{user?.gender ? "Nam" : "Nữ"}</Bold>
            </p>
            <p>
              Năm sinh: <Bold>{user?.yearOfBirth}</Bold>
            </p>
            <p>
              Email: <Bold>{user?.email}</Bold>
            </p>
            <p>
              Số điện thoại: <Bold>{user?.phoneNumber}</Bold>
            </p>
            {user?.mainTeacherOfClass && (
              <p>
                Giáo viên chủ nhiệm lớp:{" "}
                <Bold>{user?.mainTeacherOfClass.name}</Bold>
              </p>
            )}
            <p>
              Môn học: <Bold>{user?.subject}</Bold>
            </p>
            <p>
              Các lớp đang dạy:{" "}
              <Bold>
                {user?.teacherOfClasses?.map((item) => item.name).join(", ")}
              </Bold>
            </p>
          </div>
        ) : (
          <div>
            <p>
              ID: <Bold>{user?.student?._id}</Bold>
            </p>
            <p>
              Họ và tên: <Bold>{user?.student?.fullName}</Bold>
            </p>
            <p>
              Giới tính: <Bold>{user?.student?.gender ? "Nam" : "Nữ"}</Bold>
            </p>
            <p>
              Khối: <Bold>{user?.student?.grade || 12}</Bold>
            </p>
            <p>
              Lớp: <Bold>{user?.student?.classRoom || "12A1"}</Bold>
            </p>
            <p>
              Ngày sinh:{" "}
              <Bold>
                {moment(user?.student?.dateOfBirth).format("DD/MM/YYYY")}
              </Bold>
            </p>
            <p>
              Địa chỉ: <Bold>{user?.student?.address}</Bold>
            </p>
            {user?.father?.name && (
              <p>
                Họ và tên bố: <Bold>{user?.father?.name}</Bold>
              </p>
            )}

            {user?.student?.father?.phoneNumber && (
              <p>
                Số điện thoại bố: <Bold>{user?.father?.phoneNumber}</Bold>
              </p>
            )}

            {user?.student?.mother?.name && (
              <p>
                Họ và tên mẹ: <Bold>{user?.mother?.name}</Bold>
              </p>
            )}

            {user?.student?.mother?.phoneNumber && (
              <p>
                Số điện thoại mẹ: <Bold>{user?.mother?.phoneNumber}</Bold>
              </p>
            )}

            {user?.student?.note && (
              <p>
                Ghi chú: <Bold>{user?.student?.note}</Bold>
              </p>
            )}
          </div>
        )}
      </Block>
    </div>
  );
};

export default ProfileContainer;
