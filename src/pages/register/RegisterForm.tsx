import React from "react";
import { Form, Input, Button, Divider, message } from "antd";
import { MailOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import axios from "src/services/axios";
import useDepartments from "src/hooks/useDepartments";
import { Select } from "antd";
import { Text } from "src/context/LanguageProvider";
import { API } from "src/config/api";

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
  const [passwordAgain, setPasswordAgain] = useState("");
  const [mail, setMail] = useState("");
  const [department, setDepartment] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [isStudent, setIsStudent] = useState(
    location.pathname.includes("ogrenci")
  );

  const departmentOptions = useDepartments();

  const handleRegister = () => {
    if (password != passwordAgain) {
      message.error("Şifrenizi aynı girdiğinizden emin olun!");
    } else {
      window.localStorage.removeItem("isLoggedIn");
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("mail");
      window.localStorage.removeItem("role");
      window.localStorage.removeItem("fullName");
      setLoading(true);
      if (window.location.pathname.includes("/ogrenci/register")) {
        axios
          .post(API.STUDENT.REGISTER, {
            mail: mail,
            password: password,
            firstName: firstName,
            lastName: lastName,
          })
          .then((response) => {
            navigate("/onayla/" + mail);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } else if (window.location.pathname.includes("/akademisyen/register")) {
        axios
          .post(API.ACADEMICIAN.REGISTER, {
            mail: mail,
            password: password,
            firstName: firstName,
            lastName: lastName,
            departmentId: department,
          })
          .then((response) => {
            // navigate(fromAkademisyen, { replace: true });
            navigate("/onayla/"+ mail);
          })
          .catch((error) => {
            console.error("Error:", error);
          })
          .finally(() => {
            setLoading(false);
          });
      }
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
          name="firstName"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="lastName"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="mail"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Mail"
            onChange={(e) => setMail(e.target.value)}
          />
        </Form.Item>
        {!isStudent && (
          <Form.Item name="department">
            <Select
              onChange={(value) => setDepartment(value)}
              placeholder="Select Department"
            >
              {departmentOptions}
            </Select>
          </Form.Item>
        )}

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          name="password-again"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password again"
            onChange={(e) => setPasswordAgain(e.target.value)}
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 10 }}>
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
          >
            <Text tid="signUp" />
          </Button>
        </Form.Item>
        <Divider style={{ color: "gray" }} plain>
          <Text tid="or" />
        </Divider>
        <Form.Item>
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

export default RegisterForm;
