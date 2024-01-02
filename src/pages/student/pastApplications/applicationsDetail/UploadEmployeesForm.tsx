import React, { useEffect, useState } from "react";
import { Collapse, message } from "antd";
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
  justify-content: end;
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

const UploadEmployeesForm = () => {
  const [form] = Form.useForm();
  const { dictionary } = useLanguage();
  const [loading, setLoading] = useState(false);
  const handleUpload = () => {
    form
      .validateFields()
      .then((values) => {
        setLoading(true);
        console.log(values);
        const postRequest = {
          name: values.name,
          surname: values.surname,
          mail: values.mail,
          telephone: values.telephone,
          title: values.title,
          department: values.department,
          companyId: 204,
        };

        console.log("post", postRequest);
        axios
          .post(API.COMPANY_STAFF.ADD, postRequest, getAxiosConfig())
          .then((response) => {
            message.success("Çalışan başarıyla eklendi.");
            form.resetFields();
          })
          .catch((error) => {
            message.success("Bir sorunla karşılaştık. Lütfen tekrar deneyin.");
            console.error("Error:", error);
          })
          .finally(() => {
            setLoading(false);
          });
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
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
          header="Stajınızdan sorumlu mühendisin bilgilerini girmek için tıklayınız."
          key="1"
          extra={<MoreOutlined />}
        >
          <Form form={form} layout="vertical" size="large">
            <Row gutter={16}>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item name="name" label={"İsim"}>
                  <Input />
                </Form.Item>
                <Form.Item name="surname" label={"Soyisim"}>
                  <Input />
                </Form.Item>
                <Form.Item name="mail" label={"Mail Adresi"}>
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item name="telephone" label={"Telefon"}>
                  <Input />
                </Form.Item>
                <Form.Item name="title" label={"Ünvan"}>
                  <Input />
                </Form.Item>
                <Form.Item name="department" label={"Departman"}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <DatePickersContainer>
            <Button loading={loading} type="primary" onClick={handleUpload}>
              <Text tid="confirm" />
            </Button>
          </DatePickersContainer>
        </Panel>
      </Collapse>
    </Wrapper>
  );
};

export default UploadEmployeesForm;
