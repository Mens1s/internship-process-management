import React, { useState } from "react";
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
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link rel="noopener noreferrer" to="/">
          Profil
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link rel="noopener noreferrer" to="/login">
          Çıkış Yap
        </Link>
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
