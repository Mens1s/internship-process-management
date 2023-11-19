import React from "react";
import { Tabs } from "antd";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Register from "./RegisterForm";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 300px;
  height: fit-content;
  padding: 30px;
  width: 100%;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
`;

const Header = styled.div`
  display: flex; // Make it a flex container
  flex-direction: column; // Stack items vertically
  align-items: center;
  margin: 20px 0 40px 0;
`;

const LogoImage = styled.img`
  width: 200px; // Adjust the size as needed
  margin-bottom: 40px; // Adjust the spacing between the logo and h2
`;

const items = [
  {
    key: "/ogrenci/register",
    label: "Öğrenci Kayıt",
    render: () => <Register />,
  },
  {
    key: "/akademisyen/register",
    label: "Akademisyen Kayıt",
    render: () => <Register />,
  },
];

const RegisterPage: React.FC = () => {
  const location = useLocation();
  const [activeKey, setActiveKey]: [any, any] = useState(location.pathname);

  useEffect(() => {
    window.history.pushState(null, "", `${activeKey}`);
  }, [activeKey]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Header>
        <LogoImage src="/logo.jpg" alt="Logo" />
        <h2>Staj Başvuru Sistemi</h2>
      </Header>
      <Container>
        <Tabs
          centered={true}
          activeKey={activeKey}
          tabPosition="top"
          animated={{ inkBar: false, tabPane: false }}
          indicatorSize={(origin) => origin}
          items={items.map((tabItem) => ({
            ...tabItem,
            children: tabItem.render(),
          }))}
          onChange={(key: string) => setActiveKey(key)}
        />
      </Container>
    </div>
  );
};

export default RegisterPage;
