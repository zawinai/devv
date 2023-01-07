import axios from "axios";
import { authUserdataTypes } from "../types/appTypes";

const route = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const register = async (data: authUserdataTypes) => {
  const req = await route.post("/auth/register", data);
  return req;
};

export const login = async (data: authUserdataTypes) => {
  const req = await route.post("/auth/login", data);
  return req.data;
};
