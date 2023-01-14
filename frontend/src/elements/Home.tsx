// Utils
import { classNames } from "../utils/changeStyle";

// Components
import SideProfile from "../components/sideProfile";
import Card from "../components/card";
import NavMenuMobile from "../components/navMenuMobile";
import { SkeletonPost } from "../components/loading";
import Hero from "../components/hero";

// Hooks
import { useCT } from "../hooks/useCT";
import { useState } from "react";
// Api
import { getData } from "../api/post";
import { useQuery } from "react-query";

export default function Home() {
  const {
    auth: { username },
  } = useCT();

  type postTypes = {
    _id: string;
    postusername: string;
    user: string;
    slug: string;
    title: string;
    body: string;
  };

  const { isLoading, isError, data } = useQuery("posts", getData);

  return (
    <div className='bg-black min-w-[100vw] max-w-[1500px] mx-auto'>
      <NavMenuMobile />
      <div>
        <Hero data={data} />
      </div>
      <main
        className={classNames(
          "",
          !isError && Array.isArray(data)
            ? "grid p-4 pt-10 grid-cols-1 md:grid-cols-7 min-h-screen"
            : "flex flex-col w-[100vw] min-h-screen items-center justify-center"
        )}
      >
        {isLoading ? (
          <div
            className={classNames(
              "grid grid-cols-1 gap-5 place-items-center",
              username ? "col-span-5" : "col-span-8"
            )}
          >
            {[1, 2, 3, 4, 5, 6, 7].map((_) => (
              <SkeletonPost key={_} />
            ))}
          </div>
        ) : isError || (typeof data === "object" && !Array.isArray(data)) ? (
          <h1 className='text-center text-sm sm:text-xl md:text-5xl text-red-500/80 font-Futurist overflow-hidden'>
            Network Error {":("}
          </h1>
        ) : (
          <div
            className={classNames(
              " grid grid-cols-1 gap-5 place-items-center mx-autop-5",
              username ? "col-span-5" : "col-span-8"
            )}
          >
            {Array.isArray(data) &&
              data.map(
                ({ _id, slug, user, title, postusername }: postTypes) => (
                  <div key={_id}>
                    <Card
                      slug={slug}
                      user={user}
                      title={title}
                      postusername={postusername}
                    />
                  </div>
                )
              )}
          </div>
        )}
        <SideProfile />
      </main>
    </div>
  );
}
