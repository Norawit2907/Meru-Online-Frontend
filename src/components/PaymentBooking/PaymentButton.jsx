import React from "react";

const PaymentButton = ({ onClick, disabled }) => (
  <div className="confirm-payment text-white align-middle">
    <button 
      type="button"
      onClick={onClick}
      className={`px-6 py-3 rounded-xl transition-colors duration-200 w-full h-full
        ${!disabled
          ? 'bg-[#AD957B] hover:bg-[#9A846C] cursor-pointer' 
          : 'bg-zinc-600 cursor-not-allowed'}`}
      disabled={disabled}
    >
      ยืนยันการชำระเงิน
    </button>
  </div>
);

export default PaymentButton;