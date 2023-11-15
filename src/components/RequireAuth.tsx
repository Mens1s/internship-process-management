import React from "react";
import AuthContext from "../context/AuthProvider";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }: any) => {
  const { auth }: any = useAuth();
  const location = useLocation();

  return allowedRoles.includes(auth?.role) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
