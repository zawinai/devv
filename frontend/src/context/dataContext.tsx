import React, { createContext, useEffect, ReactNode, useReducer } from "react";
import { useQuery } from "react-query";
import { getData } from "../api/post";

type postTypes = {
  _id: string;
  postusername: string;
  user: string;
  slug: string;
  title: string;
  body: string;
};

type authTypes = {
  roles?: string[];
  username?: string;
  accessToken?: string;
  avatar?: string;
  authUserPosts?: postTypes[];
};

const initialStates: {
  auth: authTypes;
  posts: postTypes[];
  authUserPosts?: postTypes[];
  userPosts: postTypes[];
  remember: boolean;
} = {
  auth: {},
  posts: [],
  userPosts: [],
  remember: JSON.parse(localStorage.getItem("remember") || "false"),
};

export type actionTypes =
  | { type: "setAuth"; payload: object }
  | { type: "setRemember"; payload: boolean }
  | { type: "setPosts"; payload: postTypes[] }
  | { type: "setUserPosts"; payload: postTypes[] };
const reducer = (state: typeof initialStates, action: actionTypes) => {
  const { type, payload } = action;
  switch (type) {
    case "setAuth": {
      return { ...state, auth: payload };
    }
    case "setRemember": {
      return { ...state, remember: payload };
    }
    case "setPosts": {
      return { ...state, posts: payload };
    }
    case "setUserPosts": {
      return { ...state, usePosts: payload };
    }
    default: {
      return state;
    }
  }
};

type ContextProviderProps = {
  children: ReactNode;
};

export const DataContext = createContext<{
  state: typeof initialStates;
  dispatch: React.Dispatch<actionTypes>;
}>({ state: initialStates, dispatch: () => null });

export const ContextProvider = ({ children }: ContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialStates);

  // const {
  //   isLoading,
  //   isError,
  //   error,
  //   data: postList,
  // } = useQuery("posts", getData);

  // let content: any;
  // if (isLoading) {
  //   content = [];
  // } else if (isError) {
  //   content = error;
  // } else {
  //   content = postList;
  // }
  // const setPosts = () => dispatch({ type: "setPosts", payload: content });

  // useEffect(() => {
  //   if (!isLoading || !isError) {
  //     setPosts();
  //   } else {
  //     console.log(error);
  //   }
  // }, [postList]);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
