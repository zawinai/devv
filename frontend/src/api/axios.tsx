import axios from "axios";
const baseURL = "http://localhost:3000/"; //.env not working


export default axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: baseURL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
