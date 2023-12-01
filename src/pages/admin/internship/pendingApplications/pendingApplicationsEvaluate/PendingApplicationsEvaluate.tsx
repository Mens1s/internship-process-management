import React, { useState, ChangeEvent, FormEvent } from "react";
import styled from "styled-components";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { Modal } from "antd";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import PdfViewer from "../../../../../components/PdfViewer";
import ContentHeader from "../../../../../components/ContentHeader";
import { Text } from "../../../../../context/LanguageProvider";

const ButtonsContainer = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  @media (max-width: 800px) {
    width: 100%;
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
        <h2>
          <Text tid="applicationDetail" />
        </h2>
      </ContentHeader>
      <form
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
      </form>
    </>
  );
};

export default Evaluate;
