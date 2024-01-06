import React from "react";
import { Tabs } from "antd";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Login from "./renewPasswordForm";
import Register from "../register/RegisterForm";
import { Text } from "src/context/LanguageProvider";
import useLanguage from "src/hooks/useLanguage";
import { Divider } from "antd";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 300px;
  height: fit-content;
  padding: 20px;
  padding-top: 50px;
  width: 100%;
  border-radius: 10px;
  border: 1px solid lightgray;
  position: relative;
  background: white;
`;
const Flag = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50px;
  background-size: cover;
`;

const Navbar = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
  padding: 20px 10px;
  box-sizing: border-box;
  background: white;
  border-bottom: 1px solid lightgray;
  margin-bottom: 20px;
`;

const LogoImage = styled.img`
  width: 200px;
  margin-bottom: 20px;
`;

const RenewPasswordPage: React.FC = () => {
  const location = useLocation();
  const { userLanguage, userLanguageChange } = useLanguage();
  const [img, setImg] = useState(
    userLanguage === "en" ? "/england_flag.png" : "/turkey_flag.png"
  );
  const { dictionary } = useLanguage();
  const [activeKey, setActiveKey]: [any, any] = useState(location.pathname);

  const items = [
    {
      key: "/ogrenci/login",
      label: "Sifre Yenileme",
      render: () => <Login />,
    },
    
  ];

  const handleLanguageChange = () => {
    // Toggle language and update the image source
    userLanguageChange();
    setImg((prevImg) =>
      prevImg === "/england_flag.png" ? "/turkey_flag.png" : "/england_flag.png"
    );
    window.location.reload();
  };

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
        background: "#f7f7f7",
      }}
    >
      <Navbar>
        <LogoImage src="/logo.jpg" alt="Logo" />
        <h2
          className="header"
          style={{
            fontFamily: "roboto",
            textAlign: "center",
            fontSize: "1.2rem",
            marginTop: "10px",
          }}
        >
          {dictionary.internshipManagementSystem}
        </h2>
      </Navbar>

      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            position: "absolute",
            top: 20,
            right: 10,
          }}
        >
          <span onClick={handleLanguageChange} style={{ cursor: "pointer" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 5,
                width: "80px",
              }}
            >
              <Text tid="langShort" />
              <Flag style={{ backgroundImage: `url(${img})` }} />
            </div>
          </span>
        </div>
        <Tabs
          centered={true}
          tabPosition="top"
          animated={{ inkBar: false, tabPane: false }}
          indicatorSize={(origin) => origin}
          items={items.map((tabItem) => ({
            ...tabItem,
            children: tabItem.render(),
          }))}
        />
      </Container>
    </div>
  );
};

export default RenewPasswordPage;
