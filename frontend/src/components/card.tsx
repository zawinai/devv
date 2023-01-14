import { useCT } from "../hooks/useCT";
import { classNames } from "../utils/changeStyle";

import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/adventurer";

type cardProps = {
  title: string;
  slug: string;
  user?: string;
  postusername: string;
  edited?: boolean;
};

const Card = ({ slug, postusername, title }: cardProps) => {
  const { pathname } = useLocation();

  const avatar = createAvatar(style, {
    seed: postusername,
    dataUri: true,
    size: 128,
  });

  return (
    <div className='relative px-2 w-[270px] sm:w-[350px] md:w-[550px] h-auto mx-auto '>
      <div className='bg-gradient-to-tr from-slate-800 to-slate-700 max-w-xl rounded-2xl px-3 py-2 shadow-lg hover:shadow-2xl transition duration-500 flex flex-col justify-between relative'>
        <Link
          to={`/edit/${slug}`}
          className={classNames(
            "absolute right-3",
            pathname !== "/profile" ? "hidden" : ""
          )}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-5 h-5 '
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
            />
          </svg>
        </Link>

        <div className='flex justify-between items-center'>
          <div className='mt-4 flex items-center space-x-4 py-4'>
            <img
              className=' w-10 h-10 rounded-full aspect-[2/2]'
              src={avatar}
              alt='picture'
            />
            <Link
              to={`/user/${postusername}`}
              className='text-sm font-semibold flex flex-col text-slate-200'
            >
              {postusername}
              <span className='font-normal'>• 5 minutes ago</span>
            </Link>
          </div>
        </div>
        <div className='mt-4 '>
          <h1 className='h-[40px] md:h-[70px] my-3 text-sm sm:text-lg md:text-3xl text-gray-200 font-semibold cursor-pointer break-words'>
            {title}
          </h1>
          <p className='mt-4 text-xs sm:text-sm md:text-lg text-gray-400'>
            {slug}
          </p>
          <div className='text-end text-xs mt-5 cursor-pointer text-slate-200 ml-[90%]'>
            <Link to={`/details/${slug}`}>
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
                  d='M8.25 4.5l7.5 7.5-7.5 7.5'
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
