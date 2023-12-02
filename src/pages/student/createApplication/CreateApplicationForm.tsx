import React, { useState, ChangeEvent, FormEvent } from "react";
import styled from "styled-components";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import type { RcFile, UploadProps } from "antd/es/upload";
import PdfViewer from "src/components/PdfViewer";
import useLanguage from "src/hooks/useLanguage";

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

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

const CreateApplicationForm: React.FC = () => {
  const { auth }: any = useAuth();
  const { dictionary } = useLanguage();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      })
      .catch((error) => {
        console.log("error:", error);
        console.log(jwtToken);
      });
    setIsModalOpen(false);
  };

  return (
    <div>
      <p style={{ margin: "0 20px 40px 20px", textAlign: "left" }}>
        Zorunlu Staj, Gebze Teknik Üniversitesi Mühendislik Fakültesi Lisans
        öğrencilerin öğretim planında geçen yapmakla yükümlü oldukları stajları
        ifade eder. GTÜ Mühendislik Fakültesi Lisans öğrencileri, öğrenimleri
        boyunca zorunlu stajlarını en az 40 iş günü yapmakla yükümlüdür. Mezun
        olabilmek için bu sürenin tamamlanması zorunludur. Zorunlu Stajlar, her
        biri 20 iş günü olmak üzere iki ayrı kurumda yapılır. Öğrenciler,
        Zorunlu stajlarının ilkini 4. yarıyıldan sonra, ikincisini 6. yarıyıldan
        sonra yapabilirler.
      </p>

      <>
        {/*  <Checkbox
          checked={componentDisabled}
          onChange={(e) => setComponentDisabled(e.target.checked)}
        >
          Form disabled
        </Checkbox> */}
        <Form
          layout="horizontal"
          disabled={componentDisabled}
          size="large"
          {...formItemLayout}
        >
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item label="TC Kimlik No">
                <Input />
              </Form.Item>
              <Form.Item label={dictionary.studentId}>
                <Input />
              </Form.Item>
              <Form.Item label={dictionary.phoneNumber}>
                <Input />
              </Form.Item>
              <Form.Item label="Fakülte">
                <Input />
              </Form.Item>
              <Form.Item label="Bölüm">
                <Input />
              </Form.Item>
              <Form.Item label="Sınıf">
                <Select>
                  <Select.Option value="Hazırlık">Hazırlık</Select.Option>
                  <Select.Option value="1.sınıf">1.sınıf</Select.Option>
                  <Select.Option value="2.sınıf">2.sınıf</Select.Option>
                  <Select.Option value="3.sınıf">3.sınıf</Select.Option>
                  <Select.Option value="4.sınıf">4.sınıf</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Stajdaki Görevi">
                <Input />
              </Form.Item>
              <Form.Item label="Staj Türü">
                <Input />
              </Form.Item>
              <Form.Item label="Kaçıncı Staj">
                <Select>
                  <Select.Option value="1">1</Select.Option>
                  <Select.Option value="2">2</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Staj Tarihleri">
                <DatePickersContainer>
                  <DatePicker />
                  <DatePicker />
                </DatePickersContainer>
              </Form.Item>
              <Form.Item label="Şirket Adı">
                <Input />
              </Form.Item>
              <Form.Item label="Şirketin Adresi">
                <TextArea rows={1} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item label="Şirket Numarası">
                <Input />
              </Form.Item>
              <Form.Item label="Şirket Fax Numarası">
                <Input />
              </Form.Item>
              <Form.Item label="Mühendisin Adı Soyadı">
                <Input />
              </Form.Item>
              <Form.Item label="Mühendisin Mail Adresi">
                <Input />
              </Form.Item>
              <Form.Item label="Çalışılacak Pozisyon">
                <Input />
              </Form.Item>
              <Form.Item label="Şirketin Seçilme Nedeni">
                <TextArea rows={5} />
              </Form.Item>
              <Form.Item label="SGK Girişi">
                <Input />
              </Form.Item>
              <Form.Item label="GSS Girişi">
                <Input />
              </Form.Item>
              <Form.Item
                label="Belgeler"
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
                label="Belgeler"
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

              <Form.Item label="Başvuruyu Onayla">
                <DatePickersContainer>
                  <Button onClick={handleCancel}>Vazgeç</Button>
                  <Button onClick={showModal} type="primary">
                    Onayla
                  </Button>
                </DatePickersContainer>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Modal
          title="Başvuruyu Onayla"
          open={isModalOpen}
          onOk={handleApplication}
          onCancel={handleCancel}
        >
          <p>Staj başvurunuzu onaylamak istediğinize emin misiniz?</p>
        </Modal>
      </>
    </div>
  );
};

export default CreateApplicationForm;
