import React from "react";
import { Form, Input, Button, Checkbox, Tabs } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import axios from "../../services/axios";
/* import { student-data } from "../../../mocks/student-data";
 */
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  justify-content: center;
  align-items: center;
`;
const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [mail, setMail] = useState("");
  const [counter, setCounter] = useState(0);

  const handleRegister = () => {
    setCounter((prev) => prev + 1);
    console.log("clicked");
    if (window.location.pathname.includes("/ogrenci/register")) {
      axios
        .post("http://localhost:8000/api/student/auth/register", {
          mail: mail,
          password: password,
          firstName: firstName,
          lastName: lastName,
        })
        .then((response) => {
          navigate("/onayla");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else if (window.location.pathname.includes("/akademisyen/register")) {
      axios
        .post("https://reqres.in/api/login", {
          mail: mail,
          password: password,
          firstName: firstName,
          lastName: lastName,
        })
        .then((response) => {
          // navigate(fromAkademisyen, { replace: true });
          navigate("/akademisyen");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <FormContainer>
      <Form
        name="normal_login"
        style={{ width: "100%" }}
        initialValues={{
          remember: true,
        }}
        onFinish={handleRegister}
      >
        <Form.Item
          name="isim"
          rules={[
            {
              required: true,
              message: "Lütfen isim giriniz!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="İsim"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="soyisim"
          rules={[
            {
              required: true,
              message: "Lütfen soyisim giriniz!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Soyisim"
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="mail"
          rules={[
            {
              required: true,
              message: "Lütfen mail giriniz!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Mail Adresi"
            onChange={(e) => setMail(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          name="şifre"
          rules={[
            {
              required: true,
              message: "Lütfen şifre giriniz!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Şifre"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          {/*  <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item> */}

          <Link style={{ float: "right" }} to="/ogrenci/login">
            Giriş Yap
          </Link>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
            onClick={handleRegister}
          >
            Kayıt Ol
          </Button>
          <div>{counter}</div> {/*bu sayfada görünüyor gerekli mi silelim mi? */}
        </Form.Item>
      </Form>
    </FormContainer>
  );
};

export default RegisterForm;