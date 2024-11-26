import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bell, LogOut, LogIn } from "lucide-react";
import NotificationCard from "./NotificationCard";
import axios from "axios";


const backendUrl = process.env.REACT_APP_BACKEND_URL;


const Navbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [loginState, setLoginState] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [ShowWATnav, setShowWATnav] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  let current_id = sessionStorage.getItem("currentUser_id")
  const watid = sessionStorage.getItem("wat_id")
  const role = sessionStorage.getItem("role")

  
  const fetchNotifications = async () => {
    try {
      if (role === "wat") {
        current_id = watid
      }
      const response = await axios.get(`${backendUrl}/notification/owner/${current_id}`);
      setNotifications(response.data);
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (notificationId) => {
    try {
      const response = await axios.delete(`${backendUrl}/notification/${notificationId}`);
      if (response.data.length >=1) {
        setNotifications(notifications.filter(notification => notification.id !== notificationId));
      }
      console.log(response.data);
    } catch (err) {

      console.error(err.response.data.message);
    }
    fetchNotifications();
  };

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

    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full p-4 flex justify-between items-center z-[9999] bg-[#312F32] 
        ${isScrolled ? 'shadow-lg' : ''}`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center mr-2 font-['Old_Standard_TT'] transition-transform duration-300 hover:scale-105">
          <img src="../logo.png" alt="Logo" className="w-[70px] h-[70px] sm:w-[60px] sm:h-[60px]" />
          <Link 
            to="/" 
            className="text-6xl ml-4 text-white hover:text-[#AD957B] transition-colors duration-300 
              sm:text-4xl sm:ml-2 tracking-wide font-medium whitespace-nowrap"
          >
            Meru-Online
          </Link>
        </div>
        {loginState && ShowWATnav && (
          <div className="hidden md:flex justify-between items-center font-sans text-lg text-white ml-10">
            {["EditWat", "Reservation", "MyWat"].map((item) => (
              <Link key={item} to={item === "MyWat" ? `/Watpage1/${watid}` : `/${item}`} className="ml-8 relative group">
                <span className="hover:text-[#AD957B] transition-colors duration-300">{item === "MyWat" ? "My Wat" : item}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#AD957B] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-[35px] sm:gap-[15px]">
        {loginState && (
          <div className="relative mt-[5px]">
            <button
              className="text-white p-2 rounded-full hover:bg-[#AD957B] transition-colors duration-300"
              onClick={toggleNotifications}
            >
              <Bell className="w-6 h-6" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>

            {showNotifications && (
              <div
                className="absolute right-0 mt-2 w-screen max-w-[95vw] sm:max-w-[90vw] md:max-w-[600px] 
                  lg:max-w-[800px] xl:max-w-[800px] bg-[#1C1C1C] rounded-lg shadow-xl 
                  z-[10000] overflow-hidden transform -translate-x-1/2 left-1/2 
                  md:transform-none md:left-auto"
              >
                <div className="flex text-[20px] sm:text-[16px] text-[#AD957B] bg-[#292725] p-4 font-bold">
                  การแจ้งเตือนของคุณ
                </div>
                <div className="bg-[#1C1C1C] flex flex-col-reverse max-h-[40vh] overflow-y-auto">
                  {notifications.map((notification, index) => (
                    <div
                      key={notification._id}
                      className={`
                        relative 
                        hover:bg-[#2A2A2A] 
                        transition-colors 
                        duration-200
                        ${index < notifications.length - 1 ? "border-b border-[#3A3A3A]" : ""}
                      `}
                    >
                      <NotificationCard
                        description={notification.description}
                        title={notification.title}
                        date={formatDateToThai(notification.updatedAt)}
                        ondel={() => handleDelete(notification._id)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <p className="text-white hidden sm:block">
          {sessionStorage.getItem("currentUser_username")}
        </p>

        <button
          onClick={handlebutton}
          className="flex items-center gap-2 h-[40px] px-[15px] bg-[#AD957B] text-white rounded-[25px] 
              font-['Old_Standard_TT'] hover:bg-[#b2a18f] transition-all duration-300 hover:shadow-lg
              transform hover:scale-105 sm:text-sm sm:px-[10px] sm:h-[35px]"
        >
          {loginState ? (
            <>
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">ออกจากระบบ</span>
            </>
          ) : (
            <>
              <LogIn className="w-4 h-4" />
              <span className="hidden sm:inline">เข้าสู่ระบบ</span>
            </>
          )}
        </button>

        <div className="flex items-center">
          {loginState && sessionStorage.getItem("role") !== "wat" && (
            <Link to="/Profile">
              <button className="relative group p-1 rounded-full overflow-hidden transition-transform duration-300 hover:scale-110">
                <img
                  src={sessionStorage.getItem("currentUser_profileimg") || "/defaultprofile.jpg"}
                  alt="User"
                  className="w-[40px] h-[40px] sm:w-[35px] sm:h-[35px] rounded-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-full" />
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;