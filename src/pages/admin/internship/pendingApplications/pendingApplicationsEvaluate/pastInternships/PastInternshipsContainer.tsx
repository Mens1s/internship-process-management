import React from "react";
import { columns } from "./pastInternshipsTableColumns";
import MyTable from "src/components/Table";
import ContentHeader from "src/components/ContentHeader";

const PastInternshipsContainer = () => {
  return (
    <div>
      <ContentHeader>
        <h3>Geçmiş Stajlar</h3>
      </ContentHeader>
      <MyTable tableProps={{ columns, data: [] }}></MyTable>
    </div>
  );
};

export default PastInternshipsContainer;
