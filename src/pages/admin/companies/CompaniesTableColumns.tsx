import React from "react";
import type { ColumnsType } from "antd/es/table";
import { MoreOutlined } from "@ant-design/icons";
import { Text } from "src/context/LanguageProvider";
import MyButton from "src/components/Button";
import { Dropdown, Space } from "antd";
import type { MenuProps } from "antd";
import { Link } from "react-router-dom";

interface DataType {
  key: string;
  name: string;
  startDate: string;
  endDate: string;
  type: string;
}

export const getColumns = (showModal: any) => {
  const columns: ColumnsType<DataType> = [
    {
      dataIndex: "rowNum",
      rowScope: "row",
      width: "70px",
    },
    {
      title: "companyName",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "companyMail",
      dataIndex: "companyMail",
      key: "companyMail",
    },
    {
      title: "companyTelephone",
      dataIndex: "companyTelephone",
      key: "companyTelephone",
    },

    {
      key: "actions",
      fixed: "right",
      render: (_, record) => {
        const items: MenuProps["items"] = [
          {
            label: (
              <Link to={`${record.key}/internships`}>
                <Text tid="internshipInformation" />
              </Link>
            ),
            key: "0",
          },
          {
            label: (
              <span onClick={() => showModal(record)}>
                <Text tid="companyInformation" />
              </span>
            ),
            key: "1",
          },
        ];
        return (
          <Dropdown
            menu={{ items }}
            placement="bottomRight"
            trigger={["click"]}
          >
            <MyButton icon={<MoreOutlined />} type="text" />
          </Dropdown>
        );
      },
    },
  ];

  return columns;
};
