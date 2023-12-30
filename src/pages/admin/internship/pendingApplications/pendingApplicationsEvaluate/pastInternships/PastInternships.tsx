import React, { useState, useEffect } from "react";
import Table from "src/components/Table";
import { Button, Modal, Skeleton, message } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { columns } from "./pastInternshipsTableColumns";
import ContentHeader from "src/components/ContentHeader";
import { Text } from "src/context/LanguageProvider";
import axios from "src/services/axios";
import useEnhancedColumns from "src/hooks/useEnhancedColumns";
import styled from "styled-components";
import UseLanguage from "src/hooks/useLanguage";

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
  const [data, setData] = useState<any>([]);
  const [companyName, setCompanyName] = useState("");
  const [fullName, setFullName] = useState("");
  const enhancedColumns = useEnhancedColumns(columns);
  const [canCreateNewForm, setCanCreateNewForm] = useState(false);

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

  useEffect(() => {
    let currentURL = window.location.href;
    let match = currentURL.match(/\/akademisyen\/(\d+)\/internships/);
    let studentId = match ? match[1] : null;

    const jwtToken = window.localStorage.getItem("token");
    axios
      .get(
        "http://localhost:8000/api/internship-process/get-student-all-processes",
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          params: {
            studentId: studentId,
          },
        }
      )
      .then((response) => {
        const internshipProcessList = response?.data?.internshipProcessList;
        console.log(internshipProcessList);
        if (internshipProcessList.length < 2) {
          setCanCreateNewForm(true);
        }
        if (internshipProcessList) {
          setFullName(internshipProcessList[0].fullName);
          setData(
            internshipProcessList?.map((item: any, index: any) => {
              return {
                key: index + 1,
                id: item.id,
                fullName: item.fullName,
                studentId: item.studentId,
                name: companyName || dictionary.notSpecified,
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
            {fullName}&nbsp;&middot;&nbsp;
            <Text tid="pastInternships" />
          </h2>
        </div>
      </ContentHeader>
      {loading ? (
        <Skeleton active={true} paragraph={{ rows: 4 }} />
      ) : (
        <Table tableProps={{ columns: enhancedColumns, data: data }} />
      )}
    </>
  );
};

export default PastApplications;
