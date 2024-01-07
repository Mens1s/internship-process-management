import React, { useEffect, useState } from "react";
import { Collapse, message, Modal, Result, Spin } from "antd";
import styled from "styled-components";
import {
  WarningFilled,
  MoreOutlined,
  FilePdfOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { InboxOutlined } from "@ant-design/icons";

import { Upload, Button } from "antd";
import { Text } from "src/context/LanguageProvider";
import useLanguage from "src/hooks/useLanguage";
import axios from "src/services/axios";
import { API } from "src/config/api";
import getAxiosConfig from "src/config/axiosConfig";
import PdfViewer from "src/components/PdfViewer";
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

const List = styled.div``;
const ListItem = styled.div`
  width: 100%;
  border: 1px solid lightblue;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #f2f2f2;
  }

  margin-bottom: 20px;
`;

const UploadReportsForm = ({ processId, stajRaporuID, reload }: any) => {
  const { dictionary } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [fileName, setFileName] = useState(stajRaporuID);

  const handleFileChange = (file: any) => {
    setFileName(file.fileList[file.fileList.length - 1].name);
    handleUpload(file.fileList[file.fileList.length - 1]);
  };

  const handleUpload = async (file: any) => {
    if (!file) {
      message.error("Please select a file before uploading.");
      return;
    }
    setUploadLoading(true);

    const formData = new FormData();
    formData.append("file", file?.originFileObj);
    formData.append("type", "stajRaporuID");
    formData.append("processId", processId);
    let jwtToken = window.localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:8000/api/file/upload", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (response.ok) {
        reload();
        message.success("Dosya yüklendi!");
      } else {
        message.error("Failed to upload file.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      message.error("An error occurred while uploading the file.");
    } finally {
      setUploadLoading(false);
    }
  };

  const handleLoadReport = () => {
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
  const [viewStajLoading, setViewStajLoading] = useState(false);

  const navigate = useNavigate();
  const handleSuccessModalOk = () => {
    setIsSuccessModalOpen(false);
    navigate("/ogrenci/past", { replace: true });
  };

  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [pdfFileUrl, setPdfFileUrl] = useState("");

  const handleView = async (file: any) => {
    setViewStajLoading(true);
    console.log("id", file);

    try {
      const response = await axios.get(
        "http://localhost:8000/api/file/download",
        {
          params: {
            fileId: file,
          },
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));

      setPdfFileUrl(url);
      setIsPdfModalOpen(true);
    } catch (error) {
      console.log(error);
      message.error("Dosyayı görüntülerken bir sorunla karşılaştık.");
    } finally {
      setViewStajLoading(false);
    }
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
          header={dictionary.uploadReportHeader}
          key="1"
          extra={<MoreOutlined />}
        >
          <div style={{ padding: "10px 0" }}>
            <Dragger
              multiple={false}
              showUploadList={false}
              onChange={handleFileChange}
              customRequest={() => true}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">{dictionary.clickOrDragText}</p>
              <p className="ant-upload-hint">
                {dictionary.clickOrDragDescription}
              </p>
            </Dragger>
          </div>
          {fileName && (
            <List>
              <ListItem onClick={() => handleView(stajRaporuID)}>
                {viewStajLoading ? (
                  <Spin
                    indicator={
                      <LoadingOutlined style={{ fontSize: 24 }} spin />
                    }
                  />
                ) : (
                  <p>
                    <FilePdfOutlined
                      style={{ marginRight: 10, color: "gray" }}
                    />
                    {fileName}
                  </p>
                )}
              </ListItem>
            </List>
          )}
          <DatePickersContainer>
            <Button
              disabled={uploadLoading}
              loading={loading}
              type="primary"
              onClick={handleLoadReport}
            >
              {dictionary.send}
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
      <Modal
        title="View PDF"
        width={800}
        open={isPdfModalOpen}
        onCancel={() => setIsPdfModalOpen(false)}
        footer={null}
      >
        <PdfViewer fileUrl={pdfFileUrl} />
      </Modal>
    </Wrapper>
  );
};

export default UploadReportsForm;
