import { createContext, useMemo, useState } from "react";

export const SidebarContext = createContext();

export const DrawerContext = ({ children }) => {
  const [drawer, setDrawer] = useState(false);

  const toggleDrawer = () => setDrawer(!drawer);
  const value = useMemo(() => ({ drawer, toggleDrawer }), [drawer]);

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};
