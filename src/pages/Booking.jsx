import React from "react";
import Calendar from "../components/Calendar";
import PaymentOptions from "../components/PaymentOption";
import SlickSaLa from "../components/SaLa";
import AddonWat from "../components/Addon_Watpage1";
import Timeline from "../components/TimelineBooking";

import "../styles/Booking.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faCaretDown } from "@fortawesome/free-solid-svg-icons";

// Dummy data for costs
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

const Booking = () => {
  const totalCost = costData.reduce((total, item) => total + item.price, 0);

  return (
    <div className="booking-container my-16 mx-16 mb-16">
      <h1 className="font-prompt font-bold">วัดดูยูมีน</h1>

      {/* Calendar Component */}
      <div className="flex justify-center mb-10">
        <Calendar />
      </div>

      <div className="all-section grid grid-cols-3">
        {/* Left Section */}
        <LeftSection />

        {/* Right Section */}
        <RightSection totalCost={totalCost} />
      </div>
    </div>
  );
};

const LeftSection = () => {
  return (
    <div className="section1 col-span-2">
      <SelectDate label="วันเริ่มจัดงาน" date="13 พ.ย. 2564" />
      <SelectDate label="จำนวนวันสวด" date="3" suffix="วัน" />
      <SelectDate label="วันเริ่มฌาปณกิจ" date="select" />

      <h2 className="mb-5 font-bold text-[32px]">ศาลา</h2>
      <SlickSaLa/>


      <h3 className="text-white mt-10 ml-[20px] text-[32px] font-bold">
        กำหนดการสวดอภิธรรมศพ
      </h3>

      <Timeline />

      <div className="mx-5">
        <AddonWat title={"บริการระหว่างอภิธรรมศพ"} addonList={addonData} />
      </div>

      
    </div>
  );
};

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
  {
    imageUrl: "./addon.png",
    title: "ชุดพรีเมียม",
    description: "เหมาะสำหรับการใช้งานพิเศษ",
    price: "2,000 .- /ชุด",
  },
];



const RightSection = ({ totalCost }) => {
  return (
    <div className="section2 col-span-1">
      <CostDetails />
      <PaymentSection totalCost={totalCost} />
    </div>
  );
};

const CostDetails = () => {
  return (
    <>
      <Section title="ค่าใช้จ่ายทั้งหมด">
        <CostItem label="สิ่งที่วัดเตรียมให้" items={costData.slice(0, 1)} />
        <CostItem label="สินค้าและบริการ" items={costData.slice(1, 4)} />
        <CostItem label="ศาลา" items={costData.slice(4, 5)} />
        <CostItem label="กำหนดการสวดอภิธรรม" items={costData.slice(5)} />
      </Section>
    </>
  );
};

const PaymentSection = ({ totalCost }) => {
  return (
    <>
      <hr />
      <Section title="วิธีการชำระเงิน">
        <PaymentOptions />
        <div className="grid grid-cols-2 text-white mt-10 mb-10">
          <div className="ml-5">
            <div>ยอดชำระเงินทั้งหมด</div>
            <div className="total font-bold">{totalCost} $</div>
          </div>
          <div className="confirm-payment text-white align-middle">
            <button type="button">ยืนยันการชำระเงิน</button>
          </div>
        </div>
      </Section>
    </>
  );
};

const Section = ({ title, children }) => {
  return (
    <div className="block justify-end w-full h-auto mb-10">
      <h3 className="font-prompt font-bold text-white text-3xl mb-10">{title}</h3>
      {children}
    </div>
  );
};

const CostItem = ({ label, items }) => {
  return (
    <>
      <div className="font-bold text-white mb-3">{label}</div>
      {items.map((item, index) => (
        <div key={index} className="grid grid-cols-2 text-white">
          <div className="flex ml-3">-{item.title}</div>
          <div className="flex justify-end">{item.price} $</div>
        </div>
      ))}
    </>
  );
};

const SelectDate = ({ label, date, suffix = "" }) => {
  return (
    <div className="grid grid-cols-3 items-center whitespace-nowrap mb-16">
      <h2 className="font-prompt text-white font-bold text-2xl">{label}</h2>
      <div className="pick-date flex justify-between items-center rounded-xl">
        <div className="date text-white">{date}</div>
        <div className="calendar-icon text-white">
          <FontAwesomeIcon icon={faCaretDown} />
        </div>
      </div>
      {suffix && (
        <h2 className="font-prompt text-white font-bold text-2xl">{suffix}</h2>
      )}
    </div>
  );
};


export default Booking;
