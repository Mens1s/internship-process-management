import React, { useState, useContext } from "react";
import { Form, Input, Button, Divider, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate, Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import axios from "src/services/axios";
import AuthContext from "src/context/AuthProvider";
import useAuth from "src/hooks/useAuth";
import { responsiveArray } from "antd/es/_util/responsiveObserver";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Text } from "src/context/LanguageProvider";
import UseLanguage from "src/hooks/useLanguage";
import { API } from "src/config/api";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const ForgotMyPasswordForm: React.FC = () => {
  const { setAuth }: any = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const fromStudent = location?.state?.from.pathname || "/ogrenci";
  const fromAkademisyen = location?.state?.from.pathname || "/akademisyen";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const { dictionary } = UseLanguage();
  const [messageApi, contextHolder] = message.useMessage();

  const errorMessage: any = () => {
    messageApi.open({
      type: "error",
      content: dictionary.wrongMailOrPassword,
      duration: 5,
    });
  };

  const handleForgotPassword = () => {
    setLoading(true);
    if (window.location.pathname.includes("/ogrenci/forgot-my-password")) {
      axios
        .post(API.STUDENT.FORGOT_PASSWORD, null, {
          params: {
            email: username,
          },
        })
        .then((response) => {
          message.success(
            "Your reset password link has been sent to your mail."
          );
        })
        .catch((error) => {
          message.error("Error: E-mail is invalid");
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (
      window.location.pathname.includes("/akademisyen/forgot-my-password")
    ) {
      axios
        .post(API.ACADEMICIAN.FORGOT_PASSWORD, null, {
          params: {
            email: username,
          },
        })
        .then((response) => {
          message.success(
            "Your reset password link has been sent to your mail."
          );
        })
        .catch((error) => {
          message.error("Error: E-mail is invalid");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <FormContainer>
      {contextHolder}
      <Form
        name="reset_password"
        style={{ width: "100%" }}
        initialValues={{
          remember: true,
        }}
        onFinish={handleForgotPassword}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: dictionary.pleaseInputYourMailAddress,
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Mail"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 10 }}>
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
          >
            Şifremi Yenile
          </Button>
        </Form.Item>
        <Divider style={{ color: "gray" }} plain>
          <Text tid="or" />
        </Divider>
        <Form.Item style={{ marginBottom: 10 }}>
          <Button
            type="default"
            style={{ width: "100%" }}
            onClick={() => navigate("/ogrenci/login")}
          >
            <Text tid="login" />
          </Button>
        </Form.Item>
      </Form>
    </FormContainer>
  );
};

export default ForgotMyPasswordForm;
