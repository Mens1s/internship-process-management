import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { Tag } from "antd";
import { Text } from "src/context/LanguageProvider";
import { EyeOutlined } from "@ant-design/icons";
import MyButton from "src/components/Button";
interface DataType {
  key: string;
  id: string;
  studentId: string;
  name: string;
  startDate: string;
  endDate: string;
  type: string;
  tags: string[];
  internshipProcessList: any;
}

export const columns: ColumnsType<DataType> = [
  {
    dataIndex: "key",
    rowScope: "row",
    width: "70px",
  },
  {
    title: "companyName",
    dataIndex: "companyName",
    key: "companyName",
    width: 120,
    render(text) {
      const isNotSpecified =
        text === "Belirtilmedi" || text === "Not Specified";
      const textStyle = isNotSpecified
        ? { fontStyle: "italic", color: "#c4c4c4" }
        : {};

      return {
        props: {
          style: textStyle,
        },
        children: <div>{text}</div>,
      };
    },
  },
  {
    title: "startDate",
    dataIndex: "startDate",
    key: "startDate",
    width: 120,
    render(text) {
      const isNotSpecified =
        text === "Belirtilmedi" || text === "Not Specified";
      const textStyle = isNotSpecified
        ? { fontStyle: "italic", color: "#c4c4c4" }
        : {};

      return {
        props: {
          style: textStyle,
        },
        children: <div>{text}</div>,
      };
    },
  },
  {
    title: "endDate",
    dataIndex: "endDate",
    key: "endDate",
    width: 120,
    render(text) {
      const isNotSpecified =
        text === "Belirtilmedi" || text === "Not Specified";
      const textStyle = isNotSpecified
        ? { fontStyle: "italic", color: "#c4c4c4" }
        : {};

      return {
        props: {
          style: textStyle,
        },
        children: <div>{text}</div>,
      };
    },
  },
  {
    title: "type",
    dataIndex: "type",
    key: "type",
    width: 120,
    render(text) {
      const isNotSpecified =
        text === "Belirtilmedi" || text === "Not Specified";
      const textStyle = isNotSpecified
        ? { fontStyle: "italic", color: "#c4c4c4" }
        : {};

      return {
        props: {
          style: textStyle,
        },
        children: <div>{text}</div>,
      };
    },
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
    render: (_: any, record: any) => (
      <Link
        to={`/akademisyen/${record.studentId}/internships/${record.id}`}
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
