import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const RequireAuth = ({ allowedRoles }: any) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedIn = window.localStorage.getItem("isLoggedIn");
    const role = window.localStorage.getItem("role");
    if (loggedIn && allowedRoles.includes(role)) {
      // User is logged in and has the required role
    } else if (loggedIn) {
      // User is logged in but doesn't have the required role
      // Redirect to unauthorized page
      navigate("/unauthorized", { state: { from: location }, replace: true });
    } else {
      // User is not logged in, redirect to login page
      navigate("/ogrenci/login", { replace: true });
    }
    setLoading(false);
  }, [allowedRoles, location]);

  if (loading) {
    // You can render a loading indicator here
    return (
      /*  <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 20,
          height: "100vh", // Full height of the viewport
        }}
      >
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
      </div> */
      <div style={{ marginLeft: 10, marginTop: 10 }}>Yükleniyor...</div>
    );
  }

  return <Outlet />;
};

export default RequireAuth;
