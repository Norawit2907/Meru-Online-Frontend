import React, { useState } from "react";
import { X, Upload, ChevronUp, ChevronDown } from "lucide-react";

const CreateAddonPopup = ({ isOpen, onClose, catalog, setAddonData }) => {
  const [slipImage, setSlipImage] = useState(null);
  const [showError, setShowError] = useState(false);
  const [cost, setCost] = useState(0);

  if (!isOpen) return null;

  const handleSubmitPayment = (e) => {
    e.preventDefault();
    if (!setAddonData) {
      setShowError(true);
      return;
    }
    console.log("Payment submitted with slip:", slipImage);
    onClose();
  };

  // Increment and decrement functions for custom cost controls
  const incrementCost = () => setCost((prev) => Math.max(0, prev + 1));
  const decrementCost = () => setCost((prev) => Math.max(0, prev - 1));

  return (
    <div class="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-[9999] overflow-y-auto ">
      <div
        class="bg-zinc-800/95 rounded-2xl p-8 max-w-md w-full mx-4 relative shadow-xl border border-white/10 max-h-[90vh] overflow-y-auto 
                [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:bg-black/30 
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-black"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <form onSubmit={handleSubmitPayment}>
        {/* Content */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            เพิ่มสินค้าและบริการของคุณ
          </h2>
            <select name="catalog" id="catalog">
                <option value="ศาลาที่มีให้" selected={catalog=="ศาลาที่มีให้" ? "selected": ""} >ศาลาที่มีให้</option>
                <option value="บริการระหว่างอภิธรรมศพ" selected={catalog=="บริการระหว่างอภิธรรมศพ" ? "selected": ""} >บริการระหว่างอภิธรรมศพ</option>
                <option value="สิ่งที่วัดเตรียมให้(ลูกค้าต้องจ่าย)" selected={catalog=="สิ่งที่วัดเตรียมให้(ลูกค้าต้องจ่าย)" ? "selected": ""} >สิ่งของที่วัดเตรียมให้</option>
                <option value="สินค้าและบริการ(ลูกค้าต้องจ่าย)" selected={catalog=="สินค้าและบริการ(ลูกค้าต้องจ่าย)" ? "selected": ""} >สินค้าและบริการ</option>
            </select>
        </div>

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
              อัพโหลดรูปภาพสินค้าหรือบริการ
            </p>
            <label htmlFor="image" className="block w-full cursor-pointer">
              <input
                type="file"
                id="image"
                accept="image/*"
                name="image"
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

            {/* Name Field */}
            <label htmlFor="name" className="text-gray-300 mb-2 block mt-4">
              ชื่อ
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-3 rounded-lg bg-zinc-700 text-white border border-zinc-600
                           focus:border-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-700 transition-colors"
            />

            {/* Cost Field */}
            <label htmlFor="cost" className="text-gray-300 mb-2 block mt-4">
              ราคา
            </label>
            <div className="relative">
              <input
                type="number"
                id="cost"
                name="cost"
                required
                min="0"
                value={cost}
                onChange={(e) => setCost(Math.max(0, e.target.value))}
                class="w-full px-4 py-3 pr-10 rounded-lg bg-zinc-700 text-white border border-zinc-600
                             focus:border-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-700 transition-colors
                             [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" // Removes default arrows in WebKit browsers
              />
              {/* Custom Increment/Decrement Buttons */}
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col">
                <button
                  type="button"
                  onClick={incrementCost}
                  className="text-gray-400 hover:text-white"
                >
                  <ChevronUp size={18} />
                </button>
                <button
                  type="button"
                  onClick={decrementCost}
                  className="text-gray-400 hover:text-white"
                >
                  <ChevronDown size={18} />
                </button>
              </div>
            </div>

            {/* Description Field */}
            <label
              htmlFor="description"
              className="text-gray-300 mb-2 block mt-4"
            >
              คำอธิบาย
            </label>
            <input
              type="text"
              id="description"
              name="description"
              required
              className="w-full px-4 py-3 rounded-lg bg-zinc-700 text-white border border-zinc-600
                           focus:border-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-700 transition-colors"
            />
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
              disabled={!slipImage || !setAddonData}
              className={`flex-1 px-4 py-3 rounded-xl text-white transition-colors
                  ${
                    slipImage && setAddonData
                      ? "bg-[#AD957B] hover:bg-[#A38463]"
                      : "bg-zinc-600 cursor-not-allowed"
                  }`}
            >
              ยืนยันการชำระเงิน
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAddonPopup;
