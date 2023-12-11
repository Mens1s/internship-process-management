import React from "react";
import { Table } from "antd";
import { columns } from "./PastApplicationsTableColumns";

const MyTable: React.FC = () => {
  return <Table columns={columns} sticky={{ offsetHeader: 80 }}></Table>;
};

export default MyTable;
