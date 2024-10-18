import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import NotificationCard from "./์NotificationCard";
import "../styles/Navbar.css";

const Navbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [loginState, setLoginState] = useState(false)

  const notifications = [
    { title: "New Reservation Alert", date: "12 Mar 2021" },
    { title: "Connect to your facebook account.", date: "12 Mar 2021" },
    { title: "You have rejected the reservation.", date: "12 Mar 2021" },
    { title: "John Doe cancelled the reservations.", date: "12 Mar 2021" },
  ];

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handlebutton = () => {
    if(loginState == true){
      sessionStorage.clear()
      setLoginState(false)
    }
    else{
      window.location.href = "/login"
    }
  }

  useEffect(()=>{
    const token = sessionStorage.getItem("access_token")
    if(token){
      setLoginState(true)
    }
    else{
      setLoginState(false)
    }
    console.log(token);
  }, [])

  return (
    <nav className="navbar flex justify-between items-center p-4 bg-gray-800">
      <div className="logo flex items-center">
        <img src="../logo.png" alt="Logo" className="h-10" />
        <Link to="/" className="text-white text-lg ml-2">
          Meru-Online
        </Link>
      </div>
      
      <div className="nav-buttons flex items-center">
        {
            loginState ?
          <div className="Notification-buttons relative">
            <button className="text-white" onClick={toggleNotifications}>
              <FontAwesomeIcon icon={faBell} className="text-2xl" />
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-[1000px] h-auto rounded shadow-lg z-10">
                <div className="flex text-[20px] text-[#AD957B] bg-[#292725] p-4 font-bold rounded-t-lg">
                  All Notifications
                </div>
                <div className="bg-[#1C1C1C]">
                  {notifications.map((notification, index) => (
                    <div key={index}>
                      <NotificationCard
                        title={notification.title}
                        date={notification.date}
                      />

                      {index < notifications.length - 1 && (
                        <hr className="mx-4" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          :
          null
        }
        <p>{sessionStorage.getItem("currentUser_username")}</p>
        <div className="Login-buttons">
            <button onClick={handlebutton} className="text-white bg-blue-500 hover:bg-blue-700 rounded px-4 py-2">
              {loginState ? 
                "logout"
              :
                "login"
              }
            </button>
        </div>
        
        <div className="Profile-buttons">
          {
            loginState ?
            <Link to="/Profile">
              <button className="text-white">
                <img src={sessionStorage.getItem("currentUser_profileimg")} alt="User" className="h-8" />
              </button>
            </Link>
            :
            null
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
