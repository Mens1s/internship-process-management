import React from "react";
import { Form, Input, Button, Checkbox, Tabs } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import axios from "src/services/axios";
import useDepartments from "src/hooks/useDepartments";
import { Select } from "antd";

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
  const [department, setDepartment] = useState("");

  console.log(department);

  const departmentOptions = useDepartments();
  const handleRegister = () => {
    if (window.location.pathname.includes("/ogrenci/register")) {
      axios
        .post("https://internship-gj60.onrender.com/api/student/auth/register", {
          mail: mail,
          password: password,
          firstName: firstName,
          lastName: lastName,
        })
        .then((response) => {
          navigate("/onayla");
        })
        .catch((error) => {
          alert(error.response.data.message);
          console.error("Error:", error);
        });
    } else if (window.location.pathname.includes("/akademisyen/register")) {
      axios
        .post("https://internship-gj60.onrender.com/api/academician/auth/register", {
          mail: mail,
          password: password,
          firstName: firstName,
          lastName: lastName,
          departmentId: department,
        })
        .then((response) => {
          // navigate(fromAkademisyen, { replace: true });
          navigate("/onayla");
        })
        .catch((error) => {
          alert(error.response.data.message);
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
        <Form.Item name="department">
          <Select
            onChange={(value) => setDepartment(value)}
            placeholder="Select Department"
          >
            {departmentOptions}
          </Select>
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
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Mail"
            onChange={(e) => setMail(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
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
        </Form.Item>
      </Form>
    </FormContainer>
  );
};

export default RegisterForm;
