import React from "react";

const ListHeader = ({ title, description, btnTitle, setIsOpen }) => {
  return (
    <div className="mt-4 d-flex justify-content-between align-items-center">
      <div>
        <p className="m-0 fw-medium fs-5 lh-1 custom-poppins">{title}</p>
        <p className="fw-normal  font-14 custom-poppins desc-title">
          {description}
        </p>
      </div>

      <button
        onClick={() => setIsOpen(true)}
        type="button"
        class="btn btn-success"
      >
        {btnTitle}
      </button>
    </div>
  );
};

export default ListHeader;
