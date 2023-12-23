import React from "react";
import AuthContext from "../context/AuthProvider";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }: any) => {
  const location = useLocation();
  const role = localStorage.getItem("role");
  const loggedIn = window.localStorage.getItem("isLoggedIn");

  if (loggedIn && allowedRoles.includes(role)) {
    return <Outlet />;
  } else if (loggedIn) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  } else {
    return <Navigate to="/ogrenci/login" />;
  }
};

export default RequireAuth;
