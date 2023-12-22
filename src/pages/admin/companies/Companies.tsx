import React, { useState } from "react";
import ContentHeader from "src/components/ContentHeader";
import { getColumns } from "./CompaniesTableColumns";
import Table from "src/components/Table";
import { Input, Modal } from "antd";
import useEnhancedColumns from "src/hooks/useEnhancedColumns";
import { Text } from "src/context/LanguageProvider";
import { SearchOutlined } from "@ant-design/icons";
import CompanyDetailsContainer from "./companyDetails/CompanyDetailsContainer";
import styled from "styled-components";
import { Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const StyledButton = styled(Button)`
  @media (max-width: 600px) {
    flex: 1;
  }
`;
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
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [id, setId] = useState(null);

  const showModal = (record: any) => {
    setId(record.name);
    setOpen(true);
  };
  const enhancedColumns = useEnhancedColumns(getColumns(showModal));

  const filteredData = data
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map((filteredItem, index) => ({
      ...filteredItem,
      rowNum: String(index + 1),
    }));

    const handleNewCompanyAdd = () => {
      navigate("/ogrenci/companies/new");
    };

  return (
    <div>
      <ContentHeader>
        <div>
          <h2>
            <Text tid="companies" />
          </h2>
        </div>
        <div>
          <StyledButton onClick={handleNewCompanyAdd}>
            <PlusCircleOutlined /> <Text tid="addCompany" />
          </StyledButton>
          <Input
            prefix={<SearchOutlined />}
            placeholder="Şirket ara"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </ContentHeader>
      <Table tableProps={{ columns: enhancedColumns, data: filteredData }} />

      <Modal
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
        footer={null}
      >
        <CompanyDetailsContainer id={id} />
      </Modal>
    </div>
  );
};

export default Companies;
