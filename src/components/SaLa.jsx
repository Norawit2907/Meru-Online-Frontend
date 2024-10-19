import React, { useState } from "react";
import Slider from "react-slick";
import "../styles/Slick-SaLa.css";

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
];

const SaLa = ({ title, description, price, imageUrl, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer text-white bg-[#292725] h-[175px] border-2 rounded-lg ${
        isSelected ? "border-[#AD957B]" : "border-transparent"
      }`}
    >
      <img src={imageUrl} alt={title} className="w-full h-[115px] object-cover rounded-t-lg" />
      <div className="p-1">
        <h3 className="text-[12px]">{title}</h3>
        <p className="text-[10px] text-[#AD957B]">{description}</p>
        <p className="text-[16px]">
          {price}
          <span className="text-[10px]">.- /ชุด</span>
        </p>
      </div>
    </div>
  );
};

const SlickSaLa = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleSelect = (index) => {
    setSelectedIndex(index);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <div className="flex justify-center">
      <div className="sala-carousel w-3/4">
        <Slider {...settings}>
          {costData.map((item, index) => (
            <SaLa
              key={index}
              title={item.title}
              description={item.description}
              price={item.price}
              imageUrl={item.imageUrl}
              isSelected={selectedIndex === index}
              onClick={() => handleSelect(index)}
            />
          ))}
        </Slider>
        {selectedIndex !== null && (
          <div className="text-center mt-4">
            <p className="text-lg text-white mt-10">
              คุณได้เลือก: <span className="font-bold">{costData[selectedIndex].title}</span> ราคา {costData[selectedIndex].price} บาท
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SlickSaLa;
