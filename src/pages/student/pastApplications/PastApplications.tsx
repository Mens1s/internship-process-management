import React from "react";
import Table from "../../../components/Table";
import styled from "styled-components";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Input, Tag } from "antd";
import { useNavigate, Link } from "react-router-dom"; // Replace with the actual path
import type { ColumnsType } from "antd/es/table";
import { columns } from "./PastApplicationsTableColumns";
import ContentHeader from "../../../components/ContentHeader";

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
    tags: ["Beklemede"],
  },
];

const PastApplications: React.FC = () => {
  const navigate = useNavigate(); // Assuming your custom hook is named usenavigate

  const handleNewApplicationClick = () => {
    navigate("/ogrenci/create");
  };

  return (
    <div>
      <ContentHeader>
        <h2>Staj Başvurularım</h2>
        <Button onClick={handleNewApplicationClick}>
          <PlusCircleOutlined /> Yeni Başvuru
        </Button>
      </ContentHeader>
      <Table tableProps={{ columns, data }} />
    </div>
  );
};

export default PastApplications;
