import React from "react";
import styled from "styled-components";

const Header = styled.div`
  margin: 0 16px 20px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 20px;

  h2,
  h3,
  h4 {
    margin: 0;
    color: #292929;
    font-weight: 500;
  }
`;

const ContentHeader = ({ children }: any) => {
  return <Header>{children}</Header>;
};

export default ContentHeader;
