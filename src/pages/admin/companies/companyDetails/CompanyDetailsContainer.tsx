import React from "react";
import ContentHeader from "src/components/ContentHeader";
import MyTable from "src/components/Table";
import CompanyDetailsTable from "./CompanyDetailsTable";
import { Descriptions } from "antd";
import type { DescriptionsProps } from "antd";
import styled from "styled-components";
import UseLanguage from "src/hooks/useLanguage";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const CompanyDetailsContainer = ({ company }: any) => {
  const { dictionary } = UseLanguage();

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
          <h3>Çalışan Bilgileri</h3>
        </ContentHeader>
        <CompanyDetailsTable />
      </div>
    </Container>
  );
};

export default CompanyDetailsContainer;
