import React, { useState } from "react";
import { Section } from "./SectionBooking";
import PaymentPopup from "../PaymentPopup";
import PaymentOptions from "../PaymentOption";
import ErrorMessage from "./ErrorMessage";
import TotalAmount from "./TotalAmount";
import PaymentButton from "./PaymentButton";

const PaymentSection = ({ totalCost, bookingData }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [showError, setShowError] = useState("");

  const validateBookingData = () => {
    if (!bookingData.startDate) return "กรุณาเลือกวันเริ่มจัดงาน";
    if (!bookingData.daysCount) return "กรุณาเลือกจำนวนวันสวด";
    if (!bookingData.cremationDate) return "กรุณาเลือกวันเริ่มฌาปณกิจ";
    if (!selectedPaymentMethod) return "กรุณาเลือกวิธีการชำระเงิน";
    return "";
  };

  const handlePayment = () => {
    const errorMessage = validateBookingData();
    if (errorMessage) {
      setShowError(errorMessage);
      setTimeout(() => setShowError(""), 3000);
      return;
    }
    setShowError("");
    setIsPopupOpen(true);
  };

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
    setShowError("");
  };

  const isPaymentDisabled = () => {
    return !bookingData.startDate || 
           !bookingData.daysCount || 
           !bookingData.cremationDate || 
           !selectedPaymentMethod;
  };

  return (
    <>
      <hr className="my-10 border"/>
      <Section title="วิธีการชำระเงิน">
        <PaymentOptions onSelect={handlePaymentMethodSelect} />
        <ErrorMessage message={showError} />

        <div className="grid grid-cols-2 text-white mt-10 mb-10">
          <TotalAmount amount={totalCost} />
          <PaymentButton 
            onClick={handlePayment}
            disabled={isPaymentDisabled()}
          />
        </div>
      </Section>

      {selectedPaymentMethod && (
        <PaymentPopup 
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          totalCost={totalCost}
          selectedPaymentMethod={selectedPaymentMethod}
        />
      )}
    </>
  );
};

export default PaymentSection;