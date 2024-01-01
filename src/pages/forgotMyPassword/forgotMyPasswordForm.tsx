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
          //navigate(fromStudent, { replace: true });
          if (response.status == 200) {
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
            navigate("/ogrenci");
          } else {
            errorMessage();
          }
        })
        .catch((error) => {
          errorMessage();
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

          // navigate(fromAkademisyen, { replace: true });
          window.localStorage.setItem("isLoggedIn", "true");

          window.localStorage.setItem("isLoggedIn", "true");
          setTimeout(() => {
            navigate("/akademisyen");
          }, 500);
        })
        .catch((error) => {
          errorMessage();
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