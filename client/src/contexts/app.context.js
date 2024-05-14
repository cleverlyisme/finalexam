import { createContext } from "react";

import Loading from "../components/Loading";
import Modal from "../components/modals";
import useLoading from "../hooks/useLoading";
import useModal from "../hooks/useModal";
import useAuth from "../hooks/useAuth";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const loadingState = useLoading();
  const modalState = useModal();
  const authState = useAuth();

  return (
    <AppContext.Provider value={{ authState, loadingState, modalState }}>
      {children}
      <Loading isLoading={loadingState.isLoading} />
      <Modal modal={modalState.modal} setModal={modalState.setModal} />
    </AppContext.Provider>
  );
};
