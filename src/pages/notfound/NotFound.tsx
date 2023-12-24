import React from "react";
import { Button, Result } from "antd";
import { Link, useNavigate, useLocation } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    navigate(-1); // This will navigate back to the previous page
  };

  const login = () => {
    navigate("/login");
  };

  // Check if the URL includes "/unauthorized"
  const isUnauthorized = location.pathname.includes("/unauthorized");

  return (
    <Result
      status={isUnauthorized ? "403" : "404"}
      title={isUnauthorized ? "403" : "404"}
      subTitle={
        isUnauthorized
          ? "Sorry, you don't have authorization to view this page."
          : "Sorry, there is nothing to show. This may be because you are not logged in or entered wrong address."
      }
      extra={
        <div>
          <Button type="default" style={{ marginRight: 5 }} onClick={goBack}>
            Back Home
          </Button>
          <Button type="primary" style={{ marginLeft: 5 }} onClick={login}>
            Log in
          </Button>
        </div>
      }
    />
  );
};

export default NotFound;
