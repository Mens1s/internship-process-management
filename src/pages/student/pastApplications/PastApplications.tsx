import React, { useState, useEffect } from "react";
import Table from "../../../components/Table";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate, Link } from "react-router-dom"; // Replace with the actual path
import type { ColumnsType } from "antd/es/table";
import { columns } from "./PastApplicationsTableColumns";
import ContentHeader from "../../../components/ContentHeader";
import { Text } from "../../../context/LanguageProvider";
import axios from "../../../services/axios";
import useEnhancedColumns from "../../../hooks/useEnhancedColumns";
interface DataType {
  key: string;
  name: string;
  startDate: string;
  endDate: string;
  type: string;
  tags: string[];
}

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    startDate: "03.07.2023",
    endDate: "03.07.2023",
    type: "Zorunlu",
    tags: ["Onaylandı"],
  },
  {
    key: "2",
    name: "Jim Green",
    startDate: "18.08.2023",
    endDate: "18.08.2023",
    type: "Zorunlu",
    tags: ["Reddedildi"],
  },
  {
    key: "3",
    name: "John Brown",
    startDate: "03.07.2023",
    endDate: "03.07.2023",
    type: "Zorunlu",
    tags: ["Onay Bekliyor"],
  },
];

const PastApplications: React.FC = () => {
  const [apiData, setApiData] = React.useState([]);
  const navigate = useNavigate();

  const enhancedColumns = useEnhancedColumns(columns);

  const handleNewApplicationClick = () => {
    navigate("/ogrenci/create");
  };

  /*  const jwtToken = window.localStorage.getItem("token");
  axios
    .get("http://localhost:8000/api/internship-process/get-all", {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
    .then((response) => {
      console.log(response);
      setApiData(response.data.internshipProcessList);
    })
    .catch((error) => {
      console.error(
        "past application error:",
        error.response.data.internshipProcessList
      );
      //  setApiData(error.response.data.internshipProcessList);
    }); */

  /* const transformedData: DataType[] = apiData.map((item: any, index) => ({
    key: `${index + 1}`,
    name: item.company,
    startDate: item.startDate,
    endDate: item.endDate,
    type: item.position, // Assuming 'position' should be the 'type'
    tags: ["RandomTag1", "RandomTag2", "RandomTag3"], // Add random tags as needed
  }));
 */
  return (
    <div>
      <ContentHeader>
        <h2>
          <Text tid="myInternshipApplications" />
        </h2>
        <Button onClick={handleNewApplicationClick}>
          <PlusCircleOutlined /> <Text tid="createApplication" />
        </Button>
      </ContentHeader>
      <Table tableProps={{ columns: enhancedColumns, data }} />
    </div>
  );
};

export default PastApplications;
