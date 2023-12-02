import React from "react";
import ContentHeader from "../../../../components/ContentHeader";
import MyTable from "../../../../components/Table";
import { columns } from "./StudentsTableColumns";

const Students = () => {
  return (
    <div>
      <ContentHeader>
        <h3>Staj Bilgileri</h3>
      </ContentHeader>
      <MyTable tableProps={{ columns, data: [] }}></MyTable>
    </div>
  );
};

export default Students;
