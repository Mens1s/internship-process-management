import React, { useState, ChangeEvent, FormEvent } from "react";
import styled from "styled-components";
import { Viewer, Worker } from "@react-pdf-viewer/core";

import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// Import styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
const PDFContainer = styled.div`
  width: 80%;
  height: 900px;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
`;
const PDFViewer: React.FC = () => {
  const [pdfFile, setPDFFile] = useState<string | null>(null);
  const [viewPdf, setViewPdf] = useState<string | null>(null);

  const fileType: string[] = ["application/pdf"];
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onload = (e) => {
          setPDFFile(e.target?.result as string);
        };
      } else {
        setPDFFile(null);
      }
    } else {
      console.log("Please select a PDF file.");
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (pdfFile !== null) {
      setViewPdf(pdfFile);
    } else {
      setViewPdf(null);
    }
  };
  const newplugin = defaultLayoutPlugin();
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleOnChange} />
        <button type="submit">View PDF</button>
        <PDFContainer>
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            {viewPdf && <Viewer fileUrl={viewPdf} plugins={[newplugin]} />}
            {!viewPdf && <>No PDF</>}
          </Worker>
        </PDFContainer>
      </form>
    </div>
  );
};

export default PDFViewer;
