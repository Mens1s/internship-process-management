import React, { useState, useEffect } from "react";
import Table from "../../../../components/Table";
import { columns } from "./pendingApplicationsTable/PendingApplicationsTableColumns";
import ContentHeader from "../../../../components/ContentHeader";
import { Button, Input } from "antd";
import { Text } from "../../../../context/LanguageProvider";
import { DownloadOutlined } from "@ant-design/icons";
import useLanguage from "../../../../hooks/useLanguage";
import useEnhancedColumns from "../../../../hooks/useEnhancedColumns";
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
  const { dictionary } = useLanguage();
  const enhancedColumns = useEnhancedColumns(columns);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <ContentHeader>
        <h2>
          <Text tid="pendingApplications" />
        </h2>
        <div style={{ display: "flex", gap: 10 }}>
          <Button>
            <DownloadOutlined /> <Text tid="download" />
          </Button>

          <Input
            style={{ width: 300 }}
            placeholder={dictionary.searchStudent}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </ContentHeader>
      <Table tableProps={{ columns: enhancedColumns, data: filteredData }} />
    </div>
  );
};

export default PastApplications;
