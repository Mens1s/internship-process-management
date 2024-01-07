import React, { useState, useContext } from "react";
import { Form, Input, Button, Divider, message, Radio } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate, Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import axios from "src/services/axios";
import AuthContext from "src/context/AuthProvider";
import useAuth from "src/hooks/useAuth";
import { responsiveArray } from "antd/es/_util/responsiveObserver";
import { Text } from "src/context/LanguageProvider";
import UseLanguage from "src/hooks/useLanguage";
import { API } from "src/config/api";
import { useParams } from "react-router-dom";
import { Segmented } from "antd";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const RenewPasswordForm: React.FC = () => {
  const { token } = useParams();
  const { setAuth }: any = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const { dictionary } = UseLanguage();
  const [messageApi, contextHolder] = message.useMessage();

  const handleLogin = (userType: any) => {
    let url = "https://prod-seven-january.onrender.com/api/academician/auth/resetPassword";

    if (
      userType.userType.toLowerCase() === "student" ||
      userType.userType.toLowerCase() === "öğrenci"
    ) {
      url = "https://prod-seven-january.onrender.com/api/student/auth/resetPassword";
    }

    if (password !== passwordConfirm) {
      message.error(dictionary.passwordsNotMatch);
    } else {
      console.log(token);
      setLoading(true);

      axios
        .post(url, null, {
          params: {
            token: token,
            newPassword: password,
          },
        })
        .then((response) => {
          message.success("Şifren başarılı bir şekilde değiştirildi.");
          navigate("/login");
        })
        .catch((error) => {
          message.error("Geçersiz link!");
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
        name="normal_login"
        style={{ width: "100%" }}
        initialValues={{
          remember: true,
          userType: dictionary.student,
        }}
        onFinish={handleLogin}
      >
        {/* <Form.Item
          name="userType"
          rules={[{ required: true, message: "Please select user type!" }]}
          style={{ margin: 10 }}
        >
          <Radio.Group>
            <Radio value="academician">Academician</Radio>
            <Radio value="student">Student</Radio>
          </Radio.Group>
        </Form.Item>  */}

        <Form.Item name="userType" style={{ marginBottom: 20 }}>
          <Segmented
            options={[dictionary.student, dictionary.academician]}
            block
          />
        </Form.Item>
        <Form.Item
          style={{ marginBottom: 10 }}
          name="password"
          rules={[
            {
              required: true,
              message: dictionary.pleaseInputYourPassword,
            },
          ]}
        >
          <Input.Password
            style={{ marginBottom: 0 }}
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder={dictionary.newPassword}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: 20 }}
          name="confirm-password"
          rules={[
            {
              required: true,
              message: dictionary.pleaseInputYourPassword,
            },
          ]}
        >
          <Input.Password
            style={{ marginBottom: 0 }}
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder={dictionary.passwordAgain}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 10 }}>
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
          >
            <Text tid="confirm" />
          </Button>
        </Form.Item>

        <Divider style={{ color: "gray" }} plain>
          <Text tid="or" />
        </Divider>

        <Form.Item style={{ marginBottom: 10 }}>
          <Button
            type="default"
            htmlType="submit"
            style={{ width: "100%" }}
            onClick={() => navigate("/ogrenci/login", { replace: true })}
          >
            <Text tid="login" />
          </Button>
        </Form.Item>
      </Form>
    </FormContainer>
  );
};

export default RenewPasswordForm;
