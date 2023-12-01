import React from "react";
import type { ColumnsType } from "antd/es/table";
import { MoreOutlined } from "@ant-design/icons";
import { Text } from "../../../context/LanguageProvider";
import MyButton from "../../../components/Button";
import { Dropdown, Space } from "antd";
import type { MenuProps } from "antd";
import { Link } from "react-router-dom";

interface DataType {
  key: string;
  name: string;
  startDate: string;
  endDate: string;
  type: string;
}

export const getColumns = (showModal: any) => {
  const items: MenuProps["items"] = [
    {
      label: <Link to="internships">Öğrencileri Gör</Link>,
      key: "0",
    },
    {
      label: <span onClick={showModal}>Şirket Bilgileri</span>,
      key: "1",
    },
  ];
  const columns: ColumnsType<DataType> = [
    {
      dataIndex: "key",
      rowScope: "row",
      width: "70px",
    },
    {
      title: "companyName",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "startDate",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "endDate",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "type",
      dataIndex: "type",
      key: "type",
    },
    {
      key: "actions",
      fixed: "right",
      render: (_, record) => (
        <Dropdown menu={{ items }} placement="bottomRight" trigger={["hover"]}>
          <MyButton icon={<MoreOutlined />} type="default" />
        </Dropdown>
      ),
    },
  ];

  return columns;
};
