import React, { useState } from "react";
/* import { data, columns } from "./PendingApplicationsTableColumns";
 */ import Table from "./PendingApplicationsTable";
import styled from "styled-components";
import { PlusCircleOutlined } from "@ant-design/icons";

import { Button, Modal, Input } from "antd";

const TableHeader = styled.div`
  margin: 0 16px 30px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    margin: 0;
  }
`;

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
      <TableHeader>
        <h2>Onay Bekleyen Başvurular</h2>
        <Input style={{ width: 300 }} placeholder="Öğrenci ara" />
      </TableHeader>
      <Table />
    </>
  );
};

export default MyTable;
