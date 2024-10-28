import React, { useState, useEffect } from "react";
import { GetWatData } from "../services/getWatDataById";
import { GetReservesDays } from "../services/getReservationDays";


const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [watData, setWatData] = useState([]);
  const wat_id = '671fa23fd2a1d6d9478ef334';
  const [reservationDays, setReservationDays] = useState({});




  useEffect(() => {
    const fetchWatData = async () => {
      try {
        const result = await GetWatData(wat_id);
        setWatData(result);
        console.log("Fetched Wat Data:", result);
      } catch (error) {
        console.error("Failed to fetch Wat data:", error);
      }
    };
    const fetchWatReservation = async () => {
      try {
        const result = await GetReservesDays(wat_id);
        setReservationDays(result);
        console.log("Fetched Wat Reservation:", result);
      } catch (error) {
        console.error("Failed to fetch Reservation:", error);
      }
    };
    fetchWatReservation();
    fetchWatData();
  }, [wat_id]);


  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };



  const renderDaysOfWeek = () => {
    const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    return daysOfWeek.map((day, index) => (
      <div key={index} className="font-bold text-center text-[21px]">
        {day}
      </div>
    ));
  };

  console.log(currentDate.getMonth(), currentDate.getFullYear())

  const renderDays = () => {
    const days = [];
    const month = currentDate.getMonth()+1;
    const year = currentDate.getFullYear();
    const totalDays = getDaysInMonth(month, year);
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    for (let emptyDay = 0; emptyDay < firstDayOfMonth; emptyDay++) {
      days.push(<div key={`empty-${emptyDay}`} className="h-16"></div>);
    }

    for (let day = 1; day <= totalDays; day++) {
      const formattedDay = day.toString().padStart(2, '0');
      const formattedMonth = month.toString().padStart(2, '0');
      let works = 0

      const formattedDate = `${year}-${formattedMonth}-${formattedDay}`
      if (reservationDays && formattedDate in reservationDays) {
        works = reservationDays[formattedDate]
      }

      days.push(
        <div key={day} className={`${works == watData.max_workload ? "bg-[#AD957B]":"bg-gray-700"} p-4 text-center rounded-lg`}>
          <p className="font-bold">{day}</p>
          <p>{works}/{watData.max_workload}</p>
        </div>
      );
    }
    return days;
  };




  return (
    <div className="w-full max-w-[600px] mx-0 text-white font-prompt p-10">
      <div className="text-center mb-5">
        <h2 className="font-bold text-white text-[25px]">
          {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
        </h2>
      </div>
      <div className="grid grid-cols-7 gap-2.5">
        {renderDaysOfWeek()}
        {renderDays()}
      </div>
    </div>
  );
};

export default Calendar;
