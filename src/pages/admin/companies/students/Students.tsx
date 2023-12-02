import React, { useState } from "react";
import ContentHeader from "../../../../components/ContentHeader";
import MyTable from "../../../../components/Table";
import { columns } from "./StudentsTableColumns";
import { DownloadOutlined } from "@ant-design/icons";
import { Text } from "../../../../context/LanguageProvider";
import { Button, Input } from "antd";
import useLanguage from "../../../../hooks/useLanguage";
interface DataType {
  key?: string;
  name: string;
  startDate: string;
  endDate: string;
  type: string;
}
const data: DataType[] = [
  {
    name: "Joe Black",
    startDate: "05.06.2022",
    endDate: "05.06.2022",
    type: "İsteğe Bağlı",
  },
  {
    name: "John Brown",
    startDate: "03.07.2023",
    endDate: "03.07.2023",
    type: "Zorunlu",
  },
  {
    name: "Jim Green",
    startDate: "18.08.2023",
    endDate: "18.08.2023",
    type: "Zorunlu",
  },
  {
    name: "Joe Black",
    startDate: "05.06.2022",
    endDate: "05.06.2022",
    type: "İsteğe Bağlı",
  },
];

const Students = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { dictionary } = useLanguage();

  const filteredData = data
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map((filteredItem, index) => ({
      ...filteredItem,
      key: String(index + 1),
    }));

  return (
    <div>
      <ContentHeader>
        <h2>Staj Bilgileri</h2>
        <div style={{ display: "flex", gap: 10 }}>
          <Button>
            <DownloadOutlined /> <Text tid="download" />
          </Button>
          <Input
            style={{ width: "100%" }}
            placeholder={dictionary.searchStudent}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </ContentHeader>
      <MyTable tableProps={{ columns, data: filteredData }}></MyTable>
    </div>
  );
};

export default Students;
