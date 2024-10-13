import React, { useState } from "react";
import '../styles/Calendar.css'

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const renderDays = () => {
    const days = [];
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const totalDays = getDaysInMonth(month, year);

    for (let day = 1; day <= totalDays; day++) {
      days.push(
        <div key={day} className="day">
          {day}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="calendar-container text-white font-prompt p-10">
      <div className="calendar-header">
        <h2>{currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}</h2>
      </div>
      <div className="calendar-grid">
        {renderDays()}
      </div>
    </div>
  );
};

export default Calendar;
