import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { getPostDetail, getData } from "../api/post";
import { useQuery } from "react-query";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/adventurer";

const Details = () => {
  const { slug } = useParams();

  const [user, setUser] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const avatar = createAvatar(style, {
    seed: user,
    dataUri: true,
    size: 128,
  });

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`/post/${slug}`);
      setUser(res.data.postusername);
      setTitle(res.data.title);
      setBody(res.data.body);
      return res;
    };

    fetch();
  }, [slug]);

  return (
    <div className='px-20 py-10 mt-[10px] max-w-[1200px] grid grid-cols-1 md:grid-cols-10 place-content-center mx-auto z-0 min-h-screen'>
      <section className='col-start-1 col-end-3 bg-slate-700 hidden md:flex text-center py-10 px-4 min-h-screen'>
        Table Contents
      </section>
      <main className='col-start-1 col-end-10 md:col-start-4 md:col-end-10 min-h-screen'>
        <Link to={`/user/${user}`}>
          <div className='flex flex-row items-center mt-10 my-5'>
            <img
              className=' w-20 h-20 rounded-full aspect-[2/2]'
              src={avatar}
              alt='picture'
            />
            <div className='flex flex-col items-center'>
              <div className='text-lg'>{user}</div>
              <div className='text-start text-sm text-slate-500'>
                Joined 2023
              </div>
            </div>
          </div>
        </Link>
        <div className='py-10 flex flex-col'>
          <h1 className='text-5xl text-slate-200'>{title}</h1>
        </div>
        <div>
          <ReactMarkdown>{body}</ReactMarkdown>
        </div>
      </main>
    </div>
  );
};

export default Details;
