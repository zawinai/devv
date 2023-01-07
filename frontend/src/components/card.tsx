import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/adventurer";

const Card = () => {
  const genString = () => {
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var charLength = str.length;
    var result = "";
    for (var i = 0; i < 6; i++) {
      result += str.charAt(Math.floor(Math.random() * charLength));
    }
    return result;
  };

  const avatar = useMemo(() => {
    return createAvatar(style, { seed: genString(), dataUri: true, size: 128 });
  }, []);

  return (
    <div className='px-2 w-[270px] h-auto '>
      <div className='bg-white max-w-xl rounded-2xl px-4 py-8 shadow-lg hover:shadow-2xl transition duration-500'>
        <div className='flex justify-between items-center'>
          <div className='mt-4 flex items-center space-x-4 py-6'>
            <div className=''>
              <img
                className='w-10 h-10 rounded-full aspect-[2/2]'
                src={avatar}
                alt='picture'
              />
            </div>
            <div className='text-sm font-semibold flex flex-col'>
              John Lucas <span className='font-normal'>• 5 minutes ago</span>
            </div>
          </div>
        </div>
        <div className='mt-4 bg-white'>
          <h1 className='text-lg text-gray-700 font-semibold hover:underline cursor-pointer'>
            Product Review
          </h1>
          <p className='mt-4 text-md text-gray-600'>
            But I must explain to you how all this mistaken idea of denouncing
            pleasure and praising pain was born and I will give you a complete
          </p>
          <div className='text-end mt-5 cursor-pointer text-slate-400'>
            <Link to='/detail'>{"See more>"}</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
