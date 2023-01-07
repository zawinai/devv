import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useCT } from "../hooks/useCT";
import { classNames } from "../utils/changeStyle";
import LogoutModal from "./logoutModal";

const Header = () => {
  const [scroll, setScroll] = useState<number | boolean>(0);

  const [open, setOpen] = useState(false);

  const {
    auth: { username },
  } = useCT();

  const { pathname } = useLocation();

  const routes = [
    {
      id: 1,
      routeName: "Home",
      route: "/",
    },
    {
      id: 2,
      routeName: "Login",
      route: "/login",
    },
    {
      id: 3,
      routeName: "Register",
      route: "/register",
    },
    {
      id: 4,
      routeName: "Post",
      route: "/post",
    },
    {
      id: 5,
      routeName: "Profile",
      route: "/profile",
    },
  ];

  const navLinksFilter = (
    routes: { id: number; routeName: string; route: string }[],
    pathName: string
  ) => {
    const filterRoute = routes.filter(({ route, routeName }) =>
      pathName == "/"
        ? routeName !== "Home"
        : route && `/${routeName.toLowerCase()}` !== pathname
    );

    return filterRoute;
  };

  useEffect(() => {
    const wd = window;

    const checkScroll = () => {
      const updateScroll = typeof wd !== "undefined" && wd.pageYOffset;
      setScroll(updateScroll);
    };

    wd.addEventListener("scroll", checkScroll);

    return () => wd.removeEventListener("scroll", checkScroll);
  }, []);

  return (
    <header
      className={classNames(
        "items-center justify-between py-2 flex sticky top-0 z-50 px-2 md:px-10",
        scroll > 0 ? "shadow-md bg-slate-100 z-10" : ""
      )}
      style={!username ? { visibility: "hidden" } : {}}
    >
      <Link to='/' className='px-2 lg:px-0'>
        <h1 className='font-Tesla text-3xl md:px-10 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-sky-800 md:text-5xl'>
          Devv
        </h1>
      </Link>

      <ul className='inline-flex items-center'>
        {username
          ? navLinksFilter(routes, pathname)
              .filter(({ routeName }) => {
                return routeName !== "Login" && routeName !== "Register";
              })
              .map(({ route, routeName, id }) => (
                <li className='px-2 md:px-4' key={id}>
                  <Link
                    to={route}
                    className='text-purple-600 font-semibold hover:text-purple-500'
                  >
                    {" "}
                    {routeName}{" "}
                  </Link>
                </li>
              ))
          : navLinksFilter(routes, pathname)
              .filter(({ routeName }) => {
                return (
                  routeName !== "Profile" &&
                  routeName !== "Logout" &&
                  routeName !== "Post"
                );
              })
              .map(({ route, routeName, id }) => (
                <li className='px-2 md:px-4' key={id}>
                  <Link
                    to={route}
                    className='text-purple-600 font-semibold hover:text-purple-500'
                  >
                    {" "}
                    {routeName}{" "}
                  </Link>
                </li>
              ))}
        <button
          className={classNames(
            "mx-10",
            pathname !== "/profile" ? "hidden" : ""
          )}
          onClick={() => setOpen(true)}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9'
            />
          </svg>
        </button>
      </ul>
      <LogoutModal open={open} setOpen={setOpen} />
    </header>
  );
};

export default Header;
