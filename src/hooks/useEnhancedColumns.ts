import React, { useEffect, useState } from "react";
import useLanguage from "./useLanguage";
import { getEnhancedColumns } from "../utils/getEnhancedColumns";

// returns responsive (for mobile users) and language supported columns
export const useEnhancedColumns = (columns: any) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { dictionary } = useLanguage();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return getEnhancedColumns(columns, windowWidth, dictionary);
};

export default useEnhancedColumns;
