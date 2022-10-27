import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import HomeListItem from "components/Home/HomeListItem";
import styles from "scss/components/Home/HomeCommunity.module.scss";
import { useEffect, useState } from "react";
const HomeCommunity = ({}) => {
  const [community, setCommunity] = useState([]);
  const getCommunity = () => {
    axios({
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
  return (
    <>
      <div className={styles.HomeCommunity}>
        <div className={styles.leftArea}>
          <h3>커뮤니티 &gt; </h3>
          <p>기업 운영에 관한 모든 것들을 커뮤니티에서 공유해봐요!</p>
        </div>
        <div className={styles.rightArea}>
          <ul>
            {community.map((item, i) => {
              return <HomeListItem key={item.id} item={item} likeShow={true} />;
            })}
          </ul>
        </div>
      </div>
    </>
  );
};
export default HomeCommunity;
