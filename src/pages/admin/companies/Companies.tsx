import React from "react";
import ContentHeader from "../../../components/ContentHeader";
import { columns } from "./CompaniesTableColumns";
import Table from "../../../components/Table";
import { Input } from "antd";
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
];

const Companies = () => {
  return (
    <div>
      <ContentHeader>
        <h2>Şirket Bilgileri</h2>
        <Input style={{ width: 300 }} placeholder="Şirket ara" />
      </ContentHeader>
      <Table tableProps={{ columns, data }} />
    </div>
  );
};

export default Companies;
