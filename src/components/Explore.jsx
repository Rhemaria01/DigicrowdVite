import React from 'react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
// import erc20 from "../ercEBI.json"
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import ExploreCard from "./ExploreCard";

const Explore = () => {
  return (
      <div className='container ' data-aos="fade-up" id="explore">
        <h1 className='text-link  md:text-6xl sm:text-4xl text-center mb-20'>Featured Project</h1>
        <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={15}
      slidesPerView={3}
      navigation={{ clickable: true}}
      pagination={{ clickable: true }}
      autoplay={{ delay: 1500, disableOnInteraction: false,waitForTransition: false }}
      className='h-[30rem]'
      
      >
            <SwiperSlide><ExploreCard /></SwiperSlide>
            <SwiperSlide><ExploreCard /></SwiperSlide>
            <SwiperSlide><ExploreCard /></SwiperSlide>
            <SwiperSlide><ExploreCard /></SwiperSlide>
            <SwiperSlide><ExploreCard /></SwiperSlide>
            <SwiperSlide><ExploreCard /></SwiperSlide>
        </Swiper>
        
    </div>
  )
}

export default Explore