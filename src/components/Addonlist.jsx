import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const AddonList = ({ title, addonList }) => {
    console.log("Addon:", addonList);
    return (
        <div className="mb-10 flex flex-col gap-6 px-4 lg:px-0">
            <h1 className="text-white text-[24px] sm:text-[28px] lg:text-[32px]">{title}</h1>
            <div className="flex flex-wrap lg:flex-nowrap gap-6 justify-center lg:justify-start">
                {/* Placeholder card to add new items */}
                {/* <div className="bg-[#484848] w-full sm:w-[300px] lg:w-[358px] flex justify-center items-center h-[200px] sm:h-[300px] lg:h-[342px] rounded-[8px]">
                    <div className="border-[5px] w-fit rounded-full border-[#312F32]">
                        <FontAwesomeIcon icon={faPlus} size="2xl" className="px-5 py-4 text-[#312F32]" />
                    </div>
                </div> */}

                {/* Render the list of addons */}
                {addonList.map((addon, index) => (
                    <div
                        key={index}
                        className="w-full sm:w-[300px] lg:w-[358px] h-[200px] sm:h-[300px] lg:h-[342px] bg-[#292725] rounded-[8px]"
                    >
                        <div
                            className="h-[100px] sm:h-[180px] lg:h-[200px] bg-cover bg-no-repeat rounded-t-[8px] lg:rounded-t-[25px]"
                            style={{ backgroundImage: `url(${addon.image})` }}
                        ></div>
                        <div className="mx-[12px] sm:mx-[15px] lg:mx-[20px] mt-2 h-[100px] sm:h-[100px] lg:h-[110px] lg:pb-4">
                            <h1 className="text-white text-[16px] sm:text-[18px] lg:text-[20px] font-semibold">
                                {addon.name}
                            </h1>
                            <p className="text-[12px] sm:text-[14px] text-[#AD957B] py-1 sm:py-2">
                                {addon.description}
                            </p>
                            <p className="text-[20px] sm:text-[22px] lg:text-[25px] font-[500] text-white">
                                {addon.cost} .-/ชุด
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AddonList;
