import React from "react";
import PulseLoader from "react-spinners/PulseLoader";

export const SkeletonPost = (index : any) => (

  <div className='px-2 w-[270px] h-auto ' key={index}>
            <div className='bg-white max-w-xl rounded-2xl px-4 py-8'>
              <div className='flex justify-between items-center'>
                <div className='mt-4 flex items-center space-x-4 py-6'>
                  <div className='bg-slate-300 w-16 h-16 rounded-full'></div>
                  <div className='flex flex-col gap-4'>
                    <div className=' w-28 h-5 bg-slate-300' />
                    <div className=' w-32 h-5 bg-slate-200' />
                  </div>
                </div>
              </div>
              <div className='mt-4 bg-white flex flex-col gap-10'>
                <div className=' w-28 h-5 bg-slate-200' />
                <div className=' w-50 h-5 bg-slate-200' />
                <div className=' w-32 h-5 bg-slate-200' />
                <div className=' w-26 h-5 bg-slate-200' />
                <div className='bg-slate-400'></div>
              </div>
            </div>
          </div>
)

const Loading = () => {
  return (
    <div className='text-center min-h-screen bg-slate-200 pt-10'>
      <div className='bg-slate-300 w-[95%] h-[400px] mx-auto flex flex-col justify-center items-center'>
        <PulseLoader color={"#666"} />
      </div>
      <div className='flex flex-row justify-end '>
        <div className='w-[250px] h-[35px] bg-slate-300 mt-20 self-end  mr-10' />
      </div>
      <div className='grid grid-cols-card-container gap-10 my-20 place-items-center'>
        {["a", "c", "v", "f", "d"].map((_, index) => (
          <SkeletonPost key={index}/>
        ))}
      </div>
      <div className='w-full h-[300px] bg-slate-300' />
    </div>
  );
};

{
  // /*  */
}
export default Loading;
