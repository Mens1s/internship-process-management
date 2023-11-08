import React from "react";
import styled from "styled-components";

const MyButton = styled.button`
  background: orange;
  border: none;
`;

const LoginButton = styled.button`
  background: white;
`;

const Container = styled.div`
  background: blue;

  p {
    margin: 0;
    padding: 0;
    background: red;
  }

  display: flex;
  gap: ;
`;

const Register: React.FC = () => {
  return (
    <Container>
      <p>Kaydınızı onaylamak için butona tıklayınız:</p>
      <MyButton>Onayla</MyButton>
      <LoginButton>Onayla</LoginButton>
    </Container>
  );
};

export default Register;
