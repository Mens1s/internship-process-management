import React from "react";
import { Table } from "antd";
/* import { data, columns } from "./AuthorizeTableColumns";
 */

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

const columns: ColumnsType<DataType> = [
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
    title: "Actions",
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

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    startDate: "03.07.2023",
    endDate: "03.07.2023",
    type: "Zorunlu",
  },
  {
    key: "2",
    name: "Jim Green",
    startDate: "18.08.2023",
    endDate: "18.08.2023",
    type: "Zorunlu",
  },
  {
    key: "3",
    name: "Joe Black",
    startDate: "05.06.2022",
    endDate: "05.06.2022",
    type: "İsteğe Bağlı",
  },
];
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
