import React, { useState } from "react";
import ContentHeader from "../../../components/ContentHeader";
import { getColumns } from "./CompaniesTableColumns";
import Table from "../../../components/Table";
import { Input, Modal } from "antd";
import useEnhancedColumns from "../../../hooks/useEnhancedColumns";
import { Text } from "../../../context/LanguageProvider";
import { SearchOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";

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
    name: "Turkcell",
    startDate: "03.07.2023",
    endDate: "03.07.2023",
    type: "Zorunlu",
  },
  {
    key: "2",
    name: "Aselsan",
    startDate: "18.08.2023",
    endDate: "18.08.2023",
    type: "Zorunlu",
  },
  {
    key: "3",
    name: "OBSS",
    startDate: "05.06.2022",
    endDate: "05.06.2022",
    type: "İsteğe Bağlı",
  },
  {
    key: "4",
    name: "Vakıfbank",
    startDate: "03.07.2023",
    endDate: "03.07.2023",
    type: "Zorunlu",
  },
  {
    key: "5",
    name: "Baykar",
    startDate: "18.08.2023",
    endDate: "18.08.2023",
    type: "Zorunlu",
  },
  {
    key: "6",
    name: "Turk Telekom",
    startDate: "05.06.2022",
    endDate: "05.06.2022",
    type: "İsteğe Bağlı",
  },
];

const Companies = () => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const showModal = () => setOpen(true);
  const enhancedColumns = useEnhancedColumns(getColumns(showModal));

  const filteredData = data
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map((filteredItem, index) => ({
      ...filteredItem,
      rowNum: String(index + 1),
    }));

  return (
    <div>
      <ContentHeader>
        <h2>
          <Text tid="companies" />
        </h2>
        <Input
          prefix={<SearchOutlined />}
          style={{ width: 300 }}
          placeholder="Şirket ara"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </ContentHeader>
      <Table tableProps={{ columns: enhancedColumns, data: filteredData }} />

      <Modal
        title="Company Details"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
        footer={null}
      >
        <div style={{ height: "400px" }}></div>
      </Modal>
    </div>
  );
};

export default Companies;
