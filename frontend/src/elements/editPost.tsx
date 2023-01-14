import { useState, useRef, useEffect, FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { useCT } from "../hooks/useCT";
import { useAxios } from "../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const EditPost = () => {
  const { slug } = useParams();

  const [msg, setMsg] = useState("Edit Your Post");
  const [postid, setId] = useState("");
  const [title, setTitle] = useState("");
  const [slugy, setSlugy] = useState("");
  const [body, setBody] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const axiosInterceptor = useAxios();

  useEffect(() => {
    inputRef.current?.focus();

    const fetch = async () => {
      const res = await axios.get(`post/${slug}`);
      setId(res.data._id);
      setTitle(res.data.title);
      setBody(res.data.body);
      setSlugy(res.data.slug);

      return res;
    };

    fetch();
  }, [slug]);

  const handlePost = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await axiosInterceptor.put("/post", {
        id: postid.toString(),
        title: title,
        slug: slugy,
        body: body.toString(),
      });
      navigate("/");
    } catch (error: any) {
      setMsg(error?.response);
    }
  };

  const handleDelete = async () => {
    try {
      await axiosInterceptor.delete(`/post/${postid}`);
      navigate("/");
    } catch (error: any) {
      console.log(error);
    }
  };

  const {
    auth: { avatar, username },
  } = useCT();

  return (
    <div className='dark:bg-black min-h-screen max-w-[900px] mx-auto'>
      <div className=' p-10 shadow-xl'>
        <div className='text-center text-5xl text-slate-400'>{msg}</div>
        <div className='flex items-center space-x-4 py-10'>
          <div className=''>
            <img
              className='w-10 h-10 object-cover rounded-full aspect-[2/4]'
              src={avatar}
              alt='picture'
            />
          </div>
          <div className='text-lg font-semibold flex flex-col'>{username}</div>
        </div>
        <div className='mt-5 md:col-span-2 md:mt-0'>
          <form action='#' method='POST' onSubmit={(e) => handlePost(e)}>
            <div className='shadow sm:overflow-hidden sm:rounded-md'>
              <div className='space-y-6 bg-gray-900 px-4 py-5 sm:p-6'>
                <div className='grid grid-cols-3 gap-6'>
                  <div className='col-span-3 sm:col-span-2'>
                    <label
                      htmlFor='title'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Header
                    </label>
                    <div className='mt-1 flex rounded-md shadow-sm'>
                      <input
                        type='text'
                        ref={inputRef}
                        name='title'
                        id='title'
                        className='bg-slate-700 block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                        placeholder='Title'
                        defaultValue={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                  </div>
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
                      className='bg-slate-700 block w-full h-[50px] flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                      placeholder='Slug'
                      defaultValue={slugy}
                      onChange={(e) => setSlugy(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor='markdown'>Markdown</label>
                  <div className='mt-1 flex flex-col justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6'>
                    <textarea
                      id='about'
                      name='markdown'
                      rows={13}
                      className='bg-slate-700 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                      placeholder='#Markdown'
                      defaultValue={body}
                      onChange={(e) => setBody(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className='bg-gray-900 px-4 py-3 text-right sm:px-6 flex flex-row gap-10 items-center justify-end'>
                <button
                  type='button'
                  className='inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
                  onClick={() => handleDelete()}
                >
                  Delete
                </button>
                <Link to={".."} className='bg-slate-800 py-2 px-4 rounded-md'>
                  Cancel
                </Link>
                <button
                  type='submit'
                  className='inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
