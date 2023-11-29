import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { Tag, Button, Modal } from "antd";
import { ExclamationCircleFilled, DeleteFilled } from "@ant-design/icons";

const { confirm } = Modal;

console.log(window.innerWidth);

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
  surname: string;
  mail: string;
  department: string;
}

export const columns: ColumnsType<DataType> = [
  {
    dataIndex: "key",
    rowScope: "row",
    width: "70px",
  },
  {
    title: "İsim",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Soyisim",
    dataIndex: "surname",
    key: "surname",
  },

  {
    title: "Mail",
    dataIndex: "mail",
    key: "mail",
  },
  {
    title: "Departman",
    dataIndex: "department",
    key: "department",
  },
  {
    key: "actions",
    fixed: "right",
    render: (_, record) => (
      <Button
        style={{ display: "flex", alignItems: "center" }}
        type="primary"
        onClick={showDeleteConfirm}
        danger
      >
        <DeleteFilled /> Kaldır
      </Button>
    ),
  },
];
