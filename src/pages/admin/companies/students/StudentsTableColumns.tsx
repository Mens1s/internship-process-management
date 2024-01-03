import React from "react";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";
import MyButton from "src/components/Button";
import { Text } from "src/context/LanguageProvider";
import { Tag } from "antd";
import { EyeOutlined } from "@ant-design/icons";

interface DataType {
  companyId: number;
  processId: number;
  key: string;
  fullName: string;
  studentNumber: string;
  date: string;
  tags: string[];
}

export const columns: ColumnsType<DataType> = [
  {
    dataIndex: "key",
    rowScope: "row",
    width: "70px",
  },
  {
    title: "fullName",
    dataIndex: "fullName",
    key: "fullName",
  },
  {
    title: "studentNumber",
    dataIndex: "studentNumber",
    key: "studentNumber",
  },
  {
    title: "date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "status",
    key: "tags",
    dataIndex: "tags",
    render: (_: any, { tags }: any) => (
      <>
        {tags.map((tag: any) => {
          let color;
          if (tag === "Reddedildi" || tag === "Rejected") {
            color = "red";
          } else if (tag === "Onay Bekliyor" || tag === "Pending") {
            color = "gold";
          } else if (tag === "Taslak" || tag === "Draft") {
            color = "defult";
          } else if (tag === "Değerlendirme" || tag === "Evaluation") {
            color = "geekblue";
          } else {
            color = "green";
          }

          return (
            <Tag
              style={{
                width: "100%",
                maxWidth: 100,
                textAlign: "center",
                borderRadius: "10px",
              }}
              color={color}
              key={tag}
            >
              {tag}
            </Tag>
          );
        })}
      </>
    ),
  },

  {
    key: "actions",
    fixed: "right",
    render: (_: any, record: any) => (
      <Link
        to={`/akademisyen/companies/${record.companyId}/internships/${record.processId}`}
        state={{
          record,
          processId: record.id,
          internshipProcessList: record.internshipProcessList,
        }}
      >
        <MyButton
          text={<Text tid="view" />}
          icon={<EyeOutlined />}
          type="default"
        />
      </Link>
    ),
  },
];
