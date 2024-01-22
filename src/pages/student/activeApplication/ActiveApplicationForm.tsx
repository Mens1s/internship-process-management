import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  UploadOutlined,
  PlusOutlined,
  FilePdfOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import useLanguage from "src/hooks/useLanguage";
import { Text } from "src/context/LanguageProvider";
import type { SelectProps } from "antd";
import moment, { duration } from "moment";
import { Popconfirm } from "antd";
import { Result, Spin, Tooltip } from "antd";
import type { RangePickerProps } from "antd/es/date-picker";
import PdfViewer from "src/components/PdfViewer";
import { TbFileFilled } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
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
import axios from "src/services/axios";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import useDepartments from "src/hooks/useDepartments";
import { useNavigate } from "react-router-dom";
import CompanyAdd from "src/pages/admin/companies/addCompany/AddCompanyForm";
import { API } from "src/config/api";
import getAxiosConfig from "src/config/axiosConfig";
import { validateApplicationForm } from "./applicationFormValidation";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

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

const StyledMdDelete = styled(MdDelete)`
  border-radius: 10px;
  color: #869bbd;
  font-size: 1.2rem;
  padding: 5px;
  box-sizing: content-box;
  transition: 0.3s;

  &:hover {
    background: #c5d0de;
  }
`;
const List = styled.div``;
const ListItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 5px 10px;
  border-radius: 10px;
  transition: 0.3s;
  background: #f0f4f9;
  border: 1px solid #cfd8e3;

  &:hover {
    background: #dfe4eb;
  }

  margin-bottom: 20px;
`;

interface ActiveApplicationFormProps {
  data?: any;
  reload?: any;
}

const ActiveApplicationForm: React.FC<ActiveApplicationFormProps> = ({
  data,
  reload,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saveDisabled, setSaveDisabled] = useState(false);
  const { dictionary } = useLanguage();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [stajLoading, setStajLoading] = useState(false);
  const [mustehaklikLoading, setMustehaklikLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [isAddCompanyModalOpen, setIsAddCompanyModalOpen] = useState(false);
  const [viewStajLoading, setViewStajLoading] = useState(false);
  const [viewMustehaklikLoading, setViewMustehaklikLoading] = useState(false);
  const navigate = useNavigate();
  const [fileStajName, setFileStajName] = useState(data?.stajYeriFormuName);
  const [fileMustehaklikName, setFileMustehaklikName] = useState(
    data?.mustehaklikBelgesiName
  );

  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [pdfFileUrl, setPdfFileUrl] = useState("");

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {}, [form]);

  const handleView = async (file: any, loadNum: any) => {
    loadNum === 1 ? setViewStajLoading(true) : setViewMustehaklikLoading(true);
    let jwtToken = window.localStorage.getItem("token");

    try {
      const response = await axios.get(API.FILE.DOWNLOAD_STUDENT, {
        params: {
          fileId: file,
        },
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));

      setPdfFileUrl(url);
      setIsPdfModalOpen(true);
    } catch (error) {
      console.log(error);
      message.error("Dosyayı görüntülerken bir sorunla karşılaştık.");
    } finally {
      loadNum === 1
        ? setViewStajLoading(false)
        : setViewMustehaklikLoading(false);
    }
  };

  const handleDeletePDF = (file: any, type: any) => {
    let jwtToken = window.localStorage.getItem("token");
    type === "stajYeriFormuID"
      ? setViewStajLoading(true)
      : setViewMustehaklikLoading(true);
    axios
      .get(API.FILE.DELETE, {
        params: {
          fileId: file,
          processId: data.id,
          type: type,
        },
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        message.success("Dosya kaldırıldı");
        console.log("File deleted successfully", response);
        type == "stajYeriFormuID"
          ? setFileStajName(null)
          : setFileMustehaklikName(null);
        reload();
      })
      .catch((error) => {
        message.error("Dosya kaldırılırken bir sorun oluştu");
        console.error("Error deleting file", error);
      })
      .finally(() => {
        type === "stajYeriFormuID"
          ? setViewStajLoading(false)
          : setViewMustehaklikLoading(false);
      });
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

  const handleFileChangeStajYeri = async (fileList: any) => {
    const selectedFile = fileList;
    setStajLoading(true);
    setSaveDisabled(true);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("type", "stajYeriFormuID");
    formData.append("processId", data.id);
    let jwtToken = window.localStorage.getItem("token");

    try {
      const response = await fetch(API.FILE.UPLOAD, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (response.ok) {
        setFileStajName(fileList.name);
        message.success("Staj yeri formu yüklendi!");
        reload();
      } else {
        message.error("Failed to upload file.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      message.error("An error occurred while uploading the file.");
    } finally {
      setStajLoading(false);
      setSaveDisabled(false);
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
    };
    const isValid = validateApplicationForm(postData);
    if (isValid?.status === true) {
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
    } else {
      message.error(isValid.message);
    }
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

  const handleFileChangeMustehaklik = async (file: any) => {
    setMustehaklikLoading(true);
    setSaveDisabled(true);
    console.log("file", file);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "mustehaklikBelgesiID");
    formData.append("processId", data.id);
    let jwtToken = window.localStorage.getItem("token");

    try {
      const response = await fetch(API.FILE.UPLOAD, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (response.ok) {
        message.success("Müstehaklık belgesi yüklendi!");
        setFileMustehaklikName(file.name);
        reload();
      } else {
        message.error("Failed to upload file.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      message.error("An error occurred while uploading the file.");
    } finally {
      setMustehaklikLoading(false);
      setSaveDisabled(false);
    }
  };

  const addCompanyRequest = (postData: any, form: any, setLoading: any) => {
    axios
      .post(API.COMPANY.ADD, postData, getAxiosConfig())
      .then((response) => {
        message.success("Şirket başarıyla eklendi!");
        form.resetFields();
      })
      .catch((error) => {
        console.log("error:", error);
        if (error.response?.status == 400) {
          message.error("Form boş bırakılamaz!");
        } else {
          message.error(dictionary.generalErrorMessage);
        }
      })
      .finally(() => setLoading(false));
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
                <Input placeholder="Zorunlu / İsteğe Bağlı" />
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
                  <DatePicker format="YYYY-MM-DD" />
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
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
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
                <CompanyAdd addCompanyRequest={addCompanyRequest} />
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

              <Form.Item
                name="stajYeriFormu"
                label="Staj Yeri Formu"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                style={{ marginBottom: 10 }}
              >
                <Upload
                  listType="picture"
                  accept=".pdf"
                  showUploadList={false}
                  maxCount={1}
                  customRequest={(options) => {
                    handleFileChangeStajYeri(options.file);
                  }}
                >
                  <Button loading={stajLoading} icon={<UploadOutlined />}>
                    Upload
                  </Button>
                </Upload>
              </Form.Item>
              {fileStajName && (
                <List>
                  <ListItem
                    onClick={() => handleView(data?.stajYeriFormuID, 1)}
                  >
                    {viewStajLoading ? (
                      <Spin
                        size="small"
                        style={{ color: "#869bbd" }}
                        indicator={
                          <LoadingOutlined style={{ fontSize: 24 }} spin />
                        }
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <TbFileFilled
                            style={{
                              color: "#869bbd",
                              fontSize: "1.2rem",
                            }}
                          />
                          <p style={{ fontWeight: "500", color: "#869bbd" }}>
                            {fileStajName}
                          </p>
                        </div>
                        <Tooltip title={dictionary.remove}>
                          <div
                            onClick={(e) => {
                              e.stopPropagation(); // Prevents the click event from reaching the parent ListItem
                              handleDeletePDF(
                                data?.stajYeriFormuID,
                                "stajYeriFormuID"
                              );
                            }}
                          >
                            <StyledMdDelete />
                          </div>
                        </Tooltip>
                      </div>
                    )}
                  </ListItem>
                </List>
              )}

              <Form.Item
                name="mustehaklikBelgesi"
                label="Müstehaklık Belgesi"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                style={{ marginBottom: 10 }}
              >
                <Upload
                  listType="picture"
                  showUploadList={false}
                  accept=".pdf"
                  maxCount={1}
                  customRequest={(options) => {
                    handleFileChangeMustehaklik(options.file);
                  }}
                >
                  <Button
                    loading={mustehaklikLoading}
                    icon={<UploadOutlined />}
                  >
                    Upload
                  </Button>
                </Upload>
              </Form.Item>
              {fileMustehaklikName && (
                <List>
                  <ListItem
                    onClick={() => handleView(data?.mustehaklikBelgesiID, 2)}
                  >
                    {viewMustehaklikLoading ? (
                      <Spin
                        size="small"
                        style={{ color: "#869bbd" }}
                        indicator={
                          <LoadingOutlined style={{ fontSize: 24 }} spin />
                        }
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <TbFileFilled
                            style={{
                              color: "#869bbd",
                              fontSize: "1.2rem",
                            }}
                          />
                          <p style={{ fontWeight: "500", color: "#869bbd" }}>
                            {fileMustehaklikName}
                          </p>
                        </div>
                        <Tooltip title={dictionary.remove}>
                          <div
                            onClick={(e) => {
                              e.stopPropagation(); // Prevents the click event from reaching the parent ListItem
                              handleDeletePDF(
                                data?.mustehaklikBelgesiID,
                                "mustehaklikBelgesiID"
                              );
                            }}
                          >
                            <StyledMdDelete />
                          </div>
                        </Tooltip>
                      </div>
                    )}
                  </ListItem>
                </List>
              )}

              <Modal
                title="View PDF"
                width={800}
                open={isPdfModalOpen}
                onCancel={() => setIsPdfModalOpen(false)}
                footer={null}
              >
                <PdfViewer fileUrl={pdfFileUrl} />
              </Modal>

              <DatePickersContainer>
                <Popconfirm
                  title="Delete the applicaton"
                  description="Are you sure to delete this application?"
                  onConfirm={handleDelete}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button
                    disabled={saveDisabled}
                    danger
                    loading={deleteLoading}
                  >
                    <Text tid="delete" />
                  </Button>
                </Popconfirm>
                <Button
                  disabled={saveDisabled}
                  onClick={handleUpdate}
                  type="primary"
                  loading={saveLoading}
                >
                  <Text tid="save" />
                </Button>
                <Button
                  disabled={saveDisabled}
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
              Başvuruyu onaylamadan önce bilgilerinizin son halini
              kaydettiğinizden emin olun.
            </p>
            <br />
            <strong>
              <Text tid="createApplicationFormApprovementModalText" />
            </strong>
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
