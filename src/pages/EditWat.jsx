import React from "react";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import Addon from "../components/Addon";

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

const EditWat = () => {
    return (
        <div className="mx-4 mt-8 md:mx-[77px] md:mt-[70px] overflow-x-hidden">
            <h1 className="text-[#AD957B] text-[30px] md:text-[50px] font-semibold">
                แก้ไขรายละเอียด
            </h1>
            <div className="mx-4 mt-8 flex flex-col gap-12">
                {/* wat-info */}
                <div>
                    <h1 className="text-white text-[24px] md:text-[30px] pb-8 md:pb-12">
                        1.ข้อมูลของวัด
                    </h1>
                    <div className="flex flex-col md:flex-row  pb-16 md:pb-[8rem]">
                        <p className="text-white text-[16px] md:text-[20px] md:pr-[11.2rem] mb-4 md:mb-0">
                            ชื่อของวัด
                        </p>
                        <input
                            className="w-full md:w-[700px] bg-[#484848] placeholder:text-[#AD957B] text-[#AD957B] outline-none rounded-[12px] py-2 px-4"
                            placeholder="ชื่อวัด"
                        ></input>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-8 md:gap-12 pb-16 md:pb-[8rem]">
                        <p className="text-white text-[16px] md:text-[20px] md:pr-[10.5rem] lg:pr-[7.5rem] mb-4 md:mb-0">
                            ที่อยู่ของวัด
                        </p>
                        <div className="lg:flex-col">
                            <div className="flex flex-col gap-6 md:flex-row">
                                <InputField label="เลขที่" id="number" />
                                <InputField label="ถนน" id="street" />
                                <InputField label="ตรอก/ซอย" id="alley" />
                            </div>
                            <div className="flex flex-col gap-6 md:flex-row">
                                <SelectField
                                    label="จังหวัด"
                                    id="location"
                                    name="location"
                                    defaultValue="Canada"
                                    options={["United States", "Canada", "Mexico"]}
                                />
                                <SelectField
                                    label="อำเภอ/เขต"
                                    id="location"
                                    name="location"
                                    defaultValue="Canada"
                                    options={["United States", "Canada", "Mexico"]}
                                />
                                <SelectField
                                    label="ตำบล/แขวง"
                                    id="location"
                                    name="location"
                                    defaultValue="Canada"
                                    options={["United States", "Canada", "Mexico"]}
                                />
                                <InputField label="รหัสไปรษณีย์" id="alley" />
                            </div>
                        </div>

                    </div>
                    <div className="flex flex-col md:flex-row">
                        <p className="text-white text-[16px] md:text-[20px] md:pr-[6.5rem] mb-4 md:mb-0">
                            ระบุตำแหน่งของวัด
                        </p>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1888.3614974760078!2d98.99544928857912!3d18.81049424558505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30da3ac67f9a497d%3A0xab10b4883234a8ff!2z4LiB4Liy4Lij4Lib4Lij4Liw4Lib4Liy4Liq4LmI4Lin4LiZ4Lig4Li54Lih4Li04Lig4Liy4LiE4Liq4Liy4LiC4Liy4LmA4LiK4Li14Lii4LiH4LmD4Lir4Lih4LmIICjguIrguLHguYnguJnguJ7guLTguYDguKjguKkp!5e0!3m2!1sth!2sth!4v1727608768483!5m2!1sth!2sth"
                            className="w-full h-64 md:w-[950px] md:h-[638px]"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>

                {/* wat-image */}
                <div className="flex flex-col md:flex-row">
                    <h1 className="text-white text-[24px] md:text-[30px] pb-8 md:pb-12 md:pr-[9.2rem]">
                        2.รูปภาพ
                    </h1>
                    <div className="flex items-center justify-center w-full md:w-[956px]">
                        <label
                            htmlFor="dropzone-file"
                            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-[#484848] dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-[#383838] dark:border-gray-600 dark:hover:border-gray-500"
                        >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg
                                    className="w-8 h-8 mb-4 text-[#AD957B] dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 16"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                    />
                                </svg>
                                <p className="mb-2 text-sm text-[#AD957B] dark:text-gray-400">
                                    ลากรูปภาพมาวางบริเวณนี้เพื่ออัพโหลด
                                </p>
                                <p className="text-xs text-[#AD957B] dark:text-gray-400">
                                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                                </p>
                            </div>
                            <input id="dropzone-file" type="file" className="hidden" />
                        </label>
                    </div>
                </div>

                {/* Remaining sections like wat-contact, wat-description, and wat-price can be similarly adjusted for responsiveness */}

                {/* wat-contact */}
                <div>
                    <h1 className="text-white text-[24px] md:text-[30px] pb-8 md:pb-12">
                        3.ข้อมูลสำหรับติดต่อ
                    </h1>
                    <div className="flex flex-col">
                        <div className="flex flex-col md:flex-row  pb-14 md:pb-[4rem]">
                            <p className="text-white text-[16px] md:text-[20px] md:pr-[11.2rem] mb-4 md:mb-0">
                                ชื่อผู้ดูแล
                            </p>
                            <input
                                className="w-full md:w-[700px] bg-[#484848] placeholder:text-[#AD957B] text-[#AD957B] outline-none rounded-[12px] py-2 px-4"
                                placeholder="ชื่อผู้ดูแล"
                            ></input>
                        </div>
                        <div className="flex flex-col md:flex-row  pb-14 md:pb-[4rem]">
                            <p className="text-white text-[16px] md:text-[20px] md:pr-[8.2rem] mb-4 md:mb-0">
                                เบอร์โทรติดต่อ
                            </p>
                            <input
                                className="w-full md:w-[700px] bg-[#484848] placeholder:text-[#AD957B] text-[#AD957B] outline-none rounded-[12px] py-2 px-4"
                                placeholder="เบอร์โทรติดต่อ"
                            ></input>
                        </div>
                        <div className="flex flex-col md:flex-row  pb-14 md:pb-[4rem]">
                            <p className="text-white text-[16px] md:text-[20px] md:pr-[11.8rem] mb-4 md:mb-0">
                                Line ID
                            </p>
                            <input
                                className="w-full md:w-[700px] bg-[#484848] placeholder:text-[#AD957B] text-[#AD957B] outline-none rounded-[12px] py-2 px-4"
                                placeholder="Line ID"
                            ></input>
                        </div>
                        <div className="flex flex-col md:flex-row  pb-14 md:pb-[4rem]">
                            <p className="text-white text-[16px] md:text-[20px] md:pr-[10.1rem] mb-4 md:mb-0">
                                Facebook
                            </p>
                            <input
                                className="w-full md:w-[700px] bg-[#484848] placeholder:text-[#AD957B] text-[#AD957B] outline-none rounded-[12px] py-2 px-4"
                                placeholder="Facebook"
                            ></input>
                        </div>
                    </div>

                </div>

                {/* wat-description */}
                <div>
                    <h1 className="text-white text-[24px] sm:text-[30px] pb-6 sm:pb-12">
                        4.รายละเอียดเพิ่มเติม
                    </h1>
                    <div className="flex flex-col sm:flex-row pb-10">
                        <p className="text-white text-[18px] sm:text-[20px] pb-4 sm:pb-0 sm:pr-[7rem]">
                            รายละเอียดของวัด
                        </p>
                        <input
                            className="w-full sm:w-[700px] h-[150px] sm:h-[200px] bg-[#484848] placeholder:text-[#AD957B] text-[#AD957B] outline-none rounded-[12px] px-4 pb-[5rem] sm:pb-[9rem]"
                            placeholder="รายละเอียดของวัด"
                        />
                    </div>
                    <div className="relative flex flex-col sm:flex-row pb-10  gap-4 sm:gap-0">
                        <p className="text-white text-[18px] sm:text-[20px] sm:pr-[3rem]">
                            ใน 1 วันสามารถรับได้กี่งาน
                        </p>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                id="decrement-button"
                                data-input-counter-decrement="counter-input"
                                className="flex-shrink-0 bg-[#484848] dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-[#383838] inline-flex items-center justify-center rounded-xl h-6 w-6 sm:h-5 sm:w-5 focus:ring-gray-100"
                            >
                                <svg
                                    className="w-3 h-3 sm:w-2.5 sm:h-2.5 text-[#AD957B] dark:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 18 2"
                                >
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M1 1h16"
                                    />
                                </svg>
                            </button>
                            <input
                                type="text"
                                id="counter-input"
                                data-input-counter
                                className="flex-shrink-0 text-[#AD957B] dark:text-white border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[3rem] sm:max-w-[2.5rem] text-center"
                                placeholder=""
                                value="12"
                                required
                            />
                            <button
                                type="button"
                                id="increment-button"
                                data-input-counter-increment="counter-input"
                                className="flex-shrink-0 bg-[#484848] dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-[#383838] inline-flex items-center justify-center rounded-xl h-6 w-6 sm:h-5 sm:w-5 focus:ring-gray-100"
                            >
                                <svg
                                    className="w-3 h-3 sm:w-2.5 sm:h-2.5 text-[#AD957B] dark:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 18 18"
                                >
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M9 1v16M1 9h16"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-white text-[30px] pb-10">
                            5.ค่าใช้จ่าย
                        </h1>
                        <Addon title={"สิ่งของที่วัดเตรียมให้ (ลูกค้าต้องจ่าย)"} addonList={addonData} />
                        <Addon title={"ศาลาที่มีให้"} addonList={addonData} />
                        <Addon title={"บริการระหว่างอภิธรรมศพ"} addonList={addonData} />
                        <Addon title={"สินค้าและบริการ (ลูกค้าเลือกจ่าย)"} addonList={addonData} />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default EditWat;
