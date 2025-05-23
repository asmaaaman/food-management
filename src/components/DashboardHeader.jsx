import React from "react";

const DashboardHeader = ({ header, title, description, headerImg }) => {
  return (
    <div
      className="bg-success text-white rounded-4
     m-3 p-3 d-flex justify-content-between align-items-center"
    >
      <div>
        <h2>
          <span className=" text-white">{header || "Users"}</span>{" "}
          <span className="fs-5 text-light">{title || "List"}</span>
        </h2>
        <p className="text-light">
          {description || "This is a description of the dashboard."}
        </p>
      </div>
      <div>
        <img
          src={headerImg}
          alt="Recipes illustration"
          style={{ maxWidth: "250px", height: "auto" }}
        />
      </div>
    </div>
  );
};

export default DashboardHeader;
