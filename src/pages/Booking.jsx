import React from "react";
import "../styles/Booking.css";
import Calendar from "../components/Calendar";
import PaymentOptions from "../components/PaymentOption";
import SlickSaLa from "../components/Slick-SaLa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faCaretDown } from "@fortawesome/free-solid-svg-icons";

// Dummy data for costs
const costData = [
  {
    head: "สิ่งที่วัดเตรียมให้",
    title: "รถแห่เสียงดังๆเผื่อศพตื่นมาเต้น",
    price: 5000,
  },
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
      <div className="flex justify-center mb-10"><Calendar /></div>


      <div className="all-section grid grid-cols-3">
        {/* Left Section */}
        <div className="section1 col-span-2">
          <SelectDate label="วันเริ่มจัดงาน" date="13 พ.ย. 2564" />
          <SelectDate label="จำนวนวันสวด" date="3" suffix="วัน" />
          <SelectDate label="วันเริ่มฌาปณกิจ" date="select" />

          <h2 className="mb-5">ศาลา</h2>
          <SlickSaLa />

          <h3 className="text-white mt-10 ml-[20px] text-[32px] font-bold">กำหนดการสวดอภิธรรมศพ</h3>


          

        </div>

        {/* Right Section */}
        <div className="section2 col-span-1">
          <div className="block justify-end w-full h-auto">
            <h3 className="font-prompt font-bold text-white text-3xl mb-10">
              ค่าใช้จ่ายทั้งหมด
            </h3>

            {/* สิ่งที่วัดเตรียมให้ */}
            <div className="mb-10">
              <div className="font-bold text-white mb-3">
                สิ่งที่วัดเตรียมให้
              </div>
              <div className="grid grid-cols-2 text-white">
                <div className="flex ml-2">
                  - รถแห่เสียงดังๆเผื่อศพตื่นมาเต้น
                </div>
                <div className="flex justify-end">5,000 $</div>
              </div>
            </div>

            {/* สินค้าและบริการ */}
            <div className="mb-10">
              <div className="font-bold text-white mb-3">สินค้าและบริการ</div>

              <div className="grid grid-cols-2 text-white">
                <div className="flex ml-3">-ชุดน้ำอาบศพและเครื่องไหว้ x 1</div>
                <div className="flex justify-end">999 $</div>
              </div>

              <div className="grid grid-cols-2 text-white">
                <div className="flex ml-3"> -ชุดน้ำอาบศพและเครื่องไหว้ x 2</div>
                <div className="flex justify-end">1,998 $</div>
              </div>

              <div className="grid grid-cols-2 text-white">
                <div className="flex ml-3">-ชุดน้ำอาบศพและเครื่องไหว้ x 3</div>
                <div className="flex justify-end">2,997$</div>
              </div>
            </div>

            {/* ศาลา */}
            <div className="mb-10">
              <div className="font-bold text-white mb-3">ศาลา</div>

              <div className="grid grid-cols-2 text-white">
                <div className="flex ml-3">-ศาลาแบบซุปเปอร์ไฮเทค</div>
                <div className="flex justify-end">9,999 $</div>
              </div>
            </div>

            {/* กำหนดการสวดอภิธรรม */}
            <div className="mb-10">
              <div className="font-bold text-white mb-3">
                กำหนดการสวดอภิธรรม
              </div>
              <div className="grid grid-cols-2 text-white">
                <div className="flex ml-3">-วันที่ 17/8/67</div>
                <div className="flex justify-end">4,000 $</div>
              </div>

              <div className="grid grid-cols-2 text-white">
                <div className="flex ml-3">-วันที่ 18/8/67</div>
                <div className="flex justify-end">5,500 $</div>
              </div>

              <div className="grid grid-cols-2 text-white">
                <div className="flex ml-3">-วันที่ 19/8/67</div>
                <div className="flex justify-end">3,500 $</div>
              </div>
            </div>

            <hr />

            {/* Payment Section */}
            <div className="payment-method pt-10 text-2xl font-bold mb-10">
              วิธีการชำระเงิน
            </div>
            <PaymentOptions />

            {/* Total Payment */}
            <div className="grid grid-cols-2 text-white mt-10 mb-10">
              <div className="ml-5">
                <div>ยอดชำระเงินทั้งหมด</div>
                <div className="total font-bold ">{totalCost} $</div>
              </div>
              <div className="confirm-payment text-white align-middle">
                <button type="button">ยืนยันการชำระเงิน</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
