import React, { useEffect, useState } from "react";
import { API } from "src/config/api";
import getAxiosConfig from "src/config/axiosConfig";
import { getStepItems } from "./applicationUtils";
import { Steps, Tag, Skeleton, Alert, Button } from "antd";
import styled from "styled-components";
import ActiveApplicationForm from "../../activeApplication/ActiveApplicationForm";
import ContentHeader from "src/components/ContentHeader";
import axios from "src/services/axios";
import ActiveApplicationViewForm from "../../activeApplication/ActiveApplicationViewForm";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Text } from "src/context/LanguageProvider";
import UseLanguage from "src/hooks/useLanguage";
import { HistoryOutlined, CalendarOutlined } from "@ant-design/icons";
import UploadReportsForm from "./UploadReportsForm";
import UploadEmployeesForm from "./UploadEmployeesForm";

const StepsContainer = styled.div`
  width: 100%;
`;

const StyledButton = styled(Button)`
  @media (max-width: 600px) {
    flex: 1;
  }

  display: flex;
  gap: 7px;
  justify-content: center;
  align-items: center;
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

const ApplicationDetail = () => {
  const [data, setData] = useState<any>([]);
  const [showSteps, setShowSteps] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [editable, setEditable] = useState(false);
  const [stepItems, setStepItems] = useState<StepItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [messageTitle, setMessageTitle] = useState("");
  const [messageType, setMessageType] = useState<any>("error");
  const [comment, setComment] = useState<any>("");
  const [stepsStatus, setStepsStatus] = useState<any>("process");
  const [showMessage, setShowMessage] = useState(false);
  const [processStatus, setProcessStatus] = useState("FORM");
  const { dictionary } = UseLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const isAcademician = location.pathname.includes("/akademisyen");
  const isInEvaluatePage = location.pathname.split("/").includes("evaluate");

  const processInternshipDetails = (
    internshipProcess: any,
    dictionary: any
  ) => {
    const processStatus = internshipProcess.processStatus;
    setProcessStatus(processStatus);
    const isRejected = internshipProcess.rejected;

    if (isRejected) {
      setShowSteps(true);
      setStepsStatus("error");
      setShowMessage(true);
      setMessageTitle(dictionary.applicationRejected);
      setMessageType("error");
      setComment(internshipProcess.comment);
    }

    switch (processStatus) {
      case "FORM":
        setCurrentStep(0);
        setShowSteps(false);
        setEditable(true);
        break;
      case "PRE1":
        setShowSteps(true);
        setCurrentStep(1);
        break;
      case "PRE2":
        setShowSteps(true);
        setCurrentStep(2);
        break;
      case "PRE3":
        setShowSteps(true);
        setCurrentStep(3);
        break;
      case "PRE4":
        setShowSteps(true);
        setCurrentStep(4);
        break;
      case "IN1":
        setShowSteps(true);
        setCurrentStep(5);
        setStepsStatus("done");
        setShowMessage(true);
        setMessageTitle(dictionary.applicationApproved);
        setMessageType("success");
        setComment(internshipProcess.comment);
        break;
      case "POST":
        setShowSteps(true);
        setCurrentStep(5);
        setStepsStatus("done");
        break;
      case "REPORT1":
        setShowSteps(false);
        break;
      default:
        setShowSteps(false);
    }
  };

  const handleInternshipProcess = (internshipProcess: any, dictionary: any) => {
    const isRejected = internshipProcess.rejected;
    processInternshipDetails(internshipProcess, dictionary);

    const processStatus = internshipProcess.processStatus;
    const stepItems = getStepItems(processStatus, isRejected, dictionary);

    setStepItems(stepItems);
    setData(internshipProcess);
    setEditable(internshipProcess.editable);
  };

  const fetchDataForStudent = () => {
    axios
      .get(API.INTERNSHIP_PROCESS.GET_ALL, getAxiosConfig())
      .then((response: any) => {
        const index = response.data.internshipProcessList.findIndex(
          (item: any) => item.id == id
        );

        if (index !== -1) {
          const internshipProcess = response.data.internshipProcessList[index];
          handleInternshipProcess(internshipProcess, dictionary);
        } else {
          console.log(`Internship process with id ${id} not found`);
        }
      })
      .catch((error) => {
        console.log("error:", error.response);
      })
      .finally(() => setLoading(false));
  };

  const fetchDataForAcademicianWithoutState = () => {
    const academicianId = window.localStorage.getItem("id");
    axios
      .post(API.INTERNSHIP_PROCESS.GET_ALL_PROCESS_ASSIGNED(academicianId))
      .then((response) => {
        const index = response.data.internshipProcessList.findIndex(
          (item: any) => item.id == id
        );
        if (index !== -1) {
          const internshipProcess = response.data.internshipProcessList[index];
          handleInternshipProcess(internshipProcess, dictionary);
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
  };

  const fetchDataForAcademicianWithState = () => {
    const internshipProcessList = location.state?.internshipProcessList;
    const processId = location.state?.processId;
    const internshipProcess = internshipProcessList.find(
      (process: any) => process.id === processId
    );
    handleInternshipProcess(internshipProcess, dictionary);
    setLoading(false);
  };

  useEffect(() => {
    if (location.pathname.includes("ogrenci")) {
      fetchDataForStudent();
    } else if (location.pathname.includes("akademisyen")) {
      if (location.state?.internshipProcessList) {
        fetchDataForAcademicianWithState();
      } else {
        fetchDataForAcademicianWithoutState();
      }
    }
  }, []);

  const handleExtension = () => {
    const postData = {
      processId: data.id,
      requestDate: new Date(2024, 2, 17),
      extensionDayNumber: "20",
    };
    axios
      .post(API.INTERNSHIP_PROCESS.EXTENSION, postData, getAxiosConfig())
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log("extension error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  console.log(data);

  // Test için burada kaldırılmalı
  /*  useEffect(() => {
    // Assuming getAxiosConfig() is a function that returns your Axios configuration
    const jwtToken = window.localStorage.getItem("token");

    axios
      .put("http://localhost:8000/api/internship-process/post?processId=952")
      .then((response: any) => {
        console.log(response);
      })
      .catch((error) => {
        console.log("error:", error.response);
      });
  }, []); */

  return (
    <div>
      <ContentHeader>
        <h2>
          <Text tid="applicationDetails" />
        </h2>

        {isAcademician && isInEvaluatePage && (
          <StyledButton
            onClick={() =>
              navigate(`/akademisyen/${data.studentId}/internships`)
            }
            disabled={loading}
          >
            <HistoryOutlined />
            <Text tid="pastInternships" />
          </StyledButton>
        )}

        {!isAcademician && processStatus == "IN1" && (
          <StyledButton onClick={handleExtension}>
            <CalendarOutlined />
            Extend Internship
          </StyledButton>
        )}
      </ContentHeader>
      {showMessage && (
        <Alert
          message={messageTitle}
          description={comment && `Akademisyen Notu: ${comment}`}
          type={messageType}
          showIcon
          style={{ marginBottom: 20 }}
          closable
        />
      )}
      {!loading && !isAcademician && processStatus == "IN1" && (
        <UploadEmployeesForm companyId={data.companyId} />
      )}
      {!loading && !isAcademician && processStatus == "POST" && (
        <UploadReportsForm processId={data.id} />
      )}

      <Header showSteps={showSteps}>
        {showSteps && (
          <StepsContainer>
            <Steps
              size="small"
              current={currentStep}
              status={stepsStatus}
              items={stepItems}
            />
          </StepsContainer>
        )}
      </Header>
      {loading ? (
        <Skeleton active />
      ) : editable && !isAcademician ? (
        <ActiveApplicationForm data={data} />
      ) : (
        <ActiveApplicationViewForm data={data} />
      )}
    </div>
  );
};

export default ApplicationDetail;
