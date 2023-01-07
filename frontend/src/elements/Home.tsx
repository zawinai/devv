import { useEffect } from "react";
// Utils
import { classNames } from "../utils/changeStyle";
import { Link } from "react-router-dom";

// Components
import Hero from "../components/hero";
import SideProfile from "../components/sideProfile";
import Card from "../components/card";
import NavMenuMobile from "../components/navMenuMobile";
import { SkeletonPost } from "../components/loading";
// Hooks
import { useCT } from "../hooks/useCT";
import { useRefreshToken } from "../hooks/useRefresh";

export default function Home() {
  const {
    auth: { username, accessToken },
    posts,
    remember,
  } = useCT();

  return (
    <div className='min-h-full'>
      <Hero />
      <NavMenuMobile />
      <main className='grid p-4 grid-cols-1 md:grid-cols-7 min-h-screen'>
        <div
          className={classNames(
            "p-2 grid grid-cols-card-container gap-4  place-items-center",
            username ? "col-span-5" : "col-span-8"
          )}
        >
          {posts.length <= 1
            ? [1, 2, 3, 4, 5, 6, 7].map((_) => <SkeletonPost key={_} />)
            : posts.map((post) => (
                <div key={post._id}>
                  <Card />
                </div>
              ))}
          <div
            className={classNames(
              "flex flex-row gap-3 border border-slate-300 p-3 rounded-xl hover:scale-95",
              !username && posts.length <= 1 ? "hidden" : "flex"
            )}
          >
            <Link to='/login'>Login To Read More</Link>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-26 h-6 '
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
              />
            </svg>
          </div>
        </div>
        <SideProfile />
      </main>
    </div>
  );
}
