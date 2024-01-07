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
// Import styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
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
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  console.log("data", data);
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Tatil bilgileri güncellendi!",
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

  useEffect(() => {
    axios
      .get("https://prod-seven-january.onrender.com/api/company/getAll")
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

  const handleHolidayApprove = () => {
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
    setIsModalOpen(false);
    axios
      .put("https://prod-seven-january.onrender.com/api/internship-process/update", postData, {
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
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const handleSend = () => {
    const jwtToken = window.localStorage.getItem("token");
    setConfirmLoading(true);

    axios
      .post("https://prod-seven-january.onrender.com/api/internship-process/start", null, {
        params: {
          processId: data.id,
        },
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        alert("Başvurunuz başarıyla alındı işleme koyuldu.");
        console.log(response);
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
              <DatePickersContainer>
                <Form.Item name="startDate" label={dictionary.internshipDates}>
                  <DatePicker />
                </Form.Item>

                <Form.Item name="endDate" label=" ">
                  <DatePicker />
                </Form.Item>
              </DatePickersContainer>
            </Col>
          </Row>
        </Form>
        <Modal
          title="Tatil Gününü Onayla"
          open={isModalOpen}
          onOk={handleHolidayApprove}
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
