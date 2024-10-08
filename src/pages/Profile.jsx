import React from 'react';

const Profile = () => {
  return (
    <div className="flex h-full overflow-y-hidden divide-x-2 pb-10 pt-16">
      <div className='flex flex-col text-white w-1/5 items-center justify-between  '>
        <div className='flex flex-col relative'>
          <icon></icon>
          <p className=' '>John Figma</p>
        </div>
          <button>hee</button>
      </div>
      <div className='flex flex-col text-white w-4/5 items-center justify-between bg-indigo-500 '>
        <p className=' '>John Figma</p>
        <button>hee</button>
      </div>
      
    </div>
  );
};

export default Profile;