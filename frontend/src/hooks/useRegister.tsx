import { useState } from "react";
import axios from "axios";

export const useRegister = () => {
  type registerPropTypes = {
    username: string;
    email: string;
    password: string;
  };

  const register = async (props: registerPropTypes) => {
    const { username, email, password } = props;

    const res = await axios.post("http://localhost:3000/auth/register", {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
      username: username,
      email: email,
      password: password,
    });

    return res.data;
  };

  return register;
};
