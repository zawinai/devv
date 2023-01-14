import { AxiosHeaders, AxiosRequestConfig } from "axios";
import { axiosPrivate } from "../api/axios";
import { useState, useEffect } from "react";
import { useRefreshToken } from "./useRefresh";
import { useCT } from "./useCT";

export const useAxios = () => {
  const {
    auth: { accessToken },
  } = useCT();
  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        config.headers!.authorization = `Bearer ${accessToken}`;

        return config;
      },
      (error: any) => {
        return error;
      }
    );
    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
    };
  }, [accessToken]);
  return axiosPrivate;
};
