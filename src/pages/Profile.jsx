"use client";
import React, { useEffect, useState } from 'react';
import Segment from '../components/Profile_segment.jsx';
import EditProfile from '../components/Profile_edit.jsx'; 


const Profile = () => {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [profileImg, setProfileImg] = useState('')

  return (
    <div className="flex h-[calc(100vh-80px)] divide-x-2 overflow-y-hidden pb-10 pt-16">
      <div className='flex flex-col text-white w-1/5 items-center justify-between  '>
        <div className='flex flex-col relative pt-6 gap-3 items-center'>
        {profileImg ? (
          <img src={profileImg}
                height={100}
                width={100}
                className="w-28 h-28 rounded-full " />
              ) : (
          <img src={require('../assets/profile.png')} alt='profile' width={100} height={100} className='w-28 h-28 rounded-full  ' />)}
          <div>
            <p className='text-3xl text-center text-[#AD957B] font-bold'>John Figma</p>
            <p className='text-sm text-[#484848]'>Nick Name</p>
          </div>
          <div className='flew flex-col'>
            <div className='flex'>
            <img src={require('../assets/Phone.png')} alt='profile' width={50} height={50} className='w-3.5 h-3.5 mr-2 my-auto' />
              <p className='text-sm'>Tel: 081-234-5678</p>
            </div>
            <div className='flex'>
            <img src={require('../assets/mail.png')} alt='profile' width={50} height={50} className='w-3.5 h-3.5 mr-2 my-auto' />
              <p className='text-sm'>Email: meru@gmail.com</p>
            </div>
          </div>
        </div>
          <button className='mb-5 h-14 w-36 border-2 border-[#484848] rounded-lg bg-[#AD957B]'
          onClick={() => setIsEditOpen(true)}
          >Edit Profile</button>
      </div>
      <div className="flex flex-col text-white w-4/5 px-10">
        <p className="text-3xl font-bold text-[#AD957B]">Reservations</p>
        <div className="h-16 w-1/2">
          <Segment />
        </div>
      </div>
      <EditProfile
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
      />
      
    </div>
  );
};

export default Profile;
