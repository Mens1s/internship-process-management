import React, { useState, ChangeEvent, FormEvent } from "react";
import styled from "styled-components";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <>
      <div>Page not found 404</div>
      <Link to="/ogrenci/login">Return to the login page</Link>
    </>
  );
};

export default NotFound;
