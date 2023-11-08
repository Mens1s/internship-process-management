import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [token, setToken] = useState();
  const navigate = useNavigate();
  if (!token) {
    navigate("/login");
  }
  return <h2>Staj başvuru yönetim sayfasına hoşgeldiniz!</h2>;
};

export default Home;
