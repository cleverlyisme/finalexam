import { useState } from "react";

const useModal = () => {
  const [modal, setModal] = useState({
    isOpen: false,
  });

  return {
    modal,
    setModal,
  };
};

export default useModal;
