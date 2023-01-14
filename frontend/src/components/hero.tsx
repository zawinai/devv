import { useState, useEffect } from "react";
import { useCT } from "../hooks/useCT";
import { Link, useLocation } from "react-router-dom";
import { classNames } from "../utils/changeStyle";

type dataProp = {
  data: undefined | object | [];
};

export default function Hero({ data }: dataProp) {
  const { auth } = useCT();

  const { pathname } = useLocation();

  return (
    <div
      className={classNames(
        "bg-black min-h-screen flex flex-col justify-center md:justify-evenly z-20 py-10 ",
        auth?.username || pathname == "/login" || pathname == "/register"
          ? "hidden"
          : ""
      )}
    >
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        <img
          src='/images/wordmap.png'
          alt='wordmap'
          className='  object-center opacity-50 z-10 w-[calc(80vw_-_0.5rem)] max-w-[1000px]'
        />
      </div>
      <div className='absolute bottom-0 w-full h-[300px] bg-gradient-to-t from-gray-900 to-trasparent'></div>

      <h1 className='animate-color text-center font-bold font-Tesla xs:text-sm md:text-8xl bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent z-30'>
        Devv
      </h1>

      <section className='text-break mx-auto max-w-2xl min-w-[100px] flex flex-col items-center gap-10'>
        <h1 className='text-white tracking-wide leading-snug font-bold text-xs text-center z-40 md:text-5xl'>
          Join the amazing community of over{" "}
          <span className='bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-sky-800 font-bolder'>
            4 million
          </span>{" "}
          developers from worldwide.
        </h1>
        <p className='font-Roboto text-lg leading-8 text-white sm:text-center hidden md:block'>
          Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem
          cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat
          aliqua.
        </p>
        <div className=' flex gap-x-4 max-w-[400px] sm:justify-center items-center z-30'>
          <Link
            to='/register'
            className='font-Roboto inline-block rounded-lg bg-indigo-600 px-1 py-0 md:px-4 md:py-1.5 text-xs md:text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700'
          >
            Sign Up
            <span className='font-Roboto text-indigo-200' aria-hidden='true'>
              &rarr;
            </span>
          </Link>
          <Link
            to='/login'
            className='font-Roboto inline-block rounded-lg px-2 md:px-4 py-1 md:py-1.5 text-xs md:text-base font-semibold '
          >
            Sign In
            <span className='text-gray-300' aria-hidden='true'>
              &rarr;
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
