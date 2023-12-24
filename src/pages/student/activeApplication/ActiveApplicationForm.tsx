import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import styled from "styled-components";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import type { RcFile, UploadProps } from "antd/es/upload";
import useLanguage from "src/hooks/useLanguage";
import { Text } from "src/context/LanguageProvider";
import type { SelectProps } from "antd";
import moment from "moment";
import {
  Row,
  Col,
  Space,
  Divider,
  Checkbox,
  message,
  Skeleton,
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
import type { InputRef } from "antd";

import axios from "src/services/axios";
import useAuth from "src/hooks/useAuth";
// Import styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import useDepartments from "src/hooks/useDepartments";
import { useNavigate } from "react-router-dom";
import CompanyAdd from "src/pages/admin/companies/companyAdd/CompanyAdd";
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
  const [messageApi, contextHolder] = message.useMessage();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [isAddCompanyModalOpen, setIsAddCompanyModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleAddCompany = () => {
    setIsAddCompanyModalOpen(false);
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Staj bilgileri güncellendi!",
    });
  };

  const errorMessage = (content?: any) => {
    messageApi.open({
      type: "error",
      content: content ? content : "Bir hata oluştu. Lütfen tekrar deneyiniz.",
      duration: 5,
    });
  };

  const initialValues = {
    idNumber: data?.tc,
    studentId: data?.studentNumber,
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
  const [companyOptions, setCompanyOptions] = useState<SelectProps["options"]>(
    []
  );

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsAddCompanyModalOpen(false);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const handleDelete = () => {
    const jwtToken = window.localStorage.getItem("token");
    setDeleteLoading(true);
    axios
      .delete("http://localhost:8000/api/internship-process/delete", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        params: {
          internshipProcessID: data.id,
        },
      })
      .then((response) => {
        navigate("/ogrenci/past");
      })
      .catch((error) => {
        console.log("error: ");
        errorMessage();
      })
      .finally(() => {
        setDeleteLoading(false);
      });
  };

  const options: SelectProps["options"] = [];
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/company/getAll")
      .then((response) => {
        response.data?.companyList.map((company: any) => {
          options.push({ value: company.id, label: company.companyName });
        });
        setCompanyOptions(options);
      })
      .catch((error) => {
        console.error("Error fetching department options:", error);
      });
  }, []);

  const handleUpdate = () => {
    const jwtToken = window.localStorage.getItem("token");
    const formData = form.getFieldsValue();

    const postData = {
      id: data.id, // Process Id
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
      stajRaporuPath: "/path/to/stajRaporu.pdf",
      comment: "biasda",
    };

    setSaveLoading(true);
    axios
      .put("http://localhost:8000/api/internship-process/update", postData, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        success();
      })
      .catch((error) => {
        console.log("error:", error);
        const message =
          error.response.status == 400
            ? "Bütün bilgileri doğru girdiğinizden emin olunuz."
            : "Bir hata oluştu. Lütfen tekrar deneyiniz.";
        errorMessage(message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const handleStart = () => {
    const jwtToken = window.localStorage.getItem("token");
    setConfirmLoading(true);
    setIsModalOpen(false);

    axios
      .post("http://localhost:8000/api/internship-process/start", null, {
        params: {
          processId: data.id,
        },
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        navigate("/ogrenci/past", { replace: true });
        success();
      })
      .catch((error) => {
        console.log("error:", error.response);
        const message =
          error.response.status == 400
            ? "Başvuru formu boş bırakılamaz."
            : "Bir hata oluştu. Lütfen tekrar deneyiniz.";
        errorMessage(message);
      })
      .finally(() => {
        setConfirmLoading(false);
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
              <Form.Item
                rules={[
                  { required: true, message: "Please input your ID number!" },
                ]}
                name="idNumber"
                label={dictionary.idNumber}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="studentId"
                label={dictionary.studentId}
                rules={[
                  { required: true, message: "Please input your student ID!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="phoneNumber"
                label={dictionary.phoneNumber}
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="department"
                label={dictionary.department}
                rules={[
                  { required: true, message: "Please input your department!" },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Ara"
                  optionFilterProp="children"
                  filterOption={(input: any, option: any) =>
                    (option?.label ?? "").toLowerCase().includes(input)
                  }
                >
                  {departmentOptions}
                </Select>
              </Form.Item>
              <Form.Item
                name="classNumber"
                label={dictionary.grade}
                rules={[
                  { required: true, message: "Please input your grade!" },
                ]}
              >
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
                rules={[
                  {
                    required: true,
                    message: "Please input your role in internship",
                  },
                ]}
                name="roleInInternship"
                label={dictionary.roleInInternship}
              >
                <Input />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please input your internship type",
                  },
                ]}
                name="internshipType"
                label={dictionary.internshipType}
              >
                <Input />
              </Form.Item>
              <Form.Item
                rules={[
                  { required: true, message: "Please input your student ID!" },
                ]}
                name="internshipNumber"
                label={dictionary.whichInternship}
              >
                <Select>
                  <Select.Option value="1">1</Select.Option>
                  <Select.Option value="2">2</Select.Option>
                </Select>
              </Form.Item>

              <DatePickersContainer>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Please input your student ID!",
                    },
                  ]}
                  name="startDate"
                  label={dictionary.internshipDates}
                >
                  <DatePicker />
                </Form.Item>

                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Please input your student ID!",
                    },
                  ]}
                  name="endDate"
                  label=" "
                >
                  <DatePicker />
                </Form.Item>
              </DatePickersContainer>

              <Form.Item
                rules={[
                  { required: true, message: "Please input your student ID!" },
                ]}
                name="companyName"
                label={dictionary.companyName}
              >
                <Select
                  showSearch
                  placeholder="Ara"
                  optionFilterProp="children"
                  filterOption={(input: any, option: any) =>
                    (option?.label ?? "").toLowerCase().includes(input)
                  }
                  options={companyOptions}
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider style={{ margin: "8px 0" }} />
                      <Button
                        type="text"
                        icon={<PlusOutlined />}
                        onClick={() => setIsAddCompanyModalOpen(true)}
                        style={{ width: "100%" }}
                      >
                        Şirket Ekle
                      </Button>
                    </>
                  )}
                />
              </Form.Item>
              <Modal
                title="Basic Modal"
                open={isAddCompanyModalOpen}
                onOk={handleAddCompany}
                onCancel={handleCancel}
              >
                <CompanyAdd />
              </Modal>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                rules={[
                  { required: true, message: "Please input your student ID!" },
                ]}
                name="engineerName"
                label={dictionary.engineerNameSurname}
              >
                <Input />
              </Form.Item>
              <Form.Item
                rules={[
                  { required: true, message: "Please input your student ID!" },
                ]}
                name="engineerMail"
                label={dictionary.engineerMail}
              >
                <Input type="email" />
              </Form.Item>
              <Form.Item
                rules={[
                  { required: true, message: "Please input your student ID!" },
                ]}
                name="position"
                label={dictionary.positionToWork}
              >
                <Input />
              </Form.Item>
              <Form.Item
                rules={[
                  { required: true, message: "Please input your student ID!" },
                ]}
                name="choiceReason"
                label={dictionary.reasonForCompany}
              >
                <TextArea rows={5} />
              </Form.Item>
              <Form.Item
                rules={[
                  { required: true, message: "Please input your student ID!" },
                ]}
                name="sgkEntry"
                label={dictionary.sgkEntry}
              >
                <Input />
              </Form.Item>
              <Form.Item
                rules={[
                  { required: true, message: "Please input your student ID!" },
                ]}
                name="gssEntry"
                label={dictionary.gssEntry}
              >
                <Input />
              </Form.Item>
              <Form.Item
                rules={[
                  { required: true, message: "Please input your student ID!" },
                ]}
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
                rules={[
                  { required: true, message: "Please input your student ID!" },
                ]}
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
                <Button onClick={handleDelete} danger loading={deleteLoading}>
                  Sil
                </Button>
                <Button
                  onClick={handleUpdate}
                  type="primary"
                  loading={saveLoading}
                >
                  Kaydet
                </Button>
                <Button
                  type="default"
                  onClick={showModal}
                  loading={confirmLoading}
                  htmlType="submit"
                >
                  Başvuruyu Onayla
                </Button>
              </DatePickersContainer>
            </Col>
          </Row>
          <Modal
            title="Başvuruyu Onayla"
            open={isModalOpen}
            onOk={handleStart}
            onCancel={handleCancel}
          >
            <p>
              <Text tid="createApplicationFormApprovementModalText" />
            </p>
          </Modal>
        </Form>
      </>
    </div>
  );
};

export default ActiveApplicationForm;
