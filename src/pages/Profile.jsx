import React, { useEffect, useState } from 'react';
import Reservation from '../components/Reservation.jsx';
import EditProfile from '../components/Profile_edit.jsx'; 
import axios from 'axios';


const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Profile = () => {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [profileImg, setProfileImg] = useState('')
  const [user, setUser] = useState({})
  const token = sessionStorage.getItem("access_token")
  const curresnt_id = sessionStorage.getItem("currentUser_id")

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${backendUrl}/users/${curresnt_id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (err) {
      console.error(err);
    }
  };
  
  useEffect(() => {
    fetchUser().then((user) => {
      setUser(user);
      setProfileImg(user.profile_img);
      // console.log(user)
    });
  }, []);



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
          <img src={require('../Assets/profile.png')} alt='profile' width={100} height={100} className='w-28 h-28 rounded-full  ' />)}
          <div>
            <p className='text-3xl text-center text-[#AD957B] font-bold'>{user.firstName} {user.lastName}</p>
            <p className='text-sm text-[#484848]'>Nick Name</p>
          </div>
          <div className='flew flex-col'>
            <div className='flex'>
            <img src={require('../Assets/Phone.png')} alt='profile' width={50} height={50} className='w-3.5 h-3.5 mr-2 my-auto' />
              <p className='text-sm'>Tel: {user.phoneNumber}</p>
            </div>
            <div className='flex'>
            <img src={require('../Assets/mail.png')} alt='profile' width={50} height={50} className='w-3.5 h-3.5 mr-2 my-auto' />
              <p className='text-sm'>Email: {user.email}</p>
            </div>
          </div>
        </div>
          <button className='mb-5 h-14 w-36 border-2 border-[#484848] rounded-lg bg-[#AD957B]'
          onClick={() => setIsEditOpen(true)}
          >Edit Profile</button>
      </div>
      <div className="flex flex-col text-white w-4/5 px-10">
        <p className="text-3xl font-bold text-[#AD957B]">Reservations</p>
        <div className="h-16 w-full">
          <Reservation />
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
