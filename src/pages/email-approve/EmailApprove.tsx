import React, { useState, ChangeEvent, FormEvent } from "react";
import styled from "styled-components";
import { Button, Form, Input, Result, Radio, message } from 'antd';
import {Link, useNavigate} from "react-router-dom"
import { NumberOutlined, MailOutlined} from "@ant-design/icons";
import { useParams } from 'react-router-dom';
import axios from "src/services/axios";
import { Text } from "src/context/LanguageProvider";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0px;
`;

const Container = styled.div`
  background: lightgray;
  width: 500px;
  height: 500px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SuccessIcon = styled.img`
  width:150px;
  height: 150px;
`;

const Wrapper = styled.div`
  background: orange;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 10px;
  gap: 20px;
`;
const ButtonsContainer = styled.div`
  display: flex;
  gap: 15px;
  width: fit-content;
`;

const CreateApplication: React.FC = () => {
  const [confirmationCode, setConfirmationCode] = useState("");
  let { mail } = useParams<({mail: string})>();
  const [mailAddress, setMailAddress] = useState(mail);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  if(mail == "auth"){
    mail = "";
  }
  const img_src = "https://cdn-icons-png.flaticon.com/512/7595/7595571.png";

  const handleVerify = (userType:any) => {
    
    let url = "http://localhost:8000/api/academician/auth/verify"

    if(userType.userType === 'student')
      url = "http://localhost:8000/api/student/auth/verify"
    
    setLoading(true);
    
    axios
    .post(url,null, {
        params: {
            mail: mailAddress,
            code: confirmationCode,
        },
      }) 
    .then((response) => {
        message.success("Hesabınız başarılı bir şekilde onaylandı.");
        navigate("ogrenci/login/");
    })
    .catch((error) => {
        message.error("Error: Code is invalid");
    })
    .finally(() => {
        setLoading(false);
    });
    
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        alignItems: "center",
      }}
    >
      
    <Result
      status="success"
      icon={<SuccessIcon src={img_src}></SuccessIcon>}
      title="Kayıt Başarıyla Alındı."
      subTitle="Kaydınızı Başarıyla Tamamlamak İçin Mailinize Gelen Kodu Aşağıya Giriniz."
      extra={
        <FormContainer>
            <Form
              name="normal_login"
              style={{ width: "100%" }}
              initialValues={{
                email: mail,
                userType: 'student' 
              }}
              onFinish={handleVerify}
              
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
              name="email"
              rules={[
                {
                  required: true,
                  message: "Lütfen mailinizi giriniz.",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Mailinizi Giriniz"
                onChange={(e) => setMailAddress(e.target.value)}
              />
          </Form.Item>

          <Form.Item
              name="confirmationCode"
              rules={[
                {
                  required: true,
                  message: "Confirmation Code",
                },
              ]}
            >
              <Input
                prefix={<NumberOutlined className="site-form-item-icon" />}
                placeholder="Confirmation Code"
                onChange={(e) => setConfirmationCode(e.target.value)}
              />
          </Form.Item>

          <Button 
            type="primary" 
            key="console"
            loading={loading}
            htmlType="submit"
            style={{ width: "100%" }}
            >
              <Text tid="Confirm" />
          </Button>
          </Form>
        </FormContainer>
      }
      />
      </div>
  );
};

export default CreateApplication;
