import { RiMenuFold2Line } from "react-icons/ri";

import useDrawer from "../hooks/useDrawer";
import MenuDrawer from "./Drawer/MenuDrawer";

const Layout = ({ children }) => {
  const { drawer, toggleDrawer } = useDrawer();
  const inActive =
    "transitions text-2xl flex-colo hover:bg-white hover:text-main rounded-md px-4 py-3";

  return (
    <div>
      <div className="flex-btn h-full bg-white rounded cursor-pointer overflow-y-scroll flex-grow w-full">
        <MenuDrawer drawerOpen={drawer} toggleDrawer={toggleDrawer} />
      </div>
      <button className={inActive} onClick={toggleDrawer}>
        <RiMenuFold2Line />
      </button>
      {children}
    </div>
  );
};

export default Layout;
