import React from "react";
import Addon from "../components/Addon";
import Calendar from "../components/Calendar";
import { useState } from "react";
import { useEffect } from "react";
import { GetWatAddress } from "../services/address";
import { GetWatData } from "../services/getWatDataById";
import { GetWatAddons } from "../services/getWatAddons";
import { useParams } from "react-router-dom";

const addonData = [
    {
        imageUrl: './addon.png',
        name: 'ชุดครอบครัว',
        description: 'เหมาะสำหรับครอบครัวเล็กและใหญ่',
        cost: '750 .- /ชุด',
    },
    {
        imageUrl: './addon.png',
        name: 'ชุดงานเลี้ยง',
        description: 'ครบทุกสิ่งสำหรับงานเลี้ยง',
        cost: '1,500 .- /ชุด',
    },
    {
        imageUrl: './addon.png',
        name: 'ชุดพรีเมียม',
        description: 'เหมาะสำหรับการใช้งานพิเศษ',
        cost: '2,000 .- /ชุด',
    },

];




const Watpage2 = () => {

    const  wat_id  = useParams().id;
    const [watAddress, setWatAddress] = useState([]);
    const [watAddons, setWatAddons] = useState([]);
    const [filteredAddonsCat1, setFilteredAddonsCat1] = useState([]);
    const [filteredAddonsCat2, setFilteredAddonsCat2] = useState([]);
    const [filteredAddonsCat3, setFilteredAddonsCat3] = useState([]);

    const [watData, setWatData] = useState([]);

    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

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
        const fetchWatAddress = async () => {
            try {
                const result = await GetWatAddress(wat_id);
                setWatAddress(result);
                setLatitude(result.latitude);
                setLongitude(result.longtitude);
                console.log("Fetched Wat Address:", result);
            } catch (error) {
                console.error("Failed to fetch Wat address:", error);
            }
        };
        const fetchWatAddons = async () => {
            try {
                const result = await GetWatAddons(wat_id);
                setWatAddons(result);
                const filtered = result.filter(
                    (addon) => addon.catalog === "ศาลาที่มีให้"
                );
                setFilteredAddonsCat1(filtered);
                const filtered_2 = result.filter(
                    (addon) => addon.catalog === "บริการระหว่างอภิธรรมศพ"
                );
                setFilteredAddonsCat1(filtered);
                const filtered_3 = result.filter(
                    (addon) => addon.catalog === "สินค้าและบริการ (ลูกค้าเลือกจ่าย)"
                );
                setFilteredAddonsCat1(filtered);
                setFilteredAddonsCat2(filtered_2);
                setFilteredAddonsCat3(filtered_3);
                console.log("Fetched Wat Addons:", result);
            } catch (error) {
                console.error("Failed to fetch Wat addons:", error);
            }
        };

        fetchWatAddons();
        fetchWatAddress();
        fetchWatData();
    }, [wat_id]);

  

    return (
        <div className="mx-4 mt-8 md:mx-[77px] md:mt-[70px] overflow-x-hidden">
            {/* wat-picture section */}
            <div className="w-full h-auto md:h-[440px] flex flex-col md:flex-row gap-[20px]">
                <div className="bg-[#C2C6CC] md:w-full lg:w-7/12 h-[300px] md:h-full rounded-[16px] flex items-end">
                    <div className="flex gap-4 md:gap-12 items-center p-4">
                        <img
                            alt=""
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            className="h-[56px] w-[56px] md:h-[76px] md:w-[76px] rounded-full"
                        />
                        <div className="flex flex-col items-start">
                            <p className="text-[10px] md:text-[12px]">by</p>
                            <h1 className="text-[14px] md:text-[18px] font-bold">{watData.admin_name}</h1>
                            <p className="text-[14px] md:text-[16px]">For: $ 1000 - $ 5000</p>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 w-full md:w-auto ">
                    <div className="bg-[#C2C6CC] h-[150px] md:h-auto  lg:w-[270px]  rounded-[16px]"></div>
                    <div className="bg-[#C2C6CC] h-[150px] md:h-auto  rounded-[16px]"></div>
                    <div className="bg-[#C2C6CC] h-[150px] md:h-auto  rounded-[16px]"></div>
                    <div className="bg-[#C2C6CC] h-[150px] md:h-auto  rounded-[16px] relative hover:bg-blend-normal">
                        <div className="absolute top-[35%] left-[25%] opacity-0 hover:opacity-100 transition-opacity duration-300">
                            <button className="flex gap-4 md:gap-6 items-center">
                                <h1 className="text-[32px] md:text-[42px] font-bold">+2</h1>
                                <div className="flex flex-col items-start">
                                    <p className="text-[12px] md:text-[14px] font-semibold">More</p>
                                    <p className="text-[16px] md:text-[18px] font-bold">Photos</p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* wat-info-section */}
            <div className="w-full flex flex-col lg:flex-row justify-between my-[40px]">
                <div className="flex- flex-col mb-8 lg:mb-0">
                    <h1 className="text-[#AD957B] text-[36px] md:text-[50px] font-bold">{watData.name}</h1>
                    <p className="text-white text-[16px] md:text-[18px] py-4 indent-6 md:indent-12">
                        {watData.description}
                    </p>
                    <ul className="text-white text-[16px] md:text-[18px] list-disc list-inside">
                        <li>4 ศาลา</li>
                        <li>2 ศาลาร้อน</li>
                        <li>2 ศาลาเย็น</li>
                    </ul>
                </div>
                <div className="w-full lg:w-[500px] h-[220px] md:h-[266px] bg-[#484848] rounded-[10px] flex flex-col justify-between py-4 px-6 md:px-8">
                    <div className="flex flex-col text-white gap-4 md:gap-5">
                        <h1 className="text-[16px] md:text-[18px] font-bold">CONTACT INFO</h1>
                        <p className="text-[14px] md:text-[15px]">Phone: {watData.phoneNumber}</p>
                        <p className="text-[14px] md:text-[15px]">Facebook: {watData.Facebook}</p>
                        <p className="text-[14px] md:text-[15px]">Location: {watAddress.address}</p>
                    </div>
                    <div className="flex justify-center">
                        <img src="/socialmedialinks.png" alt="Social Media Links" />
                    </div>
                </div>
            </div>

            {/* wat-calendar-section */}
            <div className="w-[835px] h-[696.25px] bg-[#312F32] rounded-[10px] mb-10 flex justify-center items-center">
                <Calendar />
            </div>

            {/* wat-location-section */}
            <div className="mb-10">
                <div>
                    <iframe
                        src={ `https://www.google.com/maps?q=${latitude},${longitude}&z=16&output=embed`} 
                        width="835"
                        height="250"
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade">
                    </iframe>
                    {/* <Google_map latitude={latitude} longtitude={longitude} /> */}
                    
                    <div className=" text-white">
                        <h1 className="py-4 text-[18px] ">สถานที่ตั้ง</h1>
                        <p className="text-[16px]">{watAddress.address}<br />รหัสไปรษณีย์ {watAddress.postalCode}</p>
                    </div>
                </div>
            </div>

            {/* wat-add-on-section */}
            <Addon title={"ศาลาที่มีให้"} addonList={filteredAddonsCat1} />
            <Addon title={"บริการระหว่างอภิธรรมศพ"} addonList={filteredAddonsCat2} />
            <Addon title={"สินค้าและบริการ (ลูกค้าเลือกจ่าย)"} addonList={filteredAddonsCat3} />
        </div>

    );
};

export default Watpage2;
