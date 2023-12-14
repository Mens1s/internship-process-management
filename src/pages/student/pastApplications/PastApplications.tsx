import React, { useState, useEffect } from "react";
import Table from "src/components/Table";
import { Spin, Skeleton } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
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

const PastApplications: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const enhancedColumns = useEnhancedColumns(columns);

  useEffect(() => {
    const jwtToken = window.localStorage.getItem("token");
    axios
      .get("http://localhost:8000/api/internship-process/get-all", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        console.log(response.data.internshipProcessList);
        const internshipProcessList = response?.data?.internshipProcessList;
        if (internshipProcessList) {
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
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleNewApplicationClick = () => {
    navigate("/ogrenci/create");
  };

  return (
    <>
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
        <Skeleton active={true} paragraph={{ rows: 4 }} />
      ) : (
        <Table tableProps={{ columns: enhancedColumns, data: data }} />
      )}
    </>
  );
};

export default PastApplications;
