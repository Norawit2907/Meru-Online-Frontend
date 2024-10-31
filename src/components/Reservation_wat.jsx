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
  const [user, setUser] = useState({});
  const [userpic, setUserpic] = useState({});
  const [ans, setAns] = useState("This is the answer");
  const curresnt_id = sessionStorage.getItem("currentUser_id");
  // console.log(curresnt_id)

  const segments = [
    { id: 1, label: "ตอนนี้", status: "pending" },
    { id: 2, label: "กำลังมาถึง", status: "accept" },
    { id: 3, label: "ผ่านมาแล้ว", status: "passed" },
    { id: 4, label: "ปฏิเสธแล้ว", status: "reject" },
  ];

  const toggleConfirmation = (answer) => {
    setShowConfirmation(!showConfirmation);
    console.log("มา")
    setAns(answer);
  };

  const confirmation = (answer,reservation) => {
    if (answer == "ปฏิเสธ"){
      handleCancel(reservation);
      toggleConfirmation()
      fetchReservations(wats)
    }
    if (answer== "ยอมรับ"){
      handleSubmit(reservation)
      toggleConfirmation()
      fetchReservations(wats)
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
    const usernamesMap = {};
    const userpicmap = {};
    for (const reservation of reservations) {
      const users = await getUserById(reservation.user_id);
      if (users) {
        usernamesMap[reservation.user_id] = users.firstName;
        userpicmap[reservation.user_id] = users.profile_img;
      }
      console.log(users);
    }
    setUserpic(userpicmap);
    setUser(usernamesMap);
  };

  useEffect(() => {
    fetchwat();
  }, []);

  useEffect(() => {
    fetchReservations(wats);
  }, [wats]);

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

      <div className="flex flex-col overflow-auto max-h-[500px]">
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
                      <p className="text-white">วันณาปนกิจ: </p>
                      <p className="text-[#9A9A9A]">
                        {formatDate(reservation.cremation_date)}
                      </p>
                    </div>
                  </div>
                  {/* <div className="flex gap-1 w-full">
                    <p className="text-white">By:</p>
                    <p className="text-[#9A9A9A]">{user[reservation.user_id] || "Loading..."}</p>
                  </div> */}
                </div>
              </div>

              <div className="flex flex-row-reverse w-[30%] items-center mr-4">
                {reservation.status === "pending" && (
                  <>
                    <button
                      className="w-1/2 h-9 bg-[#312F32] rounded-2xl text-sm text-white "
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
                    <div className="fixed inset-0 bg-black opacity-50 z-[9999] pointer-events-auto"></div>
                    <div className="fixed top-1/2 left-1/2 transform rounded -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[40vh] bg-[#1C1C1C] rounded-lg shadow-xl z-[10000]">
                      <div className="flex items-center justify-center text-[7vh] text-[#AD957B] mt-[2vh]">
                        Are you sure?
                      </div>
                      <div className="flex items-center justify-center text-[20px] sm:text-[16px] text-[#ffffff] p-4 font-bold">
                        คุณต้องการที่จะ
                        <div className="text-[#AD957B] text-[30px]">
                          &nbsp;{ans}&nbsp;
                        </div>
                        การจองหรือไม่?
                      </div>
                      <div className="flex gap-[20vb] ml-[2vb] mr-[2vb]">
                        <button
                          className="w-1/2 h-9 bg-[#312F32] rounded-2xl text-sm text-white "
                          onClick={() => toggleConfirmation(ans)}
                          // onClick={() => handleCancel(reservation)}
                        >
                          กลับ
                        </button>
                        <button
                          className="w-1/2 h-9 bg-[#AD957B] rounded-2xl text-sm mr-2"
                          onClick={() => confirmation(ans,reservation)}
                        >
                          {ans}
                        </button>
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
          ))
        ) : (
          <p className="text-white">วัดว่างงาน ก็เหมือนกันการที่หมดใจ</p>
        )}
      </div>
    </div>
  );
};

export default Reservationwat;
