import React from "react";
import { Outlet } from "react-router-dom";
import logo from "../assets/logo.png";

const AuthLayout = () => {
  return (
    <div className="auth-container vh-100 d-flex justify-content-center align-items-center">
      <div className="auth-box row w-100">
        <div className="col-md-8 offset-md-3">
          <div className="bg-white p-5 rounded shadow ">
            <div className="text-center">
              <img src={logo} alt="logo" className="mb-4 w-75" />
            </div>

            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
