import React, { useState, useContext } from "react";
import { Form, Input, Button, Divider, message, Radio} from "antd";
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

  const handleLogin = (userType : any) => {
    let url = "http://localhost:8000/api/academician/auth/resetPassword"

    if(userType.userType === 'student')
        url = "http://localhost:8000/api/student/auth/resetPassword"
    
    
    if(password !== passwordConfirm){
        message.error(dictionary.passwordsNotMatch);
    }else{
        console.log(token);
        setLoading(true);
        
        axios
        .post(url,null, {
            params: {
                token: token,
                newPassword: password,
            },
          }) 
        .then((response) => {
            message.success("Şifren başarılı bir şekilde değiştirildi.");
            navigate("/onayla");
        })
        .catch((error) => {
            message.error("Error: token is invalid");
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
          userType: 'student' 
        }}

        onFinish={handleLogin}
      >
        <Form.Item
        name="userType"
        label="Select User Type"
        rules={[{ required: true, message: 'Please select user type!' }]}
        >
            <Radio.Group>
            <Radio value="academician">Academician</Radio>
            <Radio value="student">Student</Radio>
            </Radio.Group>
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

        <Form.Item
          style={{ marginBottom: 0 }}
          name="confirm-password"
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
            placeholder={"Confirm "+dictionary.password}
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
            <Text tid="Confirm" />
          </Button>
        </Form.Item>

        <Divider style={{ color: "gray" }} plain>
          <Text tid="or" />
        </Divider>

        <Form.Item style={{ marginBottom: 10 }}>
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
            onClick={() => navigate("/ogrenci/login")}
          >
            <Text tid="Login Page" />
            
          </Button>
        </Form.Item>
        
      </Form>
    </FormContainer>
  );
};

export default RenewPasswordForm;
