import React from "react";
import AuthContext from "../context/AuthProvider";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }: any) => {
  const location = useLocation();
  const role = localStorage.getItem("role");

  if (allowedRoles.includes(role)) {
    return <Outlet />;
  } else {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }
};

export default RequireAuth;
