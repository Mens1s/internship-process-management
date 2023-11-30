import React, { useState, ReactNode } from "react";
import { CloseOutlined } from "@ant-design/icons";

interface WarningProps {
  children: ReactNode;
  type: "danger" | "success"; // Assuming you have only "danger" and "success" types
}

const Warning: React.FC<WarningProps> = ({ children, type }: any) => {
  const [isVisible, setIsVisible] = useState(true);

  const background = type === "danger" ? "#cc2b2b" : "#2bcc7e";

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div
          style={{
            height: "40px",
            background,
            paddingLeft: "20px",
            display: "flex",
            alignItems: "center",
            color: "white",
            position: "sticky",
            top: "64px",
            zIndex: "9",
          }}
        >
          {children}
          <button
            style={{
              marginLeft: "auto",
              marginRight: "20px",
              background: "transparent",
              border: "none",
              color: "white",
              cursor: "pointer",
            }}
            onClick={handleClose}
          >
            <CloseOutlined />
          </button>
        </div>
      )}
    </>
  );
};

export default Warning;
