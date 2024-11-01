import React from "react";

const Addon = ({ addon, index }) => {
  return (
    <div
      key={index}
      className="relative bg-[#292725] rounded-lg cursor-pointer 
        transform transition-all duration-200 hover:scale-[1.02] hover:shadow-xl"
    >
      {/* Image Container */}
      <div
        className="h-[140px] sm:h-[160px] md:h-[180px] bg-cover bg-center bg-no-repeat rounded-t-lg 
          transform transition-all duration-300"
        style={{ backgroundImage: `url(${addon.image})` }}
      />

      {/* Content Container */}
      <div className="p-3 sm:p-4 md:p-5 space-y-2 md:space-y-3">
        <h1 className="text-white text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] 
          font-semibold line-clamp-2">
          {addon.name}
        </h1>
        
        <p className="text-[10px] sm:text-[12px] md:text-[13px] lg:text-[14px] 
          text-[#AD957B] line-clamp-3">
          {addon.description}
        </p>
        
        <p className="text-[16px] sm:text-[18px] md:text-[22px] lg:text-[25px] 
          font-[500] text-white">
          {addon.cost} .-/ชุด
        </p>
      </div>

      {/* Hover Effect Line */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#AD957B] 
        transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
    </div>
  );
};

export default Addon;