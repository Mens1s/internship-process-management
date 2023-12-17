import React, { useState, useEffect } from "react";
import Table from "src/components/Table";
import { columns } from "./pendingApplicationsTable/PendingApplicationsTableColumns";
import ContentHeader from "src/components/ContentHeader";
import { Button, Input, Skeleton } from "antd";
import { Text } from "src/context/LanguageProvider";
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import useLanguage from "src/hooks/useLanguage";
import useEnhancedColumns from "src/hooks/useEnhancedColumns";
import axios from "src/services/axios";

const PastApplications = () => {
  const { dictionary } = useLanguage();
  const enhancedColumns = useEnhancedColumns(columns);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    const jwtToken = window.localStorage.getItem("token");
    setLoading(true); // Set loading to true before making the API request

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
      .then((response: any) => {
        console.log("get-all-assigned response: ", response);
        const internshipProcessList = response?.data?.internshipProcessList;
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
                tags:
                  [
                    item.processStatus === "FORM"
                      ? "Taslak"
                      : item.processStatus.includes("PRE")
                      ? "Onay Bekliyor"
                      : "Onaylandı",
                  ] || "-",
              };
            })
          );
        } else {
          console.error(
            "Invalid or missing internshipProcessList in the response"
          );
        }
      })
      .catch((error: any) => {
        console.log("get all assigned error: ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredData = data
    .filter((item: any) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map((filteredItem: any, index: any) => ({
      ...filteredItem,
      key: String(index + 1),
    }));
  return (
    <div>
      <ContentHeader>
        <div>
          <h2>
            <Text tid="pendingApplications" />
          </h2>
        </div>
        <div>
          <Button>
            <DownloadOutlined /> <Text tid="download" />
          </Button>
          <Input
            prefix={<SearchOutlined />}
            placeholder={dictionary.searchStudent}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </ContentHeader>
      {loading ? (
        <Skeleton active />
      ) : (
        <Table tableProps={{ columns: enhancedColumns, data: filteredData }} />
      )}
    </div>
  );
};

export default PastApplications;
