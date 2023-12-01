import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  UploadOutlined,
  CopyFilled,
  EditFilled,
  IdcardFilled,
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
  width: 200px; // Adjust the size as needed
  margin-left: 30px;
  margin-top: 15px;
  margin-bottom: 30px;
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

/* const menuItems = [
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
  {
    key: "akademisyen/companies",
    icon: <IdcardFilled />,
    label: "Şirketler",
  },
]; */

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
      "akademisyen/internship",
      <IdcardFilled />,
      [
        getItem("Onay Bekleyen Başvurular", "akademisyen/internship/pending"),
        getItem("Geçmiş Başvurular", "akademisyen/internship/past"),
      ]
    ),
    getItem("Yönetici İşlemleri", "akademisyen/admin", <IdcardFilled />, [
      getItem("Yetkilendirme", "akademisyen/admin/authorize"),
      getItem("Tatil Günleri", "akademisyen/admin/holidays"),
    ]),
    getItem(dictionary.companies, "akademisyen/companies", <IdcardFilled />),
    getItem("Aktif Başvurum", "ogrenci/active", <EditFilled />),
    getItem("Geçmiş Başvurularım", "ogrenci/past", <CopyFilled />),
    getItem("Yeni Başvuru", "ogrenci/create", <UploadOutlined />),
  ];
  const filteredMenuItems = items.filter((item) =>
    `${item!.key}`.startsWith(role)
  );

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
      <div style={{ borderTop: "1px solid #424347" }}>
        <Menu
          onClick={({ key }) => {
            if (isMobile) {
              closeSider();
            }
            navigate(key);
          }}
          style={{ padding: "10px" }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[window.location.pathname]}
          items={filteredMenuItems}
        />
      </div>
    </Sider>
  );
};

export default MySider;
