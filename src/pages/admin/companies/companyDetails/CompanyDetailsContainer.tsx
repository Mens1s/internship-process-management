import React, { useEffect, useState } from "react";
import ContentHeader from "src/components/ContentHeader";
import { Descriptions, message, Form } from "antd";
import type { DescriptionsProps } from "antd";
import styled from "styled-components";
import UseLanguage from "src/hooks/useLanguage";
import axios from "src/services/axios";
import { API } from "src/config/api";
import getAxiosConfig from "src/config/axiosConfig";
import { columns } from "./companyDetailsTableColumns";
import useEnhancedColumns from "src/hooks/useEnhancedColumns";
import Table from "src/components/Table";
import { Text } from "src/context/LanguageProvider";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const CompanyDetailsContainer = ({ company }: any) => {
  const { dictionary } = UseLanguage();
  const enhancedColumns = useEnhancedColumns(columns);
  const [companyStaff, setCompanyStaff] = useState([]);
  const [loading, setLoading] = useState(false);

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: dictionary.companyName,
      children: company.companyName,
    },
    {
      key: "2",
      label: dictionary.phoneNumber,
      children: company.companyTelephone,
    },
    {
      key: "3",
      label: dictionary.mail,
      children: company.companyMail,
    },
    {
      key: "4",
      label: dictionary.companyFaxNumber,
      children: company.faxNumber,
    },
    {
      key: "5",
      label: dictionary.companyAddress,
      span: 2,
      children: company.companyAddress,
    },
  ];

  useEffect(() => {
    setLoading(true);
    axios
      .get(API.COMPANY_STAFF.GET_ALL_BY_COMPANY(company.id), getAxiosConfig())
      .then((response) => {
        const modifiedCompanyStaff = response.data.companyStaffList.map(
          (staff: any) => ({
            ...staff,
            fullName: `${staff.name} ${staff.surname}`,
          })
        );
        setCompanyStaff(modifiedCompanyStaff);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => setLoading(false));
  }, [company.id]);

  return (
    <Container>
      <div>
        <ContentHeader>
          <h3>{company.companyName}</h3>
        </ContentHeader>
        <Descriptions layout="vertical" items={items} />
      </div>
      <div>
        <ContentHeader>
          <h3>
            <Text tid="employeeInformation" />
          </h3>
        </ContentHeader>
        <Table
          tableProps={{
            columns: enhancedColumns,
            data: companyStaff,
            loading: loading,
          }}
        ></Table>
      </div>
    </Container>
  );
};

export default CompanyDetailsContainer;
