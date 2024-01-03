import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { Text } from "src/context/LanguageProvider";

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
    return (
      <div style={{ marginLeft: 10, marginTop: 10 }}>
        <Text tid="loading" />
        ...
      </div>
    );
  }

  return <Outlet />;
};

export default RequireAuth;
