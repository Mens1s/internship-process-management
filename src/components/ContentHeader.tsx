import React from "react";
import styled from "styled-components";

const Header = styled.div`
  margin: 0 16px 40px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;

  h2 {
    margin: 0;
  }
`;

const ContentHeader = ({ children }: any) => {
  return <Header>{children}</Header>;
};

export default ContentHeader;
