import React from "react";
import { Steps, Tag } from "antd";
import styled from "styled-components";

const StepsContainer = styled.div`
  width: 80%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ActiveApplication = () => {
  return (
    <div>
      <Header>
        <StepsContainer>
          <Steps
            size="small"
            current={2}
            status="process"
            items={[
              {
                title: "Finished",
              },
              {
                title: "In Process",
              },
              {
                title: "Waiting",
              },
              {
                title: "Waiting",
              },
              {
                title: "Waiting",
              },
            ]}
          />
        </StepsContainer>
        <Tag
          style={{
            borderRadius: 50,
            width: 150,
            height: 40,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "1rem",
          }}
          color={"geekblue"}
        >
          Beklemede
        </Tag>
      </Header>
    </div>
  );
};

export default ActiveApplication;
