import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { Tag } from "antd";

interface DataType {
  key: string;
  name: string;
  startDate: string;
  endDate: string;
  type: string;
  tags: string[];
}

const columns: ColumnsType<DataType> = [
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
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
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
    render: (_, record) => (
      <Link to={`/ogrenci/past/${record.key}`}>
        <button
          style={{
            borderRadius: "5px",
            border: "none",
            padding: "5px 10px",
            cursor: "pointer",
          }}
        >
          View Details
        </button>
      </Link>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    startDate: "03.07.2023",
    endDate: "03.07.2023",
    type: "Zorunlu",
    tags: ["Onaylandı"],
  },
  {
    key: "2",
    name: "Jim Green",
    startDate: "18.08.2023",
    endDate: "18.08.2023",
    type: "Zorunlu",
    tags: ["Reddedildi"],
  },

  {
    key: "3",
    name: "John Brown",
    startDate: "03.07.2023",
    endDate: "03.07.2023",
    type: "Zorunlu",
    tags: ["Beklemede"],
  },
];

export { data, columns };
