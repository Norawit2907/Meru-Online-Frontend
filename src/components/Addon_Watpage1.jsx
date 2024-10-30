import React, { useState } from "react";

const AddonWat = ({ title, addonList }) => {
    const [selectedIndexes, setSelectedIndexes] = useState(new Set());

    const toggleSelect = (index) => {
        const newSelected = new Set(selectedIndexes);
        if (newSelected.has(index)) {
            newSelected.delete(index);
        } else {
            newSelected.add(index);
        }
        setSelectedIndexes(newSelected);
    };

    return (
        <div className="mb-10 flex flex-col gap-6">
            <h1 className="text-[#AD957B] text-[32px] font-bold">{title}</h1>
            <div className="flex gap-6">
                {addonList.map((addon, index) => (
                    <div
                        key={index}
                        className={`relative w-[358px] h-[342px] bg-[#292725] rounded-[8px] cursor-pointer transition-all duration-200 ${
                            selectedIndexes.has(index) 
                                ? 'ring-4 ring-[#AD957B] shadow-lg' 
                                : 'hover:scale-[1.01]'
                        }`}
                        onClick={() => toggleSelect(index)}
                    >
                        {/* Checkbox indicator */}
                        <div className={`absolute top-4 right-4 w-6 h-6 rounded border-2 transition-all z-10
                            ${selectedIndexes.has(index) 
                                ? 'border-[#AD957B] bg-[#AD957B]' 
                                : 'border-white bg-transparent'
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
                                    className="w-5 h-5"
                                >
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            )}
                        </div>

                        {/* Card overlay when selected */}
                        {selectedIndexes.has(index) && (
                            <div className="absolute inset-0 bg-black bg-opacity-10 rounded-[8px] transition-all" />
                        )}

                        <div
                            className="h-[225px] bg-cover bg-no-repeat rounded-t-[8px]"
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

export default AddonWat;