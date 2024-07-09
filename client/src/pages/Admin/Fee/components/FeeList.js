import { Alert } from "reactstrap";

import Block from "../../../../components/common/Block";
import FeeItem from "../../../../components/FeeItem";
import { Fragment } from "react";

const FeeList = ({ fees }) => {
  return (
    <Block
      title={`Các khoản cần thu (${fees?.length})`}
      icon="fas fa-list"
      className="mb-4"
      height={510}
    >
      {fees?.map((fee, index) => (
        <Fragment key={index}>
          <FeeItem feeInfor={fee} />
        </Fragment>
      ))}
      {!fees?.length && (
        <Alert type="primary">Không có khoản nào cần đóng</Alert>
      )}
    </Block>
  );
};

export default FeeList;
