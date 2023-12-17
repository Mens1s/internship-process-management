import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import styled from "styled-components";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import type { RcFile, UploadProps } from "antd/es/upload";
import useLanguage from "src/hooks/useLanguage";
import { Text } from "src/context/LanguageProvider";
import type { DescriptionsProps } from "antd";
import { Descriptions } from "antd";
import { ExclamationCircleFilled, DeleteFilled } from "@ant-design/icons";
import axios from "src/services/axios";
import { Button, Modal, Input } from "antd";
import { useLocation } from "react-router-dom";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

const { confirm } = Modal;
const showDeleteConfirm = () => {
  confirm({
    title: "Staj başvurunuzu sonlandırmak istediğinize emin misiniz?",
    icon: <ExclamationCircleFilled />,
    content: "Sonlandırılan staj başvuruları kalıcı olarak silinir.",
    okText: "Sil",
    okType: "danger",
    cancelText: "Vazgeç",
    onOk() {
      const jwtToken = window.localStorage.getItem("token");

      axios
        .delete("http://localhost:8000/api/internship-process/delete", {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          params: {
            internshipProcessID: 102,
          },
        })
        .then((response) => {
          console.log("delete response: ", response);
        })
        .catch((error: any) => {
          console.log("delete error:", error);
        });
    },
    onCancel() {},
  });
};
const { TextArea } = Input;
const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const PDFContainer = styled.div`
  width: 100%;
  height: 700px;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
`;
const ButtonsContainer = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  @media (max-width: 800px) {
    width: 100%;
  }
`;
const DatePickersContainer = styled.div`
  display: flex;
  float: right;
  gap: 10px;
  margin-top: 20px;
  min-width: 200px;
  width: 100%;
  max-width: 250px;

  div {
    width: 100%;
  }

  button {
    height: 40px;
    width: 100%;
  }
`;

const postData = {
  id: 152, // Replace with the actual value
  tc: "12345678901", // Replace with the actual value
  studentNumber: "S123456", // Replace with the actual value
  telephoneNumber: "1234567890", // Replace with the actual value
  classNumber: 3, // Replace with the actual value
  position: "Software Engineer", // Replace with the actual value
  internshipType: "Summer Internship", // Replace with the actual value
  internshipNumber: 456, // Replace with the actual value
  startDate: "2023-01-01", // Replace with the actual value
  endDate: "2023-12-31", // Replace with the actual value
  companyId: 789, // Replace with the actual value
  departmentId: 101, // Replace with the actual value
  engineerMail: "engineer@example.com", // Replace with the actual value
  engineerName: "John Doe", // Replace with the actual value
  choiceReason:
    "I am interested in gaining experience in web development. I am interested in gaining experience in web development. I am interested in gaining experience in web development. I am interested in gaining experience in web development.", // Replace with the actual value
  sgkEntry: true, // Replace with the actual value
  gssEntry: false, // Replace with the actual value
  mustehaklikBelgesiPath: "/path/to/mustehaklikBelgesi.pdf", // Replace with the actual value
  stajYeriFormuPath: "/path/to/stajYeriFormu.pdf", // Replace with the actual value
};

interface ActiveApplicationFormProps {
  data?: any;
}

const ActiveApplicationViewForm: React.FC<ActiveApplicationFormProps> = ({
  data,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDenyOpen, setIsDenyOpen] = useState(false);
  const { dictionary } = useLanguage();

  const items = [
    {
      key: "id",
      label: "Id",
      children: data?.id?.toString(),
    },
    {
      key: "tc",
      label: "Tc",
      children: data?.tc,
    },
    {
      key: "studentNumber",
      label: "Student Number",
      children: data?.studentNumber,
    },
    {
      key: "telephoneNumber",
      label: "Telephone Number",
      children: data?.telephoneNumber,
    },
    {
      key: "classNumber",
      label: "Class Number",
      children: data?.classNumber?.toString(),
    },
    {
      key: "position",
      label: "Position",
      children: data?.position,
    },
    {
      key: "internshipType",
      label: "Internship Type",
      children: data?.internshipType,
    },
    {
      key: "internshipNumber",
      label: "Internship Number",
      children: data?.internshipNumber?.toString(),
    },
    {
      key: "startDate",
      label: "Start Date",
      children: data?.startDate,
    },
    {
      key: "endDate",
      label: "End Date",
      children: data?.endDate,
    },
    {
      key: "companyId",
      label: "Company Id",
      children: data?.companyId?.toString(),
    },
    {
      key: "departmentId",
      label: "Department Id",
      children: data?.departmentId?.toString(),
    },
    {
      key: "engineerMail",
      label: "Engineer Mail",
      children: data?.engineerMail,
    },
    {
      key: "engineerName",
      label: "Engineer Name",
      span: 2,
      children: data?.engineerName,
    },
    {
      key: "choiceReason",
      label: "Choice Reason",
      span: 3,
      children: data?.choiceReason,
    },
    {
      key: "sgkEntry",
      label: "SGK Entry",
      children: data?.sgkEntry?.toString(),
    },
    {
      key: "gssEntry",
      label: "GSS Entry",
      children: data?.gssEntry?.toString(),
    },
    {
      key: "mustehaklikBelgesiPath",
      label: "Mustehaklik Belgesi Path",
      children: data?.mustehaklikBelgesiPath,
    },
    {
      key: "stajYeriFormuPath",
      label: "Staj Yeri Formu Path",
      children: data?.stajYeriFormuPath,
    },
  ];

  const showConfirm = () => {
    setIsConfirmOpen(true);
  };

  const showDeny = () => {
    setIsDenyOpen(true);
  };

  const handleCancel = () => {
    setIsConfirmOpen(false);
    setIsDenyOpen(false);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const confirmApplication = () => {
    const jwtToken = window.localStorage.getItem("token");
    axios
      .post("http://localhost:8000/api/internship-process/evaluate", {
        processId: data.id,
        approve: true,
        comment: "bu bir yorumdur",
        academicianId: 1,
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        console.log("evaluate response: ", response);
      })
      .catch((error) => {
        console.log("evaluate error:", error.response);
      });
    setIsConfirmOpen(false);
  };

  const location = useLocation();
  const isOgrenci = location.pathname.includes("/ogrenci");
  const isAkademisyen = location.pathname.includes("/akademisyen");

  return (
    <div>
      <Descriptions bordered layout="horizontal" items={items} />
      <DatePickersContainer>
        {/* {isOgrenci && (
          <Button type="primary" danger onClick={showDeleteConfirm}>
            Başvuruyu Sonlandır
          </Button>
        )} */}
        {isAkademisyen && (
          <>
            <Button danger onClick={showDeny}>
              Reddet
            </Button>
            <Button type="primary" onClick={showConfirm}>
              Onayla
            </Button>
          </>
        )}
      </DatePickersContainer>
      <Modal
        title="Başvuruyu Onayla"
        open={isConfirmOpen}
        onOk={confirmApplication}
        onCancel={handleCancel}
      >
        <p>
          <Text tid="createApplicationFormApprovementModalText" />
        </p>
        <TextArea
          style={{ marginTop: 15, resize: "none" }}
          rows={5}
          placeholder="Enter comments"
        />
      </Modal>
      <Modal
        title="Başvuruyu Reddet"
        open={isDenyOpen}
        onOk={confirmApplication}
        onCancel={handleCancel}
      >
        <p>
          <Text tid="createApplicationFormApprovementModalText" />
        </p>
        <TextArea
          style={{ marginTop: 15, resize: "none" }}
          rows={5}
          placeholder="Enter comments"
        />
      </Modal>
    </div>
  );
};

export default ActiveApplicationViewForm;
