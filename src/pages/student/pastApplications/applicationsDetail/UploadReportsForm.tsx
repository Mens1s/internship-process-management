import React, { useEffect, useState } from "react";
import { Collapse } from "antd";
import styled from "styled-components";
import { WarningFilled, MoreOutlined } from "@ant-design/icons";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";

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
import { API } from "src/config/api";
import getAxiosConfig from "src/config/axiosConfig";
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
  justify-content: end;

  div {
    width: 100%;
  }

  button {
    @media (max-width: 600px) {
      width: 100%;
    }
  }
`;

const UploadReportsForm = ({ processId }: any) => {
  const [form] = Form.useForm();
  const { dictionary } = useLanguage();
  const [loading, setLoading] = useState(false);

  const handleLoadReport = () => {
    console.log("process", processId);
    setLoading(true);
    const requestData = {
      id: processId,
      stajRaporuPath: "/stajRaporuPath",
    };
    axios
      .put(API.INTERNSHIP_PROCESS.LOAD_REPORT, requestData, getAxiosConfig())
      .then((response) => {
        console.log(response);
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
          header="Staj raporunu yüklemek için tıklayınız."
          key="1"
          extra={<MoreOutlined />}
        >
          <Form
            form={form}
            layout="vertical"
            size="large"
            style={{ marginTop: 10 }}
          >
            <Form.Item name="companyName">
              <Upload
                listType="picture"
                data={{ type: "mustehaklikBelgesi" }} // Optional: Additional data for the API
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>
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
