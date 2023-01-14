import PulseLoader from "react-spinners/PulseLoader";

export const SkeletonPost = (index: any) => (
  <div
    className='px-2 max-w-[800px] w-[calc(70vw_-_1rem)] h-auto '
    key={index}
  >
    <div
      className='bg-gradient-to-r from-transparent via-rose-100/10 to-transparentmax-w-xl rounded-2xl px-4 py-8  relative 
    before:absolute before:inset-0
    before:-translate-x-full
    before:animate-[shimmer_2s_infinite]
    before:bg-gradient-to-r
    before:from-transparent before:via-rose-100/10 before:to-transparent
    isolate
    overflow-hidden
    shadow-xl shadow-black/5'
    >
      <div className='flex justify-between items-center '>
        <div className='mt-4 flex items-center space-x-4 py-6'>
          <div className='bg-slate-600 w-16 h-16 rounded-full'></div>
          <div className='flex flex-col gap-4'>
            <div className=' w-28 h-5 bg-slate-500' />
            <div className=' w-32 h-5 bg-slate-500' />
          </div>
        </div>
      </div>
      <div className='mt-4 bg-slate-600 flex flex-col gap-10 p-3'>
        <div className=' w-28 h-5 bg-slate-500' />
        <div className=' w-50 h-5 bg-slate-500' />
        <div className=' w-32 h-5 bg-slate-500' />
        <div className=' w-26 h-5 bg-slate-500' />
        <div className='bg-slate-500'></div>
      </div>
    </div>
  </div>
);

const Loading = () => {
  return (
    <div className='text-center min-h-screen bg-slate-200 pt-10 '>
      <div className='bg-slate-300 w-[400px] h-[300px] mx-auto flex flex-col justify-center items-center'>
        <PulseLoader color={"#666"} />
      </div>
      <div className='flex flex-row justify-end '>
        <div className='w-[200px] h-[35px] bg-slate-300 mt-20 self-end  mr-10' />
      </div>
      <div className='grid grid-cols-card-container gap-10 my-20 place-items-center'>
        {["a", "c", "v", "f", "d"].map((_, index) => (
          <SkeletonPost key={index} />
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
