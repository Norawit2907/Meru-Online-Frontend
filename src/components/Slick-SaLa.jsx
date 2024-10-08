import React from "react";
import Slider from "react-slick";
import CardItem from "./SaLa";
import '../styles/Slick-SaLa.css'

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

const SlickSaLa = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <div className="flex justify-center items-center">
      <div className="sala-carousel  w-[800px]">
        <Slider {...settings}>
          {costData.map((item, index) => (
            <CardItem
              key={index}
              title={item.title}
              description={item.description}
              price={item.price}
              imageUrl={item.imageUrl}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SlickSaLa;
