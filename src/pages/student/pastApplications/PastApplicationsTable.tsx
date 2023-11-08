import React from "react";
import { Table } from "antd";
import { data, columns } from "./PastApplicationsTableColumns";

const MyTable: React.FC = () => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      sticky={{ offsetHeader: 60 }}
    ></Table>
  );
};

export default MyTable;
