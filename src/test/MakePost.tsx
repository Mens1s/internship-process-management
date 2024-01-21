import { message, Button, Divider } from "antd";
import React, { useState } from "react";
import { API } from "src/config/api";
import axios from "src/services/axios";

const MakePost = () => {
  const [processId, setProcessId] = useState(""); // State to store processId
  const [loading, setLoading] = useState(false); // State to control loading state of the button

  const handleButtonClick = () => {
    // Check if processId is provided
    if (processId.trim() === "") {
      console.error("Please enter a processId");
      return;
    }

    // Set loading to true before sending API request
    setLoading(true);

    // Send API request with the provided processId
    axios
      .put(`${API}/api/internship-process/post?processId=${processId}`)
      .then((response) => {
        console.log(response);
        message.success(`${processId} id numaralı staj POST aşamasına alındı`);
      })
      .catch((error) => {
        console.log("error:", error.response);
        message.error("İşlem başarısız");
      })
      .finally(() => {
        // Set loading to false after API request is completed (success or error)
        setLoading(false);
      });
  };

  return (
    <div style={{ margin: 20 }}>
      API request for test purposes.
      <Divider />
      <div style={{ marginBottom: 20 }}>
        Take internship process with given process id to POST status:{" "}
      </div>
      <Divider />
      <label
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        Process ID:
        <input
          style={{
            margin: 10,
            height: 30,
            borderRadius: 10,
            border: "1px solid lightgray",
          }}
          type="text"
          value={processId}
          onChange={(e) => setProcessId(e.target.value)}
        />
        <Button
          style={{ height: 35 }}
          loading={loading}
          onClick={handleButtonClick}
        >
          Tamam
        </Button>
      </label>
    </div>
  );
};

export default MakePost;
