import React, { useState } from "react";
import ContentHeader from "src/components/ContentHeader";
import { Button, Input, Tabs } from "antd";
import type { TabsProps } from "antd";

import { SearchOutlined, DownloadOutlined } from "@ant-design/icons";
import { Text } from "src/context/LanguageProvider";
import useLanguage from "src/hooks/useLanguage";
import styled from "styled-components";

const ActiveInternships = () => {
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
          <h2>Aktif Stajlar</h2>
        </div>
        <div>
          <Button>
            <DownloadOutlined /> <Text tid="download" />
          </Button>
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

export default ActiveInternships;
