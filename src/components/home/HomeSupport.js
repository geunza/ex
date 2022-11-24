import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadingStart, loadingEnd } from "store";
import BoxListItemHome from "components/home/BoxListItemHome";
import styles from "scss/components/home/HomeSupport.module.scss";
const HomeSupport = ({}) => {
  let count = 0;
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const [homeSupport, setHomeSupport] = useState([
    { category: "실시간인기", Item: [] },
    { category: "엑시토추천", Item: [] },
    { category: "찜인기", Item: [] },
    { category: "예비창업자 대상", Item: [] },
  ]);
  const getHomeSupport = (url, idx, cat) => {
    console.log(idx);
    axios({
      headers: {
        user_id: userInfo.id,
      },
      data: { cat: cat },
      method: "POST",
      url: url,
    }).then((res) => {
      let copy = [...homeSupport];
      copy[idx].Item = res.data;
      setHomeSupport(copy);
    });
  };
  useEffect(() => {
    getHomeSupport("/mainpage/getPopularList", 0, "실시간"); //
    getHomeSupport("/mainpage/getPushBookList", 1, "엑시토추천"); //
    getHomeSupport("/mainpage/getPopularList", 2, "찜"); //
    getHomeSupport("/mainpage/getPopularList", 3, "예비창업자"); //
  }, []);

  return (
    <>
      <div className={styles.HomeSupport}>
        {homeSupport.map((item, idx) => {
          return (
            <div key={item.category} className={styles.supportBox}>
              <h4 className={styles.supportCate}>{item.category}</h4>
              <div className={styles.supportList}>
                {item.Item.slice(0, 4).map((list, idx) => (
                  <BoxListItemHome
                    key={idx}
                    item={list}
                    url={"/support/supportView/"}
                    viewShow={true}
                    commentShow={false}
                    likeShow={false}
                    writerShow={false}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default HomeSupport;
