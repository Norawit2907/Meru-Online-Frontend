// BookingCalendar.jsx
import React, { useState } from "react";

const BookingCalendar = ({ reservationData, maxWorkload = 3 }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

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

  const handlePreviousMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  const getDateColor = (works) => {
    if (works === maxWorkload) {
      return "bg-[#AD957B]"; // Fully booked
    } else if (works > 0) {
      return "bg-[#6B5B45]"; // Partially booked
    }
    return "bg-gray-700"; // Available
  };

  const renderDays = () => {
    const days = [];
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const totalDays = getDaysInMonth(month - 1, year);
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay();

    for (let emptyDay = 0; emptyDay < firstDayOfMonth; emptyDay++) {
      days.push(<div key={`empty-${emptyDay}`} className="h-16"></div>);
    }

    for (let day = 1; day <= totalDays; day++) {
      const formattedDay = day.toString().padStart(2, '0');
      const formattedMonth = month.toString().padStart(2, '0');
      const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
      
      const works = reservationData[formattedDate] || 0;
      const colorClass = getDateColor(works);
      
      days.push(
        <div 
          key={day} 
          className={`${colorClass} p-4 text-center rounded-lg transition-colors duration-200 
            ${works === maxWorkload ? 'cursor-not-allowed opacity-75' : 'hover:opacity-80 cursor-pointer'}`}
        >
          <p className="font-bold">{day}</p>
          <p>{works}/{maxWorkload}</p>
        </div>
      );
    }
    return days;
  };

  return (
    <div className="w-full max-w-[600px] mx-0 text-white font-prompt p-10">
      <div className="text-center mb-5 flex items-center justify-between">
        <button 
          onClick={handlePreviousMonth}
          className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200"
        >
          ←
        </button>
        <h2 className="font-bold text-white text-[25px]">
          {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
        </h2>
        <button 
          onClick={handleNextMonth}
          className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200"
        >
          →
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2.5">
        {renderDaysOfWeek()}
        {renderDays()}
      </div>
      <div className="mt-4 text-sm flex justify-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-700 rounded"></div>
          <span>ว่าง</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#6B5B45] rounded"></div>
          <span>จองบางส่วน</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#AD957B] rounded"></div>
          <span>เต็ม</span>
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;