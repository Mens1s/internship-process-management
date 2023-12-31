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

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const Login: React.FC = () => {
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

  const handleLogin = () => {
    setLoading(true);
    if (window.location.pathname.includes("/ogrenci/login")) {
      axios
        .post("http://localhost:8000/api/student/auth/login", {
          mail: username,
          password: password,
        })
        .then((response) => {
          window.localStorage.setItem("isLoggedIn", "true");
          window.localStorage.setItem("token", response.data.token);
          window.localStorage.setItem("mail", username);
          window.localStorage.setItem("fullName", response.data.fullName);
          window.localStorage.setItem("role", "2000");
          window.localStorage.setItem("id", response.data.id);
          setAuth({
            user: username,
            token: response.data.token,
            role: 2000,
          });
          navigate("/ogrenci", { replace: true });
        })
        .catch((error) => {
          message.error(dictionary.wrongMailOrPassword);
          console.error("Login error:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (window.location.pathname.includes("/akademisyen/login")) {
      axios
        .post("http://localhost:8000/api/academician/auth/login", {
          mail: username,
          password: password,
        })
        .then((response) => {
          console.log(response);
          setAuth({
            user: username,
            token: response.data.token,
            role: 3000,
          });
          window.localStorage.setItem("token", response.data.token);
          window.localStorage.setItem("mail", username);
          window.localStorage.setItem("fullName", response.data.fullName);
          window.localStorage.setItem("role", "3000");
          window.localStorage.setItem("id", response.data.id);

          window.localStorage.setItem("isLoggedIn", "true");

          window.localStorage.setItem("isLoggedIn", "true");
          setTimeout(() => {
            navigate("/akademisyen", { replace: true });
          }, 500);
        })
        .catch((error) => {
          message.error(dictionary.wrongMailOrPassword);
          console.error("Error:", error);
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
        }}
        onFinish={handleLogin}
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

        <Form.Item
          style={{ marginBottom: 0 }}
          name="password"
          rules={[
            {
              required: true,
              message: dictionary.pleaseInputYourPassword,
            },
          ]}
        >
          <Input.Password
            style={{ marginBottom: 5 }}
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder={dictionary.password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item style={{ margin: 0, marginBottom: 10 }}>
          <Link style={{ float: "right" }} to="/ogrenci/forgot-my-password">
            <Text tid="forgotPassword" />
          </Link>
        </Form.Item>

        <Form.Item style={{ marginBottom: 10 }}>
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
          >
            <Text tid="login" />
          </Button>
        </Form.Item>
        <Divider style={{ color: "gray" }} plain>
          <Text tid="or" />
        </Divider>
        <Form.Item>
          <Button
            type="default"
            style={{ width: "100%" }}
            onClick={() => navigate("/ogrenci/register")}
          >
            <Text tid="signUp" />
          </Button>
        </Form.Item>
      </Form>
    </FormContainer>
  );
};

export default Login;
