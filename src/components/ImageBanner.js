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
          className={styles.swiper}
          // onSwiper={(swiper) => console.log(swiper)}
          // onSlideChange={() => console.log("slide change")}
        >
          {banner &&
            banner.map((v, i) => {
              return (
                <SwiperSlide className={styles.slide} key={i}>
                  <Link to={v.link}>
                    <img src={process.env.PUBLIC_URL + v.src} alt={v.text} />
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
