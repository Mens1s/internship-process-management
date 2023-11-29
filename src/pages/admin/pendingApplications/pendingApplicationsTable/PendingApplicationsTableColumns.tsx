import React from "react";
import type { ColumnsType } from "antd/es/table";
import { Button } from "antd";
import { Link } from "react-router-dom";

interface DataType {
  key: string;
  name: string;
  startDate: string;
  endDate: string;
  type: string;
}

export const columns: ColumnsType<DataType> = [
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
      <Link to={`/akademisyen/pending/evaluate/${record.key}`}>
        <Button
          style={{ display: "flex", alignItems: "center" }}
          type="primary"
        >
          Değerlendir
        </Button>
      </Link>
    ),
  },
];
