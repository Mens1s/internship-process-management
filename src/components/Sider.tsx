import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  UploadOutlined,
  CopyFilled,
  EditFilled,
  IdcardFilled,
  SettingFilled,
  SnippetsFilled,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import type { MenuProps } from "antd";
import UseLanguage from "../hooks/useLanguage";
import styled from "styled-components";
const { Sider } = Layout;
type MenuItem = Required<MenuProps>["items"][number];

interface MySiderProps {
  collapsed: boolean;
  isMobile: boolean;
  closeSider: any;
}

const LogoImage = styled.img`
  width: 170px; // Adjust the size as needed
  margin-left: 45px;
  margin-top: 20px;
  margin-bottom: 30px;
`;
const MenuWrapper = styled.div`
  border-top: 1px solid #424347;

  .ant-menu-item-selected {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .ant-menu {
    padding: 10px 5px 0 5px;
    background: transparent !important;
  }
`;

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const MySider: React.FC<MySiderProps> = ({
  collapsed,
  isMobile,
  closeSider,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.pathname.split("/")[1];

  const { dictionary } = UseLanguage();

  const items: MenuItem[] = [
    getItem(
      dictionary.internshipProcedures,
      "akademisyen/internships",
      <SnippetsFilled />,
      [
        getItem(
          dictionary.pendingApplications,
          "akademisyen/internships/pending"
        ),
        getItem("Aktif Stajlar", "akademisyen/internships/active"),
      ]
    ),
    getItem(
      dictionary.adminOperations,
      "akademisyen/admin",
      <SettingFilled />,
      [
        getItem(dictionary.authorization, "akademisyen/admin/authorize"),
        getItem(dictionary.holidays, "akademisyen/admin/holidays"),
      ]
    ),
    getItem(dictionary.companies, "akademisyen/companies", <IdcardFilled />),
    getItem(dictionary.myApplications, "ogrenci/past", <CopyFilled />),
    getItem(dictionary.internshipGuidelines, "ogrenci/", <CopyFilled />),
  ];
  const filteredMenuItems = items.filter((item) => {
    const mail = window.localStorage.getItem("mail");
    if (`${item!.key}`.includes("admin") && mail === "admin@admin.com") {
      return `${item!.key}`.startsWith(role);
    } else if (!`${item!.key}`.includes("admin")) {
      return `${item!.key}`.startsWith(role);
    }
  });

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      collapsedWidth={0}
      width={260}
      style={{
        height: "100vh",
        position: isMobile ? "fixed" : "sticky",
        top: 0,
        left: 0,
        zIndex: "100",
      }}
    >
      <LogoImage src="/gtu_logo.svg" alt="Logo" />
      <MenuWrapper>
        <Menu
          onClick={({ key }) => {
            if (isMobile) {
              closeSider();
            }
            navigate(key);
          }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[window.location.pathname]}
          items={filteredMenuItems}
        />
      </MenuWrapper>
    </Sider>
  );
};

export default MySider;
