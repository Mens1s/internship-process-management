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
const TitleContainer = styled.div``;

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

  return (
    <>
      <Header
        style={{
          padding: "0 20px 0 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",

          top: 0,
          zIndex: 9,
          width: "100%",
          borderBottom: "1px solid lightgray",
          background: "white",
        }}
      >
        <Nav>
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <TitleContainer>
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
