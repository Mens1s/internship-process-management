import React, { useEffect, useState } from "react";
import axios from "src/services/axios";
import ContentHeader from "src/components/ContentHeader";
import { Modal, Button, Input, Skeleton, message, theme } from "antd";
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
  departmentName: string;
}

const Authorize = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [academics, setAcademics] = useState<AcademicDataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [assignLoading, setAssignLoading] = useState(false);

  const { useToken } = theme;

  const showModal = (record: any, taskId: any) => {
    setAssignLoading(true);
    axios
      .post("http://localhost:8000/api/academician/assignTask", null, {
        params: {
          academicianId: academics[record.key - 1].id,
          taskId: taskId,
        },
      })
      .then((response) => {
        console.log("task response:", response);
        message.success("Görev başarıyla atandı.");
      })
      .catch((error) => {
        console.error("task error:");
        message.error("Bir sorunla karşılaştık. Lütfen tekrar deneyiniz.");
      })
      .finally(() => setAssignLoading(false));
  };

  const { token } = useToken();

  const enhancedColumns = useEnhancedColumns(getColumns(showModal, token));

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    const jwtToken = window.localStorage.getItem("token");
    axios
      .get("http://localhost:8000/api/academician/get-all-not-pageable")
      .then((response) => {
        setAcademics(response.data.academicsList);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("auth error:");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const mappedData = academics.map((academic, index) => ({
    id: academic.id,
    key: index + 1,
    name: `${academic.firstName} ${academic.lastName}`,
    surname: academic.lastName,
    mail: academic.mail,
    department: academic.departmentName,
  }));

  return (
    <>
      <ContentHeader>
        <div>
          <h2>Yönetici Listesi</h2>
        </div>

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
        <Table
          tableProps={{
            columns: enhancedColumns,
            data: mappedData,
            loading: assignLoading,
          }}
        />
      )}
    </>
  );
};

export default Authorize;
