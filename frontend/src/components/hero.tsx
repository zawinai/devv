import { useState } from "react";
import { useCT } from "../hooks/useCT";
import { Link } from "react-router-dom";
import { classNames } from "../utils/changeStyle";

export default function Hero() {
  const { auth } = useCT();

  return (
    <div
      className={classNames(
        " isolate bg-white",
        auth?.username ? "hidden" : "hidden md:block"
      )}
    >
      <div className='px-6 lg:px-8'>
        <div>
          <nav
            className='flex h-4 items-center justify-between'
            aria-label='Global'
          >
            <div className='mx-auto' aria-label='Global'>
              <h1 className='animation-text font-Tesla text-7xl bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent font-black'>
                Devv
              </h1>
            </div>
          </nav>
        </div>
      </div>
      <main>
        <div className='relative px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl pt-10 pb-12 '>
            <div>
              <div>
                <h1 className='tracking-wide leading-snug font-bold  sm:text-center sm:text-6xl'>
                  Join the amazing community of over{" "}
                  <span className='bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-sky-800'>
                    4000
                  </span>{" "}
                  developers from worldwide.
                </h1>
                <p className='font-Roboto mt-6 text-lg leading-8 text-gray-600 sm:text-center'>
                  Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
                  qui lorem cupidatat commodo. Elit sunt amet fugiat veniam
                  occaecat fugiat aliqua.
                </p>
                <div className='mt-8 flex gap-x-4 sm:justify-center'>
                  <Link
                    to='/register'
                    className='font-Roboto inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700'
                  >
                    Sign Up
                    <span
                      className='font-Roboto text-indigo-200'
                      aria-hidden='true'
                    >
                      &rarr;
                    </span>
                  </Link>
                  <Link
                    to='/login'
                    className='font-Roboto inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 ring-1 ring-gray-900/10 hover:ring-gray-900/20'
                  >
                    Sign In
                    <span className='text-gray-400' aria-hidden='true'>
                      &rarr;
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
