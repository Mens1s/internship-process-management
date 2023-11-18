import React, { useState, useContext } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate, Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import axios from "../../services/axios";
import AuthContext from "../../context/AuthProvider";
import useAuth from "../../hooks/useAuth";
import { responsiveArray } from "antd/es/_util/responsiveObserver";

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

  const handleLogin = () => {
    console.log(username, password);
    if (window.location.pathname.includes("/ogrenci/login")) {
      axios
        .post("http://localhost:8000/api/student/auth/login", {
          mail: username,
          password: password,
        })
        .then((response) => {
          setAuth({
            user: username,
            token: response.data.token,
            role: 2000,
          });
          //navigate(fromStudent, { replace: true });
          if (response.status == 200) {
            console.log("Successful");
            console.log(response);
            window.localStorage.setItem("token", response.data.token);
            setAuth((prev: any) => ({
              ...prev,
              token: response.data.token,
            }));

            window.localStorage.setItem("isLoggedIn", "true");
            navigate("/ogrenci");
          } else {
            console.log("Wrong mail or password!");
          }
        })
        .catch((error) => {
          //console.error("Error:", error);
          console.log("Wrong password or mail!");
        });
    } else if (window.location.pathname.includes("/akademisyen/login")) {
      axios
        .post("http://localhost:8000/api/academician/auth/login", {
          email: username,
          password: password,
        })
        .then((response) => {
          console.log("RESPONSE", response.data);
          setAuth({
            user: username,
            token: response.data.token,
            role: 3000,
          });
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
        onFinish={handleLogin}
      >
        <Form.Item
          name="username"
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
            onChange={(e) => setUsername(e.target.value)}
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
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Link
            style={{ float: "right" }}
            to="/ogrenci/register
          "
          >
            Kayıt Ol
          </Link>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Giriş Yap
          </Button>
          {/*  Or <a href="">register now!</a> */}
        </Form.Item>
      </Form>
    </FormContainer>
  );
};

export default Login;
