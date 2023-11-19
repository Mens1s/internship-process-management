import axios from "../services/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { auth, setAuth }: any = useAuth();

  const refresh = async () => {
    const response = await axios.post("https://reqres.in/api/login", {
      email: "eve.holt@reqres.in",
      password: "userefresh",
    });
    setAuth((prev: any) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.token);
      return { ...prev, token: response.data.token };
    });
    return response.data.token;
  };
  return refresh;
};

export default useRefreshToken;
