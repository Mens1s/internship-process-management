import React from "react";
import type { ColumnsType } from "antd/es/table";
import { EyeOutlined } from "@ant-design/icons";
import { Text } from "../../../context/LanguageProvider";
import MyButton from "../../../components/Button";

interface DataType {
  key: string;
  name: string;
  startDate: string;
  endDate: string;
  type: string;
}

export const getColumns = (showModal: any) => {
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
        <MyButton
          text={<Text tid="view" />}
          icon={<EyeOutlined />}
          onClick={showModal}
          type="default"
        />
      ),
    },
  ];

  return columns;
};
