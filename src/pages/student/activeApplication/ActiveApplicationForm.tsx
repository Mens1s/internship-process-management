import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import styled from "styled-components";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import type { RcFile, UploadProps } from "antd/es/upload";
import useLanguage from "src/hooks/useLanguage";
import { Text } from "src/context/LanguageProvider";
import type { SelectProps } from "antd";
import { message, Skeleton } from "antd";
import moment from "moment";

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
import useDepartments from "src/hooks/useDepartments";
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
  const [loadingOptions, setLoadingOptions] = useState(false);
  const [form] = Form.useForm();
  const [updatedData, setUpdatedData] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(true); // Introduce loading state

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Staj bilgileri güncellendi!",
    });
  };

  const errorMessage = () => {
    messageApi.open({
      type: "error",
      content: "Bir hata oluştu. Lütfen tekrar deneyiniz.",
      duration: 5,
    });
  };

  const initialValues = {
    idNumber: data?.tc,
    studentId: data?.studentNumber,
    faculty: data?.faculty,
    engineerName: data?.engineerName,
    engineerMail: data?.engineerMail,
    department: data?.departmentId,
    companyName: data?.companyId,
    sgkEntry: data?.sgkEntry,
    gssEntry: data?.gssEntry,
    startDate: data?.startDate ? moment(data.startDate) : null,
    endDate: data?.endDate ? moment(data.endDate) : null,
    phoneNumber: data?.telephoneNumber,
    internshipType: data?.internshipType,
    internshipNumber: data?.internshipNumber,
    position: data?.position,
    choiceReason: data?.choiceReason,
    classNumber: data?.classNumber,
  };

  const departmentOptions = useDepartments();
  const [companyOptionss, setCompanyOptionss] = useState<
    SelectProps["options"]
  >([]);

  const companyOptions: SelectProps["options"] = [];

  const showModal = () => {
    setIsModalOpen(true);
    console.log("form", form.getFieldsValue());
    console.log("data ", data);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const handleDelete = () => {
    const jwtToken = window.localStorage.getItem("token");

    axios
      .delete("http://localhost:8000/api/internship-process/delete", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        params: {
          internshipProcessID: 53,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log("error: ");
        errorMessage();
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/company/getAll")
      .then((response) => {
        response.data?.companyList.map((company: any, index: any) => {
          companyOptions.push({ value: index + 1, label: company.companyName });
        });
        setCompanyOptionss(companyOptions);
      })
      .catch((error) => {
        console.error("Error fetching department options:", error);
      });
  }, []);

  const handleApplication = () => {
    const jwtToken = window.localStorage.getItem("token");
    const formData = form.getFieldsValue();

    const postData = {
      id: 54, // Process Id
      tc: formData?.idNumber,
      studentNumber: formData?.studentId,
      telephoneNumber: formData?.phoneNumber,
      classNumber: formData?.classNumber,
      position: formData?.position,
      internshipType: formData?.internshipType,
      internshipNumber: formData?.internshipNumber,
      startDate: formData?.startDate,
      endDate: formData?.endDate,
      companyId: formData?.companyName,
      departmentId: formData?.department,
      engineerMail: formData?.engineerMail,
      engineerName: formData?.engineerName,
      choiceReason: formData?.choiceReason,
      sgkEntry: formData?.sgkEntry,
      gssEntry: formData.gssEntry,
      mustehaklikBelgesiPath: "/path/to/mustehaklikBelgesi.pdf",
      stajYeriFormuPath: "/path/to/stajYeriFormu.pdf",
      mufredatDurumuPath: "/path/to/mufredatDurumu.pdf",
      transkriptPath: "/path/to/transkript.pdf",
      dersProgramıPath: "/path/to/dersProgramı.pdf",
      donem_ici: true,
    };
    const postData1 = {
      id: 54, // Replace with the actual value
      tc: "12345678901", // Replace with the actual value
      studentNumber: "S123456", // Replace with the actual value
      telephoneNumber: "1234567890", // Replace with the actual value
      classNumber: 3, // Replace with the actual value
      position: "Software Engineer", // Replace with the actual value
      internshipType: "Summer Internship", // Replace with the actual value
      internshipNumber: 1, // Replace with the actual value
      startDate: "2023-01-01", // Replace with the actual value
      endDate: "2023-12-31", // Replace with the actual value
      companyId: 1, // Replace with the actual value
      departmentId: 1, // Replace with the actual value
      engineerMail: "engineer@example.com", // Replace with the actual value
      engineerName: "John Doe", // Replace with the actual value
      choiceReason:
        "I am interested in gaining experience in web development. I am interested in gaining experience in web development. I am interested in gaining experience in web development. I am interested in gaining experience in web development.", // Replace with the actual value
      sgkEntry: true, // Replace with the actual value
      gssEntry: false, // Replace with the actual value
      mustehaklikBelgesiPath: "/path/to/mustehaklikBelgesi.pdf", // Replace with the actual value
      stajYeriFormuPath: "/path/to/stajYeriFormu.pdf", // Replace with the actual value
      mufredatDurumuPath: "/path/to/mufredatDurumu.pdf", // Replace with the actual value4
      transkriptPath: "/path/to/transkript.pdf", // Replace with the actual value
      dersProgramıPath: "/path/to/dersProgramı.pdf", // Replace with the actual value
      donem_ici: true, // Replace with the actual value
    };

    axios
      .put("http://localhost:8000/api/internship-process/update", postData, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        console.log(response);
        success();
      })
      .catch((error) => {
        console.log("error:", error);
        console.log(jwtToken);
        errorMessage();
      });

    setIsModalOpen(false);
  };

  const handleSend = () => {
    const jwtToken = window.localStorage.getItem("token");
    axios
      .post("http://localhost:8000/api/internship-process/start", null, {
        params: {
          processId: 54,
        },
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log("error:", error.response);
        console.log(jwtToken);
        errorMessage();
      });
  };

  return (
    <div>
      {contextHolder}
      <>
        <Form
          form={form}
          layout="vertical"
          size="large"
          initialValues={initialValues}
        >
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
              <Form.Item name="classNumber" label={dictionary.grade}>
                <Select>
                  <Select.Option value="0" key="Hazırlık">
                    <Text tid="preparation" />
                  </Select.Option>
                  <Select.Option value="1">
                    <Text tid="1stgrade" />
                  </Select.Option>
                  <Select.Option value="2">
                    <Text tid="2ndgrade" />
                  </Select.Option>
                  <Select.Option value="3">
                    <Text tid="3rdgrade" />
                  </Select.Option>
                  <Select.Option value="4">
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
                name="internshipNumber"
                label={dictionary.whichInternship}
              >
                <Select>
                  <Select.Option value="1">1</Select.Option>
                  <Select.Option value="2">2</Select.Option>
                </Select>
              </Form.Item>

              <DatePickersContainer>
                <Form.Item name="startDate" label={dictionary.internshipDates}>
                  <DatePicker />
                </Form.Item>

                <Form.Item name="endDate" label=" ">
                  <DatePicker />
                </Form.Item>
              </DatePickersContainer>

              <Form.Item name="companyName" label={dictionary.companyName}>
                <Select options={companyOptionss} />
              </Form.Item>
              <Form.Item
                name="companyAddress"
                label={dictionary.companyAddress}
              >
                <TextArea rows={1} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item name="companyNumber" label={dictionary.companyNumber}>
                <Input />
              </Form.Item>
              <Form.Item
                name="companyFaxNumber"
                label={dictionary.companyFaxNumber}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="engineerName"
                label={dictionary.engineerNameSurname}
              >
                <Input />
              </Form.Item>
              <Form.Item name="engineerMail" label={dictionary.engineerMail}>
                <Input />
              </Form.Item>
              <Form.Item name="position" label={dictionary.positionToWork}>
                <Input />
              </Form.Item>
              <Form.Item
                name="choiceReason"
                label={dictionary.reasonForCompany}
              >
                <TextArea rows={5} />
              </Form.Item>
              <Form.Item name="sgkEntry" label={dictionary.sgkEntry}>
                <Input />
              </Form.Item>
              <Form.Item name="gssEntry" label={dictionary.gssEntry}>
                <Input />
              </Form.Item>
              {/*  <Form.Item
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
              </Form.Item> */}

              <DatePickersContainer>
                <Button onClick={handleDelete} danger>
                  Sil
                </Button>
                <Button onClick={showModal} type="primary">
                  Kaydet
                </Button>
                <Button type="default" onClick={handleSend}>
                  Başvuruyu Onayla
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
