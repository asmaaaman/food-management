import React from "react";
import { BiCategory } from "react-icons/bi";
import { CiLogout } from "react-icons/ci";
import { FaRegCalendarAlt, FaUser } from "react-icons/fa";
import { FaUnlockKeyhole } from "react-icons/fa6";
import { HiHome } from "react-icons/hi";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import sideBarLogo from "../assets/sideBarLogo.png";

const SideBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const [collapse, setCollapse] = React.useState(false);
  const handleCollapse = () => {
    setCollapse(!collapse);
  };
  const menuItems = [
    { title: "Home", icon: <HiHome />, to: "/dashboard" },
    { title: "Users", icon: <FaUser />, to: "/dashboard/users" },
    { title: "Recipes", icon: <BiCategory />, to: "/dashboard/recipes" },

    {
      title: "Categories",
      icon: <FaRegCalendarAlt />,
      to: "/dashboard/categories",
    },
    {
      title: "Change Password",
      icon: <FaUnlockKeyhole />,
      to: "/dashboard/change-password",
    },
  ];
  return (
    <div className="sidebar-container  h-100 ">
      <Sidebar className="position-relative h-100 " collapsed={collapse}>
        <Menu>
          <img
            onClick={handleCollapse}
            className={`mt-4 cursor-pointer ${collapse ? "w-100" : "w-75"}`}
            src={sideBarLogo}
            alt="side-bar-logo"
          />

          <div className="mt-4">
            {menuItems.map((item, index) => (
              <MenuItem
                component={<Link to={item.to} />}
                key={index}
                icon={item.icon}
                className={currentPath === item.to ? "active" : ""}
              >
                {item.title}
              </MenuItem>
            ))}
          </div>

          <MenuItem
            icon={<CiLogout />}
            // onClick={() => {
            //   logOut();
            //   navigate("/login");
            // }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SideBar;
