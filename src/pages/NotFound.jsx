import React from "react";
import imgLogo from "../assets/logo.png";
import notFoundImg from "../assets/notFound.png";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="container-fluid min-vh-100 d-flex flex-column">
        <header className="p-4">
          <img src={imgLogo} alt="logo" style={{ height: 60 }} />
        </header>

        <div className="row flex-grow-1 align-items-center">
          <div className="col-md-6 text-center text-md-start p-5">
            <h1 className="fw-bold display-4">Oops.</h1>
            <h2 className="fw-bold" style={{ color: "#1dbf73" }}>
              Page not found
            </h2>
            <p className="text-muted mt-3 mb-4">
              This page doesn’t exist or was removed! <br />
              We suggest you go back to home.
            </p>
            <button
              onClick={() => navigate("/dashboard")}
              className="btn btn-success px-4 py-2 rounded-pill"
            >
              ← Back To Home
            </button>
          </div>

          <div className="col-md-6 d-flex justify-content-center p-0">
            <img src={notFoundImg} className="img-fluid" alt="404 robot" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
