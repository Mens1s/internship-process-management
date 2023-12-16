import React, { useState, useEffect } from "react";
import Table from "src/components/Table";
import { columns } from "./pendingApplicationsTable/PendingApplicationsTableColumns";
import ContentHeader from "src/components/ContentHeader";
import { Button, Input } from "antd";
import { Text } from "src/context/LanguageProvider";
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import useLanguage from "src/hooks/useLanguage";
import useEnhancedColumns from "src/hooks/useEnhancedColumns";
import axios from "src/services/axios";

interface DataType {
  key?: string;
  name: string;
  startDate: string;
  endDate: string;
  type: string;
}

const data_1: DataType[] = [
  {
    name: "John Brown",
    startDate: "03.07.2023",
    endDate: "03.07.2023",
    type: "Zorunlu",
  },
  {
    name: "Jim Green",
    startDate: "18.08.2023",
    endDate: "18.08.2023",
    type: "Zorunlu",
  },
  {
    name: "Joe Black",
    startDate: "05.06.2022",
    endDate: "05.06.2022",
    type: "İsteğe Bağlı",
  },
  {
    name: "John Brown",
    startDate: "03.07.2023",
    endDate: "03.07.2023",
    type: "Zorunlu",
  },
  {
    name: "Jim Green",
    startDate: "18.08.2023",
    endDate: "18.08.2023",
    type: "Zorunlu",
  },
  {
    name: "Joe Black",
    startDate: "05.06.2022",
    endDate: "05.06.2022",
    type: "İsteğe Bağlı",
  },
  {
    name: "John Brown",
    startDate: "03.07.2023",
    endDate: "03.07.2023",
    type: "Zorunlu",
  },
  {
    name: "Jim Green",
    startDate: "18.08.2023",
    endDate: "18.08.2023",
    type: "Zorunlu",
  },
  {
    name: "Joe Black",
    startDate: "05.06.2022",
    endDate: "05.06.2022",
    type: "İsteğe Bağlı",
  },
];

const PastApplications = () => {
  const { dictionary } = useLanguage();
  const enhancedColumns = useEnhancedColumns(columns);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const jwtToken = window.localStorage.getItem("token");
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
        console.log(response);
        console.log(response.data.internshipProcessList);
        const internshipProcessList = response?.data?.internshipProcessList;
        if (internshipProcessList) {
          setData(
            internshipProcessList?.map((item: any) => ({
              key: item?.id,
              name: item?.companyId.toString(),
              startDate: item?.startDate,
              endDate: item?.endDate,
              type: item?.internshipType,
              tags: [
                item.processStatus === "FORM" ? "Taslak" : "Onay Bekliyor",
              ],
            }))
          );
        } else {
          console.error(
            "Invalid or missing internshipProcessList in the response"
          );
        }
      })
      .catch((error) => {
        console.log("new error:");
      })
      .finally(() => {
        setLoading(false);
      });
    /* 
    const academicianId = 1; // Replace with the actual value

    axios
      .post(
        "http://localhost:8000/api/internship-process/get-all-process-assigned",
        null,
        {
          params: {
            academicianId: academicianId,
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      }); */
  }, []);

  const filteredData = data
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map((filteredItem, index) => ({
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
      <Table tableProps={{ columns: enhancedColumns, data: filteredData }} />
    </div>
  );
};

export default PastApplications;
