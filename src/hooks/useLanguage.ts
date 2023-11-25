import React, { useContext } from "react";
import { LanguageContext } from "../context/LanguageProvider";

export const useLanguage = () => {
  return useContext(LanguageContext);
};

export default useLanguage;
