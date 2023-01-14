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
      icon: "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
    },
    {
      id: 2,
      routeName: "Login",
      route: "/login",
      icon: "M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9",
    },
    {
      id: 3,
      routeName: "Register",
      route: "/register",
      icon: "M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z",
    },
    {
      id: 4,
      routeName: "New Post",
      route: "/post",
      icon: "M12 4.5v15m7.5-7.5h-15",
    },
    {
      id: 5,
      routeName: "Profile",
      route: "/profile",
      icon: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z",
    },
  ];

  const navLinksFilter = (
    routes: { id: number; routeName: string; route: string; icon: string }[],
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

  const HeaderLinks = ({ route, icon, id }: any) => {
    return (
      <li className='px-2 md:px-4' key={id}>
        <Link
          to={route}
          className='text-purple-600 font-semibold hover:text-purple-500'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d={icon} />
          </svg>
        </Link>
      </li>
    );
  };

  return (
    <header
      className={classNames(
        "items-center justify-between py-2 flex sticky top-0 z-50 px-1",
        scroll > 0 ? "shadow-md bg-gray-700/70 backdrop-blur-md z-30" : ""
      )}
      style={!username ? { display: "none" } : {}}
    >
      <Link to='/' className='px-2 lg:px-1'>
        <h1 className='font-Tesla text-2xl md:px-10 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-sky-800 md:text-4xl'>
          Devv
        </h1>
      </Link>

      <ul className='inline-flex items-center'>
        {username
          ? navLinksFilter(routes, pathname)
              .filter(({ routeName }) => {
                return routeName !== "Login" && routeName !== "Register";
              })
              .map(({ route, routeName, id, icon }) => (
                <HeaderLinks route={route} icon={icon} id={id} />
              ))
          : navLinksFilter(routes, pathname)
              .filter(({ routeName }) => {
                return (
                  routeName !== "Profile" &&
                  routeName !== "Logout" &&
                  routeName !== "Post"
                );
              })
              .map(({ route, routeName, id, icon }) => (
                <HeaderLinks route={route} icon={icon} id={id} />
              ))}
        <button
          className={classNames(
            "mx-2 md:mx-10",
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

/*
<li className='px-2 md:px-4' key={id}>
                  <Link
                    to={route}
                    className='text-purple-600 font-semibold hover:text-purple-500'
                  >
                    {" "}
                    {icon}{" "}
                  </Link>
                </li>
*/
