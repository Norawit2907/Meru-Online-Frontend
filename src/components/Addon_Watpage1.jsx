import React, { useState } from "react";

const AddonWat = ({ title, addonList, setonSelectService }) => {
    const [selectedIndexes, setSelectedIndexes] = useState(new Set());

    const toggleSelect = (index) => {
        const newSelected = new Set(selectedIndexes);
        if (newSelected.has(index)) {
            newSelected.delete(index);
        } else {
            newSelected.add(index);
        }
        setSelectedIndexes(newSelected);
        const updatedServices = Array.from(newSelected).map(i => addonList[i]);
        setonSelectService(updatedServices);
    };

    return (
        <div className="mb-6 md:mb-8 lg:mb-10 flex flex-col gap-4 md:gap-6">
            <h1 className="text-[#AD957B] text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-bold">
                {title}
            </h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {addonList.map((addon, index) => (
                    <div
                        key={index}
                        className={`relative bg-[#292725] rounded-lg cursor-pointer 
                            transform transition-all duration-200 
                            ${selectedIndexes.has(index)
                                ? 'ring-2 md:ring-4 ring-[#AD957B] shadow-lg'
                                : 'hover:scale-[1.02] hover:shadow-xl'
                            }`}
                        onClick={() => toggleSelect(index)}
                    >
                        {/* Checkbox */}
                        <div className={`absolute top-3 md:top-4 right-3 md:right-4 
                            w-5 h-5 md:w-6 md:h-6 rounded 
                            border-2 transition-all z-10
                            ${selectedIndexes.has(index)
                                ? 'border-[#AD957B] bg-[#AD957B]'
                                : 'border-white bg-transparent hover:border-[#AD957B]'
                            }`}
                        >
                            {selectedIndexes.has(index) && (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-4 h-4 md:w-5 md:h-5"
                                >
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            )}
                        </div>

                        {/* Selection Overlay */}
                        {selectedIndexes.has(index) && (
                            <div className="absolute inset-0 bg-black bg-opacity-10 rounded-lg transition-all" />
                        )}

                        {/* Image Container */}
                        <div
                            className="h-[140px] sm:h-[160px] md:h-[180px] bg-cover bg-center bg-no-repeat rounded-t-lg 
                                transform transition-all duration-300 group-hover:scale-105"
                            style={{ backgroundImage: `url(${addon.image})` }}
                        />

                        {/* Content Container */}
                        <div className="p-3 sm:p-4 md:p-5 space-y-2 md:space-y-3">
                            <h1 className="text-white text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] 
                                font-semibold line-clamp-2">
                                {addon.name}
                            </h1>
                            
                            <p className="text-[10px] sm:text-[12px] md:text-[13px] lg:text-[14px] 
                                text-[#AD957B] line-clamp-3">
                                {addon.description}
                            </p>
                            
                            <p className="text-[16px] sm:text-[18px] md:text-[22px] lg:text-[25px] 
                                font-[500] text-white">
                                {addon.cost} .-/ชุด
                            </p>
                        </div>

                        {/* Optional Hover Effects */}
                        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#AD957B] 
                            transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AddonWat;