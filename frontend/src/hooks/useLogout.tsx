import axios from "../api/axios";
import { useCT } from "./useCT";

export const useLogout = () => {
  const { dispatch } = useCT();

  const logout = async () => {
    dispatch({ type: "setAuth", payload: {} });

    try {
      await axios.post("/auth/logout", {
        withCredentials: true,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return logout;
};
