import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import { Link } from "react-router-dom";
import axios from "axios";
import "swiper/css";
import "swiper/css/pagination";
import styles from "scss/components/home/Banner.module.scss";
import { useState } from "react";
import { useEffect } from "react";
const ImageBanner = () => {
  const [banner, setBanner] = useState([]);
  const getBannerData = () => {
    axios({
      headers: {
        "Access-Control-Allow-Origin": "strict-origin-when-cross-origin",
      },
      method: "POST",
      url: "/mainpage/getBannerList",
    }).then((res) => {
      setBanner(res.data);
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
          className={styles.swiper}
          loop={true}
          // onSwiper={(swiper) => console.log(swiper)}
          // onSlideChange={() => console.log("slide change")}
        >
          {banner &&
            banner.map((img, idx) => {
              return (
                <SwiperSlide className={styles.slide} key={idx}>
                  <Link to={img.link}>
                    <img src={img.banner_img} alt={img.banner_title} />
                  </Link>
                </SwiperSlide>
              );
            })}
        </Swiper>
        <div id="pagination" className={styles.pagination}></div>

        {/* <style>{`
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
        `}</style> */}
      </div>
    </>
  );
};
export default ImageBanner;
