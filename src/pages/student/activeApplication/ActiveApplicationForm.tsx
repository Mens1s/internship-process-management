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
import type { RangePickerProps } from "antd/es/date-picker";
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
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import useDepartments from "src/hooks/useDepartments";
import { useNavigate } from "react-router-dom";
import CompanyAdd from "src/pages/admin/companies/addCompany/AddCompanyForm";
import { API } from "src/config/api";
import getAxiosConfig from "src/config/axiosConfig";
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
  const [fileList2, setFileList2] = useState<UploadFile[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { dictionary } = useLanguage();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [isAddCompanyModalOpen, setIsAddCompanyModalOpen] = useState(false);
  const navigate = useNavigate();
  const [fileStaj, setFileStaj] = useState(null);
  const [fileStajName, setFileStajName] = useState(null);
  const [fileMustehaklik, setFileMustehaklik] = useState(null);
  const [fileMustehaklikName, setFileMustehaklikName] = useState(null);

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

  const handleFileChangeStajYeri = (event: any) => {
    const selectedFile = event.target.files[0];
    setFileStaj(selectedFile);
    setFileStajName(selectedFile.name);
  };

  const handleFileChangeMustehaklik = (event: any) => {
    const selectedFile = event.target.files[0];
    setFileMustehaklik(selectedFile);
    setFileMustehaklikName(selectedFile.name);
  };

  const handleSubmitFirst = async () => {
    const userId = window.localStorage.getItem("id");
    if (!fileStaj) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", fileStaj);
    formData.append("type", "mufredatDurumuID");
    formData.append("processId", data.id);
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
        alert("File uploaded successfully!");
        // Handle success response as needed
      } else {
        // Handle error response
        alert("Failed to upload file.");
      }
    } catch (error) {
      // Handle network errors or exceptions
      console.error("Error uploading file:", error);
      alert("An error occurred while uploading the file.");
    }
  };

  const handleSubmitSecond = async () => {
    const userId = window.localStorage.getItem("id");
    if (!fileMustehaklik) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", fileMustehaklik);
    formData.append("type", "stajRaporuID");
    formData.append("processId", data.id);
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
        alert("File uploaded successfully!");
        // Handle success response as needed
      } else {
        // Handle error response
        alert("Failed to upload file.");
      }
    } catch (error) {
      // Handle network errors or exceptions
      console.error("Error uploading file:", error);
      alert("An error occurred while uploading the file.");
    }
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
    startDate: data?.startDate ? moment(data.startDate, "YYYY-MM-DD") : null,
    endDate: data?.endDate ? moment(data.endDate, "YYYY-MM-DD") : null,
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

  const handleChangeFile2: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => {
    setFileList2(newFileList);
    form.setFieldsValue({ stajYeriFormuPath: newFileList[0] });
  };

  const handleDelete = () => {
    setDeleteLoading(true);
    axios
      .delete(API.INTERNSHIP_PROCESS.DELETE(data.id), getAxiosConfig())
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
      .get(API.COMPANY.GET_ALL)
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
    const formData = form.getFieldsValue();
    const mustehaklikBelgesiPath = formData?.mustehaklikBelgesiPath;
    const stajYeriFormuPath = formData?.stajYeriFormuPath;
    const userId = window.localStorage.getItem("id");


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
      mustehaklikBelgesiPath: userId + "_" + fileMustehaklikName,
      stajYeriFormuPath: userId + "_" + fileStajName,
      mufredatDurumuPath: userId + "_mufredat.pdf",
      transkriptPath: userId + "_transkript.pdf",
      dersProgramıPath: userId + "_dersProgramı.pdf",
      donem_ici: true,
      stajRaporuPath: "id_DOSYAADI.pdf",
      comment: "biasda",
      // mustehaklikBelgesi: fileName,
      //stajYeriFormu: fileList2,
    };

    setSaveLoading(true);
    axios
      .put(API.INTERNSHIP_PROCESS.UPDATE, postData, getAxiosConfig())
      .then((response) => {
        success();
      })
      .catch((error) => {
        console.log("error:", error);
        const message =
          error.response?.status == 400
            ? "Bütün bilgileri doğru girdiğinizden emin olunuz."
            : "Bir hata oluştu. Lütfen tekrar deneyiniz.";
        errorMessage(message);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const handleStart = () => {
    setConfirmLoading(true);
    setIsModalOpen(false);
    axios
      .post(
        API.INTERNSHIP_PROCESS.START_APPROVAL_PROCESS(data.id),
        null,
        getAxiosConfig()
      )
      .then((response) => {
        showSuccessModal();
      })
      .catch((error) => {
        console.log("error:", error.response);
        const message =
          error.response?.status == 400
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

  const disabledStartDate: RangePickerProps["disabledDate"] = (current) => {
    return current < moment().startOf("day");
  };
  const disabledEndDate: RangePickerProps["disabledDate"] = (current) => {
    const today = moment().startOf("day");
    const endOfAllowedRange = today.clone().add(20, "days").endOf("day");

    return current && current < endOfAllowedRange;
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
          hideRequiredMark
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
                    message: "Please input your internship type!",
                  },
                ]}
                name="internshipType"
                label={dictionary.internshipType}
              >
                <Input />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please input your internship number!",
                  },
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
                      message: "Please input start date!",
                    },
                  ]}
                  name="startDate"
                  label={dictionary.internshipDates}
                >
                  <DatePicker
                    format="YYYY-MM-DD"
                    disabledDate={disabledStartDate}
                  />
                </Form.Item>

                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Please input end date!",
                    },
                  ]}
                  name="endDate"
                  label=" "
                >
                  <DatePicker
                    format="YYYY-MM-DD"
                    disabledDate={disabledEndDate}
                  />
                </Form.Item>
              </DatePickersContainer>

              <Form.Item
                rules={[
                  { required: true, message: "Please input company name!" },
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
                onCancel={handleCancel}
                footer={null}
              >
                <CompanyAdd />
              </Modal>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                rules={[
                  { required: true, message: "Please input engineer name!" },
                ]}
                name="engineerName"
                label={dictionary.engineerNameSurname}
              >
                <Input />
              </Form.Item>
              <Form.Item
                rules={[
                  { required: true, message: "Please input engineer mail!" },
                ]}
                name="engineerMail"
                label={dictionary.engineerMail}
              >
                <Input type="email" />
              </Form.Item>
              <Form.Item
                rules={[{ required: true, message: "Please input position!" }]}
                name="position"
                label={dictionary.positionToWork}
              >
                <Input />
              </Form.Item>
              <Form.Item
                rules={[
                  { required: true, message: "Please input chocice reason!" },
                ]}
                name="choiceReason"
                label={dictionary.reasonForCompany}
              >
                <TextArea rows={5} />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please input necessary information!",
                  },
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
                  {
                    required: true,
                    message: "Please input necessary information!",
                  },
                ]}
                name="gssEntry"
                label={dictionary.gssEntry}
              >
                <Radio.Group>
                  <Radio value={true}>Var</Radio>
                  <Radio value={false}>Yok</Radio>
                </Radio.Group>
              </Form.Item>
              <div>
                <input type="file" onChange={handleFileChangeStajYeri} />
                <button onClick={handleSubmitFirst}>Upload</button>
              </div>
              <div>
                <input type="file" onChange={handleFileChangeMustehaklik} />
                <button onClick={handleSubmitSecond}>Upload</button>
              </div>

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
