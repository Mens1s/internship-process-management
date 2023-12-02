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
    title: "startDate",
    dataIndex: "startDate",
    key: "startDate",
    width: "120px",
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
];
