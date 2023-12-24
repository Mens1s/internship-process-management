import React, { useState } from "react";
import styled from "styled-components";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MenuOutlined,
  BellFilled,
} from "@ant-design/icons";
import { Layout, Button, Drawer, theme } from "antd";
import ProfileIcon from "./ProfileIcon";
import Breadcrumb from "./Breadcrumb";
import useLanguage from "../hooks/useLanguage";
import { useLocation } from "react-router-dom";

const { Header } = Layout;

const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
const Nav = styled.div`
  display: flex;
  align-items: center;
`;
const TitleContainer = styled.div`
  h1 {
    font-size: 16px;
    font-weight: 500;
  }
`;

const NotificationIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  * {
    transition: 0.2s;
    &:hover {
      color: gray;
    }
  }
`;

interface MyHeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const MyHeader: React.FC<MyHeaderProps> = ({ collapsed, setCollapsed }) => {
  const [open, setOpen] = useState(false);
  const { dictionary } = useLanguage();

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  let title;
  const location = useLocation();
  const { pathname } = location;
  if (pathname.split("/").includes("internship")) {
    title = "Staj İşlemleri";
  } else if (pathname.split("/").includes("admin")) {
    title = "Yönetici İşlemleri";
  } else if (pathname.split("/").includes("companies")) {
    title = "Şirketler";
  } else if (pathname.split("/").includes("past")) {
    title = "Başvurularım";
  } else {
    title = "Ana Sayfa";
  }
  return (
    <>
      <Header
        style={{
          padding: "0 20px 0 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          height: 80,
          top: 0,
          zIndex: 9,
          width: "100%",
          borderBottom: "1px solid lightgray",
          background: "white",
          lineHeight: "1.2rem",
        }}
      >
        <Nav>
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 50,
              height: 50,
              marginLeft: 10,
              marginRight: 10,
            }}
          />
          <TitleContainer>
            <h1>{title}</h1>
            <Breadcrumb />
          </TitleContainer>
        </Nav>
        <ActionButtons>
          <NotificationIcon onClick={showDrawer}>
            <BellFilled style={{ fontSize: "24px", color: "lightgray" }} />
          </NotificationIcon>
          <ProfileIcon />
        </ActionButtons>
      </Header>
      <Drawer
        title={dictionary.announcements}
        placement="right"
        onClose={onClose}
        open={open}
      ></Drawer>
    </>
  );
};

export default MyHeader;
