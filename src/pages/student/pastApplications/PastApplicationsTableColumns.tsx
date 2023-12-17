import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { Tag } from "antd";
import { Text } from "src/context/LanguageProvider";
import { EyeOutlined } from "@ant-design/icons";
import MyButton from "src/components/Button";
interface DataType {
  key: string;
  name: string;
  startDate: string;
  endDate: string;
  type: string;
  tags: string[];
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
    width: 120,
  },
  {
    title: "startDate",
    dataIndex: "startDate",
    key: "startDate",
    width: 120,
  },
  {
    title: "endDate",
    dataIndex: "endDate",
    key: "endDate",
    width: 120,
  },
  {
    title: "type",
    dataIndex: "type",
    key: "type",
    width: 120,
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
    render: (_: any, record: any) => (
      <Link
        to={`/ogrenci/past/${record.id}`}
        state={{ record, processId: record.key }}
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
