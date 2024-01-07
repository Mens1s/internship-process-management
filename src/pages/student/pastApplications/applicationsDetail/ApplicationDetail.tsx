import React, { useEffect, useState } from "react";
import { API } from "src/config/api";
import getAxiosConfig from "src/config/axiosConfig";
import { getPreStepItems, getPostStepItems } from "./applicationUtils";
import { Steps, Skeleton, Alert, Button } from "antd";
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
  const [showPreSteps, setShowPreSteps] = useState(false);
  const [showPostSteps, setShowPostSteps] = useState(false);
  const [preCurrentStep, setPreCurrentStep] = useState(0);
  const [postCurrentStep, setPostCurrentStep] = useState(0);
  const [editable, setEditable] = useState(false);
  const [preStepItems, setPreStepItems] = useState<StepItem[]>([]);
  const [postStepItems, setPostStepItems] = useState<StepItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [messageTitle, setMessageTitle] = useState("");
  const [commentOwner, setCommentOwner] = useState("");
  const [messageType, setMessageType] = useState<any>("error");
  const [preStepsStatus, setPreStepsStatus] = useState<any>("process");
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
      setShowPreSteps(true);
      setPreStepsStatus("error");
      setShowMessage(true);
      setMessageTitle(dictionary.applicationRejected);
      setMessageType("error");
    } /* else if (internshipProcess.comment) {
      setShowMessage(true);
      setMessageTitle("");
      setMessageType("info");
    } */

    switch (processStatus) {
      case "FORM":
        setPreCurrentStep(0);
        setShowPreSteps(false);
        setEditable(true);
        break;
      case "PRE1":
        setShowPreSteps(true);
        setPreCurrentStep(1);
        break;
      case "PRE2":
        setShowPreSteps(true);
        setPreCurrentStep(2);
        break;
      case "PRE3":
        setShowPreSteps(true);
        setPreCurrentStep(3);
        break;
      case "PRE4":
        setShowPreSteps(true);
        setPreCurrentStep(4);
        break;
      case "IN1":
        setShowPreSteps(false);
        setPreCurrentStep(5);
        setPreStepsStatus("done");
        setShowMessage(true);
        setMessageTitle(dictionary.applicationApproved);
        setMessageType("success");
        break;
      case "POST":
        setShowPreSteps(false);
        setShowPostSteps(true);
        break;
      case "REPORT1":
        setShowPreSteps(false);
        setShowPostSteps(true);
        setPostCurrentStep(1);
        break;
      case "REPORT2":
        setShowPreSteps(false);
        setShowPostSteps(true);
        setPostCurrentStep(2);
        break;
      case "FAIL":
        setShowPreSteps(false);
        setShowPostSteps(false);
        setShowMessage(true);
        setMessageTitle(dictionary.applicationRejected);
        setMessageType("error");
        break;
      case "DONE":
        setShowPreSteps(false);
        setShowPostSteps(false);
        setShowMessage(true);
        setMessageTitle(dictionary.applicationApproved);
        setMessageType("success");
        break;
    }
  };

  const handleInternshipProcess = (internshipProcess: any, dictionary: any) => {
    const isRejected = internshipProcess.rejected;
    processInternshipDetails(internshipProcess, dictionary);
    const preEnums = ["FORM", "PRE1", "PRE2", "PRE3", "PRE4", "IN1", "IN2"];
    const processStatus = internshipProcess.processStatus;

    if (preEnums.includes(processStatus)) {
      const preStepItems = getPreStepItems(
        processStatus,
        isRejected,
        dictionary
      );
      setPreStepItems(preStepItems);
    } else {
    }
    const postStepItems = getPostStepItems(
      processStatus,
      isRejected,
      dictionary
    );
    setPostStepItems(postStepItems);
    setData(internshipProcess);
    setEditable(
      internshipProcess.processStatus === "POST"
        ? false
        : internshipProcess.editable
    );
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
          description={
            data.comment && (
              <span>
                <strong>Akademisyen Notu:</strong>
                <br />
                <span
                  style={{ color: data.commentOwner ? "black" : "inherit" }}
                >
                  {data.commentOwner && `${data.commentOwner}: `}
                </span>
                {data.comment}
              </span>
            )
          }
          type={messageType}
          showIcon
          style={{
            marginBottom: 20,
            borderLeft: `5px solid ${
              messageType === "success" ? "#52c41a" : "#ff4d4f"
            }`,
          }}
          closable
        />
      )}
      {!loading && !isAcademician && processStatus == "IN1" && (
        <UploadEmployeesForm companyId={data.companyId} />
      )}
      {!loading && !isAcademician && processStatus == "POST" && (
        <UploadReportsForm processId={data.id} />
      )}

      <Header showSteps={showPreSteps || showPostSteps}>
        {showPreSteps && (
          <StepsContainer>
            <Steps
              size="small"
              current={preCurrentStep}
              status={preStepsStatus}
              items={preStepItems}
            />
          </StepsContainer>
        )}
        {showPostSteps && (
          <StepsContainer>
            <Steps
              size="small"
              current={postCurrentStep}
              status={preStepsStatus}
              items={postStepItems}
            />
          </StepsContainer>
        )}
      </Header>
      {loading ? (
        <Skeleton active />
      ) : editable && !isAcademician ? (
        <ActiveApplicationForm data={data} reload={fetchDataForStudent} />
      ) : (
        <ActiveApplicationViewForm data={data} />
      )}
    </div>
  );
};

export default ApplicationDetail;
