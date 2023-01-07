import { FormEvent, useEffect, useState, useRef } from "react";
import { LockClosedIcon, LockOpenIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";

import { useCT } from "../hooks/useCT";
import { useRegister } from "../hooks/useRegister";
import { classNames } from "../utils/changeStyle";

export default function Register() {
  const USER_NAME_REGEX = /^[a-z]{3,8}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const EMAIL_RG =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  //By Chatgpt

  const usernameRef = useRef<HTMLInputElement>(null);
  // const errorRef = useRef();

  const register = useRegister();

  const [username, setUsername] = useState("");
  const [validName, setValidName] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [msg, setMsg] = useState("Join Us Now");

  const [success, setSuccess] = useState(false);

  const { remember, dispatch } = useCT();

  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    usernameRef.current?.focus();
    setValidName(true);
  }, []);

  useEffect(() => {
    const usernameResult = USER_NAME_REGEX.test(username);
    const emailResult = EMAIL_RG.test(email);

    setValidName(usernameResult);
    setValidEmail(emailResult);
  }, [username, email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  // useEffect(() => {}, [username, pwd, matchPwd]);

  const fields = {
    question: "Already Have an account",
    button: "Sign Up",
    link: "/login",
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const checkUsername = USER_NAME_REGEX.test(username);
    const checkEmail = EMAIL_RG.test(email);
    const checkPwd = PWD_REGEX.test(pwd);
    if (checkUsername || checkPwd || checkEmail) {
      const registerProps = {
        username: username.toString(),
        email: email.toString(),
        password: pwd.toString(),
      };
      try {
        const res = await register(registerProps);
        setMsg(res.message);
        setSuccess(true);

        setEmail("");
        setUsername("");
        setPwd("");
        setUsernameFocus(false);
        setEmailFocus(false);
        setPwdFocus(false);
      } catch (err: any) {
        setMsg(err?.response?.data.message);
      }
    } else {
      setMsg("Register failed");
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md space-y-8'>
        <h2 className='mt-6 text-center text-2xl font-bold tracking-tight text-gray-900 '>
          {msg}
        </h2>
        {success ? (
          <div className='flex flex-row items-center justify-center gap-3'>
            <Link to='/login'>You can Sign in to your account</Link>
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
                d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
              />
            </svg>
          </div>
        ) : (
          ""
        )}
        <p
          className={classNames(
            "text-center text-red-400 text-[10px] mr-10 z-20",
            pwdFocus && pwd && !validPwd ? "" : "hidden"
          )}
        >
          Must include uppercase and lowercase letters, a number and a special
          character.
          <br />
          Allowed special characters:{" "}
          <span aria-label='exclamation mark'>!</span>{" "}
          <span aria-label='at symbol'>@</span>{" "}
          <span aria-label='hashtag'>#</span>{" "}
          <span aria-label='dollar sign'>$</span>{" "}
          <span aria-label='percent'>%</span>
        </p>
        <form
          className='mt-8 space-y-6'
          action='#'
          method='POST'
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className='-space-y-px rounded-md shadow-sm '>
            <div className='relative w-full appearance-none rounded-none rounded-b-md sm:text-sm flex flex-row  items-center '>
              <label htmlFor='fullname' className='sr-only'>
                Name
              </label>
              <input
                id='fullname'
                name='fullname'
                value={username}
                autoComplete='off'
                type='text'
                className='z-0 relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                placeholder='Fullname'
                required={true}
                ref={usernameRef}
                onFocus={() => setUsernameFocus(true)}
                onBlur={() => setUsernameFocus(false)}
                onChange={(e) => setUsername(e.target.value)}
              />
              <p
                className={classNames(
                  "absolute top-[10px] right-0 text-red-400 text-[10px] mr-3 z-20",
                  usernameFocus && username && !validName ? "" : "hidden"
                )}
              >
                A unique short username
              </p>
            </div>
            <div className='relative w-full appearance-none rounded-none rounded-b-md sm:text-sm flex flex-row  items-center '>
              <label htmlFor='email' className='sr-only'>
                Email address
              </label>
              <input
                id='email'
                name='email'
                type='email'
                autoComplete='on'
                required={true}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='z-0 relative block w-full appearance-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                placeholder='Email address'
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />
              <p
                className={classNames(
                  "absolute right-0 text-center text-red-400 text-[10px] mr-10 z-20",
                  emailFocus && email && !validEmail ? "" : "hidden"
                )}
              >
                invalid email
              </p>
            </div>
            <div className='relative w-full appearance-none rounded-none rounded-b-md sm:text-sm flex flex-row  items-center '>
              <label htmlFor='password' className='sr-only'>
                Password
              </label>
              <input
                id='password'
                name='password'
                type={!show ? "password" : "text"}
                autoComplete='current-password'
                required={true}
                value={pwd}
                className='block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm z-0'
                placeholder='Password'
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
                onChange={(e) => setPwd(e.target.value)}
              />

              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6 mr-3 cursor-pointer absolute right-0 z-20'
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
            <div className='relative w-full appearance-none rounded-none rounded-b-md sm:text-sm flex flex-row  items-center '>
              <label htmlFor='re-password' className='sr-only'>
                Confirm Password
              </label>
              <input
                id='re-password'
                name='re-password'
                value={matchPwd}
                onChange={(e) => setMatchPwd(e.target.value)}
                type={!show ? "password" : "text"}
                autoComplete='current-password'
                required={true}
                className='block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm z-0'
                placeholder='Type password again'
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
              <p
                className={classNames(
                  "absolute top-[10px] right-0 text-red-400 text-[10px] mr-3 z-20",
                  matchPwd && !validMatch ? "" : "hidden"
                )}
              >
                Invalid Password
              </p>
            </div>
          </div>

          <Link
            to={fields.link}
            className='font-medium text-indigo-600 hover:text-indigo-500 '
          >
            <h3 className='text-end py-5'>{fields.question}</h3>
          </Link>

          <div>
            <button
              type='submit'
              className='group relative flex w-full justify-center rounded-md border border-transparent text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-blue-500/50 font-medium  text-sm px-5 py-2.5 text-center mr-2 mb-2 '
              disabled={!validName || !validPwd || !validMatch ? true : false}
            >
              {!validName || !validPwd || !validMatch ? (
                <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                  <LockClosedIcon
                    className='h-5 w-5 text-indigo-300 group-hover:text-indigo-400'
                    aria-hidden='true'
                  />
                </span>
              ) : (
                <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                  <LockOpenIcon
                    className='h-5 w-5 text-indigo-300 group-hover:text-indigo-400'
                    aria-hidden='true'
                  />
                </span>
              )}

              {fields.button}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
