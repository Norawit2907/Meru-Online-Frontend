import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

import { useState } from "react";
import { useEffect } from "react";
import { GetWatData } from "../services/getWatDataById";


const Carousel = () => {
    const [watData, setWatData] = useState({picture: []});
    const wat_id = '671fec855a531995fe412828'

    useEffect(() => {
        const fetchWatData = async () => {
            try {
                const result = await GetWatData(wat_id);
                setWatData(result);
                console.log("Fetched Wat Data:", result);
            } catch (error) {
                console.error("Failed to fetch Wat data:", error);
            }
        };

        fetchWatData();
    }, [wat_id]);

        return (
            <div className="container md:w-full lg:w-7/12 h-[450px] md:h-full rounded-[16px] flex items-center justify-center mx-auto relative overflow-hidden">
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    loop={true}
                    slidesPerView={'auto'}
                    coverflowEffect={{
                    rotate: 2,
                    stretch: 0,
                    depth: 150,
                    modifier: 2.5,
                    }}
                    pagination={{ el: '.swiper-pagination', clickable: true }}
                    navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                    clickable: true,
                    }}
                    modules={[EffectCoverflow, Pagination, Navigation]}
                    className="swiper_container"
                >
                    
                    {watData.picture.map((image, index) => 
                    (
                        <SwiperSlide key={index}>
                            <img
                                src={image}
                                alt={`Slide ${index + 1}`}
                                className="w-full h-full object-contain rounded-[16px]"
                            />
                        </SwiperSlide>
                     ))}

                    <div className="slidercontroller">
                        <div className="swiper-button-prev slider-arrow  ">
                            <ion-icon name="chevron-back-outline"></ion-icon>
                        </div>
                        <div className="swiper-button-next slider-arrow ">
                            <ion-icon name="arrow-forward-outline"></ion-icon>
                        </div>
                        <div className="swiper-pagination ">
                        </div>     
                    </div>
                </Swiper>
        </div>
    );
};

export default Carousel;

