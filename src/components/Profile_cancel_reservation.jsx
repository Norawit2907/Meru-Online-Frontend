import React, { useState, useEffect } from 'react';
import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const ProfileCancelReservation = ({ isOpen, onClose, reservation }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  // console.log(currentDate.toLocaleDateString(), reservation.reservation_date);
  const [checkdays, setCheckdays] = useState(false);

  useEffect(() => {
    if (reservation?.reservation_date) {
      const reservationDate = new Date(reservation.reservation_date);
      const timeDifference = reservationDate - currentDate;
      const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
      // console.log(daysDifference);
      setCheckdays(daysDifference <= 2 && daysDifference >= 0);
    }
  }, [reservation, currentDate]);

  const handleDelete = async () => {
    if (checkdays) {
      alert("ไม่สามารถยกเลิกการจองได้เนื่องจากเหลือเวลาน้อยกว่า 2 วัน");
      onClose();
    } else {
      try {
          const response = await axios.put(`${backendUrl}/reserves/${reservation._id}`, {
              status: 'reject',
              sender: 'user'
          });
          onClose();
      } catch (err) {
        console.error(err);
      }
    }
    };
  
    if (!isOpen || !reservation) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-[70]">
      <div className="flex flex-col bg-[#1c1c1c] p-7 rounded-lg w-[500px] shadow-xl items-center">
        <p className="text-4xl font-bold mb-2 text-center">
            ยกเลิกการจอง
        </p>
        <p className="text-xl text-center mb-6">
            คุณแน่ใจใช่ไหม แน่ใจจริงๆเหรอ?
        </p>
        <div className="flex flex-col h-24 w-full bg-[#312F32] border-l-8 border-[#E9C649] px-3 py-2 gap-1">
            <div className='flex flex-row'>
                <img src={require('../Assets/warning.png')} alt='profile' width={50} height={50} className='w-[30px] h-[26px] mr-2 my-auto' />
                <p className='text-xl text-[#E9C649]'>Warning</p>
            </div>
            <p className='text-sm'>คุณจะได้รับเงินคืน หักลบกับค่ามัดจำที่คุณได้จ่ายไป หากคุณกดยืนยันทางเราจะถือว่าคุณ ไม่ต้องการที่จะจัดพิธีแล้ว และสละสิทธิ์การจอง</p>
        </div>
        <div className='flex flex-row w-full place-content-between m-3'>
            <button className="w-1/3 h-10 bg-[#AD957B] rounded-xl text-sm" onClick={onClose}>No, Cancel</button>
            <button className="w-1/3 h-10 bg-[#181914] rounded-xl text-sm" onClick={handleDelete}>Yes, Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCancelReservation;
