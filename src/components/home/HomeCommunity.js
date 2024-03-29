import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BoxListItemHome from "components/home/BoxListItemHome";
import styles from "scss/pages/Home.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import HomeCommunityItem from "./HomeCommunityItem";
const HomeCommunity = () => {
  const [community, setCommunity] = useState([]);
  let cancel;
  const CancelToken = axios.CancelToken;
  const getCommunity = () => {
    axios({
      headers: {
        "Access-Control-Allow-Origin": "strict-origin-when-cross-origin",
      },
      method: "POST",
      url: process.env.REACT_APP_API_RESOURCE + "/mobile/community/popularAll",
      cancelToken: new CancelToken(function executor(c) {
        // excutor 함수는 cancel 함수를 매개 변수로 받습니다.
        cancel = c;
      }),
    })
      .then((res) => {
        setCommunity(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getCommunity();
    return () => {
      cancel();
    };
  }, []);
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
