import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Calendar from "react-calendar";
import "../styles/Searchbar.css";
const Searchbar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };
  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  const [showCalendar, setShowCalendar] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const location = useLocation();
  const queries = new URLSearchParams(location.search).get("query");
  const date = new URLSearchParams(location.search).get("date");
  const sdate = new URLSearchParams(location.search).get("startDate");
  const edate = new URLSearchParams(location.search).get("endDate");
  const handleCalendarClick = () => {
    setShowCalendar(!showCalendar);
  };

  useEffect(()=>{
    setQuery(queries)
    setStartDate(sdate)
    setEndDate(edate)
  }, [])


  const handleDateChange = (date, type) => {
    if (type === "start") {
      setStartDate(date);
    } else if (type === "end") {
      setEndDate(date);
    }
    setShowCalendar(false);
  };

  return (
    <div className="searchbar">
      <div className="SearchQuery">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={query ? queries : "ค้นหา ชื่อ หรือ ที่ตั้งของวัด"}
        />
        <img src="../glass.png" alt="Search Icon" />
      </div>
      <div className="Startdate">
        <p>วันที่เริ่ม</p>
        <button
          onClick={() =>
            setShowCalendar(showCalendar === "start" ? false : "start")
          }
        >
          {
            sdate ? 
            new Date(sdate).toLocaleDateString()
            :
            startDate
            ? startDate.toLocaleDateString()
            : "Add dates" ||
              new URLSearchParams(location.search).get("startDate")
            }
        </button>
        {showCalendar === "start" && (
          <div className="calendar-popup">
            <Calendar
              calendarType="gregory"
              onChange={(date) => handleDateChange(date, "start")}
              value={startDate}
            />
          </div>
        )}
      </div>
      <div className="Enddate">
        <p>วันที่จบ</p>
        <button
          onClick={() =>
            setShowCalendar(showCalendar === "end" ? false : "end")
          }
        >
          {edate
            ? new Date(edate).toLocaleDateString()
            : endDate
            ? endDate.toLocaleDateString()
            : "Add dates" || date}
        </button>
        {showCalendar === "end" && (
          <div className="calendar-popup">
            <Calendar
              calendarType="gregory"
              onChange={(date) => handleDateChange(date, "end")}
              value={endDate}
            />
          </div>
        )}
      </div>
      <div className="Searchbutt">
        <Link
          to={`/Result?query=${query}&startDate=${
            startDate ? new Date(startDate).toISOString() : ""
          }&endDate=${endDate ? new Date(endDate).toISOString() : ""}`}
        >
          <button onClick={handleSearch} className="flex items-center justify-center">
            <img src="../glass.png" alt="Search Icon" />
          </button>
        </Link>
      </div>
    </div>
  );
};
export default Searchbar;
