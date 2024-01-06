import React, { useEffect, useState } from "react";
import { Collapse, message, Modal, Result } from "antd";
import styled from "styled-components";
import { WarningFilled, MoreOutlined } from "@ant-design/icons";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";

import {
  Row,
  Col,
  Checkbox,
  Form,
  Input,
  Popconfirm,
  Upload,
  Button,
} from "antd";
import { Text } from "src/context/LanguageProvider";
import useLanguage from "src/hooks/useLanguage";
import axios from "src/services/axios";
import { API } from "src/config/api";
import getAxiosConfig from "src/config/axiosConfig";
const { Panel } = Collapse;
const { Dragger } = Upload;

const Wrapper = styled.div`
  .ant-collapse-content-box {
    background: white;
    border-radius: 0 0 8px 8px;
    border-top: 1px solid #ffe58f;
  }
`;

const DatePickersContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: end;

  div {
    width: 100%;
  }

  button {
    @media (max-width: 600px) {
      width: 100%;
    }
  }
`;

const customRequest = ({ onSuccess }: any) =>
  setTimeout(() => {
    onSuccess("ok", null);
  }, 0);

const props: UploadProps = {
  name: "file",
  multiple: true,
  customRequest: customRequest,
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    /*  if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    } */
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const UploadReportsForm = ({ processId }: any) => {
  const [form] = Form.useForm();
  const { dictionary } = useLanguage();
  const [loading, setLoading] = useState(false);

  const handleLoadReport = () => {
    console.log("process", processId);
    setLoading(true);
    const requestData = {
      id: processId,
      stajRaporuPath: "/stajRaporuPath",
    };
    axios
      .put(API.INTERNSHIP_PROCESS.LOAD_REPORT, requestData, getAxiosConfig())
      .then((response) => {
        console.log(response);
        setIsSuccessModalOpen(true);
      })
      .catch((error) => {
        console.log(error.response?.data);
        message.error(dictionary.generalErrorMessage);
      })
      .finally(() => setLoading(false));
  };

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const showSuccessModal = () => {
    setIsSuccessModalOpen(true);
  };

  const navigate = useNavigate();
  const handleSuccessModalOk = () => {
    setIsSuccessModalOpen(false);
    navigate("/ogrenci/past", { replace: true });
  };

  return (
    <Wrapper>
      <Collapse
        size="small"
        bordered={false}
        expandIcon={() => (
          <WarningFilled style={{ color: "#faad14", fontSize: "16px" }} />
        )}
        style={{
          background: "#fffbe6",
          border: "1px solid #ffe58f",
          borderBottom: "1px solid #ffe58f",
          borderTop: "1px solid #ffe58f",
          borderLeft: "5px solid #faad14",
        }}
      >
        <Panel
          header="Staj raporunu yüklemek için tıklayınız."
          key="1"
          extra={<MoreOutlined />}
        >
          <div style={{ padding: "10px 0" }}>
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Staj raporunu bu alana tıklayarak veya sürükleyerek
                yükleyebilirsiniz
              </p>
              <p className="ant-upload-hint">
                Raporu tek bir pdf dosyası şeklinde yükleyiniz.
              </p>
            </Dragger>
          </div>
          <DatePickersContainer>
            <Button loading={loading} type="primary" onClick={handleLoadReport}>
              <Text tid="confirm" />
            </Button>
          </DatePickersContainer>
        </Panel>
      </Collapse>
      <Modal open={isSuccessModalOpen} footer={null} closable={false}>
        <Result
          status="success"
          title="Staj raporunuz başarıyla sisteme yüklenmiştir!"
          subTitle="Başvurularım sayfasından raporunuzun onay durumunu ve detaylarını inceleyebilirsiniz."
          extra={[
            <Button type="primary" onClick={handleSuccessModalOk}>
              Tamam
            </Button>,
          ]}
        />
      </Modal>
    </Wrapper>
  );
};

export default UploadReportsForm;
