import React, { useEffect, useState } from "react";
import { Steps, Tag } from "antd";
import styled from "styled-components";
import ActiveApplicationForm from "../../activeApplication/ActiveApplicationForm";
import ContentHeader from "src/components/ContentHeader";
import axios from "src/services/axios";

const StepsContainer = styled.div`
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  margin-top: 40px;
`;

const PastApplicationDetail = () => {
  const [data, setData] = useState([]);
  const [showSteps, setShowStatus] = useState(false);
  const [currentStep, setCurrentStep] = useState(2);

  useEffect(() => {
    const jwtToken = window.localStorage.getItem("token");
    axios
      .get("http://localhost:8000/api/internship-process/get-all", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        console.log(response.data.internshipProcessList);
        let processStatus =
          response.data.internshipProcessList[0].processStatus;
        processStatus = "PRE1";
        setShowStatus(true);
        setData(response.data.internshipProcessList[0]);

        if (processStatus === "FORM") {
          setCurrentStep(0);
        } else if (processStatus === "PRE1") {
          setCurrentStep(1);
        } else if (processStatus === "PRE2") {
          setCurrentStep(2);
        } else if (processStatus === "PRE3") {
          setCurrentStep(3);
        }
      })
      .catch((error) => {
        console.log("error:", error.response);
      });
  }, []);

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
        {showSteps && (
          <StepsContainer>
            <Steps
              size="small"
              current={currentStep}
              status="process"
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
        )}
      </Header>
      <ActiveApplicationForm data={data} />
    </div>
  );
};

export default PastApplicationDetail;
