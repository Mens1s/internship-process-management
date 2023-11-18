import React from "react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";

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

const ProfileIcon: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout actions, such as clearing the token from local storage

    // Redirect the user to the login page
    window.localStorage.removeItem("isLoggedIn");
    window.localStorage.removeItem("token");
    navigate("/login");
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link rel="noopener noreferrer" to="ogrenci/profile">
          Profil
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        // Call the handleLogout function when the user clicks on "Çıkış Yap"
        <span onClick={handleLogout} style={{ cursor: "pointer" }}>
          Çıkış Yap
        </span>
      ),
    },
  ];

  return (
    <Dropdown menu={{ items }} placement="bottomLeft" arrow trigger={["click"]}>
      <Container>
        <UserOutlined style={{ color: "white", fontSize: "24px" }} />
      </Container>
    </Dropdown>
  );
};

export default ProfileIcon;
