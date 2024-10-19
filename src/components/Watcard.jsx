import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../styles/Watcard.css";

const Watcard = ({ id, image, title, minprice, maxprice, location }) => {
  return (
    <div>
      <Link to={`/watpage1/${id}`}>
        <button>
          <div className="relative w-full h-128  rounded-xl object-contain ">
            <div className="z-0 absolute inset-0 bg-gradient-to-t from-black to-70% rounded-xl"></div>
            <img
              src={image}
              alt="img pic."
              className="w-full h-full rounded-xl"
            />

            <div className="absolute bottom-0 left-0 p-4 pr-2">
              <p className="text-2xl font-bold text-white line-clamp-1">
                {title}
              </p>
              <p className="text-md  text-white line-clamp-1">
                ${minprice} - {maxprice} บาท.-
              </p>
            </div>
          </div>
        </button>
      </Link>

      <p className="text-[#9A9A9A] text-sm line-clamp-2 mt-2 p-4 pt-1">
        {location}
      </p>
    </div>
  );
};

export default Watcard;
