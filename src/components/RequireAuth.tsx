import React from "react";
import AuthContext from "../context/AuthProvider";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles, loggedIn }: any) => {
  const { auth }: any = useAuth();
  const location = useLocation();

  if (loggedIn /* && allowedRoles.includes(auth?.role) */) {
    return <Outlet />;
  } else if (loggedIn && auth?.user) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default RequireAuth;
