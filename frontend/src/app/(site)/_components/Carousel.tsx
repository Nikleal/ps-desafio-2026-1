"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; 
import "swiper/css";
import styles from "./carousel.module.css";

export default function Carousel() {
  return (
    <div className={styles.container}>
      <Swiper
        modules={[Autoplay]} 
        spaceBetween={0}
        slidesPerView={1}
        loop={true} 
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className={styles.swiper}
      >
        <SwiperSlide>
          <img src="/assets/images/BannerBocha.png" alt="Banner 1" className={styles.slideImage} />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/images/BannerBocha2.png" alt="Banner 2" className={styles.slideImage} />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/images/BannerBocha3.png" alt="Banner 3" className={styles.slideImage} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}