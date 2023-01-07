import { useState, useMemo } from "react";
import axios from "../api/axios";
import { useCT } from "./useCT";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/adventurer";

export const useRefreshToken = () => {
  const { auth, dispatch } = useCT();
  const [avatarName, setAvatarName] = useState("");

  const avatar = useMemo(() => {
    return createAvatar(style, { seed: avatarName, dataUri: true, size: 128 });
  }, []);

  const refresh = async () => {
    const res = await axios.get("http://localhost:3000/auth/refresh", {
      withCredentials: true,
    });
    console.log("refresh hook", res);
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

    setAvatarName(res.data.username);
  };

  return refresh;
};
