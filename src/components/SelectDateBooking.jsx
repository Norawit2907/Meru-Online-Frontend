import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faCaretDown, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import 'react-calendar/dist/Calendar.css';

const calendarStyles = `
  .react-calendar {
    width: 350px;
    background: transparent;
    border: none;
    font-family: 'Prompt', sans-serif;
  }
  .react-calendar__month-view__days__day {
    background: transparent !important;
    color: white;
    font-size: 14px;
  }
  .react-calendar__month-view__days__day:enabled:hover {
    background: rgba(173, 149, 123, 0.5) !important;
  }
  .react-calendar__tile:disabled {
    background: transparent !important;
    color: #666;
    text-decoration: line-through;
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background: rgba(173, 149, 123, 0.3);
  }
  .react-calendar__month-view__weekdays {
    color: #AD957B;
    font-size: 14px;
  }
  .react-calendar__navigation button {
    color: #AD957B;
    font-size: 16px;
  }
  .react-calendar__navigation button:disabled {
    background: transparent;
  }
  .react-calendar__tile--active {
    background: #AD957B !important;
    color: white !important;
  }
  .react-calendar__tile--active:enabled:hover {
    background: #AD957B !important;
  }
  .react-calendar__month-view__days__day--weekend {
    color: #ff8b8b;
  }
  .react-calendar__tile--fully-booked {
    background: rgba(173, 149, 123, 0.3) !important;
    color: #666 !important;
    text-decoration: line-through;
    cursor: not-allowed;
  }
`;

const SelectDateBooking = ({ 
  label, 
  suffix = "", 
  onSelect,
  startDate = null, 
  daysCount = null, 
  disabled = false,
  reservationData,
  maxWorkload
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDays, setSelectedDays] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [error, setError] = useState(""); 
  const daysOptions = ["1", "3", "5", "7"];
  console.log(reservationData);

  // Mock reservation data
  const mockReservationData = {
    "2024-10-15": 3,
    "2024-10-16": 3,
    "2024-10-17": 3,
    "2024-10-10": 2,
    "2024-10-11": 1,
    "2024-10-20": 2,
    "2024-10-21": 2,
    "2024-10-25": 1,
    "2024-10-28": 2,
    "2024-10-29": 3,
    "2024-10-30": 3,
    "2024-11-05": 3,
    "2024-11-06": 3,
    "2024-11-07": 2,
    "2024-11-12": 1,
    "2024-11-15": 3,
    "2024-11-16": 2,
    "2024-11-20": 3,
    "2024-11-25": 1,
    "2024-11-28": 3,
  };

  const MAX_WORKLOAD = 3; // Maximum bookings per day

  const isStartDate = label === "วันเริ่มจัดงาน";
  const isSelectDays = label === "จำนวนวันสวด";
  const isCremationDate = label === "วันเริ่มฌาปณกิจ";

  const isDisabled = () => {
    if (isStartDate) return false;
    if (isSelectDays && !startDate) return true;
    if (isCremationDate && (!startDate || !daysCount)) return true;
    return disabled;
  };

  useEffect(() => {
    if (isStartDate && startDate !== undefined) {
      setSelectedDate(startDate);
    } else if (isSelectDays && daysCount !== undefined) {
      setSelectedDays(daysCount);
    } else if (isCremationDate) {
      setSelectedDate(null);
    }
  }, [startDate, daysCount, isStartDate, isSelectDays, isCremationDate]);

  const isDateFullyBooked = (date) => {
    if(reservationData){
    
    const formattedDate = date.toISOString().split('T')[0]; // Get date in YYYY-MM-DD format
    const bookingsForDate = reservationData[formattedDate]; // Access bookings for that date
    console.log(bookingsForDate, formattedDate);
    // Check if bookings exist for the date and compare with maxWorkload
    return bookingsForDate === maxWorkload;
    }
    else{
      return false;
    }
  };

  const calculateAllowedCremationDates = () => {
    if (!startDate || !daysCount) return null;
    
    const cremationStartDate = new Date(startDate);
    cremationStartDate.setDate(cremationStartDate.getDate() + parseInt(daysCount));
    return cremationStartDate;
  };

  const isDateSelectable = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
  
    // Check if date is fully booked
    if (isDateFullyBooked(date)) {
      console.log("Date is fully booked",date.toISOString().split('T')[0]);
      return false;
    }

    if (isCremationDate) {
      const minCremationDate = calculateAllowedCremationDates();
      if (!minCremationDate) return false;
      return date >= minCremationDate;
    }
    
    return date.getTime() >= tomorrow.getTime();
  };

  const handleDaySelect = (day) => {
    if (isDisabled()) {
      setError(getErrorMessage());
      return;
    }
    setSelectedDays(day);
    setIsOpen(false);
    setError("");
    onSelect?.({ type: 'days', value: day });
  };
  
  const handleDateChange = (date) => {
    if (isDisabled()) {
      setError(getErrorMessage());
      return;
    }

    if (isDateSelectable(date)) {
      setSelectedDate(date);
      setShowCalendar(false);
      setError("");
      onSelect?.({ 
        type: isStartDate ? 'startDate' : 'cremationDate', 
        value: date 
      });
    }
  };

  const handleDropdownClick = (e) => {
    e.stopPropagation();
    if (isDisabled()) {
      setError(getErrorMessage());
      return;
    }

    if (isStartDate || isCremationDate) {
      setShowCalendar(!showCalendar);
    } else if (isSelectDays) {
      setIsOpen(!isOpen);
    }
  };

  const getErrorMessage = () => {
    if (isSelectDays && !startDate) {
      return "กรุณาเลือกวันเริ่มจัดงานก่อน";
    }
    if (isCremationDate) {
      if (!startDate) return "กรุณาเลือกวันเริ่มจัดงานก่อน";
      if (!daysCount) return "กรุณาเลือกจำนวนวันสวดก่อน";
    }
    return "";
  };

  const getDisplayValue = () => {
    if (isDisabled()) return "-";
    
    if (isSelectDays) {
      return selectedDays || "-";
    }
    if ((isStartDate || isCremationDate) && selectedDate) {
      return selectedDate.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
    return "-";
  };

  return (
    <div className="relative font-prompt" onClick={e => e.stopPropagation()}>
      <style>{calendarStyles}</style>
      
      <div className="grid grid-cols-3 items-center mb-16 relative">
        <h2 className="text-white font-bold text-2xl">{label}</h2>
        
        <div className="relative">
          <div 
            className={`flex justify-between items-center rounded-xl border ${
              isDisabled() 
                ? 'border-gray-600 bg-gray-800 cursor-not-allowed' 
                : 'border-[#AD957B] bg-[#292725] hover:border-[#C5AD91] cursor-pointer'
            } px-4 py-3 shadow-lg transition-colors duration-200`}
            onClick={handleDropdownClick}
          >
            <span className={`${isDisabled() ? 'text-gray-500' : 'text-white'}`}>
              {getDisplayValue()}
            </span>
            <span className={isDisabled() ? 'text-gray-600' : 'text-[#AD957B] hover:text-[#C5AD91]'}>
              <FontAwesomeIcon 
                icon={isStartDate || isCremationDate ? faCalendarAlt : faCaretDown} 
                className={`w-5 h-5 transform transition-transform duration-200 ${
                  isOpen && !isStartDate ? 'rotate-180' : ''
                }`}
              />
            </span>
          </div>

          {error && (
            <div className="absolute -bottom-6 left-0 text-red-400 text-sm flex items-center gap-1">
              <FontAwesomeIcon icon={faCircleExclamation} className="w-4 h-4" />
              {error}
            </div>
          )}

          {isSelectDays && isOpen && !isDisabled() && (
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

          {(isStartDate || isCremationDate) && showCalendar && !isDisabled() && (
            <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 z-50">
              <div className="bg-[#292725] border border-[#AD957B] rounded-xl p-2 shadow-xl">
                <Calendar
                  onChange={handleDateChange}
                  value={selectedDate}
                  minDate={isCremationDate ? calculateAllowedCremationDates() : new Date()}
                  calendarType="gregory"
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
                      const isBlocked = !isDateSelectable(date);
                      const isFullyBooked = isDateFullyBooked(date);
                      
                      if (isBlocked || isFullyBooked) {
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

                      if (isFullyBooked) {
                        classes.push('react-calendar__tile--fully-booked');
                      }
                    }
                    
                    return classes.join(' ');
                  }}
                  tileDisabled={({ date }) => !isDateSelectable(date)}
                  navigationLabel={({ date }) => (
                    <span className="text-lg font-prompt text-[#AD957B]">
                      {date.toLocaleDateString('th-TH', { 
                        month: 'long', 
                        year: 'numeric' 
                      })}
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

export default SelectDateBooking;