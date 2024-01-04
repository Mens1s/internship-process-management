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

const PastApplications: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  const { dictionary } = UseLanguage();
  const [data, setData] = useState<any>([]);
  const [companyName, setCompanyName] = useState("");
  const [fullName, setFullName] = useState("");
  const enhancedColumns = useEnhancedColumns(columns);

  const [reloadPage, setReloadPage] = useState(0);

  useEffect(() => {
    let currentURL = window.location.href;
    let match = currentURL.match(/\/akademisyen\/(\d+)\/internships/);
    let studentId = match ? match[1] : null;
    setLoading(true);

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
      .then((response: any) => {
        const internshipProcessList = response?.data?.internshipProcessList;
        console.log(internshipProcessList);
        if (internshipProcessList) {
          setFullName(internshipProcessList[0].fullName);
          setData(
            internshipProcessList?.map((item: any, index: any) => {
              return {
                key: index + 1,
                id: item.id,
                studentId: item.studentId,
                companyName: item.companyName,
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
                internshipProcessList: internshipProcessList,
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
      } else if (item.processStatus.includes("PRE")) {
        return dictionary.pending;
      } else if (item.processStatus.includes("IN")) {
        return dictionary.approved;
      } else if (item.processStatus.includes("POST")) {
        return dictionary.evaluation;
      } else if (item.processStatus.includes("REPORT")) {
        return dictionary.evaluation;
      } else if (item.processStatus.includes("DONE")) {
        return dictionary.completed;
      } else if (item.processStatus.includes("FAIL")) {
        return dictionary.rejected;
      } else {
        return " ";
      }
    }
  }

  return (
    <>
      {contextHolder}
      <ContentHeader>
        <div>
          <h2>
            {loading ? (
              <Skeleton.Input active size="small"></Skeleton.Input>
            ) : (
              <span>{fullName}</span>
            )}
            &nbsp;&middot;&nbsp;
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
