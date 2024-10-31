import React, { useState } from 'react';
import { X, Upload, AlertCircle } from 'lucide-react';

const PaymentPopup = ({ isOpen, onClose, totalCost, selectedPaymentMethod }) => {
  const [slipImage, setSlipImage] = useState(null);
//   const [showError, setShowError] = useState(false);

  if (!isOpen) return null;

  const handleSubmitPayment = (e) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      setShowError(true);
      return;
    }
    console.log('Payment submitted with slip:', slipImage);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-[9999]">
      <div className="bg-zinc-800/95 rounded-2xl p-8 max-w-md w-full mx-4 relative shadow-xl border border-white/10">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        {/* Content */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">ยืนยันการชำระเงิน</h2>
          <p className="text-gray-300 mb-2">ยอดชำระทั้งหมด</p>
          <p className="text-3xl font-bold text-[#E9C649] mb-6">{totalCost.toLocaleString()} บาท</p>
        </div>

        <form onSubmit={handleSubmitPayment}>
          {/* Slip Preview */}
          {slipImage && (
            <div className="flex flex-col items-center mb-6">
              <img
                alt="slip preview"
                src={URL.createObjectURL(slipImage)}
                className="w-full max-h-64 object-contain rounded-lg mb-2"
              />
              <button 
                type="button"
                onClick={() => setSlipImage(null)}
                className="text-sm text-gray-400 hover:text-white"
              >
                ลบรูปภาพ
              </button>
            </div>
          )}

          {/* Upload Section */}
          <div className="mb-6">
            <p className="text-white mb-2 flex items-center gap-2">
              <Upload size={18} />
              อัพโหลดสลิปการโอนเงิน
            </p>
            <label 
              htmlFor="slip-input"
              className="block w-full cursor-pointer"
            >
              <input
                type="file"
                id="slip-input"
                accept="image/*"
                onChange={(e) => {
                  setSlipImage(e.target.files[0]);
                  setShowError(false);
                }}
                className="w-full border border-zinc-600 rounded-lg text-sm focus:border-amber-700
                  file:bg-zinc-700 file:border-0
                  file:me-4 file:py-3 file:px-4
                  file:text-white cursor-pointer
                  text-gray-400"
              />
            </label>
          </div>

          {/* Notice */}
          <div className="bg-zinc-700/50 rounded-lg p-4 mb-6 backdrop-blur-sm">
            <p className="text-white text-sm mb-2">หมายเหตุ:</p>
            <ul className="text-gray-300 text-sm list-disc pl-4 space-y-1">
              <li>กรุณาตรวจสอบยอดเงินให้ถูกต้องก่อนชำระเงิน</li>
              <li>กรุณาอัพโหลดสลิปการโอนเงินเพื่อยืนยันการชำระเงิน</li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-xl bg-zinc-700 text-white hover:bg-zinc-600 transition-colors"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              disabled={!slipImage || !selectedPaymentMethod}
              className={`flex-1 px-4 py-3 rounded-xl text-white transition-colors
                ${(slipImage && selectedPaymentMethod)
                  ? 'bg-[#AD957B] hover:bg-[#A38463]' 
                  : 'bg-zinc-600 cursor-not-allowed'}`}
            >
              ยืนยันการชำระเงิน
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentPopup;