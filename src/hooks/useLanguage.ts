import React, { useContext } from "react";
import { LanguageContext } from "../context/LanguageProvider";

export const UseLanguage = () => {
  return useContext(LanguageContext);
};

export default UseLanguage;
