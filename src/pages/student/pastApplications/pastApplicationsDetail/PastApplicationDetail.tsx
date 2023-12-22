import React, { useEffect, useState } from "react";
import { Steps, Tag, Skeleton } from "antd";
import styled from "styled-components";
import ActiveApplicationForm from "../../activeApplication/ActiveApplicationForm";
import ContentHeader from "src/components/ContentHeader";
import axios from "src/services/axios";
import ActiveApplicationViewForm from "../../activeApplication/ActiveApplicationViewForm";
import { useLocation, useParams } from "react-router-dom";

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
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<any>("process");
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    const jwtToken = window.localStorage.getItem("token");

    if (location.pathname.includes("ogrenci")) {
      axios
        .get("http://localhost:8000/api/internship-process/get-all", {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        })
        .then((response: any) => {
          const index = response.data.internshipProcessList.findIndex(
            (item: any) => item.id == id
          );

          if (index !== -1) {
            const internshipProcess =
              response.data.internshipProcessList[index];
            const processStatus = internshipProcess.processStatus;

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
            } else if (processStatus === "PRE4") {
              setShowSteps(true);
              setCurrentStep(4);
            } else {
              setShowSteps(true);
              setCurrentStep(5);
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
                title: "Fakülte",
                description: processStatus.includes("PRE")
                  ? "Onay Bekliyor"
                  : "Onaylandı",
              },
               {
                title: "Dekanlık",
                description: processStatus.includes("PRE")
                  ? "Onay Bekliyor"
                  : "Onaylandı",
              },
            ]);

            setData(internshipProcess);
            setEditable(internshipProcess.editable);
          } else {
            console.log(`Internship process with id ${id} not found`);
          }

          setLoading(false);
        })
        .catch((error) => {
          console.log("error:", error.response);
          setLoading(false);
        });
    } else if (location.pathname.includes("akademisyen")) {
      axios
        .post(
          "http://localhost:8000/api/internship-process/get-all-process-assigned",
          null,
          {
            params: {
              academicianId: 1,
            },
          }
        )
        .then((response) => {
          const index = response.data.internshipProcessList.findIndex(
            (item: any) => item.id == id
          );

          if (index !== -1) {
            const internshipProcess =
              response.data.internshipProcessList[index];
            const processStatus = internshipProcess.processStatus;

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
            } else if (processStatus === "PRE4") {
              setShowSteps(true);
              setCurrentStep(4);
            }else {
              setShowSteps(true);
              setCurrentStep(5);
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
                title: "Fakülte",
                description: processStatus.includes("PRE")
                  ? "Onay Bekliyor"
                  : "Onaylandı",
              },
              {
                title: "Dekanlık",
                description: processStatus.includes("PRE")
                  ? "Onay Bekliyor"
                  : "Onaylandı",
              },
            ]);

            setData(internshipProcess);
            setEditable(internshipProcess.editable);
          } else {
            console.log(`Internship process with id ${id} not found`);
          }

          setLoading(false);
        })
        .catch((error) => {
          console.log("get all assigned error:");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  return (
    <div>
      <ContentHeader>
        <h2>Başvuru Detayları</h2>
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
      ) : editable ? (
        <ActiveApplicationForm data={data} />
      ) : (
        <ActiveApplicationViewForm data={data} />
      )}
    </div>
  );
};

export default PastApplicationDetail;
