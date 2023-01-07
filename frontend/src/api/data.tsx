import axios from "./axios";

// const dataApi = axios.create({
//   baseURL: "http://localhost:3000",
// });

export const getData = async () => {
  const res = await axios.get("/data");
  return res.data;
};

export const getUserPosts = async () => {
  const res = await axios.post("/data/userposts");
  return res.data;
};
