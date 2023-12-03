import React, { useState, ChangeEvent, FormEvent } from "react";
import styled from "styled-components";
import { Modal, Button, Tooltip } from "antd";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import PdfViewer from "src/components/PdfViewer";
import ContentHeader from "src/components/ContentHeader";
import { Text } from "src/context/LanguageProvider";
import PastInternshipsContainer from "./pastInternships/PastInternshipsContainer";
import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";

const ButtonsContainer = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const StyledButton = styled(Button)`
  @media (max-width: 600px) {
    flex: 1;
  }
`;

const Evaluate: React.FC = () => {
  const [viewPdf, setViewPdf] = useState<string | null>(null);
  const [pdfFile, setPDFFile] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const fileType: string[] = ["application/pdf"];
  const [previewTitle, setPreviewTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const newplugin = defaultLayoutPlugin();
  const handlePDFCancel = () => setPreviewOpen(false);
  const [open, setOpen] = useState(false);
  const showModal = (record: any) => {
    setOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (pdfFile !== null) {
      setViewPdf(pdfFile);
    } else {
      setViewPdf(null);
    }
    setPreviewOpen(true);
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      console.log(selectedFile);
      if (selectedFile && fileType.includes(selectedFile.type)) {
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onload = (e) => {
          setPDFFile(e.target?.result as string);
        };
        setPreviewTitle(selectedFile.name);
      } else {
        setPDFFile(null);
      }
    } else {
      console.log("Please select a PDF file.");
    }
  };

  const oke = () => {
    console.log("ok");
  };
  return (
    <>
      <ContentHeader>
        <div>
          <h2>
            <Text tid="applicationDetail" />
          </h2>
        </div>

        <StyledButton onClick={showModal}>
          <Tooltip title="Öğrencinin daha önce yapılmış stajları burada görüntülenir.">
            <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
          </Tooltip>
          Geçmiş Stajlar
        </StyledButton>
        <Modal
          centered
          open={open}
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          width={1000}
          footer={null}
        >
          <PastInternshipsContainer />
        </Modal>
      </ContentHeader>
      {/*  <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ButtonsContainer>
          <input type="file" onChange={handleOnChange} />
          <button type="submit">View PDF</button>
        </ButtonsContainer>

        <Modal
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={handlePDFCancel}
          width={600}
        >
          <PdfViewer fileUrl={viewPdf} />
        </Modal>
      </form> */}
    </>
  );
};

export default Evaluate;
