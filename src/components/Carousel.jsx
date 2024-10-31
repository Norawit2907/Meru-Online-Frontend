import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../styles/carousel.css';

import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

import { useState } from "react";
import { useEffect } from "react";
import { GetWatData } from "../services/getWatDataById";
import { useParams } from "react-router-dom";

const Carousel = () => {
    const [watData, setWatData] = useState({ picture: [] });
    const wat_id = useParams().id;

    useEffect(() => {
        const fetchWatData = async () => {
            try {
                const result = await GetWatData(wat_id);
                setWatData(result);
                // console.log("Fetched Wat Data:", result);
            } catch (error) {
                // console.error("Failed to fetch Wat data:", error);
            }
        };

        fetchWatData();
    }, [wat_id]);

    return (
        <div className="container md:w-full lg:w-12/12 h-[500px] flex flex-col items-center gap-4 mx-auto relative overflow-hidden">
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 250,
                    modifier: 2.5,
                }}
                pagination={{ el: '.swiper-pagination', clickable: true }}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                    clickable: true,
                }}
                modules={[EffectCoverflow, Pagination, Navigation]}
                className="swiper_container lg:w-full flex flex-col items-center gap-4" // Adjusted container width
            >
                {watData.picture.map((image, index) => (
                    <SwiperSlide key={index} className=" flex flex-col items-center gap-4 h-[250px]">
                        <img
                            src={image}
                            alt={`Slide ${index + 1}`}
                            className="w-6/12 md:w-full lg:h-[300px] object-cover rounded-[16px]" // Adjusted width here
                        />
                    </SwiperSlide>
                ))}

                <div className="slidercontroller flex items-center justify-center">
                    <div className="swiper-button-prev slider-arrow mr-2 cursor-pointer">
                    </div>
                    <div className="swiper-button-next slider-arrow ml-2 cursor-pointer">
                    </div>
                    <div className="swiper-pagination absolute bottom-2 w-full text-center text-[#AD957B]"></div>
                </div>

            </Swiper>
        </div>
    );
};

export default Carousel;
