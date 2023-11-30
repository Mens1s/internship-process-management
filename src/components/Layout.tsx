import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Layout, theme } from "antd";
import ActiveApplication from "../pages/student/activeApplication/ActiveApplication";
import CreateApplication from "../pages/student/createApplication/CreateApplicationForm";
import PastApplications from "../pages/student/pastApplications/PastApplications";
import PendingApplications from "../pages/admin/pendingApplications/PendingApplications";
import PendingApplicationsEvaluate from "../pages/admin/pendingApplications/pendingApplicationsEvaluate/PendingApplicationsEvaluate";
import Authorize from "../pages/admin/authorize/Authorize";
import PastApplicationDetail from "../pages/student/pastApplications/pastApplicationsDetail/PastApplicationDetail";
import Header from "../components/Header";
import Sider from "../components/Sider";
import { Outlet } from "react-router-dom";
import Warning from "./Warning";

const { Content } = Layout;

const MyLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
        setShowOverlay(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call it once to set the initial state

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSider = () => {
    setCollapsed(!collapsed);
    setShowOverlay(isMobile);
  };

  const closeSider = () => {
    setCollapsed(true);
    setShowOverlay(false);
  };

  return (
    <Layout>
      {showOverlay && (
        <div
          onClick={closeSider}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 99,
            transition: "0.3s",
          }}
        />
      )}
      <Sider collapsed={collapsed} isMobile={isMobile} />
      <Layout>
        <Header collapsed={collapsed} setCollapsed={toggleSider} />
        <Warning type="success">
          Bir adet onaylanmış stajınız bulunmaktadır
        </Warning>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: 30,
            position: "relative",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MyLayout;
