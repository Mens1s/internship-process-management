import React from "react";
import { Tabs } from "antd";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Register from "./RegisterForm";
import useLanguage from "src/hooks/useLanguage";
import { Text } from "src/context/LanguageProvider";

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
  margin-bottom: 20px;
`;

const Navbar = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
  padding: 20px 10px 10px 10px;
  box-sizing: border-box;
  background: white;
  border-bottom: 1px solid lightgray;
  margin-bottom: 20px;
`;

const LogoImage = styled.img`
  width: 200px; // Adjust the size as needed
  margin-bottom: 40px; // Adjust the spacing between the logo and h2
`;

const Flag = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50px;
  background-size: cover;
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
  const { dictionary } = useLanguage();
  const { userLanguage, userLanguageChange } = useLanguage();
  const [img, setImg] = useState(
    userLanguage === "en" ? "/england_flag.png" : "/turkey_flag.png"
  );

  const handleLanguageChange = () => {
    // Toggle language and update the image source
    userLanguageChange();
    setImg((prevImg) =>
      prevImg === "/england_flag.png" ? "/turkey_flag.png" : "/england_flag.png"
    );
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
                gap: 10,
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
          activeKey={activeKey}
          tabPosition="top"
          animated={{ inkBar: false, tabPane: false }}
          indicatorSize={(origin) => origin}
          items={items.map((tabItem) => ({
            ...tabItem,
            children: tabItem.render(),
          }))}
          onChange={(key: string) => {
            setActiveKey(key);
          }}
        />
      </Container>
    </div>
  );
};

export default RegisterPage;
