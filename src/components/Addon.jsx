import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Addon = ({ addon, index, del }) => {
  return (
    <div
      key={index}
      className="w-fit relative bg-[#484848] rounded-[8px] overflow-x-auto"
    >
      <button onClick={()=>{del(addon)}} className="absolute -top-2 -right-2 h-fit w-fit p-1 px-2 bg-white rounded-full">
      <FontAwesomeIcon icon={faXmark} className="text-3xl text-red-500"/>
      </button>
      <div
        className="w-[260px] h-[160px] bg-cover bg-no-repeat rounded-t-[8px] lg:rounded-md"
        style={{ backgroundImage: `url(${addon.image})` }}
      ></div>
      <div className="mx-[16px] mt-1 h-[80px] sm:h-[90px] lg:h-[100px] pb-2">
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
