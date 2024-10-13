import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Addon = ({ title, addonList }) => {
    return (
        <div className="mb-10 flex flex-col gap-6">
            <h1 className="text-white text-[32px]">{title}</h1>
            <div className="flex gap-6">
                {/* Placeholder card to add new items */}
                <div className="bg-[#484848] w-[358px] flex justify-center items-center h-[342px] rounded-[8px]">
                    <div className="border-[5px] w-fit rounded-full border-[#312F32]">
                        <FontAwesomeIcon icon={faPlus} size="2xl" className="px-5 py-4 text-[#312F32]" />
                    </div>
                </div>

                {/* Render the list of addons */}
                {addonList.map((addon, index) => (
                    <div
                        key={index}
                        className="w-[358px]  h-[342px] bg-[#484848] rounded-[8px] "
                    >
                        <div
                            className="h-[225px] bg-cover bg-no-repeat rounded-t-[25px]"
                            style={{ backgroundImage: `url(${addon.imageUrl})` }}
                        ></div>
                        <div className="mx-[20px] mt-2 h-[117px]">
                            <h1 className="text-white text-[20px] font-semibold">
                                {addon.title}
                            </h1>
                            <p className="text-[14px] text-[#AD957B] py-2">
                                {addon.description}
                            </p>
                            <p className="text-[25px] font-[500] text-white">
                                {addon.price}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Addon;
