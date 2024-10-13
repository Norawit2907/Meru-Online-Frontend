import React from 'react';
import Segment from '../components/Profile_segment.jsx';

const Profile = () => {
  return (
    <div className="flex h-full overflow-y-hidden divide-x-2 pb-10 pt-16">
      <div className='flex flex-col text-white w-1/5 items-center justify-between  '>
        <div className='flex flex-col relative pt-6 gap-3 items-center'>
          <img src={require('../Assets/profile.png')} alt='profile' width={300} height={300} className='w-28 h-28 rounded-full  ' />
          <div>
            <p className='text-3xl text-center text-[#AD957B] font-bold'>John Figma</p>
            <p className='text-sm text-[#484848]'>Nick Name</p>
          </div>
          <div className='flew flex-col'>
            <div className='flex'>
              <p>icon</p>
              <p className='text-sm'>Tel: 081-234-5678</p>
            </div>
            <div className='flex'>
              <p>icon</p>
              <p className='text-sm'>Email: meru@gmail.com</p>
            </div>
          </div>
          
        </div>
          <button className='mb-5 h-14 w-36 border-2 border-[#484848] rounded-lg bg-[#AD957B]'>Edit Profile</button>
      </div>
      <div className='flex flex-col text-white w-4/5 px-10'>
        <p className='text-3xl font-bold text-[#AD957B]'>Reservations</p>
        <div className='h-16 w-1/2'>
          <Segment/>
        </div>
        {/* <div className='flex flex-col gap-5'>
          <div className='flex gap-5'>
            <div className='w-1/3 h-36 bg-[#484848] rounded-lg'></div>
            <div className='w-2/3 h-36 bg-[#484848] rounded-lg'></div>
          </div>
          <div className='flex gap-5'>
            <div className='w-1/3 h-36 bg-[#484848] rounded-lg'></div>
            <div className='w-2/3 h-36 bg-[#484848] rounded-lg'></div>
          </div>
          <div className='flex gap-5'>
            <div className='w-1/3 h-36 bg-[#484848] rounded-lg'></div>
            <div className='w-2/3 h-36 bg-[#484848] rounded-lg'></div>
          </div>
          </div> */}
      </div>
      
    </div>
  );
};

export default Profile;