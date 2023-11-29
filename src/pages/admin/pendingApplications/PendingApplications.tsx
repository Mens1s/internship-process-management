import React from "react";
import Table from "../../../components/Table";
import { columns } from "./pendingApplicationsTable/PendingApplicationsTableColumns";
import ContentHeader from "../../../components/ContentHeader";
import { Button, Input } from "antd";
import { Text } from "../../../context/LanguageProvider";
import { DownloadOutlined, EditOutlined } from "@ant-design/icons";
interface DataType {
  key: string;
  name: string;
  startDate: string;
  endDate: string;
  type: string;
}

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
  {
    key: "4",
    name: "John Brown",
    startDate: "03.07.2023",
    endDate: "03.07.2023",
    type: "Zorunlu",
  },
  {
    key: "5",
    name: "Jim Green",
    startDate: "18.08.2023",
    endDate: "18.08.2023",
    type: "Zorunlu",
  },
  {
    key: "6",
    name: "Joe Black",
    startDate: "05.06.2022",
    endDate: "05.06.2022",
    type: "İsteğe Bağlı",
  },
  {
    key: "7",
    name: "John Brown",
    startDate: "03.07.2023",
    endDate: "03.07.2023",
    type: "Zorunlu",
  },
  {
    key: "8",
    name: "Jim Green",
    startDate: "18.08.2023",
    endDate: "18.08.2023",
    type: "Zorunlu",
  },
  {
    key: "9",
    name: "Joe Black",
    startDate: "05.06.2022",
    endDate: "05.06.2022",
    type: "İsteğe Bağlı",
  },
];

const PastApplications = () => {
  return (
    <div>
      <ContentHeader>
        <h2>
          <Text tid="pendingApplications" />
        </h2>
        <div style={{ display: "flex", gap: 10 }}>
          <Button>
            <DownloadOutlined /> İndir
          </Button>
          <Input style={{ width: "100%" }} placeholder="Öğrenci ara" />
        </div>
      </ContentHeader>
      <Table tableProps={{ columns, data }} />
    </div>
  );
};

export default PastApplications;
