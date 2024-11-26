import React from "react";

const TotalAmount = ({ amount }) => (
  <div className="ml-5">
    <div>ยอดชำระเงินทั้งหมด</div>
    <div className="total font-bold text-2xl text-[#E9C649]">
      {amount.toLocaleString()} บาท
    </div>
  </div>
);

export default TotalAmount;