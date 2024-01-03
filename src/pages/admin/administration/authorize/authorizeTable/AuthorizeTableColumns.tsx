import React, { useState } from "react";
import { Dropdown, Form, Tooltip } from "antd";
import MyButton from "src/components/Button";
import { Text } from "src/context/LanguageProvider";
import { MoreOutlined } from "@ant-design/icons";
import { Space, Button, Checkbox } from "antd";
import styled from "styled-components";

const ClickableDiv = styled.div`
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #f0f0f0;
  }
`;
export const GetColumns = (
  showModal: any,
  token: any,
  academics: any,
  loading: any
) => {
  const [form] = Form.useForm();
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [currentRecord, setCurrentRecord] = useState<any>(null);

  const handleCheckboxChange = (key: string, record: any) => {
    setCurrentRecord(record);

    setSelectedCheckboxes((prevSelected) => {
      const index = parseInt(key) - 1;
      const updatedSelected = [...prevSelected];
      updatedSelected[index] = !updatedSelected[index];
      return updatedSelected;
    });
  };

  const handleSubmit = () => {
    if (currentRecord) {
      showModal(currentRecord, selectedCheckboxes);
    } else {
      window.location.reload();
    }
  };
  const setInitialCheckboxValues = (record: any) => {
    const academicIndex = record.key - 1;
    const academicData = academics[academicIndex];
    setSelectedCheckboxes([
      academicData?.internshipCommittee || false,
      academicData?.departmentChair || false,
      academicData?.executive || false,
      academicData?.academic || false,
      academicData?.researchAssistant || false,
    ]);
  };

  const columns = [
    {
      dataIndex: "key",
      rowScope: "row",
      width: "70px",
    },
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "surname",
      dataIndex: "surname",
      key: "surname",
    },

    {
      title: "mail",
      dataIndex: "mail",
      key: "mail",
    },
    {
      title: "department",
      dataIndex: "department",
      key: "department",
    },
    {
      key: "actions",
      fixed: "right",
      render: (_: any, record: any) => {
        const items = [
          {
            label: " Internship Committee",
            key: "1",
          },
          {
            label: "Department Chair",
            key: "2",
          },
          {
            label: "Executive",
            key: "3",
          },
          {
            label: "Academic",
            key: "4",
          },
          {
            label: "Research Assistant",
            key: "5",
          },
        ];
        const contentStyle = {
          backgroundColor: token.colorBgElevated,
          borderRadius: token.borderRadiusLG,
          boxShadow: token.boxShadowSecondary,
          padding: "5px 5px 0 5px",
        };

        return (
          <Dropdown
            menu={{ items }}
            placement="bottomRight"
            trigger={["click"]}
            onVisibleChange={(visible) => {
              if (visible) {
                setInitialCheckboxValues(record);
              }
            }}
            dropdownRender={() => (
              <Form form={form} onFinish={handleSubmit}>
                <div style={contentStyle}>
                  {items.map((item, index) => (
                    <Form.Item
                      key={item?.key}
                      name={`checkbox_${item?.key}`}
                      style={{ marginBottom: 0, marginTop: 0 }}
                    >
                      <ClickableDiv
                        onClick={() => handleCheckboxChange(item?.key, record)}
                      >
                        <Checkbox
                          checked={selectedCheckboxes[index]}
                          style={{ marginRight: 10 }}
                          onChange={() =>
                            handleCheckboxChange(item?.key, record)
                          }
                        />
                        {item?.label}
                      </ClickableDiv>
                    </Form.Item>
                  ))}

                  <Space style={{ padding: 8 }}>
                    <Button
                      style={{ width: "170px" }}
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                    >
                      Onayla
                    </Button>
                  </Space>
                </div>
              </Form>
            )}
          >
            <Tooltip title="Görev Ata">
              <MyButton icon={<MoreOutlined />} type="text" />
            </Tooltip>
          </Dropdown>
        );
      },
    },
  ];
  return columns;
};
