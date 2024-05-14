import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { IoClose } from "react-icons/io5";
import { BsCollectionPlay } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BiPhoneCall } from "react-icons/bi";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";

import useAppContext from "../../hooks/useAppContext";
import MainDrawer from "./MainDrawer";

const MenuDrawer = ({ drawerOpen, toggleDrawer }) => {
  const navigate = useNavigate();
  const {
    authState: { user, signOut },
    loadingState: { setIsLoading },
  } = useAppContext();

  const active = "bg-dry text-subMain";
  const hover = "hover:bg-dry";
  const inActive =
    "rounded sm:gap-10 font-medium text-sm transitions flex gap-6 items-center sm:px-8 px-4 py-4 items-center";
  const Hover = ({ isActive }) =>
    isActive ? `${active} ${inActive}` : `${inActive} ${hover}`;

  const navs = (() => {
    switch (user?.role) {
      case "teacher":
        return [
          {
            name: "Thông tin tài khoản",
            link: "/profile",
            icon: BsCollectionPlay,
          },
          {
            name: "Điểm danh học sinh",
            link: "/student-attendance",
            icon: HiOutlineUserGroup,
          },
          {
            name: "Liên hệ",
            link: "/contact-us",
            icon: BiPhoneCall,
          },
        ];
      case "admin":
        return [
          {
            name: "Thông tin tài khoản",
            link: "/profile",
            icon: BsCollectionPlay,
          },
          {
            name: "Quản lý học sinh",
            link: "/about-us",
            icon: HiOutlineUserGroup,
          },
          {
            name: "Quản lý giáo viên",
            link: "/about-us",
            icon: HiOutlineUserGroup,
          },
          {
            name: "Liên hệ",
            link: "/contact-us",
            icon: BiPhoneCall,
          },
        ];
      default:
        return [
          {
            name: "Thông tin tài khoản",
            link: "/profile",
            icon: BsCollectionPlay,
          },
          {
            name: "Thông tin học sinh",
            link: "/about-us",
            icon: HiOutlineUserGroup,
          },
          {
            name: "Liên hệ",
            link: "/contact-us",
            icon: BiPhoneCall,
          },
        ];
    }
  })();

  const infors = [
    {
      icon: FaFacebook,
      link: "https://www.facebook.com/imcleverly",
    },
    {
      icon: FaGithub,
      link: "https://www.github.com/imcleverly",
    },
    {
      icon: FaLinkedin,
      link: "https://www.linkedin.com/in/tuananhdaodevjs",
    },
  ];

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      signOut();

      toast.success("Đã đăng xuất khỏi tài khoản");
      navigate("/");
    } catch (err) {
      toast.error(err?.response?.data);
    }
    setIsLoading(false);
  };

  return (
    <MainDrawer drawerOpen={drawerOpen} closeDrawer={toggleDrawer}>
      <div className="flex flex-col w-full h-full justify-between items-center bg-main text-white rounded">
        <div className="w-full flex justify-end h-16 p-4 bg-dry">
          <button
            onClick={toggleDrawer}
            type="button"
            className="
              transitions w-6 h-8 flex-colo text-base text-black bg-white rounded-full hover:bg-subMain hover:text-slate-400 justify-self-end 
              "
          >
            <IoClose />
          </button>
        </div>
        <div>
          <Link onClick={toggleDrawer} to="/">
            <img
              src="/logo.png"
              alt="logo"
              className="w-12 h-12 object-contain"
            />
          </Link>
        </div>
        {/* menu links */}
        <div className="w-full flex-grow max-height-full">
          <div className="pb-12 pt-4">
            {navs.map((link, index) => (
              <NavLink
                to={link.link}
                key={index}
                onClick={toggleDrawer}
                className={Hover}
              >
                <link.icon className="text-lg" /> {link.name}
              </NavLink>
            ))}
            <NavLink to={"/"} onClick={handleSignOut} className={Hover}>
              <CiLogout className="text-lg" /> Đăng xuất
            </NavLink>
          </div>
          <div className="flex-rows gap-6 w-full">
            {infors.map((infor, index) => (
              <a
                href={infor.link}
                key={index}
                target="_blank"
                rel="noreferrer"
                className="flex-colo w-12 h-12 transitions hover:bg-subMain text-lg bg-white rounded bg-opacity-30"
              >
                <infor.icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </MainDrawer>
  );
};

export default MenuDrawer;
