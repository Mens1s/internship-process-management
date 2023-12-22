import React, { useState, ChangeEvent, FormEvent } from "react";
import styled from "styled-components";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import type { RcFile, UploadProps } from "antd/es/upload";
import useLanguage from "src/hooks/useLanguage";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { Text } from "src/context/LanguageProvider";

import {
  Row,
  Col,
  Checkbox,
  Form,
  Input,
  Select,
  TreeSelect,
  Cascader,
  DatePicker,
  InputNumber,
  Radio,
  Slider,
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

const CompanyAdd: React.FC = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const { auth }: any = useAuth();
  const { dictionary } = useLanguage();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Şirket bilgileri alındı!",
    });
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "Bir hata oluştu. Lütfen tekrar deneyiniz.",
      duration: 5,
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  

  const jwtToken = window.localStorage.getItem("token");
  const handleAddCompany = () => {
    const formData = form.getFieldsValue();
    
    const postData = {
        companyName: formData?.companyName,
        companyMail: formData?.companyMail,
        companyTelephone: formData?.companyTelephone,
        faxNumber: formData?.faxNumber,
        companyAddress: formData?.companyAddress,
        
      };
    axios
      .post(
        "http://localhost:8000/api/company/addCompany",postData,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        success();
      })
      .catch((error) => {
        console.log("error:", error);
        console.log(jwtToken);
        error();
      });

    // avigate("/ogrenci/past"); FIXME: Show message while navigating
    setIsModalOpen(false);
  };
  return (
    <div>
      {contextHolder}
      <>
        <Form
          form={form}
          layout="vertical"
          size="large"
        >
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item name="companyName" label={dictionary.companyName}>
                <Input />
              </Form.Item>
              <Form.Item name="companyMail" label={dictionary.companyMail}>
                <Input />
              </Form.Item>
              <Form.Item name="companyTelephone" label={dictionary.companyNumber}>
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item name="faxNumber" label={dictionary.companyFaxNumber}>
                <Input />
              </Form.Item>
              <Form.Item name="companyAddress" label={dictionary.companyAddress}>
                <Input />
              </Form.Item>
              <DatePickersContainer>
                <Button onClick={handleCancel}>
                  <Text tid="cancel" />
                </Button>
                <Button onClick={showModal} type="primary">
                  <Text tid="confirm" />
                </Button>
              </DatePickersContainer>
            </Col>
          </Row>
        </Form>
        <Modal
          title="Şirket Eklemeyi Onayla"
          open={isModalOpen}
          onOk={handleAddCompany}
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


export default CompanyAdd;
