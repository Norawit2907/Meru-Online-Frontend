import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const Watcard = ({ id, image, title, minprice, maxprice, location }) => {
  return (
    <div className="w-full group">
      <Link to={`/watpage1/${id}`}>
        <div className="w-full transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl rounded-xl">
          <div className="relative w-full h-64 rounded-xl overflow-hidden">
            {/* Gradient Overlay with animation */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent 
              opacity-80 group-hover:opacity-90 transition-all duration-300 rounded-xl z-10"
            ></div>

            {/* Image with zoom effect */}
            <img
              src={image}
              alt="img pic."
              className="w-full h-full object-cover rounded-xl 
                transform transition-transform duration-700 group-hover:scale-110"
            />

            {/* Content */}
            <div
              className="absolute bottom-0 left-0 right-0 p-4 z-20
              transform transition-all duration-300 group-hover:translate-y-[-8px]"
            >
              {/* Price Tag - แสดงตลอดเวลา */}
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span
                  className="bg-[#AD957B]/90 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full
                  transform transition-all duration-300 group-hover:bg-[#AD957B] group-hover:shadow-lg"
                >
                  ฿{minprice.toLocaleString()} - {maxprice.toLocaleString()}
                </span>
              </div>

              {/* Title with animated underline */}
              <div className="relative">
                <h3
                  className="text-2xl font-bold text-white line-clamp-1 
                  transform transition-all duration-300 group-hover:text-[#AD957B]"
                >
                  {title}
                </h3>
                <div
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#AD957B] 
                  transition-all duration-300 group-hover:w-full"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Location with icon */}
      <div className="flex items-start gap-2 mt-3 px-4">
        <svg
          className="w-5 h-5 text-[#AD957B] mt-0.5 transform transition-all duration-300 
            group-hover:text-[#8B7355] group-hover:scale-110"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <p
          className="text-[#9A9A9A] text-sm line-clamp-2 
          transform transition-all duration-300 group-hover:text-[#666]"
        >
          {location}
        </p>
      </div>
    </div>
  );
};

export default Watcard;
