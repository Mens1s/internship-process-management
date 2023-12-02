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
    title: "name",
    dataIndex: "name",
    key: "name",
    width: "120px",
  },
  {
    title: "position",
    dataIndex: "position",
    key: "position",
    width: "120px",
  },
  {
    title: "phoneNumber",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
    width: "120px",
  },
  {
    title: "mail",
    dataIndex: "mail",
    key: "mail",
    width: "120px",
  },
];
