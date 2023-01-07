import { useMemo, useState } from "react";
import axios from "axios";
import { useCT } from "./useCT";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/adventurer";

export const useLogin = () => {
  const { auth, dispatch, remember } = useCT();
  const [avatarName, setAvatarName] = useState("");

  const avatar = useMemo(() => {
    return createAvatar(style, { seed: avatarName, dataUri: true, size: 128 });
  }, []);

  type loginProps = {
    email: string;
    password: string;
  };

  const login = async (props: loginProps) => {
    const { email, password } = props;
    const res = await axios.post("http://localhost:3000/auth/login", {
      email: email,
      password: password,
      
    }, {withCredentials: true});

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

    return res;
  };

  return { login, avatar, setAvatarName };
};
