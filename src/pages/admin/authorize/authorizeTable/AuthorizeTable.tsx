import React from "react";
import { Table } from "antd";
/* import { data, columns } from "./AuthorizeTableColumns";
 */

import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { Tag, Button, Modal, Space } from "antd";
import { ExclamationCircleFilled, DeleteFilled } from "@ant-design/icons";

const { confirm } = Modal;

const showDeleteConfirm = () => {
  confirm({
    title: "Bu yöneticiyi kaldırmak istediğinize emin misiniz?",
    icon: <ExclamationCircleFilled />,
    /*     content: "Some descriptions",
     */ okText: "Kaldır",
    okType: "danger",
    cancelText: "Vazgeç",
    onOk() {
      console.log("OK");
    },
    onCancel() {
      console.log("Cancel");
    },
  });
};

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
      <Button
        style={{ display: "flex", alignItems: "center" }}
        onClick={showDeleteConfirm}
        type="primary"
        danger
      >
        <DeleteFilled /> Kaldır
      </Button>
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
