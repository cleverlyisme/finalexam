import { useContext } from "react";

import { SidebarContext } from "../contexts/drawer.context";

const useDrawer = () => {
  const context = useContext(SidebarContext);

  return context;
};

export default useDrawer;
