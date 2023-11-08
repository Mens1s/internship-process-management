import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  UploadOutlined,
  CopyFilled,
  EditFilled,
  IdcardFilled,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";

import styled from "styled-components";
const { Sider } = Layout;

interface MySiderProps {
  collapsed: boolean;
}

const LogoImage = styled.img`
  width: 200px; // Adjust the size as needed
  margin-left: 30px;
  margin-top: 15px;
`;

const menuItems = [
  {
    key: "ogrenci/active",
    icon: <EditFilled />,
    label: "Aktif Başvurum",
  },
  {
    key: "ogrenci/past",
    icon: <CopyFilled />,
    label: "Geçmiş Başvurularım",
  },
  {
    key: "ogrenci/create",
    icon: <UploadOutlined />,
    label: "Yeni Başvuru",
  },
  {
    key: "akademisyen/pending",
    icon: <IdcardFilled />,
    label: "Onay Bekleyen Başvurular",
  },
  {
    key: "akademisyen/authorize",
    icon: <IdcardFilled />,
    label: "Yetkilendir",
  },
];

const MySider: React.FC<MySiderProps> = ({ collapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.pathname.split("/")[1]; // Extract the role from the path

  // Filter menu items based on the role
  const filteredMenuItems = menuItems.filter((item) =>
    item.key.startsWith(role)
  );

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      collapsedWidth={0}
      width={260}
      style={{ height: "100vh", position: "sticky", top: 0, left: 0 }}
    >
      <LogoImage src="/logo.jpg" alt="Logo" />

      <Menu
        onClick={({ key }) => {
          navigate(key);
        }}
        style={{ padding: "10px" }}
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[window.location.pathname]}
        items={filteredMenuItems.map((item) => ({
          ...item,
          key: `/${item.key}`, // Ensure the key starts with "/"
        }))}
      />
    </Sider>
  );
};

export default MySider;
