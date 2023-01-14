import { useState, useRef, useEffect, FormEvent } from "react";
import { Link } from "react-router-dom";
import { useCT } from "../hooks/useCT";
import { useAxios } from "../hooks/useAxios";
import { useNavigate } from "react-router-dom";

const WritePost = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const axiosInterceptor = useAxios();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [body, setBody] = useState("");
  const [msg, setMsg] = useState("Create Your New Post");

  const {
    auth: { avatar, username },
  } = useCT();

  const handlePost = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await axiosInterceptor.post("/post", {
        postusername: username,
        title: title,
        slug: slug.trim(), // mongoose can't find values with whitespaces
        body: body,
      });

      navigate("/");
    } catch (error: any) {
      setMsg(error.data);
    }
  };

  return (
    <>
      <div className='text-5xl text-slate-500 text-center my-10'>{msg}</div>
      <div className='max-w-[1000px] min-h-screen grid grid-col-6 mx-auto'>
        <div className=' col-start-1 col-end-3 md:flex-col md:items-center py-10 hidden md:flex'>
          <div className='flex flex-row items-center gap-2'>
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
                d='M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941'
              />
            </svg>
            <h2 className='text-xl text-slate-500'>Trending Topics</h2>
          </div>
        </div>
        <div className=' p-10 shadow-xl col-start-1 md:col-start-3 col-end-6'>
          <div className='flex items-center justify-between space-x-4 py-10 w-full '>
            <div className='flex flex-row items-center gap-2 '>
              <img
                className='w-10 h-10 object-cover rounded-full aspect-[2/4]'
                src={avatar}
                alt='picture'
              />
              <div className='text-lg font-semibold flex flex-col'>
                {username}
              </div>
            </div>
            <div>
              <abbr title='preview'>
                <button type='button'>
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
                      d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                  </svg>
                </button>
              </abbr>
            </div>
          </div>
          <div className='mt-5 md:col-span-2 md:mt-0'>
            <form action='#' method='POST' onSubmit={(e) => handlePost(e)}>
              <div className='shadow sm:overflow-hidden sm:rounded-md'>
                <div className='space-y-6 bg-white px-4 py-5 sm:p-6'>
                  <div>
                    <label
                      htmlFor='title'
                      className='block text-sm font-medium text-gray-700 md:text-3xl'
                    >
                      Header
                    </label>
                    <div className='mt-1 flex rounded-md shadow-sm w-full h-[100px]'>
                      <input
                        type='text'
                        ref={inputRef}
                        name='title'
                        id='title'
                        className='block w-full flex-1 rounded-none text-gray-900 rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-lg md:text-3xl'
                        placeholder='Title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    <p className='mt-2 text-xs text-gray-400'>
                      A title for your new post not more than 5 chars.
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor='slug'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Slug
                    </label>
                    <div className='mt-1'>
                      <input
                        type='text'
                        className='block w-full h-[40px] flex-1 rounded-none rounded-r-md text-gray-900 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                        placeholder='Slug'
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                      />
                    </div>
                    <p className='mt-2 text-xs text-gray-400'>
                      A Brief summary for your post not more than 10 chars.
                    </p>
                  </div>

                  <div>
                    <label htmlFor='markdown'>Markdown</label>
                    <div className='mt-1 flex flex-col justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6'>
                      <textarea
                        id='about'
                        name='markdown'
                        rows={13}
                        className='mt-1 block w-full rounded-md text-gray-900 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                        placeholder='# Markdown'
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className='bg-gray-50 px-4 py-3 text-right sm:px-6 flex flex-row gap-10 items-center justify-end'>
                  <Link to='..' className='bg-slate-600 py-2 px-4 rounded-md'>
                    Cancel
                  </Link>
                  <button
                    type='submit'
                    className='inline-flex justify-center rounded-md border border-indigo-600 bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                  >
                    Post
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default WritePost;
