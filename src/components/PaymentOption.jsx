import React, { useState } from "react";

const PaymentOptions = ({ onSelect }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionClick = () => {
    const newValue = selectedOption === "qr" ? "" : "qr";
    setSelectedOption(newValue);
    onSelect(newValue); 
  };

  return (
    <div className="flex flex-col gap-5">
      <div
        className={`bg-zinc-800 p-5 rounded-lg flex justify-between items-center text-white cursor-pointer ${
          selectedOption === "qr" ? "border-2 border-[#AD957B]" : ""
        }`}
        onClick={handleOptionClick}
      >
        <div className="w-full">
          QR พร้อมเพย์
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;