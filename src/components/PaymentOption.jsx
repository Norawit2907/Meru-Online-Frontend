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
        <label>
          <input
            type="radio"
            value="mobile"
            checked={selectedOption === "mobile"}
            onChange={handleOptionChange}
          />
          Mobile Banking
        </label>
      </div>

      <div className={`payment-option ${selectedOption === "qr" ? "active" : ""}`}>
        <label>
          <input
            type="radio"
            value="qr"
            checked={selectedOption === "qr"}
            onChange={handleOptionChange}
          />
          QR พร้อมเพย์
        </label>
      </div>

      <div className={`payment-option ${selectedOption === "cash" ? "active" : ""}`}>
        <label>
          <input
            type="radio"
            value="cash"
            checked={selectedOption === "cash"}
            onChange={handleOptionChange}
          />
          เก็บเงินปลายทาง
        </label>
      </div>
    </div>
  );
};

export default PaymentOptions;
