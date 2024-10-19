import React, { useState } from "react";

const Calendar = () => {
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

  const renderDays = () => {
    const days = [];
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const totalDays = getDaysInMonth(month, year);

    const firstDayOfMonth = new Date(year, month, 1).getDay();

    for (let emptyDay = 0; emptyDay < firstDayOfMonth; emptyDay++) {
      days.push(<div key={`empty-${emptyDay}`} className="h-16"></div>);
    }

    for (let day = 1; day <= totalDays; day++) {
      days.push(
        <div key={day} className="bg-gray-700 p-4 text-center rounded-lg">
          <p className="font-bold">{day}</p>
          <p>0/2</p>
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
