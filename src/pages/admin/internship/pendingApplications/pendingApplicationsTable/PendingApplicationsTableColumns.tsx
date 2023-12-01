import React from "react";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";
import MyButton from "../../../../../components/Button";
import { Text } from "../../../../../context/LanguageProvider";
interface DataType {
  key: string;
  name: string;
  startDate: string;
  endDate: string;
  type: string;
}

export const columns: ColumnsType<DataType> = [
  {
    dataIndex: "key",
    rowScope: "row",
    width: "70px",
  },
  {
    title: "companyName",
    dataIndex: "name",
    key: "name",
    width: "120px",
  },
  {
    title: "startDate",
    dataIndex: "startDate",
    key: "startDate",
    width: "120px",
    filters: [
      {
        text: "2022-2023",
        value: "Joe",
      },
      {
        text: "2023-2024",
        value: "Category 1",
      },
      {
        text: "2024-2025",
        value: "Category 2",
      },
    ],
    filterSearch: true,
  },
  {
    title: "endDate",
    dataIndex: "endDate",
    key: "endDate",
    width: "120px",
  },
  {
    title: "type",
    dataIndex: "type",
    key: "type",
    width: "120px",
  },

  {
    key: "actions",
    fixed: "right",
    render: (_, record) => (
      <Link to={`/akademisyen/internship/pending/evaluate/${record.key}`}>
        <MyButton
          text={<Text tid="evaluate" />}
          icon={<EditOutlined />}
          type="primary"
        />
      </Link>
    ),
  },
];
