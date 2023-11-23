import React, { useState } from "react";
/* import { data, columns } from "./PendingApplicationsTableColumns";
 */ import Table from "./PendingApplicationsTable";
import styled from "styled-components";
import { PlusCircleOutlined } from "@ant-design/icons";
import ContentHeader from "../../../../components/ContentHeader";
import { Button, Modal, Input } from "antd";

const MyTable: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <ContentHeader>
        <h2>Onay Bekleyen Başvurular</h2>
        <Input style={{ width: 300 }} placeholder="Öğrenci ara" />
      </ContentHeader>
      <Table />
    </>
  );
};

export default MyTable;
