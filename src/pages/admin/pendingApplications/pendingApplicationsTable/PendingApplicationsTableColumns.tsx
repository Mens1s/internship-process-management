import React from "react";
import type { ColumnsType } from "antd/es/table";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { DownloadOutlined, EditOutlined } from "@ant-design/icons";

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
    title: "Company Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Start Date",
    dataIndex: "startDate",
    key: "startDate",
  },
  {
    title: "End Date",
    dataIndex: "endDate",
    key: "endDate",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },

  {
    key: "actions",
    render: (_, record) => (
      <Link to={`/akademisyen/internship/pending/evaluate/${record.key}`}>
        <Button
          style={{ display: "flex", alignItems: "center" }}
          type="primary"
        >
          <EditOutlined /> Değerlendir
        </Button>
      </Link>
    ),
  },
];
