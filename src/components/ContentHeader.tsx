import React from "react";
import styled from "styled-components";

const Header = styled.div`
  margin: 0 0 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 20px;

  @media (max-width: 500px) {
    margin-bottom: 0;
  }

  h2,
  h3,
  h4 {
    margin: 0;
    color: #292929;
    font-weight: 500;
  }

  div:first-child {
    flex: 3;
    min-width: 200px;
  }
  div:nth-child(2) {
    display: flex;
    gap: 10px;
    flex: 1;

    input {
      min-width: 200px;
    }
  }
`;

const ContentHeader = ({ children }: any) => {
  return <Header>{children}</Header>;
};

export default ContentHeader;
