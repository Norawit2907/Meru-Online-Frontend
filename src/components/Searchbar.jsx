import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Calendar from "react-calendar";
import { Search, Calendar as CalendarIcon } from "lucide-react";

const Searchbar = ({ onSearch, initialQuery, initialDate }) => {
  const [query, setQuery] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const location = useLocation();
  const queries = new URLSearchParams(location.search).get("query");
  const sdate = new URLSearchParams(location.search).get("startDate");
  const edate = new URLSearchParams(location.search).get("endDate");
  const isResultPage = location.pathname === "/Result";

  const startCalendarRef = useRef(null);
  const endCalendarRef = useRef(null);
  const startButtonRef = useRef(null);
  const endButtonRef = useRef(null);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isStartCalendarClick = startCalendarRef.current?.contains(event.target);
      const isEndCalendarClick = endCalendarRef.current?.contains(event.target);
      const isStartButtonClick = startButtonRef.current?.contains(event.target);
      const isEndButtonClick = endButtonRef.current?.contains(event.target);
  
      if (!isStartCalendarClick && !isEndCalendarClick && 
          !isStartButtonClick && !isEndButtonClick) {
        setShowCalendar(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (queries) {
      setQuery(queries);
    }
    if (sdate) {
      setStartDate(new Date(sdate));
    }
    if (edate) {
      setEndDate(new Date(edate));
    }
  }, [queries, sdate, edate]);

  const handleDateChange = (date, type) => {
    if (type === "start") {
      setStartDate(date);
    } else if (type === "end") {
      setEndDate(date);
    }
    setShowCalendar(false);
  };

  // Calculate calendar position classes based on page
  const getCalendarPositionClasses = () => {
    if (isResultPage) {
      return "top-[70px]"; // Show below on Result page
    }
    return "bottom-[70px]"; // Show above on other pages
  };

  return (
    <div className="w-[700px] relative">
      <div 
        className={`h-16 bg-[rgba(49,47,50,0.6)] backdrop-blur-md p-2 px-3 rounded-2xl 
                    flex items-center justify-between gap-8 text-sm ${isResultPage ? 'mb-4' : 'mb-12'} text-[#AD957B] 
                    font-prompt font-bold transition-all duration-300 ease-in-out
                    ${isInputFocused ? 'shadow-lg shadow-[#AD957B]/20' : ''}`}
      >
        <div className={`flex items-center bg-[rgba(128,128,128,0.5)] rounded-[8px] 
                        text-[#AD957B] flex-1 transition-all duration-300 ease-in-out
                        ${isInputFocused ? 'bg-[rgba(128,128,128,0.7)]' : ''}`}>
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            placeholder="ค้นหา ชื่อ หรือ ที่ตั้งของวัด"
            className="flex-1 w-full p-1.5 mr-2 border-none outline-none rounded-2xl 
                     bg-transparent text-white text-base placeholder-[#AD957B]
                     transition-all duration-300"
          />
          <Search className="h-6 w-6 mx-2 opacity-50" />
        </div>

        <div className="relative flex flex-col justify-center items-center">
          <p className="mx-3 flex justify-center items-center text-center">
            วันเริ่มงาน
          </p>
          <button
            ref={startButtonRef}
            onClick={() => setShowCalendar(showCalendar === "start" ? false : "start")}
            className="h-8 mx-3 border-none text-white hover:text-gray-400 cursor-pointer 
                     text-sm flex items-center gap-2 transition-all duration-200"
          >
            <CalendarIcon className="w-4 h-4" />
            {startDate ? startDate.toLocaleDateString() : "เลือกวันที่"}
          </button>
          {showCalendar === "start" && (
            <div 
              ref={startCalendarRef}
              className={`absolute ${getCalendarPositionClasses()} z-[9999] animate-fadeIn`}>
              <div className="bg-[#19181A] border border-[rgba(173,149,123,0.3)] 
                          rounded-2xl shadow-lg p-3 w-[300px]">
                <Calendar
                  calendarType="gregory"
                  onChange={(date) => handleDateChange(date, "start")}
                  value={startDate}
                  className="custom-calendar"
                />
              </div>
            </div>
          )}
        </div>

        <div className="h-8 w-px bg-[rgba(173,149,123,0.3)]"></div>

        <div className="relative flex flex-col justify-center items-center">
          <p className="mx-3 flex justify-center items-center text-center">
            วันจบงาน
          </p>
          <button
            ref={endButtonRef}
            onClick={() => setShowCalendar(showCalendar === "end" ? false : "end")}
            className="h-8 mx-3 border-none text-white hover:text-gray-400 cursor-pointer 
                     text-sm flex items-center gap-2 transition-all duration-200"
          >
            <CalendarIcon className="w-4 h-4" />
            {endDate ? endDate.toLocaleDateString() : "เลือกวันที่"}
          </button>
          {showCalendar === "end" && (
            <div 
              ref={endCalendarRef}
              className={`absolute ${getCalendarPositionClasses()} z-[1000] animate-fadeIn`}>
              <div className="bg-[#19181A] border border-[rgba(173,149,123,0.3)] 
                          rounded-2xl shadow-lg p-3 w-[300px]">
                <Calendar
                  calendarType="gregory"
                  onChange={(date) => handleDateChange(date, "end")}
                  value={endDate}
                  className="custom-calendar"
                />
              </div>
            </div>
          )}
        </div>

        <Link
          to={`/Result?query=${query}&startDate=${
            startDate ? startDate.toISOString() : ""
          }&endDate=${endDate ? endDate.toISOString() : ""}`}
          className="w-11 h-11 rounded-full bg-[#AD957B] hover:bg-[#8C7A63] 
                   flex items-center justify-center transition-all duration-300 
                   hover:scale-105 active:scale-95"
        >
          <button onClick={handleSearch} className="p-2">
            <Search className="h-5 w-5 text-white" />
          </button>
        </Link>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }

        /* Calendar styles remain the same */
        .custom-calendar {
          width: 100%;
          background-color: rgba(25, 24, 26, 1);
          color: white;
          font-family: 'Prompt', sans-serif;
          border: none;
          padding: 8px;
          transition: all 0.3s ease;
        }

        .custom-calendar .react-calendar__navigation {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .custom-calendar .react-calendar__navigation button {
          background: none;
          border: none;
          color: #AD957B;
          font-size: 14px;
          padding: 4px 8px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .custom-calendar .react-calendar__navigation button:hover {
          background-color: rgba(173, 149, 123, 0.2);
          transform: scale(1.05);
        }

        .custom-calendar .react-calendar__navigation button:active {
          transform: scale(0.95);
        }

        .custom-calendar .react-calendar__month-view__weekdays {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          text-align: center;
          font-weight: bold;
          margin-bottom: 4px;
        }

        .custom-calendar .react-calendar__month-view__weekdays__weekday {
          color: #AD957B;
          padding: 4px;
          text-transform: uppercase;
          font-size: 10px;
        }

        .custom-calendar .react-calendar__month-view__days {
          display: grid !important;
          grid-template-columns: repeat(7, 1fr);
          gap: 2px;
        }

        .custom-calendar .react-calendar__tile {
          background: none;
          border: none;
          color: white;
          padding: 6px;
          font-size: 12px;
          cursor: pointer;
          border-radius: 6px;
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .custom-calendar .react-calendar__tile:enabled:hover {
          background-color: rgba(173, 149, 123, 0.2);
          transform: scale(1.1);
        }

        .custom-calendar .react-calendar__tile--active {
          background: #AD957B !important;
          color: white;
          transform: scale(1.1);
        }

        .custom-calendar .react-calendar__tile--now {
          background-color: rgba(173, 149, 123, 0.1);
          font-weight: bold;
        }

        .custom-calendar .react-calendar__month-view__days__day--weekend {
          color: #ff5757;
        }

        .custom-calendar .react-calendar__month-view__days__day--neighboringMonth {
          color: #666;
        }
      `}</style>
    </div>
  );
};

export default Searchbar;