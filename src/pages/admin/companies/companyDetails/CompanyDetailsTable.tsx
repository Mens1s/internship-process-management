import React from "react";
import MyTable from "src/components/Table";
import { columns } from "./companyDetailsTableColumns";
import useEnhancedColumns from "src/hooks/useEnhancedColumns";

interface DataType {
  key?: string;
  name: string;
  position: string;
  phoneNumber: string;
  mail: string;
}

const data: DataType[] = [
  {
    name: "John Brown",
    position: "CEO",
    phoneNumber: "5074573487",
    mail: "johnbrown@gmail.com",
  },
  {
    name: "Jim Green",
    position: "Backend Team Lead",
    phoneNumber: "5056834587",
    mail: "jimgreen@hotmail.com",
  },
  {
    name: "Joe Black",
    position: "Frontend Developer",
    phoneNumber: "5513445678",
    mail: "joeblack@gmail.com",
  },
];

const CompanyDetailsTable: React.FC = () => {
  const enhancedColumns = useEnhancedColumns(columns);
  return <MyTable tableProps={{ columns: enhancedColumns, data }}></MyTable>;
};

export default CompanyDetailsTable;
