import { Alert } from "reactstrap";
import Block from "../../../../components/common/Block";
import FeeItem from "../../../../components/FeeItem";
import { Fragment } from "react";

const PaidFees = ({ fees }) => {
  return (
    <Block
      title={`Các khoản đã đóng (${fees?.length})`}
      icon="fas fa-list-check"
      className="mb-4"
      height={310}
    >
      {fees?.map((fee, index) => (
        <Fragment key={index}>
          <FeeItem feeInfor={fee} />
        </Fragment>
      ))}
      {!fees?.length && (
        <Alert type="primary">Không có khoản nào đã đóng</Alert>
      )}
    </Block>
  );
};

export default PaidFees;
