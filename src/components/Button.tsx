import React, { useEffect, useState } from "react";
import { Button } from "antd";
import styled from "styled-components";
import { ReactNode } from "react";

interface MyButtonProps {
  text: ReactNode;
  icon: ReactNode;
}

const MyButton: React.FC<MyButtonProps> = ({ text, icon }) => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setShowText(window.innerWidth > 600); // Adjust the threshold as needed
    };

    handleResize(); // Call it initially to set the initial state

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array to run the effect only once

  return showText ? (
    <Button>
      {icon} {text}
    </Button>
  ) : (
    <Button>{icon}</Button>
  );
};

export default MyButton;
