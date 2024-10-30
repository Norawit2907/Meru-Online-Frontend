import React, { useState, useRef } from "react";

const costData = [
  {
    title: "ชุดครบเซ็ต",
    description: "เหมาะสำหรับครอบครัวเล็ก",
    price: 6140,
    imageUrl:
      "https://www.watpho.com/public/images/content/content_30722-12-2018%2014_23_06.jpg",
  },
  {
    title: "ชุดครบเซ็ต",
    description: "เหมาะสำหรับครอบครัวเล็ก",
    price: 7850,
    imageUrl:
      "https://www.watpho.com/public/images/content/content_30421-12-2018%2021_13_22.jpg",
  },
  {
    title: "ชุดครบเซ็ต",
    description: "เหมาะสำหรับครอบครัวเล็ก",
    price: 750,
    imageUrl:
      "https://www.พวงหรีดธรรมะ.com/wp-content/uploads/2020/10/%E0%B8%94%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2%E0%B8%A8%E0%B8%B2%E0%B8%A5%E0%B8%B2-%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B9%83%E0%B8%99%E0%B8%AA%E0%B8%AD%E0%B8%87%E0%B8%A7%E0%B8%B4%E0%B8%AB%E0%B8%B2%E0%B8%A3-%E0%B9%82%E0%B8%94%E0%B8%A2%E0%B8%A3%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B8%9E%E0%B8%A7%E0%B8%87%E0%B8%AB%E0%B8%A3%E0%B8%B5%E0%B8%94%E0%B8%98%E0%B8%A3%E0%B8%A3%E0%B8%A1%E0%B8%B0.jpg",
  },
  {
    title: "ชุดครบเซ็ต",
    description: "เหมาะสำหรับครอบครัวเล็ก",
    price: 850,
    imageUrl:
      "https://www.muangboranmuseum.com/wp-content/uploads/2018/12/central-47.jpg",
  },
  {
    title: "ชุดครบเซ็ต",
    description: "เหมาะสำหรับครอบครัวเล็ก",
    price: 850,
    imageUrl:
      "https://oliviath.com/wp-content/uploads/2024/02/%E0%B9%81%E0%B8%9A%E0%B8%9A%E0%B8%A8%E0%B8%B2%E0%B8%A5%E0%B8%B2%E0%B8%A7%E0%B8%B1%E0%B8%94-%E0%B8%AA%E0%B8%A7%E0%B8%A2%E0%B9%86.jpg",
  },
];

const SlickSaLa = () => {
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(null);
  const [currentGroup, setCurrentGroup] = useState(0);
  const scrollContainerRef = useRef(null);

  const totalGroups = Math.ceil(costData.length / 4);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -1000 : 1000; // 250 * 3
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
      
      if (direction === 'left' && currentGroup > 0) {
        setCurrentGroup(prev => prev - 1);
      } else if (direction === 'right' && currentGroup < totalGroups - 1) {
        setCurrentGroup(prev => prev + 1);
      }
    }
  };

  return (
    <div className="flex flex-col w-full items-center">
      {/* Cards Container */}
      <div className="w-full max-w-[1000px] overflow-hidden px-1">
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide gap-2 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {costData.map((item, index) => (
            <div key={index} className="flex-none">
              <div 
                className={`w-[240px] bg-[#292725] rounded-lg cursor-pointer transition-all duration-200 scale-95 hover:scale-[0.97] ${
                  selectedServiceIndex === index 
                    ? 'ring-4 ring-[#AD957B] shadow-lg' 
                    : ''
                }`}
                onClick={() => setSelectedServiceIndex(index)}
              >
                <div className="relative w-full h-[120px]">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
                  />
                </div>
                <div className="p-3">
                  <h1 className="text-white text-sm font-medium">
                    {item.title}
                  </h1>
                  <p className="text-[#AD957B] text-xs">
                    {item.description}
                  </p>
                  <p className="text-white text-base font-medium">
                    {item.price}
                    <span className="text-xs ml-1">.- /ชุด</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <button 
          onClick={() => scroll('left')}
          className="p-1"
          disabled={currentGroup === 0}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="white" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>

        {/* Dots Indicator */}
        <div className="flex gap-1">
          {Array.from({ length: totalGroups }).map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                currentGroup === index ? 'bg-white' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>

        <button 
          onClick={() => scroll('right')}
          className="p-1"
          disabled={currentGroup === totalGroups - 1}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="white" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SlickSaLa;