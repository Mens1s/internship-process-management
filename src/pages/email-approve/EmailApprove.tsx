import React, { useState, ChangeEvent, FormEvent } from "react";
import styled from "styled-components";
import { Button, Result } from 'antd';
import {Link} from "react-router-dom"

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
  gap: 20px;
  width: fit-content;
`;

const CreateApplication: React.FC = () => {

  const img_src = "https://cdn-icons-png.flaticon.com/512/7595/7595571.png";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        alignItems: "center",
      }}
    >
      <div>
        <div>
          <img src="/logo.jpg" width="100" height="100"/>
          <h1>Kayıt Onayı</h1>

        </div>
        <Result
      status="success"
      icon={<SuccessIcon src={img_src}></SuccessIcon>}
      title="Kayıt Başarıyla Tamamlandı."
      subTitle="Ana sayfaya geçiş yapmak için butona tıklayınız."
      extra={
        <Button type="primary" key="console">
        <Link to="/ogrenci/login">Giriş yap</Link>
        </Button>
      }
      />
      </div>
    </div>
  );
};

export default CreateApplication;
