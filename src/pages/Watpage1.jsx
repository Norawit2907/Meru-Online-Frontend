import React from "react";
import Addon from "../components/Addon";
import Calendar from "../components/Calendar";
import AddonWat from "../components/Addon_Watpage1";
import { useState } from "react";
import { useEffect } from "react";
import { GetWatAddress } from "../services/address";
import { GetWatData } from "../services/getWatDataById";
import { GetWatAddons } from "../services/getWatAddons";

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




const Watpage1 = () => {
    const [watData, setWatData] = useState([]);
    // useEffect( () => {
    //   async function getwat(id) {
    //     const result = await GetWatId(id);
    //     setWatData(result)
    //     console.log(watData)
    //   }

    //   getwat("670d4074f2bd50c27ade5db0")
    // },[])

    const wat_id = '671fec855a531995fe412828'
    const [watAddress, setWatAddress] = useState([]);
    const [watAddons, setWatAddons] = useState([]);
    const [filteredAddonsCat1, setFilteredAddonsCat1] = useState([]);
    const [filteredAddonsCat2, setFilteredAddonsCat2] = useState([]);
    const [filteredAddonsCat3, setFilteredAddonsCat3] = useState([]);
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
            <div className="w-full h-auto md:h-[440px] flex flex-col md:flex-row gap-[20px]">
                <div className="bg-[#C2C6CC] md:w-full lg:w-12/12 h-[300px] md:h-full rounded-[16px] flex items-end relative overflow-hidden">
                    <img
                        src={watData.picture}
                        alt="Wat Image" 
                        className="w-full h-full object-cover rounded-[16px]"
                    />
                    <div className="flex gap-4 md:gap-12 items-center p-4 absolute bottom-0 left-0 z-10">
                        <img
                            alt=""
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            className="h-[56px] w-[56px] md:h-[76px] md:w-[76px] rounded-full"
                        />
                        <div className="flex flex-col items-start">
                            <p className="text-[10px] md:text-[12px]">by</p>
                            <h1 className="text-[14px] md:text-[18px] font-bold">{watData.admin_name}</h1>
                            <p className="text-[14px] md:text-[16px]">For: ${watData.min_cost} - ${watData.max_cost}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full flex flex-col lg:flex-row justify-between my-[40px]">
                <div className="left w-full lg:w-3/5">
                    {/* wat-info-section */}
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


                    {/* wat-calendar-section */}
                    <div className="w-[675px] h-[696.25px] bg-[#1C1C1C] rounded-[10px] mb-10 flex justify-center items-center">
                        <Calendar />
                    </div>

                    {/* wat-location-section */}
                    <div className="w-[835px] mb-10" >
                        <div>
                            <iframe
                                src={ `https://www.google.com/maps?q=${latitude},${longitude}&z=16&output=embed`} 
                                width="675"
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
                <div className="right w-full lg:w-2/5 flex flex-col items-center gap-4">         
                <div className="w-full lg:w-[375px] h-[220px] md:h-[266px] bg-[#292725] rounded-[10px] flex flex-col justify-between py-4 px-6 md:px-8">
                    <div className="flex flex-col text-white gap-4 md:gap-5">
                        <p className="text-[16px] md:text-[18px] font-bold">CONTACT INFO</p>
                        <p className="text-[14px] md:text-[15px]">Phone: {watData.phoneNumber}</p>
                        <p className="text-[14px] md:text-[15px]">Facebook: {watData.Facebook}</p>
                        <p className="text-[14px] md:text-[15px]">Location: {watAddress.address}</p>
                    </div>
                    <div className="flex justify-center">
                        <img src="/socialmedialinks.png" alt="Social Media Links" />
                    </div>
                </div>

                <div className="w-full lg:w-[375px] h-[220px] md:h-[266px] bg-[#292725] rounded-[10px] flex flex-col justify-between py-4 px-6 md:px-8">
                    <div className="flex flex-col text-white gap-4 md:gap-5">
                        <p className="text-[16px] md:text-[18px] font-bold">${watData.min_cost} - ${watData.max_cost}</p>
                        <p className="text-[14px] md:text-[15px]">Short Period: $ 1000 </p>
                        <p className="text-[14px] md:text-[15px]">Medium Period: $ 2000</p>
                        <p className="text-[14px] md:text-[15px]">Long Period: $ 2000</p>
                    </div>
                    <button className="bg-[#AD957B] text-white text-[16px] md:text-[18px] font-bold rounded-[20px] py-2">
                        Book Now
                    </button>
                </div>
            </div>

            </div>
        </div>
        
    );
};

export default Watpage1;
