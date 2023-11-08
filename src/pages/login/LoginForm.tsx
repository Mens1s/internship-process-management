import React, { useState, useContext } from "react";
import { Form, Input, Button, Checkbox, Tabs } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import axios from "../../services/axios";
import AuthContext from "../../context/AuthProvider";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  /*   const { setAuth } = useContext(AuthContext);
   */
  const handleLogin = async () => {
    setButtonClicked(true);
    try {
      if (window.location.pathname.includes("/ogrenci/login")) {
        const response = await axios.post(
          "https://reqres.in/api/users/2",
          JSON.stringify({ username, password }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        const token = response?.data?.token;
        const role = response?.data?.role;
        setUsername("");
        setPassword("");
        /*         setAuth({ username, password, token, role });
         */ setSuccess(true);
      }
    } catch (err) {
      console.log("error");
    }
  };
  /* const handleLogin = () => {
    setButtonClicked(true);
    if (window.location.pathname.includes("/ogrenci/login")) {
      axios
        .get("https://reqres.in/api/users/2")
        .then((response) => {
          console.log(response.data.data);
          console.log(username, password);
          if (
            response.data.data.first_name.toUpperCase() ===
              username.toUpperCase() &&
            response.data.data.last_name.toUpperCase() ===
              password.toUpperCase()
          ) {
            setSuccess(true);
            navigate("/ogrenci");
          } else {
            console.log("incorrect username of password");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else if (window.location.pathname.includes("/akademisyen/login")) {
      navigate("/akademisyen");
    }
  }; */

  return (
    <FormContainer>
      <Form
        name="normal_login"
        style={{ width: "100%" }}
        initialValues={{
          remember: true,
        }}
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
            placeholder="Username"
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

          <Link style={{ float: "right" }} to="">
            Kayıt Ol
          </Link>
        </Form.Item>
        {buttonClicked && !success && (
          <div
            style={{ color: "red", marginLeft: "35px", marginBottom: "20px" }}
          >
            Yanlış kullanıcı adı veya şifre!
          </div>
        )}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
            onClick={handleLogin}
          >
            Giriş Yap
          </Button>
          {/*  Or <a href="">register now!</a> */}
        </Form.Item>
      </Form>
    </FormContainer>
  );
};

export default Login;
