import React, { useState, useEffect } from "react";
import Table from "src/components/Table";
import { Button, Modal, Skeleton, message } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { columns } from "./PastApplicationsTableColumns";
import ContentHeader from "src/components/ContentHeader";
import { Text } from "src/context/LanguageProvider";
import axios from "src/services/axios";
import useEnhancedColumns from "src/hooks/useEnhancedColumns";
import styled from "styled-components";

const StyledButton = styled(Button)`
  @media (max-width: 600px) {
    flex: 1;
  }
`;

const PastApplications: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();

  const [createLoading, setCreateLoading] = useState(false);
  const [data, setData] = useState([]);
  const [companies, setCompanies] = useState<any>([]);
  const [companyName, setCompanyName] = useState("");
  const navigate = useNavigate();
  const enhancedColumns = useEnhancedColumns(columns);
  const [canCreateNewForm, setCanCreateNewForm] = useState(false);

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Boş başvuru formunuz başarıyla oluşturuldu!",
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
        window.location.reload();
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
        console.log(response.data.companyList);
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
                name: companyName || "-",
                startDate:
                  new Date(item?.startDate).toLocaleDateString() || "-",
                endDate: new Date(item?.endDate).toLocaleDateString() || "-",
                type: item?.internshipType || "-",
                tags: [(item.processStatus = getStatus(item))] || "-",
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
  }, []);

  function getStatus(item: any) {
    if (item.processStatus === "FORM") {
      return "Taslak";
    } else if (item.processStatus.startsWith("PRE")) {
      return "Onay Bekliyor";
    } else if (item.processStatus.startsWith("IN")) {
      return "Onaylandı";
    } else {
      // Return a default value if none of the conditions match
      return "-";
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
          <PlusCircleOutlined /> Form Oluştur
        </StyledButton>
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
