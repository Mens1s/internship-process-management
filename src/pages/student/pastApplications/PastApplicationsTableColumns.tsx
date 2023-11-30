import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { Tag, Button } from "antd";
import { Text } from "../../../context/LanguageProvider";

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
  },
  {
    title: "startDate",
    dataIndex: "startDate",
    key: "startDate",
  },
  {
    title: "endDate",
    dataIndex: "endDate",
    key: "endDate",
  },
  {
    title: "type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "status",
    key: "tags",
    dataIndex: "tags",
    render: (_: any, { tags }: any) => (
      <>
        {tags.map((tag: any) => {
          let color;
          if (tag === "Reddedildi") {
            color = "volcano";
          } else if (tag === "Onay Bekliyor") {
            color = "geekblue";
          } else {
            color = "green";
          }
          return (
            <Tag color={color} key={tag}>
              {tag}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    key: "actions",
    render: (_: any, record: any) => (
      <Link to={`/ogrenci/past/${record.key}`}>
        <Button>
          <Text tid="view" />
        </Button>
      </Link>
    ),
  },
];
