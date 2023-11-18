import React, { useState, ChangeEvent, FormEvent } from "react";
import styled from "styled-components";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
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
  Upload,
  Button,
} from "antd";
import axios from "../../../services/axios";
import useAuth from "../../../hooks/useAuth";
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

const PDFContainer = styled.div`
  width: 80%;
  height: 900px;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;

  @media (max-width: 800px) {
    width: 100%;
  }
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
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false);
  const [pdfFile, setPDFFile] = useState<string | null>(null);
  const [viewPdf, setViewPdf] = useState<string | null>(null);
  const fileType: string[] = ["application/pdf"];
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onload = (e) => {
          setPDFFile(e.target?.result as string);
        };
      } else {
        setPDFFile(null);
      }
    } else {
      console.log("Please select a PDF file.");
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (pdfFile !== null) {
      setViewPdf(pdfFile);
    } else {
      setViewPdf(null);
    }
  };
  const newplugin = defaultLayoutPlugin();
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
  };

  return (
    <div>
      {/*  <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ButtonsContainer>
          <input type="file" onChange={handleOnChange} />
          <button type="submit">View PDF</button>
        </ButtonsContainer>
        {viewPdf && (
          <PDFContainer>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
              {viewPdf && <Viewer fileUrl={viewPdf} plugins={[newplugin]} />}
              {!viewPdf && <>No PDF</>}
            </Worker>
          </PDFContainer>
        )}
      </form> */}
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
              <Form.Item label="Input">
                <Input />
              </Form.Item>
              <Form.Item label="Select">
                <Select>
                  <Select.Option value="demo">Demo</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="TreeSelect">
                <TreeSelect
                  treeData={[
                    {
                      title: "Light",
                      value: "light",
                      children: [{ title: "Bamboo", value: "bamboo" }],
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item label="Cascader">
                <Cascader
                  options={[
                    {
                      value: "zhejiang",
                      label: "Zhejiang",
                      children: [
                        {
                          value: "hangzhou",
                          label: "Hangzhou",
                        },
                      ],
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item label="DatePicker">
                <DatePickersContainer>
                  <DatePicker />
                  <DatePicker />
                </DatePickersContainer>
              </Form.Item>
              {/* <Form.Item label="RangePicker">
                <RangePicker />
              </Form.Item> */}
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item label="InputNumber">
                <InputNumber />
              </Form.Item>
              <Form.Item label="TextArea">
                <TextArea rows={4} />
              </Form.Item>
              <Form.Item label="Switch" valuePropName="checked">
                <Switch />
              </Form.Item>
              <Form.Item
                label="Checkbox"
                name="disabled"
                valuePropName="checked"
              >
                <Checkbox>Checkbox</Checkbox>
              </Form.Item>
              <Form.Item label="Radio">
                <Radio.Group>
                  <Radio value="apple"> Apple </Radio>
                  <Radio value="pear"> Pear </Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label="Upload"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Upload action="/upload.do" listType="picture-card">
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
              <Form.Item label="Button">
                <DatePickersContainer>
                  <Button onClick={handleApplication}>Vazgeç</Button>
                  <Button onClick={handleApplication} type="primary">
                    Onayla
                  </Button>
                </DatePickersContainer>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </>
    </div>
  );
};

export default CreateApplicationForm;
