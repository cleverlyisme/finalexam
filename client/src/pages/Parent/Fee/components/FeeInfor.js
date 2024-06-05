import moment from "moment";
import styled from "styled-components";
import { Link } from "react-router-dom";

import AdminBlock from "../../../../components/Admin/AdminBlock";

const Bold = styled.span`
  font-weight: 500;
`;

const FeeInfor = (props) => {
  const { student } = props;

  const feeTitle = (
    <div className="d-flex align-items-center">
      <i className="fas fa-user mr-2" />
      <span>Tổng quan</span>
      <div className="flex-grow-1 text-right">
        <Link to="/profile">Edit</Link>
      </div>
    </div>
  );

  console.log({student})

  return (
    <div className={props.className && props.className}>
      <AdminBlock title={feeTitle}>
          <div>
          <p>
              Mã học sinh: <Bold>{student?._id || '6650974e493467ce955f4edc'}</Bold>
            </p>
            <p>
              Họ và tên học sinh: <Bold>{student?.fullName || 'Đinh Phương Quang'}</Bold>
            </p>
            <p>
              Giới tính: <Bold>{student?.gender ? "Nam" : "Nữ"}</Bold>
            </p>
            <p>
              Ngày tháng năm sinh: <Bold>{moment(student?.dateOfBirth).format("DD/MM/YYYY")}</Bold>
            </p>
            <p>
              Lớp: <Bold>{student?.mainClass?.name || '12A1'}</Bold>
            </p>
            <p>
              Các khoản phải đóng: <Bold>{student?.phoneNumber || 0}</Bold>
            </p>
            <p>
              Các khoản đã đóng: <Bold>{student?.subject || 0}</Bold>
            </p>
          </div>
        
      </AdminBlock>
    </div>
  );
};

export default FeeInfor;