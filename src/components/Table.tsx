import React from "react";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";

interface MyTableProps {
  tableProps: {
    columns: ColumnsType<any>; // You can replace `any` with the specific type if needed
    data: any[]; // Replace `any` with the specific type if needed
  };
}

const MyTable: React.FC<MyTableProps> = ({ tableProps }) => {
  return (
    <Table
      columns={tableProps.columns}
      dataSource={tableProps.data}
      sticky={{ offsetHeader: 60 }}
    ></Table>
  );
};

export default MyTable;
