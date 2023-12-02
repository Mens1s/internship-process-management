import type { ColumnsType } from "antd/es/table";
import { Modal } from "antd";
import { ExclamationCircleFilled, DeleteFilled } from "@ant-design/icons";
import MyButton from "src/components/Button";
import { Text } from "src/context/LanguageProvider";
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
    title: "name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "surname",
    dataIndex: "surname",
    key: "surname",
  },

  {
    title: "mail",
    dataIndex: "mail",
    key: "mail",
  },
  {
    title: "department",
    dataIndex: "department",
    key: "department",
  },
  {
    key: "actions",
    fixed: "right",
    render: (_, record) => (
      <MyButton
        text={<Text tid="remove" />}
        icon={<DeleteFilled />}
        onClick={showDeleteConfirm}
        type="primary"
        danger
      />
    ),
  },
];
