import React, { useState } from "react";

const PaymentOptions = () => {
  const [selectedOption, setSelectedOption] = useState("qr");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="flex flex-col gap-5">
      <div
        className={`bg-[#312F32] p-5 rounded-lg flex justify-between items-center text-white cursor-pointer ${selectedOption === "mobile" ? "border-2 border-[#AD957B]" : ""}`}
      >
        <label className="flex justify-between items-center w-full">
          Mobile Banking
          <input
            type="radio"
            value="mobile"
            checked={selectedOption === "mobile"}
            onChange={handleOptionChange}
            className="ml-2"
            style={{ accentColor: "#AD957B" }}
          />
        </label>
      </div>

      <div
        className={`bg-[#312F32] p-5 rounded-lg flex justify-between items-center text-white cursor-pointer ${selectedOption === "qr" ? "border-2 border-[#AD957B]" : ""}`}
      >
        <label className="flex justify-between items-center w-full">
          QR พร้อมเพย์
          <input
            type="radio"
            value="qr"
            checked={selectedOption === "qr"}
            onChange={handleOptionChange}
            className="ml-2"
            style={{ accentColor: "#AD957B" }}
          />
        </label>
      </div>

      <div
        className={`bg-[#312F32] p-5 rounded-lg flex justify-between items-center text-white cursor-pointer ${selectedOption === "cash" ? "border-2 border-[#AD957B]" : ""}`}
      >
        <label className="flex justify-between items-center w-full">
          เก็บเงินปลายทาง
          <input
            type="radio"
            value="cash"
            checked={selectedOption === "cash"}
            onChange={handleOptionChange}
            className="ml-2"
            style={{ accentColor: "#AD957B" }}
          />
        </label>
      </div>
    </div>
  );
};

export default PaymentOptions;
