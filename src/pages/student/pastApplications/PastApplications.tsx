import React, { useState, useEffect, useRef } from "react";
import Table from "src/components/Table";
import { Button, Modal, Skeleton, message, Tour } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { columns } from "./PastApplicationsTableColumns";
import ContentHeader from "src/components/ContentHeader";
import { Text } from "src/context/LanguageProvider";
import axios from "src/services/axios";
import useEnhancedColumns from "src/hooks/useEnhancedColumns";
import styled from "styled-components";
import UseLanguage from "src/hooks/useLanguage";
import type { TourProps } from "antd";

const StyledButton = styled(Button)`
  @media (max-width: 600px) {
    flex: 1;
  }

  display: flex;
  gap: 7px;
  justify-content: center;
  align-items: center;
`;

const PastApplications: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  const { dictionary } = UseLanguage();
  const [createLoading, setCreateLoading] = useState(false);
  const [data, setData] = useState([]);
  const [companies, setCompanies] = useState<any>([]);
  const navigate = useNavigate();
  const enhancedColumns = useEnhancedColumns(columns);
  const [canCreateNewForm, setCanCreateNewForm] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState<boolean>(false);

  const ref = useRef(null);

  const steps: TourProps["steps"] = [
    {
      title: "Başvuru Taslağı Oluşturuldu",
      description: "Başvurularını buradan inceleyebilirsin",
      target: () => ref.current,
      placement: "bottom",
    },
  ];

  const success = () => {
    messageApi.open({
      type: "success",
      content: dictionary.internshipApplicationIsCreated,
    });
  };

  const errorMessage = (code: any) => {
    let text;
    if (code == 400) {
      text = "Aynı anda ikiden fazla başvuruya sahip olunamaz.";
    } else if (code == 500) {
      text = "Bağlantı hatası oluştu. Lütfen tekrar deneyiniz.";
    } else {
      text = "Bir hata oluştu. Lütfen tekrar deneyiniz.";
    }
    messageApi.open({
      type: "error",
      content: text,
      duration: 5,
    });
  };

  const [reloadPage, setReloadPage] = useState(0);

  const handleInit = () => {
    const jwtToken = window.localStorage.getItem("token");
    setCreateLoading(true);
    axios
      .post(
        "http://localhost:8000/api/internship-process/init",
        {},
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then((response) => {
        setReloadPage((prev) => prev + 1);
        setCanCreateNewForm((prev) => !prev);
        setIsTourOpen(true);
        success();
      })
      .catch((error) => {
        console.log("error:", error);
        errorMessage(error.response.status);
      })
      .finally(() => {
        setCreateLoading(false);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/company/getAll")
      .then((response) => {
        setCompanies(response?.data?.companies);
      })
      .catch((error: any) => {
        console.log("company error: ", error);
      });

    const jwtToken = window.localStorage.getItem("token");
    axios
      .get("http://localhost:8000/api/internship-process/get-all", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        const internshipProcessList = response?.data?.internshipProcessList;
        if (internshipProcessList.length < 2) {
          setCanCreateNewForm(true);
        }
        if (internshipProcessList) {
          setData(
            internshipProcessList?.map((item: any, index: any) => {
              return {
                key: index + 1,
                id: item.id,
                name: item.companyName || dictionary.notSpecified,
                startDate:
                  item?.startDate &&
                  new Date(item.startDate).getFullYear() !== 1970
                    ? new Date(item.startDate).toLocaleDateString()
                    : dictionary.notSpecified,
                endDate:
                  item?.endDate && new Date(item.endDate).getFullYear() !== 1970
                    ? new Date(item.endDate).toLocaleDateString()
                    : dictionary.notSpecified,
                type: item?.internshipType || dictionary.notSpecified,
                tags: [getStatus(item)] || dictionary.notSpecified,
              };
            })
          );
        } else {
          console.error(
            "Invalid or missing internshipProcessList in the response"
          );
        }
      })
      .catch((error) => {
        console.log("get error:", error.response);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [reloadPage]);

  function getStatus(item: any) {
    if (item.rejected) {
      return dictionary.rejected;
    } else {
      if (item.processStatus === "FORM") {
        return dictionary.draft;
      } else if (item.processStatus.startsWith("PRE")) {
        return dictionary.pending;
      } else if (item.processStatus.startsWith("IN")) {
        return dictionary.approved;
      } else {
        return "-";
      }
    }
  }

  return (
    <>
      {contextHolder}
      <ContentHeader>
        <div>
          <h2>
            <Text tid="myInternshipApplications" />
          </h2>
        </div>
        <StyledButton
          disabled={!canCreateNewForm}
          loading={createLoading}
          onClick={handleInit}
        >
          <PlusCircleOutlined />
          <Text tid="createForm"></Text>
        </StyledButton>
      </ContentHeader>
      {loading ? (
        <Skeleton active={true} paragraph={{ rows: 4 }} />
      ) : (
        <div ref={ref}>
          <Table
            tableProps={{
              columns: enhancedColumns,
              data,
              loading: createLoading,
            }}
          />
        </div>
      )}
      {/*  <Tour
        open={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        type="primary"
        steps={steps}
        mask={false}
      /> */}
    </>
  );
};

export default PastApplications;
