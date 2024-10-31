import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const Watcard = ({ id, image, title, minprice, maxprice, location }) => {
  return (
    <div className="w-full">
      <Link to={`/watpage1/${id}`}>
        <button className="w-full">
          <div className="relative w-full h-64 rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black to-70% rounded-xl z-10"></div>
            <img src={image} alt="img pic." className="w-full h-full object-cover rounded-xl" />
            <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
              <p className="text-2xl font-bold text-white line-clamp-1">{title}</p>
              <p className="text-md text-white line-clamp-1">
                ${minprice.toLocaleString()} - {maxprice.toLocaleString()} บาท.-
              </p>
            </div>
          </div>
        </button>
      </Link>

      <p className="text-[#9A9A9A] text-sm line-clamp-2 mt-2 p-4 pt-1">{location}</p>
    </div>
  );
};

export default Watcard;
