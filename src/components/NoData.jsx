import React from "react";
import deleteImg from "../assets/deleteImg.png";

const NoData = () => {
  return (
    <>
      <img src={deleteImg} alt="no data" className="mb-3" />
      <h5 className="fw-bold">No Data !</h5>
      {/* <p className="text-muted">
        are you sure you want to delete this item? If you are sure just click on
        delete it.
      </p> */}
    </>
  );
};

export default NoData;
