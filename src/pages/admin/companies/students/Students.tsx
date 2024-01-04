import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams from React Router
import ContentHeader from "src/components/ContentHeader";
import Table from "src/components/Table";
import { columns } from "./StudentsTableColumns";
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import { Text } from "src/context/LanguageProvider";
import { Button, Input, Skeleton } from "antd";
import useLanguage from "src/hooks/useLanguage";
import axios from "src/services/axios";
import { API } from "src/config/api";
import useEnhancedColumns from "src/hooks/useEnhancedColumns";
import getAxiosConfig from "src/config/axiosConfig";

const Students = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { dictionary } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { id } = useParams(); // Get the 'id' parameter from the URL
  const enhancedColumns = useEnhancedColumns(columns);

  /*  const filteredData = data
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map((filteredItem, index) => ({
      ...filteredItem,
      key: String(index + 1),
    })); */

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

  useEffect(() => {
    setLoading(true);
    axios
      .get(API.INTERNSHIP_PROCESS.GET_ALL_BY_COMPANY(id), getAxiosConfig())
      .then((response: any) => {
        console.log(response);
        const internshipProcessList = response.data?.internshipProcessList;
        setData(
          internshipProcessList?.map((item: any, index: any) => {
            return {
              key: index + 1,
              processId: item.id,
              companyId: id,
              studentNumber: item.studentNumber,
              fullName: item.fullName || "-",
              date: new Date(item?.updateDate).toLocaleDateString() || "-",
              tags: [getStatus(item)],
              internshipProcessList: internshipProcessList,
            };
          })
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <ContentHeader>
        <div>
          <h2>Staj Bilgileri</h2>
        </div>
        <div>
          <Button>
            <DownloadOutlined /> <Text tid="download" />
          </Button>
          <Input
            prefix={<SearchOutlined />}
            style={{ width: "100%" }}
            placeholder={dictionary.searchStudent}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </ContentHeader>
      {loading ? (
        <Skeleton />
      ) : (
        <Table tableProps={{ columns: enhancedColumns, data }} />
      )}
    </div>
  );
};

export default Students;
