import React, { useState, ChangeEvent, FormEvent } from "react";
import styled from "styled-components";
import {
  Button,
  Form,
  Input,
  Result,
  Radio,
  message,
  Row,
  Col,
  Segmented,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { NumberOutlined, MailOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import axios from "src/services/axios";
import { Text } from "src/context/LanguageProvider";
import UseLanguage from "src/hooks/useLanguage";
import { API } from "src/config/api";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 0 20px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 600px;
  height: fit-content;
  padding: 20px;
  width: 100%;
  border-radius: 10px;
  border: 1px solid lightgray;
  position: relative;
  background: white;
  margin: 0 10px;
`;

const Navbar = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
  padding: 20px 10px;
  box-sizing: border-box;
  background: white;
  border-bottom: 1px solid lightgray;
  margin-bottom: 20px;
`;

const LogoImage = styled.img`
  width: 200px;
  margin-bottom: 20px;
`;

const Flag = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50px;
  background-size: cover;
`;

const CreateApplication: React.FC = () => {
  const [confirmationCode, setConfirmationCode] = useState("");
  let { mail } = useParams<{ mail: string }>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { dictionary } = UseLanguage();
  const { userLanguage, userLanguageChange } = UseLanguage();

  const [img, setImg] = useState(
    userLanguage === "en" ? "/england_flag.png" : "/turkey_flag.png"
  );

  if (mail == "auth") {
    mail = "";
  }

  const handleVerify = (userType: any) => {
    let url = API.ACADEMICIAN.VERIFY;
    if (
      userType.userType.toLowerCase() === "student" ||
      userType.userType.toLowerCase() === "öğrenci"
    ) {
      url = API.STUDENT.VERIFY;
    }

    setLoading(true);
    axios
      .post(url, null, {
        params: {
          mail: mail,
          code: confirmationCode,
        },
      })
      .then((response) => {
        message.success("Kayıt işlemi tamamlandı!");
        navigate("/ogrenci/login");
      })
      .catch((error) => {
        message.error("Invalid code or user type!");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleLanguageChange = () => {
    userLanguageChange();
    setImg((prevImg) =>
      prevImg === "/england_flag.png" ? "/turkey_flag.png" : "/england_flag.png"
    );
    window.location.reload();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        background: "#f7f7f7",
      }}
    >
      <Navbar>
        <LogoImage src="/logo.jpg" alt="Logo" />
        <h2
          className="header"
          style={{
            fontFamily: "roboto",
            textAlign: "center",
            fontSize: "1.2rem",
            marginTop: "10px",
          }}
        >
          {dictionary.internshipManagementSystem}
        </h2>
      </Navbar>

      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            position: "absolute",
            top: 20,
            right: 10,
            zIndex: 9,
          }}
        >
          <span onClick={handleLanguageChange} style={{ cursor: "pointer" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 5,
                width: "80px",
              }}
            >
              <Text tid="langShort" />
              <Flag style={{ backgroundImage: `url(${img})` }} />
            </div>
          </span>
        </div>
        <Row gutter={16}>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Result
              status="success"
              title={dictionary.completeRegistration}
              subTitle={dictionary.completeRegistrationDescription}
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <FormContainer>
              <Form
                name="normal_login"
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: 20,
                }}
                initialValues={{
                  userType: dictionary.student,
                }}
                onFinish={handleVerify}
              >
                <Form.Item
                  name="userType"
                  style={{ marginBottom: 20, width: "100%" }}
                >
                  <Segmented
                    options={[dictionary.student, dictionary.academician]}
                    block
                  />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: 20, width: "100%" }}
                  name="confirmationCode"
                  rules={[
                    {
                      required: true,
                      message: "Please input confirmation code!",
                    },
                  ]}
                >
                  <Input
                    prefix={<NumberOutlined className="site-form-item-icon" />}
                    placeholder={dictionary.confirmationCode}
                    onChange={(e) => setConfirmationCode(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  style={{
                    width: "100%",
                  }}
                >
                  <Button
                    type="primary"
                    key="console"
                    loading={loading}
                    htmlType="submit"
                    style={{ width: "100%" }}
                  >
                    {dictionary.confirm}
                  </Button>
                </Form.Item>
              </Form>
            </FormContainer>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default CreateApplication;
