import { Disclosure } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useCT } from "../hooks/useCT";
import { Link } from "react-router-dom";
import { classNames } from "../utils/changeStyle";

const NavMenuMobile = () => {
  const {
    auth: { username, avatar },
  } = useCT();

  const userNavigation = username
    ? [
        { name: "Your Profile", href: "/profile" },
        { name: "Sign out", href: "/" },
      ]
    : [
        { name: "Sign In", href: "/login" },
        { name: "Sign Up", href: "/register" },
      ];

  return (
    <Disclosure as='nav' className=''>
      {({ open }: any) => (
        <>
          <div className='ml-[80%] max-w-7xl px-4 sm:px-6 lg:px-8'>
            <div className='flex h-16 items-center justify-between'>
              <div className='-mr-2 flex md:hidden'>
                <Disclosure.Button className='inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className='md:hidden max-w-[600px] mx-auto'>
            <div className='border-t border-gray-700 pt-4 pb-3 bg-slate-800'>
              <div className='flex items-center px-5'>
                <div
                  className={classNames(
                    "flex-shrink-0",
                    !username ? "hidden" : ""
                  )}
                >
                  <img className='h-10 w-10 rounded-full' src={avatar} alt='' />
                </div>
                <div className='text-base font-medium leading-none text-white'>
                  {!username ? "Join Us Now!" : username}
                </div>
              </div>
              <div className='mt-3 space-y-1 px-2'>
                {userNavigation.map((item) => (
                  <Link
                    to={item.href}
                    key={item.name}
                    className='block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white'
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default NavMenuMobile;
