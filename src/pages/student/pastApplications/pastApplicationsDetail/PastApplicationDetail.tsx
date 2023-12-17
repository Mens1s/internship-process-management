import React, { useEffect, useState } from "react";
import { Steps, Tag, Skeleton } from "antd";
import styled from "styled-components";
import ActiveApplicationForm from "../../activeApplication/ActiveApplicationForm";
import ContentHeader from "src/components/ContentHeader";
import axios from "src/services/axios";
import ActiveApplicationViewForm from "../../activeApplication/ActiveApplicationViewForm";

const StepsContainer = styled.div`
  width: 100%;
`;

interface HeaderProps {
  showSteps?: boolean;
}
const Header = styled.div<HeaderProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ showSteps }: any) => (showSteps ? "40px" : "10px")};
  margin-top: ${({ showSteps }: any) => (showSteps ? "40px" : "10px")};
`;

interface StepItem {
  title: string;
  description: string;
}

const PastApplicationDetail = () => {
  const [data, setData] = useState([]);
  const [showSteps, setShowSteps] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [editable, setEditable] = useState(false);
  const [stepItems, setStepItems] = useState<StepItem[]>([]);
  const [loading, setLoading] = useState(true); // Introduce loading state
  const [status, setStatus] = useState<any>("process");
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
        setData(response.data.internshipProcessList[0]);
        setEditable(response.data.internshipProcessList[0].editable);

        if (processStatus === "FORM") {
          setCurrentStep(0);
          setShowSteps(false);
          setEditable(true);
        } else if (processStatus === "REJECTED") {
          setShowSteps(true);
          setStatus("error");
        } else if (processStatus === "PRE1") {
          setShowSteps(true);
          setCurrentStep(1);
        } else if (processStatus === "PRE2") {
          setShowSteps(true);
          setCurrentStep(2);
        } else if (processStatus === "PRE3") {
          setShowSteps(true);
          setCurrentStep(3);
        } else {
          setShowSteps(true);
          setCurrentStep(4);
        }

        setStepItems([
          {
            title: "Öğrenci",
            description: "Başvuru yapıldı",
          },
          {
            title: "Staj Komisyonu",
            description:
              processStatus == "PRE1" ? "Onay Bekliyor" : "Onaylandı",
          },
          {
            title: "Bölüm",
            description:
              processStatus != "PRE2" && processStatus != "PRE1"
                ? "Onaylandı"
                : "Onay Bekliyor",
          },
          {
            title: "Dekanlık",
            description: processStatus.includes("PRE")
              ? "Onay Bekliyor"
              : "Onaylandı",
          },
        ]);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error:", error.response);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <ContentHeader>
        <h2>Aktif Staj Başvurum</h2>
        {/*  <Tag
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
        </Tag> */}
      </ContentHeader>
      <Header showSteps={showSteps}>
        {showSteps && (
          <StepsContainer>
            <Steps
              size="small"
              current={currentStep}
              status={status}
              items={stepItems}
            />
          </StepsContainer>
        )}
      </Header>
      {loading ? (
        <Skeleton active />
      ) : true ? (
        <ActiveApplicationForm data={data} />
      ) : (
        <ActiveApplicationViewForm data={data} />
      )}
    </div>
  );
};

export default PastApplicationDetail;
