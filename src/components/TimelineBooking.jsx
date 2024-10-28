import React from "react";

const timelineItems = [
    {
      date: "17/8/67",
      services: [
        {
          imageUrl: "./temple.jpg",
          title: "ชุดครอบครัว",
          description: "เหมาะสำหรับครอบครัวเล็กและใหญ่",
          price: "650 บ.",
        },
        {
          imageUrl: "./temple.jpg",
          title: "ชุดครอบครัว",
          description: "เหมาะสำหรับครอบครัวเล็กและใหญ่",
          price: "650 บ.",
        },
        {
          imageUrl: "./temple.jpg",
          title: "ชุดครอบครัว",
          description: "เหมาะสำหรับครอบครัวเล็กและใหญ่",
          price: "650 บ.",
        },
      ]
    },
    {
      date: "17/8/67",
      services: [
        {
          imageUrl: "./temple.jpg",
          title: "ชุดครอบครัว",
          description: "เหมาะสำหรับครอบครัวเล็กและใหญ่",
          price: "650 บ.",
        },
        {
          imageUrl: "./temple.jpg",
          title: "ชุดครอบครัว",
          description: "เหมาะสำหรับครอบครัวเล็กและใหญ่",
          price: "650 บ.",
        },
        {
          imageUrl: "./temple.jpg",
          title: "ชุดครอบครัว",
          description: "เหมาะสำหรับครอบครัวเล็กและใหญ่",
          price: "650 บ.",
        },
      ]
    },
    {
      date: "17/8/67",
      services: [
        {
          imageUrl: "./temple.jpg",
          title: "ชุดครอบครัว",
          description: "เหมาะสำหรับครอบครัวเล็กและใหญ่",
          price: "650 บ.",
        },
        {
          imageUrl: "./temple.jpg",
          title: "ชุดครอบครัว",
          description: "เหมาะสำหรับครอบครัวเล็กและใหญ่",
          price: "650 บ.",
        },
        {
          imageUrl: "./temple.jpg",
          title: "ชุดครอบครัว",
          description: "เหมาะสำหรับครอบครัวเล็กและใหญ่",
          price: "650 บ.",
        },
      ]
    },
];

const Timeline = () => {
  return (
    <section className="h-auto flex justify-center pt-4 sm:pt-6 md:pt-10">
      <div className="w-[95%] sm:w-[90%] max-w-[1000px] relative">
        <ul className="ml-2 md:ml-4">
          {timelineItems.map((item, index) => (
            <TimelineItem
              key={index}
              date={item.date}
              services={item.services}
              isLast={index === timelineItems.length - 1}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

const TimelineItem = ({ date, services, isLast }) => {
  return (
    <li className="relative flex gap-2 md:gap-6 mb-8 sm:mb-10 md:mb-12">
      <div className="flex items-center">
        <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg">
          <circle r="8" cx="8" cy="8" fill="white" />
        </svg>

        {!isLast && (
          <div className="before:absolute before:left-[7px] before:top-[130px] sm:before:top-[150px] md:before:top-[170px] before:h-[270px] sm:before:h-[320px] md:before:h-[370px] before:w-[2px] before:bg-white" />
        )}
      </div>

      <div className="flex-1 bg-white rounded-xl p-2 sm:p-3 md:p-4 mr-2 sm:mr-4 md:mr-8">
        <div className="text-black text-lg sm:text-xl md:text-[24px] font-bold mb-2 sm:mb-3 md:mb-4 ml-2">
          วันที่ {date}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, index) => (
            <div key={index} className="flex justify-center">
              <div className="w-full sm:w-[240px] md:w-[260px] lg:w-[280px] bg-[#484848] rounded-lg">
                <div className="relative w-full h-[120px] sm:h-[130px] md:h-[140px]">
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-t-lg"
                    style={{ backgroundImage: `url(${service.imageUrl})` }}
                  />
                </div>
                <div className="p-2 sm:p-3">
                  <h1 className="text-white text-base sm:text-lg font-semibold line-clamp-1">
                    {service.title}
                  </h1>
                  <p className="text-[#AD957B] text-xs sm:text-sm py-1 line-clamp-2">
                    {service.description}
                  </p>
                  <p className="text-white text-lg sm:text-xl font-medium">
                    {service.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </li>
  );
};

export default Timeline;