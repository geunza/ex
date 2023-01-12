import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import axios from "axios";
import "swiper/css";
import "swiper/css/pagination";
import "scss/components/Banner.scss";
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
      <div className="Banner">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={swiperParam.autoplay}
          pagination={swiperParam.pagination}
          className="swiper"
          loop={true}
        >
          {banner &&
            banner.map((img, idx) => {
              const isNotice = img.banner_noti_idx != null;
              return (
                <SwiperSlide className="slide" key={idx}>
                  <button
                    onClick={() =>
                      isNotice
                        ? window.open(
                            `/notice/noticeView/${img.banner_noti_idx}`,
                            "_blank"
                          )
                        : window.open(img.banner_link, "_blank")
                    }
                  >
                    <img src={img.banner_img} alt={img.banner_title} />
                  </button>
                </SwiperSlide>
              );
            })}
        </Swiper>
        <div id="pagination" className="pagination"></div>
      </div>
    </>
  );
};
export default ImageBanner;
