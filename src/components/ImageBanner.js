import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import { Link } from "react-router-dom";
import axios from "axios";
import "swiper/css";
import "swiper/css/pagination";
import styles from "scss/components/Home/Banner.module.scss";
import { useState } from "react";
import { useEffect } from "react";
const ImageBanner = () => {
  const [banner, setBanner] = useState([]);
  const getBannerData = () => {
    axios({
      method: "GET",
      url: "/db/bannerData.json",
    }).then((res) => {
      const data = res.data;
      setBanner(data.banner);
    });
  };
  const swiperParam = {
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: "#pagination",
    },
  };
  useEffect(() => {
    getBannerData();
  }, []);
  return (
    <>
      <div className={styles.Banner}>
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={swiperParam.autoplay}
          pagination={swiperParam.pagination}
          // onSwiper={(swiper) => console.log(swiper)}
          // onSlideChange={() => console.log("slide change")}
        >
          {banner.map((v, i) => {
            return (
              <SwiperSlide className={styles.slide} key={i}>
                <Link to={v.link}>
                  <span>{v.text}</span>
                </Link>
              </SwiperSlide>
            );
          })}
          <div
            id="pagination"
            className={styles.pagination}
            style={{
              animationDuration: swiperParam.autoplay.delay / 1000 + "s",
            }}
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
export default ImageBanner;
