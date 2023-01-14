import { useState, useMemo } from "react";
import axios from "../api/axios";
import { useCT } from "./useCT";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/adventurer";
import { useAxios } from "./useAxios";

export const useRefreshToken = () => {
  // const axiosPrivate = useAxios();

  const { auth, dispatch } = useCT();

  const refresh = async () => {
    const res = await axios.get("http://localhost:3000/auth/refresh", {
      withCredentials: true,
    });

    const avatar = createAvatar(style, {
      seed: res.data.username,
      dataUri: true,
      size: 128,
    });

    dispatch({
      type: "setAuth",
      payload: {
        ...auth,
        username: res.data.username,
        accessToken: res.data.accessToken,
        roles: res.data.roles,
        avatar: avatar,
      },
    });
  };

  return refresh;
};
