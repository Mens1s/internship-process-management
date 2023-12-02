import React from "react";
import ContentHeader from "../../../../components/ContentHeader";
import MyTable from "../../../../components/Table";
import CompanyDetailsTable from "./CompanyDetailsTable";
import { Descriptions } from "antd";
import type { DescriptionsProps } from "antd";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const items: DescriptionsProps["items"] = [
  {
    key: "1",
    label: "Şirket Adı",
    children: "Zhou Maomao",
  },
  {
    key: "2",
    label: "Telefon Numarası",
    children: "1810000000",
  },
  {
    key: "3",
    label: "Fax Numarası",
    children: "Hangzhou, Zhejiang",
  },
  {
    key: "4",
    label: "Adres",
    span: 2,
    children: "No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China",
  },
  {
    key: "5",
    label: "Remark",
    children: "empty",
  },
];
const CompanyDetailsContainer = ({ id }: any) => {
  return (
    <Container>
      <div>
        <ContentHeader>
          <h3>{id}</h3>
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
