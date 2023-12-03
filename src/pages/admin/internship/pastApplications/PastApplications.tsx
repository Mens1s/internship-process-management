import React, { useState } from "react";
import ContentHeader from "src/components/ContentHeader";
import { Button, Input } from "antd";
import { SearchOutlined, DownloadOutlined } from "@ant-design/icons";
import { Text } from "src/context/LanguageProvider";
import useLanguage from "src/hooks/useLanguage";
const PastApplications = () => {
  const { dictionary } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <ContentHeader>
        <div>
          <h2>Geçmiş Stajlar</h2>
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

export default PastApplications;
