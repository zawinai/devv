import { useEffect, useState } from "react";
import { FormEvent, useRef } from "react";
import { Link, redirect, useLocation, useNavigate } from "react-router-dom";

import { useCT } from "../hooks/useCT";
import { useLogin } from "../hooks/useLogin";
import { useRefreshToken } from "../hooks/useRefresh";

export default function Login() {
  const { remember, dispatch } = useCT();

  const emailRef = useRef<HTMLInputElement>(null);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [title, setTitle] = useState("Login To Your Account");

  const [show, setShow] = useState(false);

  const { login } = useLogin();

  const refresh = useRefreshToken();

  const navigate = useNavigate();

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  useEffect(() => {
    localStorage.setItem("remember", JSON.stringify(remember));
  }, [remember]);

  const fields = {
    question: "Open new account",
    button: "Sign In",
    link: "/register",
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const newUser = {
        email: email.toString(),
        password: password.toString(),
      };

      const res = await login(newUser);
      setTitle(res?.data.message);

      navigate("/");
    } catch (err: any) {
      setTitle(err?.response?.data.message);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md space-y-12'>
        <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
          {title}
        </h2>
        <form
          className='mt-8 space-y-6'
          action='#'
          method='POST'
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className='-space-y-px rounded-md shadow-sm'>
            <div>
              <label htmlFor='email' className='sr-only'>
                Email address
              </label>
              <input
                id='email'
                name='email'
                type='text'
                required={true}
                value={email}
                className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                placeholder='Email address'
                ref={emailRef}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='border border-gray-300 w-full rounded-none rounded-b-md sm:text-sm relative'>
              <label htmlFor='password' className='sr-only'>
                Password
              </label>
              <input
                id='password'
                name='password'
                type={!show ? "password" : "text"}
                required={true}
                value={password}
                className='relative w-full rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm z-0'
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
              />
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6 mr-3 cursor-pointer absolute right-0 top-2 z-20'
                onClick={() => setShow(!show)}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
                />
                {show ? (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                  />
                ) : (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
                  />
                )}
              </svg>
            </div>
          </div>

          <div className='flex items-center justify-between py-6'>
            <div className='flex flex-row items-center gap-4'>
              <input
                type='checkbox'
                className='flex items-center'
                id='remember'
                checked={remember}
                onChange={() =>
                  dispatch({ type: "setRemember", payload: !remember })
                }
              />
              <label htmlFor='remember'>Keep me logged in</label>
            </div>

            <Link
              to={fields.link}
              className='font-medium text-indigo-600 hover:text-indigo-500'
            >
              {fields.question}
            </Link>
          </div>

          <div>
            <button
              type='submit'
              className='group relative flex w-full justify-center rounded-md border border-transparent text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-blue-500/50 font-medium  text-sm px-5 py-2.5 text-center mr-2 mb-2 '
            >
              {fields.button}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
