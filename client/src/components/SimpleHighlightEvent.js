import React from "react";
import moment from "moment";
import { toast } from "sonner";
import { Link } from "react-router-dom";

import useAppContext from "../hooks/useAppContext";
import DeleteBtn from "./buttons/DeleteBtn";
import { deleteEvent } from "../services/event.service";

const SimpleHighlightEvent = ({ item, loadData, isHighlight, onOpenModal }) => {
  const {
    modalState: { setModal },
    loadingState: { setIsLoading },
  } = useAppContext();
  const htmlContent = document.createElement("p");
  htmlContent.innerHTML = item.content;
  const pureContent = htmlContent.innerText;

  const handleDeleteEvent = async (id) => {
    setIsLoading(true);
    try {
      await deleteEvent(id);
      toast.success("Đã xóa sự kiện");
      setModal({ isOpen: false });
      await loadData();
    } catch (err) {
      toast.error("Xóa thất bại. Hãy thử lại");
    }
    setIsLoading(false);
  };

  const removeEvent = (id) => {
    setModal({
      isOpen: true,
      type: "warning",
      message: "Bạn có chắc chắn muốn xóa sự kiện này ?",
      onConfirm: () => handleDeleteEvent(id),
    });
  };

  return (
    <div>
      <div
        style={{
          padding: "8px 16px",
          marginBottom: "8px",
          borderRadius: "20px",
          backgroundColor: isHighlight ? "royalblue" : "tomato",
          display: "inline-block",
          color: "#fff",
        }}
      >
        {moment(item.time).format("DD/MM/YYYY")}
      </div>
      <div className="d-flex">
        <Link
          to={isHighlight && `highlight/edit/${item._id}`}
          onClick={() => {
            if (!isHighlight) {
              onOpenModal(item);
            }
          }}
          className="flex-grow-1"
        >
          <b style={{ wordBreak: "break-all" }}>
            {isHighlight ? item.title : item.content}
          </b>
        </Link>
        {!isHighlight && (
          <div className="mr-4">
            <DeleteBtn onClick={() => removeEvent(item._id)} />
          </div>
        )}
      </div>
      {isHighlight && (
        <div className="mb-2">{`${pureContent.slice(0, 200)}${
          pureContent.length > 200 ? "..." : ""
        }`}</div>
      )}
    </div>
  );
};

export default SimpleHighlightEvent;
