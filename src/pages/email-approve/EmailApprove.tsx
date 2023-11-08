import React, { useState, ChangeEvent, FormEvent } from "react";
import styled from "styled-components";

const Container = styled.div`
  background: lightgray;
  width: 500px;
  height: 500px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  background: orange;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 10px;
  gap: 20px;
`;
const ButtonsContainer = styled.div`
  display: flex;
  gap: 20px;
  width: fit-content;
`;

const CreateApplication: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        alignItems: "center",
      }}
    >
      <Container>
        <Wrapper>
          <div style={{ display: "flex", background: "blue", gap: 50 }}>
            <div
              style={{
                background: "green",
                width: 70,
                height: 70,
                borderRadius: 10,
              }}
            ></div>
            <div>
              Kaydınız başarıyla gerçekleşti. onaylamak için tıklayınız.
            </div>
          </div>
          <ButtonsContainer>
            <button style={{ width: 50 }}>Onayla</button>
            <button style={{ width: 50 }}>Onayla</button>
          </ButtonsContainer>
        </Wrapper>
      </Container>
    </div>
  );
};

export default CreateApplication;
