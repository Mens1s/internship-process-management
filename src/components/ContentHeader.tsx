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

  @media (max-width: 600px) {
    margin-bottom: 0;

    div:nth-child(2) {
      width: 100%; // Set width to 100% when the screen width is 500px or less
    }

    input {
      width: 100%;
      max-width: 200px; // Keep the maximum width for larger screens
    }
  }

  h2,
  h3,
  h4 {
    margin: 0;
    color: #292929;
    font-weight: 500;
    font-size: 1.2rem;
  }

  div:first-child {
    white-space: nowrap;
  }

  div:nth-child(2) {
    display: flex;
    gap: 10px;

    input {
      width: 100%;
      max-width: 200px;
    }
  }
`;

const ContentHeader = ({ children }: any) => {
  return <Header>{children}</Header>;
};

export default ContentHeader;
