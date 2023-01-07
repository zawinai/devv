import { useContext } from "react";
import { DataContext } from "../context/dataContext";

export const useCT = () => {
  const { state, dispatch } = useContext(DataContext);
  const { auth, posts, remember } = state;
  return { auth, posts, remember, dispatch };
};
