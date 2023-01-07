import { Link } from "react-router-dom";
import { useCT } from "../hooks/useCT";

const WritePost = () => {
  const {
    auth: { avatar, username },
  } = useCT();

  return (
    <div className='bg-slate-200 min-h-screen max-w-[900px] mx-auto'>
      <div className=' p-10 shadow-xl'>
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
          <form action='#' method='POST'>
            <div className='shadow sm:overflow-hidden sm:rounded-md'>
              <div className='space-y-6 bg-white px-4 py-5 sm:p-6'>
                <div className='grid grid-cols-3 gap-6'>
                  <div className='col-span-3 sm:col-span-2'>
                    <label
                      htmlFor='company-website'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Header
                    </label>
                    <div className='mt-1 flex rounded-md shadow-sm'>
                      <input
                        type='text'
                        name='company-website'
                        id='company-website'
                        className='block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                        placeholder='Title'
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor='about'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Slug
                  </label>
                  <div className='mt-1'>
                    <input
                      type='text'
                      className='block w-full h-[100px] flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                      placeholder='Slug'
                    />
                  </div>
                  <p className='mt-2 text-sm text-gray-500'>
                    Brief description for your post.
                  </p>
                </div>

                <div>
                  <label htmlFor='markdown'>Markdown</label>
                  <div className='mt-1 flex flex-col justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6'>
                    <textarea
                      id='about'
                      name='markdown'
                      rows={13}
                      className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                      placeholder='#Markdown'
                      defaultValue={"#"}
                    />
                  </div>
                </div>
              </div>
              <div className='bg-gray-50 px-4 py-3 text-right sm:px-6 flex flex-row gap-10 items-center justify-end'>
                <Link to='..' className='bg-slate-200 py-2 px-4 rounded-md'>
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

export default WritePost;
