import axios from "axios";
import React, { useEffect, useState } from "react";
import { getUserById } from "../services/userService";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Reservationwat = () => {
  const [activeSegment, setActiveSegment] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [wats, setWats] = useState({});
  const [watspic, setWatspic] = useState({});
  const [firstname, setFirstname] = useState({});
  const [lastname, setLastname] = useState({});
  const [userpic, setUserpic] = useState({});
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [ans, setAns] = useState("This is the answer");
  const curresnt_id = sessionStorage.getItem("currentUser_id");

  const segments = [
    { id: 1, label: "ตอนนี้", status: "pending" },
    { id: 2, label: "กำลังมาถึง", status: "accept" },
    { id: 3, label: "ผ่านมาแล้ว", status: "passed" },
    { id: 4, label: "ปฏิเสธแล้ว", status: "reject" },
  ];

  const toggleConfirmation = (answer) => {
    setShowConfirmation(!showConfirmation);
    console.log("มา");
    setAns(answer);
  };

  const confirmation = (answer, reservation) => {
    if (answer == "ปฏิเสธ") {
      handleCancel(reservation);
      toggleConfirmation();
      fetchReservations(wats);
    }
    if (answer == "ยอมรับ") {
      handleSubmit(reservation);
      toggleConfirmation();
      fetchReservations(wats);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear() + 543;

    const thaiMonths = [
      "ม.ค.",
      "ก.พ.",
      "มี.ค.",
      "เม.ย.",
      "พ.ค.",
      "มิ.ย.",
      "ก.ค.",
      "ส.ค.",
      "ก.ย.",
      "ต.ค.",
      "พ.ย.",
      "ธ.ค.",
    ];

    return `${day} ${thaiMonths[month]} ${year.toString().slice(-2)}`;
  };

  const fetchwat = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/wats/adminId/${curresnt_id}`
      );
      setWats(response.data);
      setWatspic(response.data.picture[0].url);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchReservations = async (wats) => {
    try {
      const reservationResponse = await axios.get(
        `${backendUrl}/reserves/wat/${wats.id}`
      );
      setReservations(reservationResponse.data);
      // console.log(reservationResponse.data)
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUsers = async () => {
    const userfirstmap = {};
    const userlastmap = {};
    const userpicmap = {};
    for (const reservation of reservations) {
      const users = await getUserById(reservation.user_id);
      if (users) {
        userfirstmap[reservation.user_id] = users.firstName;
        userlastmap[reservation.user_id] = users.lastName;
        userpicmap[reservation.user_id] = users.profile_img;
      }
      console.log(users);
    }
    setUserpic(userpicmap);
    setFirstname(userfirstmap);
    setLastname(userlastmap);
  };

  useEffect(() => {
    fetchwat();
  }, []);

  useEffect(() => {
    fetchReservations(wats);
  }, [wats, reservations]);

  useEffect(() => {
    fetchUsers();
  }, [reservations]);

  const handleClick = (segmentId) => {
    setActiveSegment(segmentId);
  };

  const handleCancel = async (reservation) => {
    alert("คุณได้ปฏิเสธคำขอร้องการจองนี้แล้ว");
    try {
      const response = await axios.put(
        `${backendUrl}/reserves/${reservation._id}`,
        {
          wat_id: reservation.wat_id,
          user_id: reservation.user_id,
          status: "reject",
          sender: "user",
          reservation_date: reservation.reservation_date,
          cremation_date: reservation.cremation_date,
        }
      );
      // console.log(response)
      fetchReservations();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (reservation) => {
    alert("คุณได้ยอมรับคำขอร้องการจองนี้แล้ว");
    console.log(reservation.wat_id, reservation.user_id);
    try {
      const response = await axios.put(
        `${backendUrl}/reserves/${reservation._id}`,
        {
          wat_id: reservation.wat_id,
          user_id: reservation.user_id,
          status: "accept",
          sender: "user",
          reservation_date: reservation.reservation_date,
          cremation_date: reservation.cremation_date,
        }
      );
      // console.log(response)
      fetchReservations();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSkip = async (reservation) => {
    try {
      const response = await axios.put(
        `${backendUrl}/reserves/${reservation._id}`,
        {
          wat_id: reservation.wat_id,
          user_id: reservation.user_id,
          status: "passed",
          sender: "wat",
          reservation_date: reservation.reservation_date,
          cremation_date: reservation.cremation_date,
        }
      );
      fetchReservations();
      alert("คุณได้ทำการ Skip เวลางานนี้แล้ว");
    } catch (err) {
      console.error(err);
    }
  };

  const toggleReservation = (reservationId) => {
    setSelectedReservation(prev => (prev === reservationId ? null : reservationId));
  };

  const filteredReservations = reservations.filter(
    (reservation) =>
      reservation.status ===
      segments.find((segment) => segment.id === activeSegment)?.status
  );

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] w-full pt-20 px-14">
      <h1 className="text-2xl font-bold text-[#AD957B]">คำขอร้องการจอง</h1>
      <div className="flex justify-around w-1/2 text-white py-2 rounded-lg">
        {segments.map((segment) => (
          <div
            key={segment.id}
            onClick={() => handleClick(segment.id)}
            className={`flex-1 text-center cursor-pointer py-2 transition-all duration-300 ${
              activeSegment === segment.id ? "border-b-2 border-white" : ""
            }`}
          >
            <span>{segment.label}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col overflow-auto max-h-[500px] ">
        {filteredReservations.length > 0 ? (
          filteredReservations.map((reservation, index) => (
            <div
              key={reservation.id}
              className="p-2 my-2 shadow-md flex w-[100%] gap-5 rounded-lg"
            >
              <img
                src={watspic}
                alt="wat_pic"
                width={100}
                height={100}
                className="rounded-lg object-cover"
              />
              <div className="flex flex-col w-full justify-center gap-3 ">
                <div className="flex gap-2">
                  <img
                    src={watspic}
                    alt="wat_pic"
                    width={100}
                    height={100}
                    className="rounded-lg object-cover"
                  />
                  {/* <p className="font-bold text-xl text-[#AD957B]">{user[reservation.user_id]}</p> */}
                </div>
                <div className="flex flex-col">
                  <div className="flex">
                    <div className="flex gap-1 w-full">
                      <p className="text-white">วันเริ่มงาน: </p>
                      <p className="text-[#9A9A9A]">
                        {formatDate(reservation.reservation_date)}
                      </p>
                    </div>
                    <div className="flex gap-1 w-full">
                      <p className="text-white">ระยะเวลา: </p>
                      <p className="text-[#9A9A9A]">
                        {reservation.duration} วัน
                      </p>
                    </div>
                    <div className="flex gap-1 w-full">
                      <p className="text-white">ราคา :</p>
                      <p className="text-[#9A9A9A]">{reservation.price}</p>
                      <p className="text-white">บาท</p>
                    </div>
                  </div>

                </div>

              <div className="flex flex-row-reverse w-[30%] items-center mr-4">
                {reservation.status === "pending" && (
                  <>
                    <button
                      className="w-1/2 h-9 bg-[#312F32] rounded-2xl text-sm text-white hover:bg-white-500 "
                      onClick={() => toggleConfirmation("ปฏิเสธ")}
                      // onClick={() => handleCancel(reservation)}
                    >
                      ปฏิเสธ
                    </button>
                    <button
                      className="w-1/2 h-9 bg-[#AD957B] rounded-2xl text-sm mr-2"
                      onClick={() => toggleConfirmation("ยอมรับ")}
                    >
                      ยอมรับ
                    </button>
                  </>
                )}
                {showConfirmation && (
                  <>
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-[70]">
                      <div className="flex flex-col bg-[#1c1c1c] p-7 rounded-lg w-[500px] shadow-xl items-center">
                        <p className="text-4xl font-bold mb-2 text-[white] text-center">
                          {ans}การจอง
                        </p>
                        <p className="text-xl text-center text-[white] mb-6">
                          คุณแน่ใจใช่ไหม แน่ใจจริงๆเหรอ?
                        </p>
                        <div className="flex flex-col h-24 w-full bg-[#312F32] border-l-8 border-[#E9C649] px-3 py-2 gap-1">
                          <div className="flex flex-row">
                            <img
                              src={require("../Assets/warning.png")}
                              alt="profile"
                              width={50}
                              height={50}
                              className="w-[30px] h-[26px] mr-2 my-auto"
                            />
                            <p className="text-xl text-[#E9C649]">Warning</p>
                          </div>
                          <p className="text-lg text-[white]">
                            กรุณาตรวจสอบให้ดึก่อน{ans}การจอง
                          </p>
                        </div>
                        <div className="flex flex-row w-full place-content-between m-3">
                          <button
                            className="w-1/3 h-10 bg-[#181914] text-[white] rounded-xl text-sm"
                            onClick={() => toggleConfirmation(ans)}
                          >
                            ไม่, ย้อนกลับ
                          </button>
                          <button
                            className="w-1/3 h-10 bg-[#AD957B]  rounded-xl text-sm"
                            onClick={() =>confirmation(ans,reservation)}
                          >
                            ใช่, {ans}
                          </button>
                        </div>
                      </div>
                    </div>
                    
                  </>
                )}

                {reservation.status === "accept" && (
                  <>
                    <button
                      className="w-1/2 h-9 bg-[#AD957B] rounded-2xl text-sm"
                      onClick={() => toggleConfirmation("ปฏิเสธ")}
                    >
                      ยกเลิก
                    </button>
                    <button
                      className="w-1/3 h-9 bg-[#4CAF50] rounded-2xl text-sm text-white mr-2"
                      onClick={() => handleSkip(reservation)}
                    >
                      ข้าม
                    </button>
                  </>
                )}
              </div>
            </div>
            </div>
          ))
        ) : (
          <p className="text-white">วัดว่างงาน ก็เหมือนกันการที่หมดใจ</p>
        )}
      </div>
      </div>
    
  );
};

export default Reservationwat;
