import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import styled from "styled-components";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import type { RcFile, UploadProps } from "antd/es/upload";
import useLanguage from "src/hooks/useLanguage";
import { Text } from "src/context/LanguageProvider";
import type { SelectProps, Spin } from "antd";

import {
  Row,
  Col,
  Checkbox,
  Form,
  Input,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  Radio,
  Switch,
  Modal,
  Upload,
  Button,
} from "antd";
import axios from "src/services/axios";
import useAuth from "src/hooks/useAuth";
// Import styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
const { RangePicker } = DatePicker;
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

interface ActiveApplicationFormProps {
  data?: any;
}

const ActiveApplicationForm: React.FC<ActiveApplicationFormProps> = ({
  data,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { dictionary } = useLanguage();
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [loadingOptions, setLoadingOptions] = useState(false);

  const [companyOptionss, setCompanyOptionss] = useState<
    SelectProps["options"]
  >([]);

  /*   const [companyOptions, setCompanyOptions] = useState([]);
   */ const companyOptions: SelectProps["options"] = [];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/department/getAll")
      .then((response) => {
        setDepartmentOptions(
          response.data.departmentList.map((department: any) => (
            <Select.Option key={department.id} value={department.id}>
              {department.name}
            </Select.Option>
          ))
        );
      })
      .catch((error) => {
        console.error("Error fetching department options:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/company/getAll")
      .then((response) => {
        response.data?.companyList.map((company: any, index: any) => {
          companyOptions.push({ value: index, label: company.companyName });
        });
        setCompanyOptionss(companyOptions);
      })
      .catch((error) => {
        console.error("Error fetching department options:", error);
      });
  }, []);

  // Example data for the post request
  const postData = {
    id: 2, // Replace with the actual value
    tc: "12345678901", // Replace with the actual value
    studentNumber: "S123456", // Replace with the actual value
    telephoneNumber: "1234567890", // Replace with the actual value
    classNumber: 3, // Replace with the actual value
    position: "Software Engineer", // Replace with the actual value
    internshipType: "Summer Internship", // Replace with the actual value
    internshipNumber: 456, // Replace with the actual value
    startDate: "2023-01-01", // Replace with the actual value
    endDate: "2023-12-31", // Replace with the actual value
    companyId: 1, // Replace with the actual value
    departmentId: 1, // Replace with the actual value
    engineerMail: "engineer@example.com", // Replace with the actual value
    engineerName: "John Doe", // Replace with the actual value
    choiceReason: "I am interested in gaining experience in web development.", // Replace with the actual value
    sgkEntry: true, // Replace with the actual value
    gssEntry: false, // Replace with the actual value
    mustehaklikBelgesiPath: "/path/to/mustehaklikBelgesi.pdf", // Replace with the actual value
    stajYeriFormuPath: "/path/to/stajYeriFormu.pdf", // Replace with the actual value
  };
  const handleApplication = () => {
    const jwtToken = window.localStorage.getItem("token");

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

  const mockInternshipProcessData = {
    logDates: {
      createdDate: new Date(),
      lastModifiedDate: new Date(),
    },
    student: {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      // ... other student properties
    },
    tc: "1234567890",
    studentNumber: "S12345",
    telephoneNumber: "123-456-7890",
    classNumber: 3,
    position: "Intern",
    internshipType: "Summer Internship",
    internshipNumber: 1,
    startDate: new Date("2023-06-01"),
    endDate: new Date("2023-08-31"),
    requestedEndDate: new Date("2023-08-31"),
    company: {
      id: 1,
      name: "ABC Corporation",
      // ... other company properties
    },
    department: {
      id: 1,
      name: "Software Engineering",
      // ... other department properties
    },
    engineerMail: "engineer@example.com",
    engineerName: "Jane Engineer",
    choiceReason: "Interest in the company culture and projects",
    sgkEntry: true,
    gssEntry: false,
    assignerId: 2,
    mustehaklikBelgesiPath: "/path/to/mustehaklik_belgesi.pdf",
    stajYeriFormuPath: "/path/to/staj_yeri_formu.pdf",
    donem_ici: false,
    mufredatDurumuPath: "/path/to/mufredat_durumu.pdf",
    transkriptPath: "/path/to/transkript.pdf",
    dersProgramıPath: "/path/to/ders_programi.pdf",
    processStatus: "FORM", // Replace with the actual ProcessStatusEnum value
    editable: true,
    processAssignees: [
      {
        id: 1,
        assigneeName: "Supervisor 1",
        // ... other ProcessAssignee properties
      },
      // ... other assignees
    ],
  };

  const handleSend = () => {
    const jwtToken = window.localStorage.getItem("token");
    axios
      .post("http://localhost:8000/api/internship-process/start", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        params: {
          processId: 1,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log("error:", error.response.data);
        console.log(jwtToken);
      });
  };

  const initialValues = {
    idNumber: data?.idNumber,
    grade: "Hazırlık",
    // Add more fields as needed
  };

  return (
    <div>
      <>
        {/*  <Checkbox
          checked={componentDisabled}
          onChange={(e) => setComponentDisabled(e.target.checked)}
        >
          Form disabled
        </Checkbox> */}
        <Form layout="vertical" size="large" initialValues={initialValues}>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item name="idNumber" label={dictionary.idNumber}>
                <Input />
              </Form.Item>
              <Form.Item name="studentId" label={dictionary.studentId}>
                <Input />
              </Form.Item>
              <Form.Item name="phoneNumber" label={dictionary.phoneNumber}>
                <Input />
              </Form.Item>
              <Form.Item name="faculty" label={dictionary.faculty}>
                <Input />
              </Form.Item>
              <Form.Item name="department" label={dictionary.department}>
                <Select>{departmentOptions}</Select>
              </Form.Item>
              <Form.Item name="grade" label={dictionary.grade}>
                <Select>
                  <Select.Option value="Hazırlık" key="Hazırlık">
                    <Text tid="preparation" />
                  </Select.Option>
                  <Select.Option value="1.sınıf">
                    <Text tid="1stgrade" />
                  </Select.Option>
                  <Select.Option value="2.sınıf">
                    <Text tid="2ndgrade" />
                  </Select.Option>
                  <Select.Option value="3.sınıf">
                    <Text tid="3rdgrade" />
                  </Select.Option>
                  <Select.Option value="4.sınıf">
                    <Text tid="4thgrade" />
                  </Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="roleInInternship"
                label={dictionary.roleInInternship}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="internshipType"
                label={dictionary.internshipType}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="whichInternship"
                label={dictionary.whichInternship}
              >
                <Select>
                  <Select.Option value="1">1</Select.Option>
                  <Select.Option value="2">2</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label={dictionary.internshipDates}>
                <DatePickersContainer>
                  <DatePicker />
                  <DatePicker />
                </DatePickersContainer>
              </Form.Item>
              <Form.Item name="" label={dictionary.companyName}>
                <Select options={companyOptionss} />
              </Form.Item>
              <Form.Item name="" label={dictionary.companyAddress}>
                <TextArea rows={1} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item name="" label={dictionary.companyNumber}>
                <Input />
              </Form.Item>
              <Form.Item name="" label={dictionary.companyFaxNumber}>
                <Input />
              </Form.Item>
              <Form.Item name="" label={dictionary.engineerNameSurname}>
                <Input />
              </Form.Item>
              <Form.Item name="" label={dictionary.engineerMail}>
                <Input />
              </Form.Item>
              <Form.Item name="" label={dictionary.positionToWork}>
                <Input />
              </Form.Item>
              <Form.Item name="" label={dictionary.reasonForCompany}>
                <TextArea rows={5} />
              </Form.Item>
              <Form.Item name="" label={dictionary.sgkEntry}>
                <Input />
              </Form.Item>
              <Form.Item name="" label={dictionary.gssEntry}>
                <Input />
              </Form.Item>
              <Form.Item
                label={dictionary.eligibilityFile}
                valuePropName="file1"
                getValueFromEvent={normFile}
              >
                <Upload
                  action="/upload.do"
                  listType="picture"
                  onChange={handleChange}
                  fileList={fileList}
                >
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </Form.Item>
              <Form.Item
                label={dictionary.internshipForm}
                valuePropName="file2"
                getValueFromEvent={normFile}
              >
                <Upload
                  action="/upload.do"
                  listType="picture"
                  onChange={handleChange}
                  fileList={fileList}
                >
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </Form.Item>

              <DatePickersContainer>
                <Button onClick={handleCancel}>
                  <Text tid="cancel" />
                </Button>
                <Button onClick={showModal} type="primary">
                  Kaydet
                </Button>
                <Button type="primary" onClick={handleSend}>
                  Onayla
                </Button>
              </DatePickersContainer>
            </Col>
          </Row>
        </Form>
        <Modal
          title="Başvuruyu Onayla"
          open={isModalOpen}
          onOk={handleApplication}
          onCancel={handleCancel}
        >
          <p>
            <Text tid="createApplicationFormApprovementModalText" />
          </p>
        </Modal>
      </>
    </div>
  );
};

export default ActiveApplicationForm;
