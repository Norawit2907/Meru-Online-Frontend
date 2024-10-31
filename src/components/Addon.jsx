import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Addon = ({ addon, index }) => {
  return (
    <div
      key={index}
      className="w-full sm:w-[240px] lg:w-[280px] h-[160px] sm:h-[220px] lg:h-[260px] bg-[#484848] rounded-[8px]"
    >
      <div
        className="h-[80px] sm:h-[140px] lg:h-[160px] bg-cover bg-no-repeat rounded-t-[8px] lg:rounded-md"
        style={{ backgroundImage: `url(./addon.png)` }}
      ></div>
      <div className="mx-[10px] sm:mx-[12px] lg:mx-[16px] mt-1 h-[80px] sm:h-[90px] lg:h-[100px] pb-2">
        <h1 className="text-white text-[14px] sm:text-[16px] lg:text-[18px] font-semibold">
          {addon.name}
        </h1>
        <p className="text-[10px] sm:text-[12px] lg:text-[14px] text-[#AD957B] py-1">
          {addon.description}
        </p>
        <p className="text-[16px] sm:text-[18px] lg:text-[20px] font-[500] text-white">
          {addon.cost} .-/ชุด
        </p>
      </div>
    </div>
  );
};

export default Addon;
