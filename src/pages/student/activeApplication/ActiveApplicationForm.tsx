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
import { Popconfirm } from "antd";
import type { RadioChangeEvent } from "antd";
import { Result } from "antd";

import {
  Row,
  Col,
  Divider,
  Checkbox,
  message,
  Skeleton,
  Form,
  Input,
  Select,
  DatePicker,
  Radio,
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
  const [fileList1, setFileList1] = useState<UploadFile[]>([]);
  const [fileList2, setFileList2] = useState<UploadFile[]>([]);
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
      content: dictionary.formDetailsAreUpdated,
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
    /*   mustehaklikBelgesiPath:
      data?.mustehaklikBelgesi[0]?.originFileObj?.name || "",
    stajYeriFormuPath: data?.stajYeriFormu[0]?.originFileObj?.name || "", */
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

  const handleChangeFile1: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => {
    setFileList1(newFileList);
    form.setFieldsValue({
      mustehaklikBelgesiPath: newFileList[0]?.response?.path,
    });
    console.log(newFileList);
  };

  const handleChangeFile2: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => {
    setFileList2(newFileList);
    form.setFieldsValue({ stajYeriFormuPath: newFileList[0]?.response?.path });
  };
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
    const mustehaklikBelgesiPath = formData?.mustehaklikBelgesiPath;
    const stajYeriFormuPath = formData?.stajYeriFormuPath;
    console.log(formData);

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
      gssEntry: formData?.gssEntry,
      mustehaklikBelgesiPath: mustehaklikBelgesiPath || "/path/to/default.pdf",
      stajYeriFormuPath: stajYeriFormuPath || "/path/to/default.pdf",
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
    console.log(form.getFieldsValue());

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
        showSuccessModal();
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

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const showSuccessModal = () => {
    setIsSuccessModalOpen(true);
  };

  const handleSuccessModalOk = () => {
    setIsSuccessModalOpen(false);
    navigate("/ogrenci/past", { replace: true });
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
                  placeholder={dictionary.search}
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
                  placeholder={dictionary.search}
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
                        style={{
                          width: "100%",
                          display: "flex",
                          gap: "10px",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text tid="addCompany" />
                      </Button>
                    </>
                  )}
                />
              </Form.Item>
              <Modal
                title="Add Company"
                width={1000}
                open={isAddCompanyModalOpen}
                onOk={handleAddCompany}
                onCancel={handleCancel}
                footer={null}
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
                <Radio.Group>
                  <Radio value={true}>Var</Radio>
                  <Radio value={false}>Yok</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                rules={[
                  { required: true, message: "Please input your student ID!" },
                ]}
                name="gssEntry"
                label={dictionary.gssEntry}
              >
                <Radio.Group>
                  <Radio value={true}>Var</Radio>
                  <Radio value={false}>Yok</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                rules={[
                  { required: true, message: "Please input your student ID!" },
                ]}
                label={dictionary.eligibilityFile}
                valuePropName="file1"
                getValueFromEvent={normFile}
                name="mustehaklikBelgesi"
              >
                <Upload
                  listType="picture"
                  onChange={handleChangeFile1}
                  fileList={fileList1}
                  data={{ type: "mustehaklikBelgesi" }} // Optional: Additional data for the API
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
                name="stajYeriFormu"
              >
                <Upload
                  listType="picture"
                  onChange={handleChangeFile2}
                  fileList={fileList2}
                  data={{ type: "stajYeriFormu" }}
                >
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </Form.Item>

              <DatePickersContainer>
                <Popconfirm
                  title="Delete the applicaton"
                  description="Are you sure to delete this application?"
                  onConfirm={handleDelete}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button danger loading={deleteLoading}>
                    <Text tid="delete" />
                  </Button>
                </Popconfirm>
                <Button
                  onClick={handleUpdate}
                  type="primary"
                  loading={saveLoading}
                >
                  <Text tid="save" />
                </Button>
                <Button
                  type="default"
                  onClick={showModal}
                  loading={confirmLoading}
                  htmlType="submit"
                >
                  <Text tid="confirmApplication" />
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
          <Modal open={isSuccessModalOpen} footer={null} closable={false}>
            <Result
              status="success"
              title="Staj başvurunuz başarıyla alınmıştır!"
              subTitle="Başvurularım sayfasından başvurunuzun onay durumunu ve detaylarını inceleyebilirsiniz."
              extra={[
                <Button type="primary" onClick={handleSuccessModalOk}>
                  Tamam
                </Button>,
              ]}
            />
          </Modal>
        </Form>
      </>
    </div>
  );
};

export default ActiveApplicationForm;
