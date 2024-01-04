import React from "react";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";

interface MyTableProps {
  tableProps?: {
    columns: ColumnsType<any>; // You can replace `any` with the specific type if needed
    data: any[];
    loading?: boolean;
  };
}

const MyTable: React.FC<MyTableProps> = ({ tableProps }) => {
  return (
    <Table
      columns={tableProps?.columns}
      dataSource={tableProps?.data}
      sticky={{ offsetHeader: 80 }}
      scroll={{ x: 600 }}
      pagination={{ pageSize: 20, hideOnSinglePage: true }}
      size="middle"
      loading={tableProps?.loading}
    />
  );
};

export default MyTable;
