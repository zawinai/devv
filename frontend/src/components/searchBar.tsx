import React from "react";

const SearchBar = () => {
  return (
    <section className='hidden md:flex py-6 justify-center lg:justify-end lg:px-20'>
      <div className='max-w-[300px] flex flex-row items-center  bg-slate-300 rounded-t-lg rounded-b-lg '>
        <input
          type='text'
          id='search'
          className='w-full border-none rounded-l-lg bg-gray-200 outline-none'
        />
        <label htmlFor='search' className='px-6'>
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
              d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
            />
          </svg>
        </label>
      </div>
    </section>
  );
};

export default SearchBar;
