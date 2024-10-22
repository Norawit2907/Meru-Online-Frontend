import axios from "axios";
import React, { useEffect, useState } from 'react';
import Segment from '../components/Profile_segment.jsx';
import EditProfile from '../components/Profile_edit.jsx'; 


const backendUrl = process.env.REACT_APP_BACKEND_URL;


const Profile = () => {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [profileImg, setProfileImg] = useState('')
  const [selectedSegment, setSelectedSegment] = useState(1)
  const [reservations, setReservations] = useState([])

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(`${backendUrl}/reserves`);
        console.log("res ", response.data);
        setReservations(response.data);
      } catch (err) {
        console.log(err);
      }
    };


    fetchReservations();
  }, []);


  const handleSegmentChange = (segmentId) => {
    setSelectedSegment(segmentId);
  };

  const getFilteredReservations = () => {
    switch (selectedSegment) {
      case 1:
        return reservations.filter(reservation => reservation.status === "pending");
      case 2:
        return reservations.filter(reservation => reservation.status === "accept");
      case 3:
        return reservations.filter(reservation => reservation.status === "passed");
      case 4:
        return reservations.filter(reservation => reservation.status === "reject");
      default:
        return reservations;
    }
  };
  
  const filteredReservations = getFilteredReservations();

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
            <p className='text-3xl text-center text-[#AD957B] font-bold'>John Figma</p>
            <p className='text-sm text-[#484848]'>Nick Name</p>
          </div>
          <div className='flew flex-col'>
            <div className='flex'>
            <img src={require('../Assets/Phone.png')} alt='profile' width={50} height={50} className='w-3.5 h-3.5 mr-2 my-auto' />
              <p className='text-sm'>Tel: 081-234-5678</p>
            </div>
            <div className='flex'>
            <img src={require('../Assets/mail.png')} alt='profile' width={50} height={50} className='w-3.5 h-3.5 mr-2 my-auto' />
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
          <Segment onSegmentChange={handleSegmentChange} />
          {filteredReservations.length > 0 ? (
              <ul>
                {filteredReservations.map((reservation) => (
                  <li key={reservation.id} className="mt-2">
                    <p>Name: {reservation.namewat}</p>
                    <p>Reservation Date: {reservation.reservation_date}</p>
                    <p>Duration: {reservation.duration}</p>
                    <p>Cremation Date: {reservation.cremation_date}</p>
                  </li>
                ))}
              </ul>
          ) : (
            <p className="mt-4">No reservations found for this status.</p>
          )}
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
