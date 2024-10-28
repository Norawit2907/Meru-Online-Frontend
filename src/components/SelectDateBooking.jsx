import React, { useState } from "react";
import Calendar from "react-calendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import 'react-calendar/dist/Calendar.css';

const calendarStyles = `
  .react-calendar {
    background: transparent;
    border: none;
  }
  .react-calendar__month-view__days__day {
    background: transparent !important;
  }
  .react-calendar__month-view__days__day:enabled:hover {
    background: rgba(173, 149, 123, 0.5) !important;
  }
  .react-calendar__tile:disabled {
    background: transparent !important;
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background: rgba(173, 149, 123, 0.3);
  }
  .react-calendar__month-view__weekdays {
    color: #AD957B;
  }
  .react-calendar__navigation button {
    color: #AD957B;
  }
  .react-calendar__navigation button:disabled {
    background: transparent;
  }
  .react-calendar__tile--active {
    background: #AD957B !important;
  }
  .react-calendar__tile--active:enabled:hover {
    background: #AD957B !important;
  }
`;

const SelectDate = ({ label, suffix = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDays, setSelectedDays] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const daysOptions = ["1", "3", "5", "7"];

  const isSelectDays = label === "จำนวนวันสวด";
  const isStartDate = label === "วันเริ่มจัดงาน";

  const isDateSelectable = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const thirdDay = new Date(today);
    thirdDay.setDate(today.getDate() + 3);
    
    return date.getTime() === today.getTime() || date.getTime() >= thirdDay.getTime();
  };

  const handleDaySelect = (day) => {
    setSelectedDays(day);
    setIsOpen(false);
  };

  const handleDateChange = (date) => {
    if (isDateSelectable(date)) {
      setSelectedDate(date);
      setShowCalendar(false);
    }
  };

  const getBlockedDates = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(today.getDate() + 2);
    
    return [tomorrow, dayAfterTomorrow];
  };

  const handleDropdownClick = (e) => {
    e.stopPropagation();
    if (isStartDate) {
      setShowCalendar(!showCalendar);
    } else if (isSelectDays) {
      setIsOpen(!isOpen);
    }
  };

  const getDisplayValue = () => {
    if (isSelectDays) {
      return selectedDays || "-";
    }
    if (isStartDate && selectedDate) {
      return selectedDate.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
    return "-";
  };

  return (
    <div className="relative font-prompt">
      <style>{calendarStyles}</style>
      
      <div className="grid grid-cols-3 items-center mb-16 relative">
        <h2 className="text-white font-bold text-2xl">{label}</h2>
        
        <div className="relative">
          <div className="flex justify-between items-center rounded-xl border border-[#AD957B] bg-[#292725] px-4 py-3 shadow-lg hover:border-[#C5AD91] transition-colors duration-200">
            <span className="text-white">
              {getDisplayValue()}
            </span>
            <button
              onClick={handleDropdownClick}
              className="text-[#AD957B] hover:text-[#C5AD91] transition-colors duration-200"
            >
              <FontAwesomeIcon 
                icon={isStartDate ? faCalendarAlt : faCaretDown} 
                className={`w-5 h-5 transform transition-transform duration-200 ${isOpen && !isStartDate ? 'rotate-180' : ''}`}
              />
            </button>
          </div>
          
          {/* Dropdown for days selection */}
          {isSelectDays && isOpen && (
            <div className="absolute top-full mt-2 w-full bg-[#292725] border border-[#AD957B] rounded-xl shadow-lg overflow-hidden z-50">
              {daysOptions.map((day) => (
                <button
                  key={day}
                  onClick={() => handleDaySelect(day)}
                  className="w-full px-4 py-3 text-white hover:bg-[#AD957B] transition-colors duration-200 text-left"
                >
                  {day}
                </button>
              ))}
            </div>
          )}

          {/* Calendar popup */}
          {isStartDate && showCalendar && (
            <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 z-50">
              <div className="bg-[#292725] border border-[#AD957B] rounded-xl p-2 shadow-xl w-[350px]">
                <Calendar
                  calendarType="gregory"
                  onChange={handleDateChange}
                  value={selectedDate}
                  minDate={new Date()}
                  formatMonthYear={(locale, date) => {
                    return date.toLocaleDateString('th-TH', {
                      year: 'numeric',
                      month: 'long'
                    });
                  }}
                  formatDay={(locale, date) => date.getDate()}
                  className="!bg-transparent"
                  tileClassName={({ date, view }) => {
                    const classes = ['transition-all duration-200 rounded-lg hover:bg-[#AD957B]/50'];
                    
                    if (view === 'month') {
                      const isBlocked = getBlockedDates().some(
                        blockedDate => blockedDate.toDateString() === date.toDateString()
                      );
                      
                      if (isBlocked) {
                        classes.push('text-gray-500 cursor-not-allowed opacity-50 line-through');
                      } else {
                        classes.push('text-white');
                      }

                      if (date.getDay() === 0 || date.getDay() === 6) {
                        classes.push(!isBlocked ? 'text-red-300' : 'text-red-900');
                      }
                      
                      if (selectedDate && date.toDateString() === selectedDate.toDateString()) {
                        classes.push('!bg-[#AD957B] hover:!bg-[#AD957B] text-white');
                      }
                      
                      if (date.toDateString() === new Date().toDateString()) {
                        classes.push('bg-[#AD957B]/30');
                      }
                    }
                    
                    return classes.join(' ');
                  }}
                  tileDisabled={({ date }) => !isDateSelectable(date)}
                  navigationLabel={({ date }) => (
                    <span className="text-lg font-prompt text-[#AD957B]">
                      {date.toLocaleDateString('th-TH', { month: 'long', year: 'numeric' })}
                    </span>
                  )}
                />
              </div>
            </div>
          )}
        </div>

        {suffix && (
          <h2 className="text-white font-bold text-2xl pl-4">{suffix}</h2>
        )}
      </div>
    </div>
  );
};

export default SelectDate;