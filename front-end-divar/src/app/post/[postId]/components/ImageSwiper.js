"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import noImg from "../../../../../public/media/noImage.png";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./imageSwiperStyle.css";
import Image from "next/image";

const ImageSwiper = ({ images = [], alt }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [newImg, setNewImg] = useState([]);

  useEffect(() => {
    if (images && Array.isArray(images)) {
      const updatedImages = images.map(
        (img) =>
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/${img.replace(/\\/g, "/")}`
      );
      setNewImg(updatedImages);
    }
  }, [images]);
  const urlIsInvalid = /undefined$/?.test(newImg[0]);

  const canLoop = newImg.length > 0;

  return (
    <div className="w-full h-[400px]">
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        loop={canLoop}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 "
      >
        {urlIsInvalid ? (
          <SwiperSlide className="rounded-lg overflow-hidden">
            <Image src={noImg} alt="no image" priority />
          </SwiperSlide>
        ) : (
          newImg?.map((img, index) => (
            <SwiperSlide key={index} className="rounded-lg overflow-hidden">
              <img src={img} alt={alt} />
            </SwiperSlide>
          ))
        )}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={canLoop}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {newImg.length == 0
          ? ""
          : newImg?.map((img, index) => (
              <SwiperSlide key={index}>
                <img src={img} alt={alt} />
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
};

export default ImageSwiper;
