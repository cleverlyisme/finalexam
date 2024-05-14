import Drawer from "rc-drawer";

const MainDrawer = ({ children, drawerOpen, closeDrawer }) => {
  return (
    <Drawer
      open={drawerOpen}
      onClose={closeDrawer}
      handler={false}
      level={null}
      placement="left"
    >
      {children}
    </Drawer>
  );
};

export default MainDrawer;
