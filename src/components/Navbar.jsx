import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import NotificationCard from "./์NotificationCard";
import "../styles/Navbar.css";
import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Navbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [loginState, setLoginState] = useState(false)
  const [notifications, setNotifications] = useState([]);
  const [ShowWATnav, setShowWATnav] = useState(false);

  const current_id = sessionStorage.getItem("currentUser_id")
  const wat_id = sessionStorage.getItem("wat_id")

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`${backendUrl}/notification/user/${current_id}`);
      setNotifications(response.data);
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (notificationId) => {
    try {
      const response = await axios.delete(`${backendUrl}/notification/${notificationId}`);
      setNotifications(notifications.filter(notification => notification.id !== notificationId));
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  // const notifications = [
  //   { title: "New Reservation Alert", date: "12 Mar 2021" },
  //   { title: "Connect to your facebook account.", date: "12 Mar 2021" },
  //   { title: "You have rejected the reservation.", date: "12 Mar 2021" },
  //   { title: "John Doe cancelled the reservations.", date: "12 Mar 2021" },
  // ];

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handlebutton = () => {
    if (loginState) {
      sessionStorage.clear();
      setLoginState(false);
      setShowWATnav(false);
      window.location.href = "/"; 
    } else {
      window.location.href = "/login";
    }
  };

  const formatDateToThai = (isoDate) => {
    const date = new Date(isoDate);
    const day = date.getDate();
    const monthNames = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear() + 543;
    return `${day} ${month} ${year}`;
  };

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");
    const role = sessionStorage.getItem("role");
    fetchNotifications();
    if (token) {
      setLoginState(true);
      if (role === "wat") {
        setShowWATnav(true);
      }
    } else {
      setLoginState(false);
      setShowWATnav(false); 
    }

    console.log("Token:", token, "Role:", role);
  }, []);

  return (
    <nav className="navbar flex justify-between items-center p-4 bg-gray-800">
      <div className="Wat logo flex justify-between items-start">
        <div className="logo flex items-center mr-2" style={{ fontFamily: 'Old Standard TT' }}>
          <img src="../logo.png" alt="Logo" className="h-10" />
          <Link to="/" className="text-white text-4xl ml-2 ">
            Meru-Online
          </Link>
        </div>
        {loginState && ShowWATnav && (
          <div className="Wat-button flex justify-between items-center w-200">
            <Link to="/EditWat" className="text-white text-lg ml-10">
              Edit Wat
            </Link>
            <Link to="/" className="text-white text-lg ml-10">
              Reservation
            </Link>
            <Link to={`/Watpage1/${wat_id}`} className="text-white text-lg ml-10">
              My Wat
            </Link>
          </div>
        )}
      </div>

      <div className="nav-buttons flex items-center">
        {loginState ? (
          <div className="Notification-buttons relative">
            <button className="text-white" onClick={toggleNotifications}>
              <FontAwesomeIcon icon={faBell} className="text-2xl" />
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-[1000px] h-auto rounded shadow-lg z-10">
                <div className="flex text-[20px] text-[#AD957B] bg-[#292725] p-4 font-bold rounded-t-lg">
                  All Notifications
                </div>
                <div className="bg-[#1C1C1C] flex flex-col-reverse">
                  {notifications.map((notifications, index) => (
                    <div key={index}>
                      <NotificationCard
                        title={notifications.title}
                        date={formatDateToThai(notifications.updatedAt)}
                        ondel={() => handleDelete(notifications._id)}
                      />
                      {index < notifications.length - 1 && <hr className="mx-4" />}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : null}
        
        <p>{sessionStorage.getItem("currentUser_username")}</p>
        
        <div className="Login-buttons">
          <button onClick={handlebutton} className="text-white bg-blue-500 hover:bg-blue-700 rounded px-4 py-2">
            {loginState ? "logout" : "login"}
          </button>
        </div>
        
        <div className="Profile-buttons">
          {loginState && sessionStorage.getItem("role") !== "wat" ? ( 
            <Link to="/Profile">
              <button className="text-white">
                <img src={sessionStorage.getItem("currentUser_profileimg") ? sessionStorage.getItem("currentUser_profileimg") : "/defaultprofile.jpg" } alt="User" className="h-8" />
              </button>
            </Link>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
