import moment from "moment";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Row, Col, Input, Label, Alert } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";

import AdminBlock from "./Admin/AdminBlock";
import SimpleHighlightEvent from "./SimpleHighlightEvent";
import ViewModal from "./modals/ViewModal";
import LabelRequired from "./common/LabelRequired";
import Feedback from "./common/Feedback";
import useAppContext from "../hooks/useAppContext";
import { getLastestHighlights } from "../services/highlight.service";
import { getLastestEvents, updateEvent } from "../services/event.service";

const highlightTitle = (
  <div className="d-flex align-items-center">
    <i className="fas fa-newspaper mr-2" />
    <div className="flex-grow-1">Thông báo gần đây</div>
    <Link to="/highlights">Xem tất cả</Link>
  </div>
);

const LastestHighlightOrEvent = (props) => {
  const {
    loadingState: { setIsLoading },
  } = useAppContext();
  const [id, setId] = useState(null);
  const [time, setTime] = useState(null);
  const [isOpen, toggle] = useState(false);
  const [content, setContent] = useState("");
  const [checkContent, setCheckContent] = useState(false);

  useEffect(() => {
    props.loadData(props.isHighlight);
  }, []);

  const { data } = props;

  const handleUpdateEvent = async () => {
    setIsLoading(true);
    try {
      await updateEvent(id, { time, content });
      toast.success("Đã cập nhật sự kiện");
      toggle(false);
      await props.loadData(props.isHighlight);
    } catch (err) {
      toast.error("Cập nhật thất bại. Hãy thử lại");
    }
    setIsLoading(false);
  };

  const renderModal = () => (
    <ViewModal
      isOpen={isOpen}
      toggle={() => {
        setContent("");
        setCheckContent(false);
        toggle(!isOpen);
      }}
      title="Cập nhật sự kiện"
      onConfirm={() => handleUpdateEvent({ time, content })}
    >
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
              border:
                checkContent && !content.trim() ? "1px solid #dc3545" : "",
            }}
            maxLength={80}
          />
          {checkContent && !content.trim() && (
            <Feedback>Sự kiện đang trống</Feedback>
          )}
        </Col>
      </Row>
    </ViewModal>
  );

  return (
    <AdminBlock
      title={props.isHighlight ? highlightTitle : "Sự kiện sắp tới"}
      icon={!props.isHighlight && "fab fa-elementor"}
      height={props.height || (props.noHeight && "") || "350px"}
      className={props.className && props.className}
    >
      {renderModal()}
      <PerfectScrollbar>
        {data &&
          data.length > 0 &&
          data?.map((item, index) => (
            <React.Fragment key={index}>
              <SimpleHighlightEvent
                item={item}
                loadData={() => props.loadData(props.isHighlight)}
                {...props}
                onOpenModal={(item) => {
                  setId(item._id);
                  setTime(item.time);
                  setContent(item.content);
                  toggle(!isOpen);
                }}
              />
              {index < data.length - 1 && <hr />}
            </React.Fragment>
          ))}
        {!data ||
          (data.length === 0 && (
            <Alert type="primary">
              {`Không có ${props.isHighlight ? "thông báo" : "sự kiện"} nào`}
            </Alert>
          ))}
      </PerfectScrollbar>
    </AdminBlock>
  );
};

export default LastestHighlightOrEvent;
