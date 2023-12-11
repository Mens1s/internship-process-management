import React, { useState, useEffect } from "react";
import Table from "src/components/Table";
import { Spin } from "antd"; // Import Spin component for loading indicator
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import { columns } from "./PastApplicationsTableColumns";
import ContentHeader from "src/components/ContentHeader";
import { Text } from "src/context/LanguageProvider";
import axios from "src/services/axios";
import useEnhancedColumns from "src/hooks/useEnhancedColumns";
import styled from "styled-components";

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
  tags: string[];
}

const PastApplications: React.FC = () => {
  const [loading, setLoading] = useState(true); // Loading state
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const enhancedColumns = useEnhancedColumns(columns);

  const fetchData = () => {
    const jwtToken = window.localStorage.getItem("token");

    axios
      .get("http://localhost:8000/api/internship-process/get-all", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        const internshipProcessList = response?.data?.internshipProcessList;

        if (internshipProcessList) {
          console.log(internshipProcessList);
          console.log(jwtToken);

          setData(
            internshipProcessList?.map((item: any) => ({
              key: item?.id,
              name: item?.companyId,
              startDate: item?.startDate,
              endDate: item?.endDate,
              type: item?.internshipType,
              tags: [item.processStatus === "FORM" ? "Taslak" : ""],
            }))
          );
        } else {
          console.error(
            "Invalid or missing internshipProcessList in the response"
          );
        }
      })
      .catch((error) => {
        console.log("error:", error.response);
        console.log(jwtToken);
      })
      .finally(() => {
        setLoading(false); // Set loading to false when data fetching is complete
      });
  };

  useEffect(() => {
    fetchData(); // This will run when the component mounts
  }, []); // The empty dependency array ensures it runs only once

  const handleNewApplicationClick = () => {
    navigate("/ogrenci/create");
  };

  return (
    <div>
      <ContentHeader>
        <div>
          <h2>
            <Text tid="myInternshipApplications" />
          </h2>
        </div>
        <StyledButton onClick={handleNewApplicationClick}>
          <PlusCircleOutlined /> <Text tid="createApplication" />
        </StyledButton>
      </ContentHeader>

      {loading ? (
        <Spin size="default" /> // Display loading spinner while fetching data
      ) : (
        <Table tableProps={{ columns: enhancedColumns, data: data }} />
      )}
    </div>
  );
};

export default PastApplications;
