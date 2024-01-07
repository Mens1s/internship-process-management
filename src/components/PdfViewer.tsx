import React from "react";
import styled from "styled-components";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

const PDFContainer = styled.div`
  width: 100%;
  height: fit-content;
  height: 900px;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

interface PdfViewerProps {
  fileUrl?: any;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ fileUrl }: any) => {
  const newplugin = defaultLayoutPlugin();

  return (
    <PDFContainer>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        {fileUrl && <Viewer fileUrl={fileUrl} plugins={[newplugin]} />}
        {!fileUrl && <>No PDF</>}
      </Worker>
    </PDFContainer>
  );
};
export default PdfViewer;
