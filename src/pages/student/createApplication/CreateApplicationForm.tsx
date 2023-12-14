import React, { useState, ChangeEvent, FormEvent } from "react";
import styled from "styled-components";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import type { RcFile, UploadProps } from "antd/es/upload";
import PdfViewer from "src/components/PdfViewer";
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

const CreateApplicationForm: React.FC = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const { auth }: any = useAuth();
  const { dictionary } = useLanguage();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Staj başvurunuz alındı!",
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

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const jwtToken = window.localStorage.getItem("token");
  const handleApplication = () => {
    axios
      .post(
        "http://localhost:8000/api/internship-process/init",
        {},
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        // success(); this should be here
      })
      .catch((error) => {
        console.log("error:", error);
        console.log(jwtToken);
        // error(); this should be here
      });
    // success();
    error();
    // avigate("/ogrenci/past"); FIXME: Show message while navigating
    setIsModalOpen(false);
  };

  return (
    <div>
      {contextHolder}
      {/* <p style={{ margin: "0 20px 40px 20px", textAlign: "left" }}>
        Zorunlu Staj, Gebze Teknik Üniversitesi Mühendislik Fakültesi Lisans
        öğrencilerin öğretim planında geçen yapmakla yükümlü oldukları stajları
        ifade eder. GTÜ Mühendislik Fakültesi Lisans öğrencileri, öğrenimleri
        boyunca zorunlu stajlarını en az 40 iş günü yapmakla yükümlüdür. Mezun
        olabilmek için bu sürenin tamamlanması zorunludur. Zorunlu Stajlar, her
        biri 20 iş günü olmak üzere iki ayrı kurumda yapılır. Öğrenciler,
        Zorunlu stajlarının ilkini 4. yarıyıldan sonra, ikincisini 6. yarıyıldan
        sonra yapabilirler.
      </p> */}

      <>
        {/*  <Checkbox
          checked={componentDisabled}
          onChange={(e) => setComponentDisabled(e.target.checked)}
        >
          Form disabled
        </Checkbox> */}
        <Form layout="vertical" disabled={componentDisabled} size="large">
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item label={dictionary.idNumber}>
                <Input />
              </Form.Item>
              <Form.Item label={dictionary.studentId}>
                <Input />
              </Form.Item>
              <Form.Item label={dictionary.phoneNumber}>
                <Input />
              </Form.Item>
              <Form.Item label={dictionary.faculty}>
                <Input />
              </Form.Item>
              <Form.Item label={dictionary.department}>
                <Input />
              </Form.Item>
              <Form.Item label={dictionary.grade}>
                <Select>
                  <Select.Option value="Hazırlık">
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
              <Form.Item label={dictionary.roleInInternship}>
                <Input />
              </Form.Item>
              <Form.Item label={dictionary.internshipType}>
                <Input />
              </Form.Item>
              <Form.Item label={dictionary.whichInternship}>
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
              <Form.Item label={dictionary.companyName}>
                <Input />
              </Form.Item>
              <Form.Item label={dictionary.companyAddress}>
                <TextArea rows={1} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item label={dictionary.companyNumber}>
                <Input />
              </Form.Item>
              <Form.Item label={dictionary.companyFaxNumber}>
                <Input />
              </Form.Item>
              <Form.Item label={dictionary.engineerNameSurname}>
                <Input />
              </Form.Item>
              <Form.Item label={dictionary.engineerMail}>
                <Input />
              </Form.Item>
              <Form.Item label={dictionary.positionToWork}>
                <Input />
              </Form.Item>
              <Form.Item label={dictionary.reasonForCompany}>
                <TextArea rows={5} />
              </Form.Item>
              <Form.Item label={dictionary.sgkEntry}>
                <Input />
              </Form.Item>
              <Form.Item label={dictionary.gssEntry}>
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
                  <Text tid="confirm" />
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

export default CreateApplicationForm;
