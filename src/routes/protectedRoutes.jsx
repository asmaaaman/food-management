import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children, token }) => {
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoutes;
