import React from "react";

const Watpage = () => {
    return (
        <div className="mx-[77px] mt-[70px]">
            {/* wat-picture section */}
            <div className=" w-full h-[440px] flex gap-[20px]">
                <div className="bg-[#C2C6CC] w-7/12 h-full rounded-[16px] flex items-end ">
                    <div className="flex gap-12 items-center p-4">
                        <img
                            alt=""
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            className="h-[76px] w-[76px] rounded-full"
                        />
                        <div className="flex flex-col items-start">
                            <p className="text-[12px]">by</p>
                            <h1 className="text-[18px] font-bold">John wat</h1>
                            <p className="text-[16px]">For: $ 1000 - $ 5000</p>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#C2C6CC] w-[270px] rounded-[16px]"></div>
                    <div className="bg-[#C2C6CC] w-[270px] rounded-[16px]"></div>
                    <div className="bg-[#C2C6CC] w-[270px] rounded-[16px]"></div>
                    <div className="bg-[#C2C6CC] w-[270px] rounded-[16px] relative hover:bg-blend-normal">
                        <div className="absolute top-[35%] left-[25%] opacity-0 hover:opacity-100 transition-opacity duration-300">
                            <div className="flex gap-6 items-center">
                                <h1 className="text-[42px] font-bold">+2</h1>
                                <div className="flex flex-col items-start">
                                    <p className="text-[14px] font-semibold">More</p>
                                    <p className="text-[18px] font-bold">Photos</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* wat-info-section */}
            <div className="w-full flex justify-between my-[40px]">
                <div className="flex- flex-col">
                    <h1 className="text-[#AD957B] text-[50px] font-bold ">วัดดูยูมีน</h1>
                    <p className="text-white text-[20px] py-4 indent-12"> Loren Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum<br />
                        has been the industry's standard dummy text ever since the 1500s</p>
                    <ul className="text-white text-[20px] list-disc list-inside">
                        <li>4 ศาลา</li>
                        <li>2 ศาลาร้อน</li>
                        <li>2 ศาลาเย็น</li>
                    </ul>
                </div>
                <div className="w-[500px] h-[266px] bg-[#484848]  rounded-[10px] flex flex-col justify-between py-4 px-8">
                    <div className="flex flex-col text-white  gap-5 ">
                        <h1 className="text-[18px] font-bold ">CONTACT INFO</h1>
                        <p className="text-[15px]">Phone: 1234567890</p>
                        <p className="text-[15px]">Email: company@email.com</p>
                        <p className="text-[15px]">Location: 100 Smart Street, LA, USA</p>
                    </div>
                    <div className="flex justify-center">
                        <img src="/socialmedialinks.png" alt="Social Media Links" />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Watpage;
