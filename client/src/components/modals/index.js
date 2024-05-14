import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

function ModalContainer({modal, setModal}) {
  const modalInfo = () => {
    switch (modal?.type) {
      case "danger":
        return {
          header: "Lỗi",
          color: "#dc3545",
        };

      case "warning":
        return {
          header: "Cảnh báo",
          color: "#ffc107",
        };

      case "success":
        return {
          header: "Thành công",
          color: "#28a745",
        };

      default:
        return {
          header: "Thông báo",
          color: "#007bff",
        };
    }
  };

  const toggle = () => setModal({ isOpen: !modal.isOpen });

  return (
    <Modal isOpen={modal.isOpen} toggle={toggle} centered>
      <ModalHeader
        toggle={() => setModal({ isOpen: !modal.isOpen })}
        style={{ backgroundColor: modalInfo().color }}
      >
        {modalInfo().header}
      </ModalHeader>

      <ModalBody>{modal?.message}</ModalBody>

      <ModalFooter>
        {modal?.onConfirm && (
          <Button
            color={modal?.type}
            onClick={() => {
              modal?.onConfirm();
              toggle();
            }}
          >
            Xác nhận
          </Button>
        )}
        <Button color="secondary" onClick={toggle}>
          Hủy bỏ
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default ModalContainer;
