import React, { useState, ChangeEvent, FormEvent } from "react";
import styled from "styled-components";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import type { RcFile, UploadProps } from "antd/es/upload";
import useLanguage from "src/hooks/useLanguage";
import { Text } from "src/context/LanguageProvider";
import type { DescriptionsProps } from "antd";
import { Descriptions } from "antd";
import axios from "src/services/axios";
import useAuth from "src/hooks/useAuth";
// Import styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

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
  gap: 10px;

  div {
    width: 100%;
  }

  button {
    @media (max-width: 600px) {
      width: 100%;
    }
  }
`;

const postData = {
  id: 1, // Replace with the actual value
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

const items = [
  {
    key: "id",
    label: "Id",
    children: postData.id.toString(),
  },
  {
    key: "tc",
    label: "Tc",
    children: postData.tc,
  },
  {
    key: "studentNumber",
    label: "Student Number",
    children: postData.studentNumber,
  },
  {
    key: "telephoneNumber",
    label: "Telephone Number",
    children: postData.telephoneNumber,
  },
  {
    key: "classNumber",
    label: "Class Number",
    children: postData.classNumber.toString(),
  },
  {
    key: "position",
    label: "Position",
    children: postData.position,
  },
  {
    key: "internshipType",
    label: "Internship Type",
    children: postData.internshipType,
  },
  {
    key: "internshipNumber",
    label: "Internship Number",
    children: postData.internshipNumber.toString(),
  },
  {
    key: "startDate",
    label: "Start Date",
    children: postData.startDate,
  },
  {
    key: "endDate",
    label: "End Date",
    children: postData.endDate,
  },
  {
    key: "companyId",
    label: "Company Id",
    children: postData.companyId.toString(),
  },
  {
    key: "departmentId",
    label: "Department Id",
    children: postData.departmentId.toString(),
  },
  {
    key: "engineerMail",
    label: "Engineer Mail",
    children: postData.engineerMail,
  },
  {
    key: "engineerName",
    label: "Engineer Name",
    span: 2,
    children: postData.engineerName,
  },
  {
    key: "choiceReason",
    label: "Choice Reason",
    span: 3,
    children: postData.choiceReason,
  },
  {
    key: "sgkEntry",
    label: "SGK Entry",
    children: postData.sgkEntry.toString(),
  },
  {
    key: "gssEntry",
    label: "GSS Entry",
    children: postData.gssEntry.toString(),
  },
  {
    key: "mustehaklikBelgesiPath",
    label: "Mustehaklik Belgesi Path",
    children: postData.mustehaklikBelgesiPath,
  },
  {
    key: "stajYeriFormuPath",
    label: "Staj Yeri Formu Path",
    children: postData.stajYeriFormuPath,
  },
];

console.log(items);

interface ActiveApplicationFormProps {
  data?: any;
}

const ActiveApplicationViewForm: React.FC<ActiveApplicationFormProps> = ({
  data,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [editable, setEditable] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { dictionary } = useLanguage();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const handleApplication = () => {
    const jwtToken = window.localStorage.getItem("token");

    // Example data for the post request
    const postData = {
      id: 1, // Replace with the actual value
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
      choiceReason: "I am interested in gaining experience in web development.", // Replace with the actual value
      sgkEntry: true, // Replace with the actual value
      gssEntry: false, // Replace with the actual value
      mustehaklikBelgesiPath: "/path/to/mustehaklikBelgesi.pdf", // Replace with the actual value
      stajYeriFormuPath: "/path/to/stajYeriFormu.pdf", // Replace with the actual value
    };

    axios
      .put("http://localhost:8000/api/internship-process/update", postData, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log("error:", error);
        console.log(jwtToken);
      });

    setIsModalOpen(false);
  };

  return <Descriptions bordered layout="vertical" items={items} />;
};

export default ActiveApplicationViewForm;
