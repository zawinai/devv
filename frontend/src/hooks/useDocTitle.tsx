import { useEffect, useRef } from "react";
export const useDocTitle = (title: string, prev = false) => {
  const docRef = useRef(document.title);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    if (!prev) {
      document.title = docRef.current;
    }
  }, []);
};
