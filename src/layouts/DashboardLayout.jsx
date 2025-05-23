import React from "react";
import SideBar from "../components/SideBar";
import DashboardNavbar from "../components/DashboardNavbar";
import { Outlet } from "react-router-dom";
import DashboardHeader from "../components/DashboardHeader";

const DashboardLayout = () => {
  return (
    <div className="d-flex min-vh-100">
      <div>
        <SideBar />
      </div>

      <div className="w-100">
        <DashboardNavbar />

        <div className="flex-grow-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
