import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = ({ loader, text }) => {
  return (
    <div>
      {loader && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "60vh" }}
        >
          <Spinner animation="border" variant="success" role="status" />
          <span className="ms-2">{text || "Loading"}</span>
        </div>
      )}
    </div>
  );
};

export default Loader;
