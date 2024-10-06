import React from "react";
import "../styles/Booking.css";
import Calendar from "../components/Calendar";
import PaymentOptions from "../components/PaymentOption";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faCaretDown,
  faDroplet,
  faDropletSlash,
} from "@fortawesome/free-solid-svg-icons";

const Booking = () => {
  return (
    <div className="booking-container my-16 mx-16 mb-16 ">
      <h1 className="font-prompt font-bold">วัดดูยูมีน</h1>
      <Calendar></Calendar>

      <div className="all-section grid grid-cols-3">
        {/* section left */}
        <div className="section1 col-span-2">
          <div className="start-date grid grid-cols-2 items-center whitespace-nowrap mb-16">
            <h2 className="header-start-date font-prompt text-white font-bold text-2xl">
              วันเริ่มจัดงาน
            </h2>
            <div>
              <div className="pick-date flex justify-between items-center rounded-xl">
                <div className="date text-white">13 พ.ย. 2564</div>
                <div className="calendar-icon text-white">
                  <FontAwesomeIcon icon={faCalendarAlt} />
                </div>
              </div>
            </div>
          </div>
          <div className="pick-day-pray grid grid-cols-3 items-center whitespace-nowrap mb-16">
            <h2 className="header-day-pray font-prompt text-white font-bold text-2xl">
              จำนวนวันสวด
            </h2>
            <div>
              <div className="pick-date flex justify-between items-center rounded-xl">
                <div className="date text-white">3</div>
                <div className="calendar-icon text-white">
                  <FontAwesomeIcon icon={faCaretDown} />
                </div>
              </div>
            </div>
            <h2 className="font-prompt text-white font-bold text-2xl ml-32">
              วัน
            </h2>
          </div>

          <div className="pick-day-cremation grid grid-cols-2 items-center whitespace-nowrap">
            <h2 className="header-day-pray font-prompt text-white font-bold text-2xl">
              วันเริ่มฌาปณกิจ
            </h2>
            <div>
              <div className="pick-date flex justify-between items-center rounded-xl">
                <div className="date text-white">select</div>
                <div className="calendar-icon text-white">
                  <FontAwesomeIcon icon={faCaretDown} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* section right */}
        <div className="section2 col-span-1">
          <div className="block justify-end w-full h-96">
            <div className="font-prompt font-bold text-white text-3xl mb-10">
              ค่าใช้จ่ายทั้งหมด
            </div>

            {/* สิ่งที่วัดเตรียมให้ */}
            <div className="mb-10">
              <div className="font-bold text-white">สิ่งที่วัดเตรียมให้</div>

              <div className="grid grid-cols-2 text-white">
                <div className="flex">- รถแห่เสียงดังๆเผื่อศพตื่นมาเต้น</div>
                <div className="flex">5,000 $</div>
              </div>
            </div>

            {/* สินค้าและบริการ */}
            <div className="mb-10">
              <div className="font-bold text-white">สินค้าและบริการ</div>

              <div className="grid grid-cols-2 text-white">
                <div className="flex">-ชุดน้ำอาบศพและเครื่องไหว้ x 1</div>
                <div className="flex">999 $</div>
              </div>
        
              <div className="grid grid-cols-2 text-white">
                <div className="flex"> -ชุดน้ำอาบศพและเครื่องไหว้ x 2</div>
                <div className="flex">1,998 $</div>
              </div>

              <div className="grid grid-cols-2 text-white">
                <div className="flex">-ชุดน้ำอาบศพและเครื่องไหว้ x 3</div>
                <div className="flex">2,997$</div>
              </div>
            </div>
            
            {/* ศาลา */}
            <div className="mb-10">
              <div className="font-bold text-white">ศาลา</div>

              <div className="grid grid-cols-2 text-white">
                <div className="flex">-ศาลาแบบซุปเปอร์ไฮเทค</div>
                <div className="flex">9,999 $</div>
              </div>
            </div>

            {/* กำหนดการสวดอภิธรรม */}
            <div className="mb-10">
            <div className="font-bold text-white">กำหนดการสวดอภิธรรม</div>
            <div className="grid grid-cols-2 text-white">
                <div className="flex">-วันที่ 17/8/67</div>
                <div className="flex">4,000 $</div>
              </div>
        
              <div className="grid grid-cols-2 text-white">
                <div className="flex">-วันที่ 18/8/67</div>
                <div className="flex">5,500 $</div>
              </div>

              <div className="grid grid-cols-2 text-white">
                <div className="flex">-วันที่ 19/8/67</div>
                <div className="flex">3,500 $</div>
              </div>
            </div>

            <hr />

            {/* วิธีการชำระเงิน */}

            <div className="payment-method pt-10 text-2xl font-bold mb-10">วิธีการชำระเงิน</div>
            <PaymentOptions></PaymentOptions>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
