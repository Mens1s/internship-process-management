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
  name: string;
  startDate: string;
  endDate: string;
  type: string;
}

export const columns: ColumnsType<DataType> = [
  {
    dataIndex: "key",
    rowScope: "row",
    width: "70px",
  },
  {
    title: "companyName",
    dataIndex: "name",
    key: "name",
    width: "120px",
  },
  {
    title: "startDate",
    dataIndex: "startDate",
    key: "startDate",
    width: "120px",
    filters: [
      {
        text: "2022-2023",
        value: "Joe",
      },
      {
        text: "2023-2024",
        value: "Category 1",
      },
      {
        text: "2024-2025",
        value: "Category 2",
      },
    ],
    filterSearch: true,
  },
  {
    title: "endDate",
    dataIndex: "endDate",
    key: "endDate",
    width: "120px",
  },
  {
    title: "type",
    dataIndex: "type",
    key: "type",
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
          if (tag === "Reddedildi") {
            color = "red";
          } else if (tag === "Onay Bekliyor") {
            color = "gold";
          } else if (tag === "Taslak") {
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
    render: (_, record) => (
      <Link
        to={`/akademisyen/internship/pending/evaluate/${record.id}`}
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
