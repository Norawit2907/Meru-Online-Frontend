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
import { GetWatData } from "../services/getWatDataById";
import { useParams } from "react-router-dom";
import { GetWatAddons } from "../services/getWatAddons";
import { GetReservesDays } from "../services/getReservationDays";
import { GetSalaDays } from "../services/getSalaDays";

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
  const wat_id = useParams().id;
  const current_id = sessionStorage.getItem("currentUser_id");

  const [watData, setWatData] = useState([]);
  const [pavilionData, setPavilionData] = useState([]);
  const [onSelectPavilion, setonSelectPavilion] = useState(null);
  const [onSelectByDate, setonSelectByDate] = useState([]);
  const [onSelectService, setonSelectService] = useState([]);
  const [reservationDays, setReservationDays] = useState({});
  

  const [allAddons, setAllAddons] = useState([]);
  const filteredSelectByDate = onSelectByDate.filter(item => item !== null);
  // Get pavilion cost safely, default to 0 if undefined or NaN
  const pavilionCost = isNaN(onSelectPavilion?.cost) ? 0 : onSelectPavilion.cost || 0;

  // Calculate total service cost from filteredSelectByDate
  const ByDateCost = filteredSelectByDate
    .map(item => item.service?.cost || 0) // Safely access cost, default to 0
    .reduce((sum, item) => sum + (isNaN(item) ? 0 : item), 0); // Replace NaN with 0 during sum

  // Calculate total service cost from onSelectService
  const ByServiceCost = onSelectService
    .map(item => item.cost || 0) // Safely access cost, default to 0
    .reduce((sum, cost) => sum + (isNaN(cost) ? 0 : cost), 0); // Replace NaN with 0 during sum

  const totalCost = pavilionCost + ByDateCost + ByServiceCost;
  console.log("onSelectPavilion", onSelectPavilion);
  console.log("onSelectByDate", onSelectByDate.filter(item => item !== null));
  console.log("onSelectService", onSelectService);


  console.log("pavilionCost", pavilionCost);
  console.log("ByDateCost", ByDateCost);
  console.log("ByServiceCost", ByServiceCost);
  console.log("start",bookingData.startDate)

  const paymentPayload = {
    wat_id: wat_id,
    user_id: current_id,
    sender: "user",
    reservation_date: bookingData.startDate,
    cremation_date: bookingData.cremationDate,
    duration: bookingData.daysCount,
    status: "pending",
    price: totalCost,
    addons: allAddons,
    pictures: ""
  }

  useEffect(() => {
    // Combine the selected values into allAddons
    const combinedAddons = [onSelectPavilion, ...onSelectService, ...onSelectByDate];
    setAllAddons(combinedAddons);
  }, [onSelectPavilion, onSelectService, onSelectByDate]); // Run effect when these values change
  
  console.log("allAddons", allAddons);

  useEffect(() => {
    const fetchWatData = async () => {
      try {
        const result = await GetWatData(wat_id);
        setWatData(result);
        console.log("Fetched Wat Data:", result);
      } catch (error) {
        console.error("Failed to fetch Wat data:", error);
      }
    };
    const fetchWatAddons = async () => {
      try {
        const result = await GetWatAddons(wat_id);
        const filteredPavilion = result.filter(
          (addon) => addon.catalog === "sala"
        );
        setPavilionData(filteredPavilion);
        console.log("Fetched Wat addons:", result);
      } catch (error) {
        console.error("Failed to fetch Wat addons:", error);
      }
    };
    const fetchWatReservation = async () => {
      try {
        const result = await GetReservesDays(wat_id);
        setReservationDays(result);
        // console.log("Fetched Wat Reservation:", result);
      } catch (error) {
        // console.error("Failed to fetch Reservation:", error);
      }
    };
    
    fetchWatReservation();
    fetchWatData();
    fetchWatAddons();
  }, [wat_id]);

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
      <h1 className="font-prompt font-bold text-white text-4xl mb-10">{watData.name}</h1>

      <div className="flex justify-center mb-10">
        <BookingCalendar />
      </div>

      <div className="all-section grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-1 gap-8">
        <LeftSection
          bookingData={bookingData}
          onDateSelect={handleDateSelect}
          reservationData={reservationDays}
          maxWorkload={watData.max_workload}
          onSelectPavilion={setonSelectPavilion}
          onSelectByDate={setonSelectByDate}
          onSelectService={setonSelectService}
        />
        <RightSection
          totalCost={totalCost}
          bookingData={bookingData}
          pavilionCost={onSelectPavilion}
          dateCost={filteredSelectByDate}
          serviceCost={onSelectService}
          paymentPayload={paymentPayload}
        />
      </div>
    </div>
  );
};

const LeftSection = ({
  bookingData,
  onDateSelect,
  reservationData,
  maxWorkload,
  onSelectPavilion,
  onSelectByDate,
  onSelectService
}) => {
  const wat_id = useParams().id;
  const [pavilionData, setPavilionData] = useState([]);
  const [showpavilionData, setshowPavilionData] = useState([]);
  const [addonsData, setAddonsData] = useState([]);
  const [addonsService, setAddonsService] = useState([]);
  const [salaDays, setSalaDays] = useState({});
  console.log("pav", pavilionData)
  // console.log(salaDays)
  let TilelineData = [];
  if (bookingData.startDate && bookingData.daysCount) {
    const startDate = new Date(bookingData.startDate);

    for (let i = 0; i < bookingData.daysCount; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
      // const formattedDate2 = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
      // console.log(formattedDate2,pavilionData.find((pavilion) => pavilion.name !== salaDays[formattedDate2]));
      // setPavilionData(pavilionData.find((pavilion) => pavilion.name !== salaDays[formattedDate2]));
      // const selectedPavilion = pavilionData.filter(
      //   (pavilion) => pavilion.name !== salaDays[formattedDate2]
      // );
      // setPavilionData(selectedPavilion);
      TilelineData.push(
        {
          date: formattedDate,
          services: addonsData
        }
      )
    }
  }
  useEffect(() => {
    if (bookingData.startDate && bookingData.daysCount) {
      const startDate = new Date(bookingData.startDate);
      console.log(startDate)
      const formattedDate2 = `${startDate.getFullYear()}-${(startDate.getMonth() + 1).toString().padStart(2, '0')}-${(startDate.getDate()).toString().padStart(2, '0')}`;
      const filteredPavilionData = pavilionData.filter((pavilion) => {
        return pavilion.name !== salaDays?.[formattedDate2];
      });
      setshowPavilionData(filteredPavilionData);
    }
  }, [bookingData, salaDays]);
  useEffect(() => {
    const fetchWatAddons = async () => {
      try {
        const result = await GetWatAddons(wat_id);
        const filteredPavilion = result.filter(
          (addon) => addon.catalog === "sala"
        );
        const filteredAddons = result.filter(
          (addon) => addon.catalog === "food"
        );
        const filteredServices = result.filter(
          (addon) => addon.catalog !== "sala" && addon.catalog !== "food"
        );
        setAddonsData(filteredAddons);
        setPavilionData(filteredPavilion);
        setAddonsService(filteredServices);

        console.log("Fetched Wat Addons:", result);
        console.log("Fetched Wat FilteredAddons:", filteredAddons);
      } catch (error) {
        console.error("Failed to fetch Wat addons:", error);
      }
    };
    const fetchWatSalaDays = async () => {
      try {
        const result = await GetSalaDays(wat_id);
        setSalaDays(result);
        // console.log("Fetched Wat Reservation:", result);
      } catch (error) {
        // console.error("Failed to fetch Reservation:", error);
      }
    };
    fetchWatSalaDays();
    fetchWatAddons();
  }, [wat_id]);

  return (
    <div className="section1 col-span-1 xl:col-span-2">
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
      <SlickSaLa pavilion={showpavilionData} onSelect={onSelectPavilion} />

      {/* ส่วนกำหนดการ */}
      <h3 className="text-white mt-10 ml-[20px] text-[32px] font-bold">กำหนดการสวดอภิธรรมศพ</h3>
      <Timeline timelineData={TilelineData} setonSelectByDate={onSelectByDate} />

      {/* ส่วน Addon */}
      <div className="mx-5">
        <AddonWat title={"สินค้าและบริการ"} addonList={addonsService} setonSelectService={onSelectService} />
      </div>
    </div>
  );
};

const RightSection = ({ totalCost, bookingData, pavilionCost, dateCost, serviceCost, paymentPayload }) => {
  // รวมราคาทั้งหมด
  const getUpdatedCostData = () => {
    let updatedCosts = [...costData];

    return updatedCosts;
  };

  return (
    <div className="section2 col-span-1">
      <CostDetails costData={getUpdatedCostData()} pavilionCost={pavilionCost} dateCost={dateCost} serviceCost={serviceCost} />
      <PaymentSection totalCost={totalCost} bookingData={bookingData} paymentPayload={paymentPayload}/>
    </div>
  );
};

const CostDetails = ({ costData, pavilionCost, dateCost, serviceCost }) => {
  console.log("dateCostDetails", dateCost);
  return (
    <Section title="ค่าใช้จ่ายทั้งหมด">
      {/* <CostItem label="สิ่งที่วัดเตรียมให้" items={costData.slice(0, 1)} /> */}
      <CostPavilion label="ศาลา" items={pavilionCost} />
      <CostByDate label="กำหนดการสวดอภิธรรม" items={dateCost} />
      <CostItem label="สินค้าและบริการ" items={serviceCost} />
    </Section>
  );
};

const CostItem = ({ label, items }) => {
  return (
    <>
      <div className="font-bold text-white mt-5 text-lg md:text-xl lg:text-2xl overflow-hidden text-ellipsis whitespace-nowrap">{label}</div>
      {items.map((item, index) => (
        <><div key={index} className="grid grid-cols-2 text-white py-2">
          <div className="flex ml-3 text-xs sm:text-sm md:text-base lg:text-lg overflow-hidden text-ellipsis whitespace-nowrap h-10 md:h-12 lg:h-14 items-center">-{item.name}</div>
          <div className="flex justify-end text-xs sm:text-sm md:text-base lg:text-lg overflow-hidden text-ellipsis whitespace-nowrap h-10 md:h-12 lg:h-14 items-center">{item.cost} บาท</div>
        </div>
        </>
        ))}

    </>
  );
};

const CostByDate = ({ label, items }) => {
  return (
    <>
      <div className="font-bold text-white mt-5">{label}</div>
      {items.map((item, index) => (
        <div key={index} className="grid grid-cols-2 text-white py-2">
          <div className="flex ml-3">-{item.date}</div>
          <div className="flex justify-end">{item.service?.cost} บาท</div>
        </div>
      ))}
    </>
  );
};


const CostPavilion = ({ label, items }) => {
  console.log("CostPavilion", items);
  return (
    <>
      {items ? (
        <>
          <div className="font-bold text-white mt-5">{label}</div>
          <div className="grid grid-cols-2 text-white py-2">
            <div className="flex ml-3">-{items.name}</div>
            <div className="flex justify-end">{items.cost} บาท</div>
          </div>
        </>
      ) : (
        <div className="font-bold text-white mt-5">{label}</div>
      )}
    </>
  );
};

export default Booking;
