import React, { useState, useEffect } from "react";
import ContentHeader from "src/components/ContentHeader";
import { getColumns } from "./CompaniesTableColumns";
import Table from "src/components/Table";
import { Input, Modal, Skeleton } from "antd";
import useEnhancedColumns from "src/hooks/useEnhancedColumns";
import { Text } from "src/context/LanguageProvider";
import { SearchOutlined } from "@ant-design/icons";
import CompanyDetailsContainer from "./companyDetails/CompanyDetailsContainer";
import styled from "styled-components";
import { Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "src/services/axios";
import CompanyAdd from "./addCompany/AddCompanyForm";
import { API } from "src/config/api";

const StyledButton = styled(Button)`
  @media (max-width: 600px) {
    flex: 1;
  }
`;

const Companies = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAddCompanyModalOpen, setIsAddCompanyModalOpen] = useState(false);

  const handleCancel = () => {
    setIsAddCompanyModalOpen(false);
  };

  const showModal = (record: any) => {
    setSelectedCompany(record);
    setOpen(true);
  };
  const enhancedColumns = useEnhancedColumns(getColumns(showModal));

  const filteredData = data
    .filter((item: any) =>
      item.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map((filteredItem: any, index: any) => ({
      ...filteredItem,
      rowNum: String(index + 1),
      id: filteredItem.id,
    }));

  useEffect(() => {
    setLoading(true);
    axios
      .get(API.COMPANY.GET_ALL)
      .then((response) => {
        const companyList = response.data?.companyList;
        setData(companyList);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <ContentHeader>
        <div>
          <h2>
            <Text tid="companies" />
          </h2>
        </div>
        <div>
          <StyledButton onClick={() => setIsAddCompanyModalOpen(true)}>
            <PlusCircleOutlined /> <Text tid="addCompany" />
          </StyledButton>
          <Modal
            title="Add Company"
            width={1000}
            open={isAddCompanyModalOpen}
            onCancel={handleCancel}
            footer={null}
          >
            <CompanyAdd />
          </Modal>
          <Input
            prefix={<SearchOutlined />}
            placeholder="Şirket ara"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </ContentHeader>
      {loading ? (
        <Skeleton active />
      ) : (
        <Table tableProps={{ columns: enhancedColumns, data: filteredData }} />
      )}

      <Modal
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
        footer={null}
      >
        <CompanyDetailsContainer company={selectedCompany} />
      </Modal>
    </div>
  );
};

export default Companies;
