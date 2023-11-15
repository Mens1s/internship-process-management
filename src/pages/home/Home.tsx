import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";

const Home = () => {
  const { auth }: any = useContext(AuthContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (!auth.token) {
      navigate("/login");
    } else {
      console.log("HOME", auth);
    }
  }, []);

  return <h2>Staj başvuru yönetim sayfasına hoşgeldiniz!</h2>;
};

export default Home;
