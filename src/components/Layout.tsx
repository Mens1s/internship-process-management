import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, theme } from "antd";
import Header from "../components/Header";
import Sider from "../components/Sider";
import { Outlet } from "react-router-dom";
import Warning from "./Warning";

const { Content } = Layout;

const MyLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(window.innerWidth <= 768);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCollapsed(true);
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
  };

  const closeSider = () => {
    setCollapsed(true);
  };

  return (
    <Layout>
      {!collapsed && isMobile && (
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
          }}
        />
      )}
      <Sider
        collapsed={collapsed}
        isMobile={isMobile}
        closeSider={closeSider}
      />
      <Layout>
        <Header collapsed={collapsed} setCollapsed={toggleSider} />
        <div style={{ position: "sticky", top: "64px", zIndex: "9" }}>
          <Warning type="success">
            Bir adet onaylanmış stajınız bulunmaktadır
          </Warning>
          {/*   <Warning type="danger">
            Bir adet reddedilmiş stajınız bulunmaktadır
          </Warning> */}
        </div>
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
