import React from "react";
import type { ColumnsType } from "antd/es/table";

interface DataType {
  key: string;
  name: string;
  startDate: string;
  endDate: string;
  type: string;
}

export const columns: ColumnsType<DataType> = [
  {
    title: "fullName",
    dataIndex: "fullName",
    key: "fullName",
    width: "120px",
  },
  {
    title: "mail",
    dataIndex: "mail",
    key: "mail",
    width: "120px",
  },
  {
    title: "telephone",
    dataIndex: "telephone",
    key: "telephone",
    width: "120px",
  },
  {
    title: "title",
    dataIndex: "title",
    key: "title",
    width: "120px",
  },
  {
    title: "department",
    dataIndex: "department",
    key: "department",
    width: "120px",
  },
];
