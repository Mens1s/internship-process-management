import React from "react";
import MyTable from "../pastApplications/PastApplicationsTable";
import styled from "styled-components";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Input } from "antd";
import { useNavigate } from "react-router-dom"; // Replace with the actual path

const TableHeader = styled.div`
  margin: 0 16px 30px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    margin: 0;
  }
`;

const PastApplications = () => {
  const navigate = useNavigate(); // Assuming your custom hook is named usenavigate

  const handleNewApplicationClick = () => {
    navigate("/ogrenci/create");
  };

  return (
    <div>
      <TableHeader>
        <h2>Staj Başvurularım</h2>
        <Button onClick={handleNewApplicationClick}>
          <PlusCircleOutlined /> Yeni Başvuru
        </Button>
      </TableHeader>
      <MyTable></MyTable>
    </div>
  );
};

export default PastApplications;
