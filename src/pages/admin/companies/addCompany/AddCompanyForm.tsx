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
import getAxiosConfig from "src/config/axiosConfig";
import { API } from "src/config/api";
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
  justify-content: flex-end;
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

const CompanyAdd: React.FC<{ addCompanyRequest?: any }> = ({
  addCompanyRequest,
}: any) => {
  const { dictionary } = useLanguage();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleAddCompany = () => {
    setLoading(true);
    const formData = form.getFieldsValue();
    const postData = {
      companyName: formData?.companyName,
      companyMail: formData?.companyMail,
      companyTelephone: formData?.companyTelephone,
      faxNumber: formData?.faxNumber,
      companyAddress: formData?.companyAddress,
    };
    addCompanyRequest(postData, form, setLoading);
  };

  return (
    <div>
      <>
        <Form form={form} layout="vertical" size="large">
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item name="companyName" label={dictionary.companyName}>
                <Input />
              </Form.Item>
              <Form.Item name="companyMail" label={dictionary.companyMail}>
                <Input />
              </Form.Item>
              <Form.Item
                name="companyTelephone"
                label={dictionary.companyNumber}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item name="faxNumber" label={dictionary.companyFaxNumber}>
                <Input />
              </Form.Item>
              <Form.Item
                name="companyAddress"
                label={dictionary.companyAddress}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <DatePickersContainer>
          <Button onClick={handleAddCompany} type="primary" loading={loading}>
            Ekle
          </Button>
        </DatePickersContainer>
      </>
    </div>
  );
};

export default CompanyAdd;
