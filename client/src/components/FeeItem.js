import moment from "moment";
import { Fragment, useState } from "react";
import { Col, Input, Label, Row } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";

import Feedback from "./common/Feedback";
import ViewModal from "./modals/ViewModal";
import LabelRequired from "./common/LabelRequired";
import useAppContext from "../hooks/useAppContext";
import { Link } from "react-router-dom";
import DeleteBtn from "./buttons/DeleteBtn";

const FeeItem = ({ feeInfor }) => {
  const {
    loadingState: { setIsLoading },
  } = useAppContext();
  const [id, setId] = useState(null);
  const [time, setTime] = useState(null);
  const [isOpen, toggle] = useState(false);
  const [content, setContent] = useState("");
  const [checkContent, setCheckContent] = useState(false);

  const renderModal = () => (
    <div>
      <Row>
        <Col md={12}>
          <Label>Ngày: {moment(time).format("DD/MM/YYYY")}</Label>
        </Col>
        <Col md={12}>
          <LabelRequired>Sự kiện</LabelRequired>
          <Input
            type="textarea"
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onBlur={() => setCheckContent(true)}
            style={{
              border: !feeInfor?.fee?.description?.trim()
                ? "1px solid #dc3545"
                : "",
            }}
            maxLength={80}
          />
          {!feeInfor?.fee?.description?.trim() && (
            <Feedback>Sự kiện đang trống</Feedback>
          )}
        </Col>
      </Row>
    </div>
  );

  return (
    <div className="flex gap-4 items-center">
      <div className="flex gap-2 items-center">
        <div
          style={{
            padding: "8px 16px",
            marginBottom: "8px",
            borderRadius: "20px",
            background: feeInfor?.status === "paid" ? "royalblue" : "tomato",
            display: "inline-block",
            color: "#fff",
          }}
        >
          {moment(feeInfor?.from).format("DD/MM/YYYY")}
        </div>
        -
        <div
          style={{
            padding: "8px 16px",
            marginBottom: "8px",
            borderRadius: "20px",
            background: feeInfor?.status === "paid" ? "royalblue" : "tomato",
            display: "inline-block",
            color: "#fff",
          }}
        >
          {moment(feeInfor?.to).format("DD/MM/YYYY")}
        </div>
      </div>
      <div className="d-flex">
        <Link
          to={`fee/detail/${feeInfor?.fee._id}`}
          onClick={() => {
            // if (!isHighlight) {
            //   onOpenModal(item);
            // }
          }}
          className="flex-grow-1 text-center"
        >
          <b style={{ wordBreak: "break-all" }}>{feeInfor.fee.title}</b>
        </Link>
      </div>
    </div>
  );
};

export default FeeItem;
