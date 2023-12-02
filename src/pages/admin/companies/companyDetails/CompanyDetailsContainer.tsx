import React from "react";
import ContentHeader from "../../../../components/ContentHeader";
import MyTable from "../../../../components/Table";
import CompanyDetailsTable from "./CompanyDetailsTable";

const CompanyDetailsContainer = () => {
  return (
    <div>
      <ContentHeader>
        <h3>İletişim Bilgileri</h3>
      </ContentHeader>
      <div style={{ height: "200px" }}></div>
      <ContentHeader>
        <h3>Çalışan Bilgileri</h3>
      </ContentHeader>
      <CompanyDetailsTable />
    </div>
  );
};

export default CompanyDetailsContainer;
