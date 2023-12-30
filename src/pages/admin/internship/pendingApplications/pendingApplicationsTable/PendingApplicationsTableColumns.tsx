import React from "react";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";
import MyButton from "src/components/Button";
import { Text } from "src/context/LanguageProvider";
import { Tag } from "antd";

interface DataType {
  id: number;
  key: string;
  fullName: string; // Fixing type for fullName
  studentNumber: string; // Fixing type for studentNumber
  date: string; // Fixing type for date
  tags: string[]; // Fixing type for tags
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
    width: "120px",
  },
  {
    title: "studentNumber",
    dataIndex: "studentNumber",
    key: "studentNumber",
    width: "120px",
  },
  {
    title: "date",
    dataIndex: "date",
    key: "date",
    width: "120px",
  },
  {
    title: "status",
    key: "tags",
    width: 120,
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
    render: (
      _,
      record: DataType // Fixing type for record
    ) => (
      <Link
        to={`/akademisyen/internships/pending/evaluate/${record.id}`}
        state={{ record, processId: record.key }}
      >
        <MyButton
          text={<Text tid="evaluate" />}
          icon={<EditOutlined />}
          type="primary"
        />
      </Link>
    ),
  },
];
