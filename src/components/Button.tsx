import React, { useEffect, useState } from "react";
import { ReactNode } from "react";
import { Button, ButtonProps } from "antd";

interface MyButtonProps extends ButtonProps {
  text?: ReactNode;
  icon: ReactNode;
}

const MyButton: React.FC<MyButtonProps> = ({ text, icon, ...props }) => {
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

  return showText && text ? (
    <Button {...props}>
      {icon} {text}
    </Button>
  ) : (
    <Button {...props}>{icon}</Button>
  );
};

export default MyButton;
