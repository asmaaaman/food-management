import React, { useState } from "react";
import SideBar from "../components/SideBar";
import DashboardNavbar from "../components/DashboardNavbar";
import { Outlet } from "react-router-dom";
import ChangePassword from "../pages/DashboardModule/ChangePassword/ChangePassword";

const DashboardLayout = () => {
  const [collapse, setCollapse] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  return (
    <div className="d-flex min-vh-100">
      <SideBar
        collapse={collapse}
        setCollapse={setCollapse}
        setShowChangePassword={setShowChangePassword}
      />

      <div
        className="w-100"
        style={{
          marginLeft: collapse ? "80px" : "250px",
          transition: "margin 0.3s",
        }}
      >
        <DashboardNavbar />
        <Outlet />
        {showChangePassword && (
          <ChangePassword onClose={() => setShowChangePassword(false)} />
        )}
      </div>
    </div>
  );
};

export default DashboardLayout;
