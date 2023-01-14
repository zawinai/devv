import { useEffect, useState } from "react";
import axios from "axios";

import { useCT } from "./useCT";

export const useAuthPosts = () => {
  //   const [posts, setPosts] = useState();

  const {
    auth: { accessToken },
  } = useCT();

  console.log(`Bearer ${accessToken}`);

  const usePosts = async () => {
    const config = {
      method: "post",
      url: `http://localhost:3000/post/userposts`,
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      data: "",
      withCredentials: true,
    };

    const res = await axios(config);
    console.log(res);
    return res;
  };

  return usePosts;
};
