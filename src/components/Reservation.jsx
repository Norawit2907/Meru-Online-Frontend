import axios from "axios";
import React, { useEffect, useState } from 'react';
import ProfileCancelReservation from "./Profile_cancel_reservation";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Reservation = () => {
  const [isCancelOpen, setIsCancelOpen] = useState(false)
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [activeSegment, setActiveSegment] = useState(1);
  const [reservations, setReservations] = useState([]);
  const [wats, setWats] = useState({});
  const [watspic, setWatspic] = useState({});
  const curresnt_id = sessionStorage.getItem("currentUser_id")

  const segments = [
    { id: 1, label: 'รอยืนยัน', status: 'pending' },
    { id: 2, label: 'กำลังมาถึง', status: 'accept' },
    { id: 3, label: 'ผ่านมาแล้ว', status: 'passed' },
    { id: 4, label: 'ปฏิเสธแล้ว', status: 'reject' }
  ];

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear() + 543;

    const thaiMonths = [ "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];

    return `${day} ${thaiMonths[month]} ${year.toString().slice(-2)}`;
  };

  const fetchReservationsAndWats = async () => {
    try {
      const reservationResponse = await axios.get(`${backendUrl}/reserves`);
      const reservationsData = reservationResponse.data;

      setReservations(reservationsData);

      const watIds = [...new Set(reservationsData.map(reservation => reservation.wat_id))];
      const watResponses = await Promise.all(watIds.map(id => axios.get(`${backendUrl}/wats/id/${id}`)));
      const watData = watResponses.reduce((acc, response) => {
        acc[response.data.id] = response.data.name;
        return acc;
        
      }, {});
      setWats(watData);

      const watPic = watResponses.reduce((acc, response) => {
        acc[response.data.id] = response.data.picture[0].url;
        return acc;
        
      }, {});
      setWatspic(watPic);


    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchReservationsAndWats();
  }, []);

  const handleOpenCancel = (reservation) => {
    setSelectedReservation(reservation);
    setIsCancelOpen(true);
  };

  const handleCloseCancel = () => {
    fetchReservationsAndWats();
    setIsCancelOpen(false);
  };

  const handleClick = (segmentId) => {
    setActiveSegment(segmentId);
  };

  const handleSkip = async (reservation) => {
    alert('เวลาที่ผ่านไปแล้ว ไม่สามารถย้อนกลับมาได้ โปรดดูแลคนที่คุณรักให้ดี');
    try {
      const response = await axios.put(`${backendUrl}/reserves/${reservation._id}`, {
        wat_id: reservation.wat_id,
        user_id: reservation.user_id,
        status: 'passed',
        sender: 'wat'
      });
      fetchReservationsAndWats();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredReservations = reservations.filter(
    reservation => reservation.status === segments.find(segment => segment.id === activeSegment)?.status && reservation.user_id === curresnt_id
  );

  return (
    <div>
      <div className="flex justify-around w-1/2 text-white py-2 rounded-lg">
        {segments.map(segment => (
          <div
            key={segment.id}
            onClick={() => handleClick(segment.id)}
            className={`flex-1 text-center cursor-pointer py-2 transition-all duration-300 ${
              activeSegment === segment.id ? 'border-b-2 border-white' : ''
            }`}
          >
            <span>{segment.label}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col overflow-auto max-h-[500px]">
        {filteredReservations.length > 0 ? (
          filteredReservations.map(reservation => (
            <div key={reservation.id} className="p-2 my-2 shadow-md flex w-[100%] gap-5 rounded-lg">
              <img src={watspic[reservation.wat_id]} alt="wat_pic" width={100} height={100} className="rounded-lg"/>
              <div className="flex flex-col w-full justify-center">
                <p>{wats[reservation.wat_id] || 'วัดนิรมาน เพราะไม่ได้ตั้งชื่อ แต่วัดได้เพราะใจถึง'}</p>
                <div className="flex">
                  <div className="flex gap-1 w-full">
                    <p className="text-[#484848]">วันเริ่มงาน: </p>
                    <p>{formatDate(reservation.reservation_date)}</p>
                  </div>
                  <div className="flex gap-1 w-full">
                    <p className="text-[#484848]">ระยะเวลา: </p>
                    <p>{reservation.duration} วัน</p>
                  </div>
                  <div className="flex gap-1 w-full">
                    <p className="text-[#484848]">วันณาปนกิจ: </p>
                    <p>{formatDate(reservation.cremation_date)}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-row-reverse w-[30%] items-center mr-4">
              {reservation.status === 'pending' && (
                  <button 
                    className="w-1/2 h-9 bg-[#AD957B] rounded-2xl text-sm"
                    onClick={() => handleOpenCancel(reservation)}
                  >
                    Cancel
                  </button>
                )}
                {reservation.status === 'accept' && (
                  <>
                    <button 
                      className="w-1/2 h-9 bg-[#AD957B] rounded-2xl text-sm"
                      onClick={() => handleOpenCancel(reservation)}
                    >
                      Cancel
                    </button>
                    <button 
                      className="w-1/3 h-9 bg-[#4CAF50] rounded-2xl text-sm text-white mr-2"
                      onClick={() => handleSkip(reservation)}
                    >
                      skip
                    </button>
                  </>
                )}
              </div>
              
            </div>
          ))
        ) : (
          <p>ท่านยังไม่มีการสูญเสีย แต่ทำไม ทำไม ต้องจำว่าเธอไม่คิดจริงใจ</p>
        )}
      </div>
      <ProfileCancelReservation 
      isOpen={isCancelOpen}
      onClose={() => handleCloseCancel()}
      reservation={selectedReservation}
      />
    </div>
  );
};

export default Reservation;
