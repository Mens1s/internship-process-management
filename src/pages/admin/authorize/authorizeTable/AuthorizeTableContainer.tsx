import React, { useState } from "react";
import { data, columns } from "./AuthorizeTableColumns";
import Table from "./AuthorizeTable";
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
        <h2>Yönetici Listesi</h2>
        <Button onClick={showModal}>
          <PlusCircleOutlined /> Yönetici Ekle
        </Button>
        <Modal
          title="Basic Modal"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Eklemek istediğiniz yöneticiyi giriniz</p>
          <Input style={{ margin: "20px 0" }} placeholder="Kişi ara" />
        </Modal>
      </TableHeader>
      <Table />
    </>
  );
};

export default MyTable;
