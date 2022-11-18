import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BoxListItem from "components/BoxListItem";
import styles from "scss/components/home/HomeCommunity.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import HomeCommunityItem from "./HomeCommunityItem";
const HomeCommunity = ({}) => {
  const [community, setCommunity] = useState([]);
  const getCommunity = () => {
    axios({
      headers: {
        "Access-Control-Allow-Origin": "strict-origin-when-cross-origin",
      },
      method: "GET",
      url: "/mobile/community/all?select_cat=전체&ord=인기순&cnt_sql=1",
    }).then((res) => {
      console.log(res);
      setCommunity(res.data.slice(0, 3));
    });
  };
  useEffect(() => {
    getCommunity();
  }, []);
  useEffect(() => {
    console.log(community);
  }, [community]);
  return (
    <>
      <div className={styles.HomeCommunity}>
        <div className={styles.topArea}>
          <p>기업 운영에 관한 모든 것들을 커뮤니티에서 공유해봐요!</p>
        </div>
        <div className={styles.contArea}>
          <Swiper
            direction={"vertical"}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            className={styles.mySwiper}
            modules={[Autoplay]}
          >
            {community.map((item, i) => {
              return (
                <SwiperSlide className={styles.swiperSlide} key={item.id}>
                  <HomeCommunityItem item={item} styles={styles} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </>
  );
};
export default HomeCommunity;
