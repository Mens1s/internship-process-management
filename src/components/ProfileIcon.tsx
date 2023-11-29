import { Routes, Route, useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import { Text, LanguageContext } from "../context/LanguageProvider";
import React, { useContext, useState } from "react";
import { languageOptions } from "../languages";
import useLanguage from "../hooks/useLanguage";
import { LoginOutlined } from "@ant-design/icons";
import Login from "../pages/login/LoginForm";

const Container = styled.div`
  width: 40px;
  height: 40px;
  background: lightgray;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: gray;
  }
`;

const Flag = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50px;
  background-size: cover;
`;

const ProfileIcon: React.FC = () => {
  const navigate = useNavigate();
  const { userLanguage, userLanguageChange } = useLanguage();
  const [img, setImg] = useState(
    userLanguage === "en" ? "/england_flag.png" : "/turkey_flag.png"
  );
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleLanguageChange = () => {
    // Toggle language and update the image source
    userLanguageChange();
    setImg((prevImg) =>
      prevImg === "/england_flag.png" ? "/turkey_flag.png" : "/england_flag.png"
    );
  };

  const handleLogout = () => {
    // Perform logout actions, such as clearing the token from local storage

    // Redirect the user to the login page
    window.localStorage.removeItem("isLoggedIn");
    window.localStorage.removeItem("token");
    navigate("/login");
  };

  const items: MenuProps["items"] = [
    /*  {
      key: "1",
      label: (
        <Link rel="noopener noreferrer" to="ogrenci/profile">
          Profil
        </Link>
      ),
    }, */
    {
      key: "2",
      label: (
        <div style={{ textAlign: "center" }}>
          <span onClick={handleLanguageChange} style={{ cursor: "pointer" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
                alignItems: "center",
                width: "80px",
              }}
            >
              <Text tid="lang" />
              <Flag style={{ backgroundImage: `url(${img})` }} />
            </div>
          </span>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div style={{ textAlign: "center" }}>
          <span
            onClick={handleLogout}
            style={{ cursor: "pointer", color: "red" }}
          >
            <div
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text tid="signOut" />
              <LoginOutlined />
            </div>
          </span>
        </div>
      ),
    },
  ];

  return (
    <Dropdown
      visible={dropdownVisible}
      onVisibleChange={(visible) => setDropdownVisible(visible)}
      menu={{ items }}
      placement="bottomLeft"
      arrow
      trigger={["click"]}
    >
      <Container>
        <UserOutlined style={{ color: "white", fontSize: "24px" }} />
      </Container>
    </Dropdown>
  );
};

export default ProfileIcon;
