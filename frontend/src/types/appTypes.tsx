import React, { ReactNode } from "react";
export type initialStateTypes = {};

export type authUserRouteTypes = {
  children: ReactNode;
  user: boolean;
};

export type authUserdataTypes = {
  username: string;
  password: string;
};
