import React, { useState } from "react";
import '../styles/PaymentOption.css'

const PaymentOptions = () => {
  const [selectedOption, setSelectedOption] = useState("qr");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="payment-options-container">
      <div className={`payment-option ${selectedOption === "mobile" ? "active" : ""}`}>
        <label className="flex justify-between items-center">
          Mobile Banking
          <input
            type="radio"
            value="mobile"
            checked={selectedOption === "mobile"}
            onChange={handleOptionChange}
          />
        </label>
      </div>

      <div className={`payment-option ${selectedOption === "qr" ? "active" : ""}`}>
        <label className="flex justify-between items-center">
          QR พร้อมเพย์
          <input
            type="radio"
            value="qr"
            checked={selectedOption === "qr"}
            onChange={handleOptionChange}
          />
        </label>
      </div>

      <div className={`payment-option ${selectedOption === "cash" ? "active" : ""}`}>
        <label className="flex justify-between items-center">
          เก็บเงินปลายทาง
          <input
            type="radio"
            value="cash"
            checked={selectedOption === "cash"}
            onChange={handleOptionChange}
          />
        </label>
      </div>
    </div>
  );
};

export default PaymentOptions;
