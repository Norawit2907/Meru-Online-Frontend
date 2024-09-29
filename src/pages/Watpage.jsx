import React from "react";
import Addon from "../components/Addon";

const addonData = [
    {
      imageUrl: './addon.png',
      title: 'ชุดครอบครัว',
      description: 'เหมาะสำหรับครอบครัวเล็กและใหญ่',
      price: '750 .- /ชุด',
    },
    {
      imageUrl: './addon.png',
      title: 'ชุดงานเลี้ยง',
      description: 'ครบทุกสิ่งสำหรับงานเลี้ยง',
      price: '1,500 .- /ชุด',
    },
    {
      imageUrl: './addon.png',
      title: 'ชุดพรีเมียม',
      description: 'เหมาะสำหรับการใช้งานพิเศษ',
      price: '2,000 .- /ชุด',
    },
    
  ];
  

const Watpage = () => {
    return (
        <div className="mx-4 mt-8 md:mx-[77px] md:mt-[70px]">
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
                            <h1 className="text-[14px] md:text-[18px] font-bold">John wat</h1>
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
                    <h1 className="text-[#AD957B] text-[36px] md:text-[50px] font-bold">วัดดูยูมีน</h1>
                    <p className="text-white text-[16px] md:text-[18px] py-4 indent-6 md:indent-12">
                        Loren Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum<br />
                        has been the industry's standard dummy text ever since the 1500s
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
                        <p className="text-[14px] md:text-[15px]">Phone: 1234567890</p>
                        <p className="text-[14px] md:text-[15px]">Email: company@email.com</p>
                        <p className="text-[14px] md:text-[15px]">Location: 100 Smart Street, LA, USA</p>
                    </div>
                    <div className="flex justify-center">
                        <img src="/socialmedialinks.png" alt="Social Media Links" />
                    </div>
                </div>
            </div>

            {/* wat-calendar-section */}
            <div className="w-[835px] h-[696.25px] bg-[#312F32] rounded-[10px] mb-10">
            </div>

            {/* wat-location-section */}
            <div className="mb-10">
                <div>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1888.3614974760078!2d98.99544928857912!3d18.81049424558505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30da3ac67f9a497d%3A0xab10b4883234a8ff!2z4LiB4Liy4Lij4Lib4Lij4Liw4Lib4Liy4Liq4LmI4Lin4LiZ4Lig4Li54Lih4Li04Lig4Liy4LiE4Liq4Liy4LiC4Liy4LmA4LiK4Li14Lii4LiH4LmD4Lir4Lih4LmIICjguIrguLHguYnguJnguJ7guLTguYDguKjguKkp!5e0!3m2!1sth!2sth!4v1727608768483!5m2!1sth!2sth"
                        width="835"
                        height="250"
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade">
                    </iframe>
                    <div className=" text-white">
                        <h1 className="py-4 text-[18px] ">สถานที่ตั้ง</h1>
                        <p className="text-[16px]">330 ถ.เชียงใหม่-ลำปาง ต.ป่าตัน อ.เมือง<br />รหัสไปรษณีย์ 50300</p>
                    </div>
                </div>
            </div>

            {/* wat-add-on-section */}
            <Addon title={"ศาลาที่มีให้"} addonList={addonData} />
            <Addon title={"บริการระหว่างอภิธรรมศพ"} addonList={addonData}/>
            <Addon title={"สินค้าและบริการ (ลูกค้าเลือกจ่าย)"} addonList={addonData}/>
        </div>

    );
};

export default Watpage;
