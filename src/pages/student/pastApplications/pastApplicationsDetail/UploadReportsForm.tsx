import React, { useEffect, useState } from "react";
import { Collapse } from "antd";
import styled from "styled-components";
import { WarningFilled, MoreOutlined } from "@ant-design/icons";
import {
  Row,
  Col,
  Checkbox,
  Form,
  Input,
  Popconfirm,
  Upload,
  Button,
} from "antd";
import { Text } from "src/context/LanguageProvider";
import useLanguage from "src/hooks/useLanguage";
import axios from "src/services/axios";
const { Panel } = Collapse;

const Wrapper = styled.div`
  .ant-collapse-content-box {
    background: white;
    border-radius: 0 0 8px 8px;
    border-top: 1px solid #ffe58f;
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

const UploadReportsForm = () => {
  const [form] = Form.useForm();
  const { dictionary } = useLanguage();
  const [loading, setLoading] = useState(false);

  const handleLoadReport = () => {
    console.log("handle load report clicked");

    const jwtToken = window.localStorage.getItem("token");
    setLoading(true);
    const id = window.localStorage.getItem("id");
    const requestData = {
      stajRaporuPath: "/stajRaporuPath",
      id: id,
    };
    axios
      .put(
        "http://localhost:8000/api/internship-process/load-report",
        requestData,
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
        console.log(error.response.data);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Wrapper>
      <Collapse
        size="small"
        bordered={false}
        expandIcon={() => (
          <WarningFilled style={{ color: "#faad14", fontSize: "16px" }} />
        )}
        style={{
          background: "#fffbe6",
          border: "1px solid #ffe58f",
          borderBottom: "1px solid #ffe58f",
          borderTop: "1px solid #ffe58f",
        }}
      >
        <Panel
          header="Staj raporunu yüklemek için tıklayınız"
          key="1"
          extra={<MoreOutlined />}
        >
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
            <Popconfirm
              title="Delete the applicaton"
              description="Are you sure to delete this application?"
              onConfirm={handleLoadReport}
              okText="Yes"
              cancelText="No"
            >
              <Button loading={loading} type="primary">
                <Text tid="confirm" />
              </Button>
            </Popconfirm>
          </DatePickersContainer>
        </Panel>
      </Collapse>
    </Wrapper>
  );
};

export default UploadReportsForm;
