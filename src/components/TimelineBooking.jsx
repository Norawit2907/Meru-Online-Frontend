import React, { useState, useRef } from "react";

const timelineItems = [
  {
    date: "17/8/67",
    services: [
      {
        imageUrl: "https://huahin.town/wp-content/uploads/2023/07/cover-FB.jpg",
        title: "ชุดครอบครัว",
        description: "เหมาะสำหรับครอบครัวเล็กและใหญ่",
        price: "650 บ.",
      },
      {
        imageUrl: "https://img.wongnai.com/p/1920x0/2019/04/11/a75bbf13ca274d4f8240c776dd61bf51.jpg",
        title: "ชุดครอบครัว",
        description: "เหมาะสำหรับครอบครัวเล็กและใหญ่",
        price: "650 บ.",
      },
      {
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9R9FD3KMWGpFwMMLQ9f249pDxFJ5HQgyjtQ&s",
        title: "ชุดครอบครัว",
        description: "เหมาะสำหรับครอบครัวเล็กและใหญ่",
        price: "650 บ.",
      },
      {
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9R9FD3KMWGpFwMMLQ9f249pDxFJ5HQgyjtQ&s",
        title: "ชุดครอบครัว",
        description: "เหมาะสำหรับครอบครัวเล็กและใหญ่",
        price: "650 บ.",
      },
    ],
  },
  {
    date: "17/8/67",
    services: [
      {
        imageUrl: "https://huahin.town/wp-content/uploads/2023/07/cover-FB.jpg",
        title: "ชุดครอบครัว",
        description: "เหมาะสำหรับครอบครัวเล็กและใหญ่",
        price: "650 บ.",
      },
      {
        imageUrl: "https://img.wongnai.com/p/1920x0/2019/04/11/a75bbf13ca274d4f8240c776dd61bf51.jpg",
        title: "ชุดครอบครัว",
        description: "เหมาะสำหรับครอบครัวเล็กและใหญ่",
        price: "650 บ.",
      },
      {
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9R9FD3KMWGpFwMMLQ9f249pDxFJ5HQgyjtQ&s",
        title: "ชุดครอบครัว",
        description: "เหมาะสำหรับครอบครัวเล็กและใหญ่",
        price: "650 บ.",
      },
    ],
  },
  {
    date: "17/8/67",
    services: [
      {
        imageUrl: "https://huahin.town/wp-content/uploads/2023/07/cover-FB.jpg",
        title: "ชุดครอบครัว",
        description: "เหมาะสำหรับครอบครัวเล็กและใหญ่",
        price: "650 บ.",
      },
      {
        imageUrl: "https://img.wongnai.com/p/1920x0/2019/04/11/a75bbf13ca274d4f8240c776dd61bf51.jpg",
        title: "ชุดครอบครัว",
        description: "เหมาะสำหรับครอบครัวเล็กและใหญ่",
        price: "650 บ.",
      },
      {
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9R9FD3KMWGpFwMMLQ9f249pDxFJ5HQgyjtQ&s",
        title: "ชุดครอบครัว",
        description: "เหมาะสำหรับครอบครัวเล็กและใหญ่",
        price: "650 บ.",
      },
    ],
  },
];

const Timeline = () => {
  return (
    <section className="h-auto flex justify-center pt-4 sm:pt-6 md:pt-10">
      <div className="w-[95%] sm:w-[90%] max-w-[1000px] relative">
        <ul className="ml-2 md:ml-4">
          {timelineItems.map((item, index) => (
            <TimelineItem key={index} date={item.date} services={item.services} isLast={index === timelineItems.length - 1} />
          ))}
        </ul>
      </div>
    </section>
  );
};

const TimelineItem = ({ date, services, isLast }) => {
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(null);
  const [currentGroup, setCurrentGroup] = useState(0);
  const scrollContainerRef = useRef(null);

  const totalGroups = Math.ceil(services.length / 3);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -720 : 720;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });

      if (direction === "left" && currentGroup > 0) {
        setCurrentGroup((prev) => prev - 1);
      } else if (direction === "right" && currentGroup < totalGroups - 1) {
        setCurrentGroup((prev) => prev + 1);
      }
    }
  };

  return (
    <li className="relative flex gap-2 md:gap-6 mb-8 sm:mb-10 md:mb-12">
      <div className="flex items-center">
        <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg">
          <circle r="8" cx="8" cy="8" fill="white" />
        </svg>

        {!isLast && (
          <div className="before:absolute before:left-[7px] before:top-[130px] sm:before:top-[150px] md:before:top-[180px] before:h-[270px] sm:before:h-[320px] md:before:h-[410px] before:w-[2px] before:bg-white" />
        )}
      </div>

      <div className="w-[95%] sm:w-[90%] md:w-[85%] bg-white rounded-xl p-2 sm:p-3 md:p-4 ">
        <div className="text-black text-lg sm:text-xl md:text-[24px] font-bold mb-2 sm:mb-3 md:mb-4 ml-2 underline ">
          วันที่ {date}
        </div>

        <div className=" mx-auto max-w-[780px]">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hide gap-4 scroll-smooth px-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {services.map((service, index) => (
              <div key={index} className="flex-none">
 <div 
                  className={`w-[240px] bg-[#292725] rounded-lg cursor-pointer transition-all duration-200 scale-90 hover:scale-95 ${
                    selectedServiceIndex === index 
                      ? 'ring-4 ring-[#E9C649] scale-100 shadow-2xl' 
                      : ''
                  }`}
                  onClick={() => setSelectedServiceIndex(index)}
                >
                  <div className="relative w-full h-[120px]">
                    <div
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-t-lg"
                      style={{ backgroundImage: `url(${service.imageUrl})` }}
                    />
                  </div>
                  <div className="p-2 sm:p-3">
                    <h1 className="text-white text-base sm:text-lg font-semibold line-clamp-1">{service.title}</h1>
                    <p className="text-[#AD957B] text-xs sm:text-sm py-1 line-clamp-2">{service.description}</p>
                    <p className="text-white text-lg sm:text-xl font-medium">{service.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-2">
            {/* ปุ่มเลื่อนซ้าย */}
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
              disabled={currentGroup === 0}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* Dots indicator */}
            {Array.from({ length: totalGroups }).map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  currentGroup === index ? "bg-[#AD957B]" : "bg-gray-300"
                }`}
              />
            ))}

            {/* ปุ่มเลื่อนขวา */}
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
              disabled={currentGroup === totalGroups - 1}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Timeline;
