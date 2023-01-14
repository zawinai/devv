import axios from "./axios";

export const getData = async () => {
  try {
    const res = await axios.get("/post");
    return res.data;
  } catch (error) {
    return error;
  }
};

export async function getPostDetail(slug: string) {
  if (typeof slug !== undefined) {
    const res = await axios.get(`post/${slug}`);
    return res;
  } else {
    return new Error();
  }
}

export async function getUserProfile(postusername: string | undefined) {
  type postType = {
    _id: string;
    username: string;
    postusername: string;
    slug: string;
    title: string;
    body: string;
  };

  const res = await axios.get<postType[] | []>(`/user/${postusername}`);
  return res;
}
