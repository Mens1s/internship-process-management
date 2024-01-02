import React, { useEffect, useState } from "react";
import axios from "src/services/axios";
import ContentHeader from "src/components/ContentHeader";
import { Modal, Button, Input, Skeleton, message, theme } from "antd";
import useEnhancedColumns from "src/hooks/useEnhancedColumns";
import { GetColumns } from "./authorizeTable/AuthorizeTableColumns";
import { PlusCircleOutlined } from "@ant-design/icons";
import Table from "src/components/Table";
import styled from "styled-components";
import { API } from "src/config/api";

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
  const [academics, setAcademics] = useState<AcademicDataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [assignLoading, setAssignLoading] = useState(false);
  const { useToken } = theme;

  const showModal = (record: any, taskId: any) => {
    setAssignLoading(true);
    console.log(taskId);
    const modifiedTaskIds = taskId.reduce((acc: any, id: any, index: any) => {
      if (id) {
        acc.push(index + 1);
      }
      return acc;
    }, []);

    const modifiedTasksString = modifiedTaskIds.join(",");
    console.log(modifiedTasksString);
    axios
      .post(API.ACADEMICIAN.ASSIGN_TASK, null, {
        params: {
          academicianId: academics[record.key - 1].id,
          taskId: modifiedTasksString,
        },
      })
      .then((response: any) => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("task error:");
        message.error("Bir sorunla karşılaştık. Lütfen tekrar deneyiniz.");
      })
      .finally(() => setAssignLoading(false));
  };

  const { token } = useToken();

  const enhancedColumns = useEnhancedColumns(
    GetColumns(showModal, token, academics, assignLoading)
  );

  useEffect(() => {
    axios
      .get(API.ACADEMICIAN.GET_ALL_NOT_PAGEABLE)
      .then((response) => {
        setAcademics(response.data.academicsList);
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
      </ContentHeader>
      {loading ? (
        <Skeleton active />
      ) : (
        <Table
          tableProps={{
            columns: enhancedColumns,
            data: mappedData,
          }}
        />
      )}
    </>
  );
};

export default Authorize;
