import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Card from "../components/card";
import { useCT } from "../hooks/useCT";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useLogout } from "../hooks/useLogout";
import { useAuthPosts } from "../hooks/useAuthUserPosts";
import { useAxios } from "../hooks/useAxios";

const AuthUserProfile = () => {
  const {
    auth: { authUserPosts },
    dispatch,
  } = useCT();

  type postListProps = {
    _id: string;
    user: string;
    postusername: string;
    title: string;
    slug: string;
    body: string;
  };

  const [postList, setPostList] = useState<postListProps[]>([]);

  const axiosPrivate = useAxios();

  useEffect(() => {
    const controller = new AbortController();

    const getPosts = async () => {
      try {
        const res = await axiosPrivate.get("/post/userposts", {
          signal: controller.signal,
        });

        setPostList(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getPosts();

    return () => {
      controller.abort();
    };
  }, []);


  const {
    auth: { username, avatar },
  } = useCT();

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  const [search, setSearch] = useState(false);

  return (
    <div className='max-w-[950px] mx-auto min-h-screen relative flex flex-col'>
      <section className='pt-40 '>
        <div className='w-full px-4 mx-auto'>
          <div className='relative flex flex-col min-w-0 break-words bg-slate-900 w-full mb-6 shadow-xl rounded-lg mt-16'>
            <div>
              <div className='flex flex-wrap justify-center'>
                <div className='w-full py-10 px-4 flex justify-center border-b border-b-blue-500 rounded-b-xl'>
                  <div className='bg-gradient-to-r from-cyan-500 to-blue-500 absolute top-[-200px] w-full h-[140px] z-0 border-t rounded-t-xl' />
                  <div className='relative flex flex-col items-center z-10 '>
                    <img
                      className='absolute top-[-100px] w-32 h-32 mx-auto object-cover rounded-full -mt-20 border-8 border-slate-300 bg-slate-400 shadow-inner '
                      src={avatar}
                      alt='avatar'
                    />
                    <h3 className='text-4xl text-center font-semibold leading-normal mt-2 text-blueGray-700 '>
                      {username}
                    </h3>
                    <span className='text-center text-sm text-slate-400 flex flex-row items-center gap-4'>
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
                          d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'
                        />
                      </svg>
                      10 Posts
                    </span>
                    <span className='text-center text-sm text-slate-400 flex flex-row items-center gap-4'>
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
                          d='M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z'
                        />
                      </svg>
                      Joined @ 2023
                    </span>
                  </div>
                </div>
              </div>
              <div className='mt-3 py-10 text-center'>
                <div className='flex flex-wrap justify-center'>
                  <div className='w-full lg:w-9/12 px-4'>
                    <p className='mb-4 text-sm sm:text-md md:text-lg  leading-relaxed text-blueGray-700 '>
                      An artist of considerable range, Jenna the name taken by
                      Melbourne-raised, Brooklyn-based Nick Murphy writes,
                      performs and records all of his own music, giving it a
                      warm, intimate feel with a solid groove structure. An
                      artist of considerable range.
                    </p>
                  </div>
                </div>
              </div>

              <div className=''>
                <h1 className='text-center text-lg sm:text-2xl md:text-4xl my-10 text-slate-500'>
                  Your Posts
                </h1>
                <div className='flex flex-row items-center justify-around gap-4 my-10 '>
                  <Link to='/post' className='group flex relative'>
                    <span className='group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-sm text-gray-100 rounded-md absolute left-1/2 -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto'>
                      Create
                    </span>
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
                        d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
                      />
                    </svg>
                  </Link>
                  <div
                    className={classNames(
                      "flex flex-row items-center ",
                      search ? "border border-slate pr-4" : ""
                    )}
                  >
                    <input
                      type='text'
                      className={classNames(
                        "flex flex-row items-center ",
                        search ? "" : "hidden"
                      )}
                      placeholder='Search'
                    />
                    <label htmlFor='search' className='group flex relative'>
                      <span className='group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-sm text-gray-100 rounded-md absolute left-[30px] -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto'>
                        Search
                      </span>
                      <svg
                        onClick={() => setSearch(!search)}
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-6 h-6 ml-3 cursor-pointer'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                        />
                      </svg>
                    </label>
                  </div>
                </div>

                <div className=' grid grid-cols-1 gap-y-5 py-20 place-items-center '>
                  {postList.map(({ user, slug, title, postusername }) => (
                    <div key={slug}>
                      <Card
                        user={user}
                        slug={slug}
                        title={title}
                        postusername={postusername}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AuthUserProfile;
