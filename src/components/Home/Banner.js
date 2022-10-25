import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import styles from "scss/components/Home/Banner.module.scss";
import { useState } from "react";
const Banner = () => {
  const [banner, setBanner] = useState([
    "SLIDE1",
    "SLIDE2",
    "SLIDE3",
    "SLIDE4",
  ]);
  const autoDelay = 3000;
  return (
    <>
      <div className={styles.Banner}>
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{
            delay: autoDelay,
            disableOnInteraction: false,
          }}
          pagination={{
            el: "#pagination",
          }}
          // onSwiper={(swiper) => console.log(swiper)}
          // onSlideChange={() => console.log("slide change")}
        >
          {banner.map((v, i) => {
            return (
              <SwiperSlide className={styles.slide}>
                <span>{v}</span>
              </SwiperSlide>
            );
          })}
          <div
            id="pagination"
            className={styles.pagination}
            style={{ "animation-duration": autoDelay / 1000 + "s" }}
          ></div>
        </Swiper>

        <style>{`
          @keyframes paging {
            0% {
              width:0;
              opacity:0;
            }
            10%{
              opacity:1;
            }
            100% {
              width:100%;
            }
          }
        `}</style>
      </div>
    </>
  );
};
export default Banner;
