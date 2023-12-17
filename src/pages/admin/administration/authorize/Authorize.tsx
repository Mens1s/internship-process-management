import React, { useState } from "react";
import axios from "src/services/axios";
import ContentHeader from "src/components/ContentHeader";
import { Modal, Button, Input } from "antd";
import useEnhancedColumns from "src/hooks/useEnhancedColumns";
import { getColumns } from "./authorizeTable/AuthorizeTableColumns";
import { PlusCircleOutlined } from "@ant-design/icons";
import Table from "src/components/Table";
import styled from "styled-components";

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

interface AcademicDataType {
  id: number;
  firstName: string;
  lastName: string;
  mail: string;
  department: {
    departmentName: string;
  };
}

const Authorize = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [academics, setAcademics] = useState<AcademicDataType[]>([]);

  const showModal = (record: any) => {
    console.log(record);
    axios
      .post("http://localhost:8000/api/academician/assignTask", null, {
        params: {
          academicianId: 1,
          taskId: record.key - 1,
        },
      })
      .then((response) => {
        console.log("task response:", response);
      })
      .catch((error) => {
        console.error("task error:");
      });
  };

  const enhancedColumns = useEnhancedColumns(getColumns(showModal));

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const jwtToken = window.localStorage.getItem("token");
  axios
    .get("http://localhost:8000/api/academician/get-all-not-pageable")
    .then((response) => {
      setAcademics(response.data.academicsList);
    })
    .catch((error) => {
      console.error("auth error:");
    });

  const mappedData = academics.map((academic, index) => ({
    id: academic.id.toString(),
    key: index + 1,
    name: academic.firstName,
    surname: academic.lastName,
    mail: academic.mail,
    department: academic.department.departmentName,
  }));

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
      <Table tableProps={{ columns: enhancedColumns, data: mappedData }} />
    </>
  );
};

export default Authorize;
