import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
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

const { Content } = Layout;

const MyLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Sider collapsed={collapsed} />
      <Layout>
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: 30,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MyLayout;
