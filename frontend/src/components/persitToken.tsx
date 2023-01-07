import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useCT } from "../hooks/useCT";
import { useRefreshToken } from "../hooks/useRefresh";
import Loading from "./loading";
const PersitToken = () => {
  const [loading, setLoading] = useState(true);

  const refresh = useRefreshToken();

  const { remember } = useCT();

  useEffect(() => {
    const refreshToken = async () => {
      try {
        await refresh();
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    if (remember) {
      refreshToken();
    }
  }, []);

  return <>{!remember ? <Outlet /> : loading ? <Loading /> : <Outlet />}</>;
};

export default PersitToken;
