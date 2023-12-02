import React from "react";
import { Steps, Tag } from "antd";
import styled from "styled-components";
import ActiveApplicationForm from "./ActiveApplicationForm";
import ContentHeader from "src/components/ContentHeader";

const StepsContainer = styled.div`
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

const ActiveApplication = () => {
  return (
    <div>
      <ContentHeader>
        <h2>Aktif Staj Başvurum</h2>
        <Tag
          style={{
            borderRadius: 50,
            width: 150,
            height: 40,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "1rem",
          }}
          color={"geekblue"}
        >
          Onay Bekliyor
        </Tag>
      </ContentHeader>
      <Header>
        <StepsContainer>
          <Steps
            size="small"
            current={2}
            status="error"
            items={[
              {
                title: "Öğrenci",
                description: "Başvuru yapıldı",
              },
              {
                title: "Staj Komisyonu",
                description: "Onaylandı",
              },
              {
                title: "Bölüm",
                description: "Reddedildi",
              },
              {
                title: "Dekanlık",
                description: "Onay Bekliyor",
              },
            ]}
          />
        </StepsContainer>
      </Header>
      <ActiveApplicationForm />
    </div>
  );
};

export default ActiveApplication;
