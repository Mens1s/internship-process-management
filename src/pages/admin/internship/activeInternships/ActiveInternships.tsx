import React, { useState, useRef } from "react";
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

  const fileInputRef = useRef<any>("elma"); // Use non-null assertion

  // Function will execute on click of button
  const onButtonClick = () => {
    // Access the file input element and get the selected file
    const selectedFile = fileInputRef.current?.files[0];
    if (selectedFile) {
      // Create a FormData object and append the file to it
      console.log(selectedFile);
      const formData = new FormData();
      console.log("Empty FormData:", formData);

      formData.append("file", selectedFile);
      console.log("FormData after append:", formData);

      // Make a fetch request to the API endpoint
      fetch("your-api-endpoint", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("File uploaded successfully", data);
          // Add any additional logic after successful file upload
        })
        .catch((error) => {
          console.error("Error uploading file", error);
          // Handle errors appropriately
        });
    }
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

      <center>
        <h1>Welcome to Geeks for Geeks</h1>
        <h3>Click on below button to upload file to API</h3>
        <input type="file" ref={fileInputRef} />
        <button onClick={onButtonClick}>Upload File</button>
      </center>
    </div>
  );
};

export default ActiveInternships;
