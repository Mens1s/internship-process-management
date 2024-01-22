import React, { useState } from "react";
import ContentHeader from "src/components/ContentHeader";
import { Button, Input, Tabs } from "antd";
import type { TabsProps } from "antd";

import { SearchOutlined, DownloadOutlined } from "@ant-design/icons";
import { Text } from "src/context/LanguageProvider";
import useLanguage from "src/hooks/useLanguage";
import styled from "styled-components";

const Header = styled.div`
  margin: 0 16px 20px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  /*   border-bottom: 1px solid #f0f0f0;
 */
  padding-bottom: 20px;

  @media (max-width: 500px) {
    margin-bottom: 0;
  }

  h2,
  h3,
  h4 {
    margin: 0;
    color: #292929;
    font-weight: 500;
  }

  div:nth-child(2) {
    display: flex;
    gap: 10px;
    flex: 1;
    max-width: 400px;
    input {
      min-width: 200px;
    }
  }
`;
const PastApplications = () => {
  const { dictionary } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: " Sonuçlandırılmayı Bekleyen Stajlar",
    },
    {
      key: "2",
      label: "Sonuçlandırılmış Stajlar",
    },
  ];

  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <div>
      <ContentHeader>
        <div>
          <h2>Tamamlanmış Stajlar</h2>
        </div>
        <div>
          {/*  <Button>
            <DownloadOutlined /> <Text tid="download" />
          </Button> */}
          <Input
            prefix={<SearchOutlined />}
            placeholder={dictionary.searchStudent}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </ContentHeader>
    </div>
  );
};

export default PastApplications;
