import React, { useState, useEffect } from "react";
import Table from "src/components/Table";
import styled from "styled-components";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Input } from "antd";
import ContentHeader from "src/components/ContentHeader";
import { columns } from "./AuthorizeTableColumns";
import useEnhancedColumns from "src/hooks/useEnhancedColumns";

const StyledButton = styled(Button)`
  @media (max-width: 600px) {
    flex: 1;
  }
`;
interface DataType {
  key: string;
  name: string;
  surname: string;
  mail: string;
  department: string;
}

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    surname: "03.07.2023",
    mail: "03.07.2023",
    department: "Zorunlu",
  },
  {
    key: "2",
    name: "Jim Green",
    surname: "18.08.2023",
    mail: "18.08.2023",
    department: "Zorunlu",
  },
  {
    key: "3",
    name: "Joe Black",
    surname: "05.06.2022",
    mail: "05.06.2022",
    department: "İsteğe Bağlı",
  },
  {
    key: "4",
    name: "John Brown",
    surname: "03.07.2023",
    mail: "03.07.2023",
    department: "Zorunlu",
  },
  {
    key: "5",
    name: "Jim Green",
    surname: "18.08.2023",
    mail: "18.08.2023",
    department: "Zorunlu",
  },
  {
    key: "6",
    name: "Joe Black",
    surname: "05.06.2022",
    mail: "05.06.2022",
    department: "İsteğe Bağlı",
  },
  {
    key: "7",
    name: "Jim Green",
    surname: "18.08.2023",
    mail: "18.08.2023",
    department: "Zorunlu",
  },
  {
    key: "8",
    name: "Joe Black",
    surname: "05.06.2022",
    mail: "05.06.2022",
    department: "İsteğe Bağlı",
  },
  {
    key: "9",
    name: "Joe Black",
    surname: "05.06.2022",
    mail: "05.06.2022",
    department: "İsteğe Bağlı",
  },
  {
    key: "10",
    name: "Jim Green",
    surname: "18.08.2023",
    mail: "18.08.2023",
    department: "Zorunlu",
  },
  {
    key: "11",
    name: "Joe Black",
    surname: "05.06.2022",
    mail: "05.06.2022",
    department: "İsteğe Bağlı",
  },
];

const MyTable: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const enhancedColumns = useEnhancedColumns(columns);

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
        <div>
          <h2>Yönetici Listesi</h2>
        </div>

        <StyledButton onClick={showModal}>
          <PlusCircleOutlined /> Yönetici Ekle
        </StyledButton>

        <Modal
          title="Yönetici Ekle"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Eklemek istediğiniz yöneticiyi giriniz.</p>
          <Input style={{ margin: "20px 0" }} placeholder="Kişi ara" />
        </Modal>
      </ContentHeader>
      <Table tableProps={{ columns: enhancedColumns, data }} />
    </>
  );
};

export default MyTable;
