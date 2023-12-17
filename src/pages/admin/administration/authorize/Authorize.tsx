import React, { useState } from "react";
import axios from "src/services/axios";
import ContentHeader from "src/components/ContentHeader";
import { Modal, Button, Input, Skeleton } from "antd";
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
  const [loading, setLoading] = useState(true); // Step 2: Loading state

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
    })
    .finally(() => {
      setLoading(false);
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
      {loading ? (
        <Skeleton active />
      ) : (
        <Table tableProps={{ columns: enhancedColumns, data: mappedData }} />
      )}{" "}
    </>
  );
};

export default Authorize;
