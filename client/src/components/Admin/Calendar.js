import React, { useState } from "react";
import { toast } from "sonner";
import moment from "moment";
import Calendar from "react-calendar";
import { Row, Col, Input, Label } from "reactstrap";

import LabelRequired from "../common/LabelRequired";
import Feedback from "../common/Feedback";
import AdminBlock from "../Admin/AdminBlock";
import ViewModal from "../../components/modals/ViewModal";

import useAppContext from "../../hooks/useAppContext";
import { createEvent } from "../../services/event.service";

const CalendarContainer = (props) => {
  const {
    loadingState: { setIsLoading },
  } = useAppContext();
  const [time, setTime] = useState(null);
  const [isOpen, toggle] = useState(false);
  const [content, setContent] = useState("");
  const [checkContent, setCheckContent] = useState(false);

  const handleCreateEvent = async () => {
    setIsLoading(true);
    try {
      await createEvent({ time, content });
      toast.success("Đã thêm mới sự kiện");
      toggle(false);
      await props.loadData();
    } catch (err) {
      toast.error("Thêm mới sự kiện thất bại. Hãy thử lại");
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
      title="Thêm sự kiện"
      onConfirm={handleCreateEvent}
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
          />
          {checkContent && !content.trim() && (
            <Feedback>Sự kiện đang trống</Feedback>
          )}
        </Col>
      </Row>
    </ViewModal>
  );

  return (
    <AdminBlock title="Lịch" icon="far fa-calendar-alt" height="350px">
      {renderModal()}
      <Calendar
        onChange={(e) => {
          if (e.getTime() > new Date().getTime()) {
            setTime(e.toString());
            toggle(true);
          }
        }}
        value={new Date()}
        showWeekNumbers
      />
    </AdminBlock>
  );
};

export default CalendarContainer;
