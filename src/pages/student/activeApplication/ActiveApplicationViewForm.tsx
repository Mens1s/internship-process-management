import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import styled from "styled-components";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import type { RcFile, UploadProps } from "antd/es/upload";
import useLanguage from "src/hooks/useLanguage";
import { Text } from "src/context/LanguageProvider";
import type { DescriptionsProps } from "antd";
import { Descriptions, Alert, message } from "antd";
import { ExclamationCircleFilled, DeleteFilled } from "@ant-design/icons";
import axios from "src/services/axios";
import { Button, Modal, Input, Result } from "antd";
import { useLocation } from "react-router-dom";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { API } from "src/config/api";
import getAxiosConfig from "src/config/axiosConfig";
import { useNavigate } from "react-router-dom";

const { confirm } = Modal;

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
  const [comment, setComment] = useState<any>(null); // State to store the deny reason
  const [loading, setLoading] = useState(false);
  const items = [
    {
      key: "id",
      label: "Id",
      children: data?.id?.toString(),
      span: 3,
    },
    {
      key: "tc",
      label: "Tc",
      span: 3,
      children: data?.tc,
    },
    {
      key: "studentNumber",
      label: "Student Number",
      span: 3,
      children: data?.studentNumber,
    },
    {
      key: "telephoneNumber",
      label: "Telephone Number",
      children: data?.telephoneNumber,
      span: 3,
    },
    {
      key: "classNumber",
      span: 3,
      label: "Class Number",
      children: data?.classNumber?.toString(),
    },
    {
      key: "position",
      label: "Position",
      children: data?.position,
      span: 3,
    },
    {
      key: "internshipType",
      label: "Internship Type",
      span: 3,
      children: data?.internshipType,
    },
    {
      key: "internshipNumber",
      label: "Internship Number",
      span: 3,
      children: data?.internshipNumber?.toString(),
    },
    {
      span: 3,
      key: "startDate",
      label: "Start Date",
      children: data?.startDate,
    },
    {
      span: 3,
      key: "endDate",
      label: "End Date",
      children: data?.endDate,
    },
    {
      key: "companyId",
      label: "Company Id",
      span: 3,
      children: data?.companyId?.toString(),
    },
    {
      key: "departmentId",
      span: 3,
      label: "Department Id",
      children: data?.departmentId?.toString(),
    },
    {
      span: 3,
      key: "engineerMail",
      label: "Engineer Mail",
      children: data?.engineerMail,
    },
    {
      key: "engineerName",
      label: "Engineer Name",
      span: 3,
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
      span: 3,
      children: data?.sgkEntry?.toString(),
    },
    {
      span: 3,
      key: "gssEntry",
      label: "GSS Entry",
      children: data?.gssEntry?.toString(),
    },
    {
      span: 3,
      key: "mustehaklikBelgesiPath",
      label: "Mustehaklik Belgesi Path",
      children: data?.mustehaklikBelgesiPath,
    },
    {
      span: 3,
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

  const handleEvaluation = (isApproved: boolean) => {
    const userId = window.localStorage.getItem("id");
    setLoading(true);
    if (isDenyOpen && !comment) {
      message.error("Reddetme nedenini giriniz.");
      setLoading(false);
      return;
    }
    setIsDenyOpen(false);
    setIsConfirmOpen(false);
    axios
      .post(
        API.INTERNSHIP_PROCESS.EVALUATE,
        {
          processId: data.id,
          approve: isApproved,
          comment: comment,
          academicianId: userId,
        },
        getAxiosConfig()
      )
      .then((response) => {
        showSuccessModal();
      })
      .catch((error) => {
        message.error("Bir sorunla karşılaştık. Lütfen tekrar deneyiniz.");
        console.log("evaluate error:", error.response);
      })
      .finally(() => setLoading(false));
    setIsConfirmOpen(false);
  };

  const location = useLocation();
  const isAkademisyen = location.pathname.includes("/akademisyen");
  const isInEvaluatePage = location.pathname.split("/").includes("evaluate");
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 800);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 800);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const labelStyle = {};

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const showSuccessModal = () => {
    setIsSuccessModalOpen(true);
  };

  const navigate = useNavigate();

  const handleSuccessModalOk = () => {
    setIsSuccessModalOpen(false);
    navigate("/akademisyen/internships/pending", { replace: true });
  };

  return (
    <>
      {data.length == 0 ? (
        <Result
          status="404"
          title="Böyle bir başvuru mevcut değil."
          subTitle="Arama kısmında yazım yanlışı yapmış olabilirsin."
        />
      ) : (
        <div>
          <Descriptions
            layout={isSmallScreen ? "vertical" : "horizontal"}
            bordered
            items={items}
            labelStyle={labelStyle}
            column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
            size="middle"
          />
          <DatePickersContainer>
            {isAkademisyen && isInEvaluatePage && (
              <>
                <Button disabled={loading} danger onClick={showDeny}>
                  <Text tid="reject" />
                </Button>
                <Button disabled={loading} type="primary" onClick={showConfirm}>
                  <Text tid="approve" />
                </Button>
              </>
            )}
          </DatePickersContainer>
          <Modal
            title="Başvuruyu Onayla"
            open={isConfirmOpen}
            onOk={() => {
              handleEvaluation(true);
            }}
            onCancel={handleCancel}
          >
            <p>Staj başvurusunu onaylamak istediğinize emin misiniz?</p>
            <TextArea
              style={{ marginTop: 15, resize: "none" }}
              rows={5}
              placeholder="Enter comments"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Modal>
          <Modal
            title="Başvuruyu Reddet"
            open={isDenyOpen}
            onOk={() => {
              handleEvaluation(false);
            }}
            onCancel={handleCancel}
          >
            <p>Staj başvurusunu reddetmek istediğinize emin misiniz? </p>
            <TextArea
              style={{ marginTop: 15, resize: "none" }}
              rows={5}
              placeholder="Enter comments"
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Modal>
          <Modal open={isSuccessModalOpen} footer={null} closable={false}>
            <Result
              status="success"
              title="Başvuru değerlendirmesi başarıyla alındı!"
              extra={[
                <Button type="primary" onClick={handleSuccessModalOk}>
                  Tamam
                </Button>,
              ]}
            />
          </Modal>
        </div>
      )}
    </>
  );
};

export default ActiveApplicationViewForm;
