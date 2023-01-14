import { useCT } from "../hooks/useCT";
import { Link } from "react-router-dom";
import { classNames } from "../utils/changeStyle";

const SideProfile = () => {
  const {
    auth: { avatar, username },
  } = useCT();

  return (
    <div
      className={classNames(
        " col-start-6 col-end-8 px-10 hidden md:flex",
        username ? "flex" : "hidden"
      )}
    >
      <div
        className={classNames(
          "bg-gray-300 font-sans min-w-[200px] max-h-[300px] flex flex-row mt-20 mx-auto",
          username ? "flex" : "hidden"
        )}
      >
        <div className=' mx-auto bg-slate-700'>
          <img
            className='w-32 mx-auto rounded-full -mt-20 border-8 border-white bg-slate-400'
            src={avatar}
            alt=''
          />
          <div className='text-center mt-2 text-3xl font-medium'>
            <Link to='/profile'>{username}</Link>
          </div>
          <div className='text-center font-normal text-lg'>Developer</div>
          <div className='px-6 text-center mt-2 font-light text-sm'>
            <p>
              Front end Developer, avid reader. Love to take a long walk, swim
            </p>
          </div>
          <hr className='mt-8' />
        </div>
      </div>
    </div>
  );
};

export default SideProfile;
