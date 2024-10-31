import React, { useState, useEffect } from "react";
// import Calendar from "../components/Calendar";
import BookingCalendar from "../components/BookingCalendar";
import { Section } from "../components/PaymentBooking/SectionBooking";
import SlickSaLa from "../components/SaLa";
import AddonWat from "../components/Addon_Watpage1";
import Timeline from "../components/TimelineBooking";
import SelectDate from "../components/SelectDateBooking";


import PaymentSection from "../components/PaymentBooking/PaymentSection";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const costData = [
  { head: "สิ่งที่วัดเตรียมให้", title: "รถแห่เสียงดังๆเผื่อศพตื่นมาเต้น", price: 5000 },
  { title: "ชุดน้ำอาบศพและเครื่องไหว้ x 1", price: 999 },
  { title: "ชุดน้ำอาบศพและเครื่องไหว้ x 2", price: 1998 },
  { title: "ชุดน้ำอาบศพและเครื่องไหว้ x 3", price: 2997 },
  { title: "ศาลาแบบซุปเปอร์ไฮเทค", price: 9999 },
  { title: "วันที่ 17/8/67", price: 4000 },
  { title: "วันที่ 18/8/67", price: 5500 },
  { title: "วันที่ 19/8/67", price: 3500 },
];

const addonData = [
  {
    imageUrl: "./addon.png",
    title: "ชุดครอบครัว",
    description: "เหมาะสำหรับครอบครัวเล็กและใหญ่",
    price: "750 .- /ชุด",
  },
  {
    imageUrl: "./addon.png",
    title: "ชุดงานเลี้ยง",
    description: "ครบทุกสิ่งสำหรับงานเลี้ยง",
    price: "1,500 .- /ชุด",
  },
  {
    imageUrl: "./addon.png",
    title: "ชุดพรีเมียม",
    description: "เหมาะสำหรับการใช้งานพิเศษ",
    price: "2,000 .- /ชุด",
  },
];

const Booking = () => {
  const [bookingData, setBookingData] = useState({
    startDate: null,
    daysCount: null,
    cremationDate: null,
  });

 // Mock reservation data
 const mockReservationData = {
  // October 2024
  "2024-10-15": 3,
  "2024-10-16": 3,
  "2024-10-17": 3,
  "2024-10-10": 2,
  "2024-10-11": 1,
  "2024-10-20": 2,
  "2024-10-21": 2,
  "2024-10-25": 1,
  "2024-10-28": 2,
  "2024-10-29": 3,
  "2024-10-30": 3,
  // November 2024
  "2024-11-05": 3,
  "2024-11-06": 3,
  "2024-11-07": 2,
  "2024-11-12": 1,
  "2024-11-15": 3,
  "2024-11-16": 2,
  "2024-11-20": 3,
  "2024-11-25": 1,
  "2024-11-28": 3,
};

const MAX_WORKLOAD = 3;
   // State SelectDate
   const handleDateSelect = (data) => {
    if (data.type === "startDate") {
      setBookingData((prev) => ({
        ...prev,
        startDate: data.value,
        daysCount: null,
        cremationDate: null,
      }));
    } else if (data.type === "days") {
      setBookingData((prev) => ({
        ...prev,
        daysCount: data.value,
        cremationDate: null,
      }));
    } else if (data.type === "cremationDate") {
      setBookingData((prev) => ({
        ...prev,
        cremationDate: data.value,
      }));
    }
  };



  // ฟังก์ชันคำนวณราคารวม
  const calculateTotalCost = () => {
    let total = costData.reduce((sum, item) => sum + item.price, 0);
    return total;
  };

  return (
    <div className="booking-container my-16 mx-16 mb-16">
      <h1 className="font-prompt font-bold text-white text-4xl mb-10">วัดดูยูมีน</h1>

      <div className="flex justify-center mb-10">
        <BookingCalendar 
          reservationData={mockReservationData}
          maxWorkload={MAX_WORKLOAD}
        />
      </div>

      <div className="all-section grid grid-cols-3 gap-8">
        <LeftSection 
          bookingData={bookingData} 
          onDateSelect={handleDateSelect} 
          reservationData={mockReservationData}
          maxWorkload={MAX_WORKLOAD}
        />
        <RightSection 
          totalCost={calculateTotalCost()} 
          bookingData={bookingData} 
        />
      </div>
    </div>
  );
};

const LeftSection = ({ 
  bookingData, 
  onDateSelect, 
  reservationData,
  maxWorkload 
}) => {
  return (
    <div className="section1 col-span-2">
      <SelectDate 
        label="วันเริ่มจัดงาน" 
        onSelect={onDateSelect} 
        startDate={bookingData.startDate}
        reservationData={reservationData}
        maxWorkload={maxWorkload}
      />
      <SelectDate
        label="จำนวนวันสวด"
        suffix="วัน"
        onSelect={onDateSelect}
        startDate={bookingData.startDate}
        daysCount={bookingData.daysCount}
        disabled={!bookingData.startDate}
        reservationData={reservationData}
        maxWorkload={maxWorkload}
      />
      <SelectDate
        label="วันเริ่มฌาปณกิจ"
        onSelect={onDateSelect}
        startDate={bookingData.startDate}
        daysCount={bookingData.daysCount}
        disabled={!bookingData.startDate || !bookingData.daysCount}
        reservationData={reservationData}
        maxWorkload={maxWorkload}
      />

      {/* ส่วนเลือกศาลา */}
      <h2 className="mb-5 font-bold text-[32px] text-white">ศาลา</h2>
      <SlickSaLa />

      {/* ส่วนกำหนดการ */}
      <h3 className="text-white mt-10 ml-[20px] text-[32px] font-bold">กำหนดการสวดอภิธรรมศพ</h3>
      <Timeline />

      {/* ส่วน Addon */}
      <div className="mx-5">
        <AddonWat title={"บริการระหว่างอภิธรรมศพ"} addonList={addonData} />
      </div>
    </div>
  );
};

const RightSection = ({ totalCost, bookingData }) => {
  // รวมราคาทั้งหมด
  const getUpdatedCostData = () => {
    let updatedCosts = [...costData];

    return updatedCosts;
  };

  return (
    <div className="section2 col-span-1">
      <CostDetails costData={getUpdatedCostData()} />
      <PaymentSection totalCost={totalCost} bookingData={bookingData} />
    </div>
  );
};

const CostDetails = ({ costData }) => {
  return (
    <Section title="ค่าใช้จ่ายทั้งหมด">
      <CostItem label="สิ่งที่วัดเตรียมให้" items={costData.slice(0, 1)} />
      <CostItem label="สินค้าและบริการ" items={costData.slice(1, 4)} />
      <CostItem label="ศาลา" items={costData.slice(4, 5)} />
      <CostItem label="กำหนดการสวดอภิธรรม" items={costData.slice(5)} />
    </Section>
  );
};

const CostItem = ({ label, items }) => {
  return (
    <>
      <div className="font-bold text-white mt-5">{label}</div>
      {items.map((item, index) => (
        <div key={index} className="grid grid-cols-2 text-white py-2">
          <div className="flex ml-3">-{item.title}</div>
          <div className="flex justify-end">{item.price.toLocaleString()} บาท</div>
        </div>
      ))}
    </>
  );
};

export default Booking;
