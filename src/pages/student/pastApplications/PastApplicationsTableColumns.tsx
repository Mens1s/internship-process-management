import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { Tag, Button } from "antd";

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
    title: "Company Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Start Date",
    dataIndex: "startDate",
    key: "startDate",
  },
  {
    title: "End Date",
    dataIndex: "endDate",
    key: "endDate",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Status",
    key: "tags",
    dataIndex: "tags",
    render: (_: any, { tags }: any) => (
      <>
        {tags.map((tag: any) => {
          let color;
          if (tag === "Reddedildi") {
            color = "volcano";
          } else if (tag === "Beklemede") {
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
    title: "Actions",
    key: "actions",
    render: (_: any, record: any) => (
      <Link to={`/ogrenci/past/${record.key}`}>
        <Button>Görüntüle</Button>
      </Link>
    ),
  },
];
