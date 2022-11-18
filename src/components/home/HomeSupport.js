import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadingStart, loadingEnd } from "store";
import BoxListItem from "components/BoxListItem";
import styles from "scss/components/home/HomeSupport.module.scss";
const HomeSupport = ({}) => {
  let count = 0;
  const [homeSupport, setHomeSupport] = useState([
    { category: "실시간인기", Item: [] },
    { category: "엑시토추천", Item: [] },
    { category: "찜인기", Item: [] },
    { category: "예비창업자 대상", Item: [] },
  ]);
  const dispatch = useDispatch();
  const getHomeSupport2 = () => {
    dispatch(loadingStart());
    axios({
      headers: {
        "Access-Control-Allow-Origin": "strict-origin-when-cross-origin",
      },
      type: "POST",
      url: "/db/HomeSupport.json",
    })
      .then((res) => {
        setHomeSupport(res.data);
      })
      .then(() => {
        dispatch(loadingEnd());
      });
  };
  const getHomeSupport = (url, idx) => {
    console.log(idx);
    axios({
      headers: {
        "Access-Control-Allow-Origin": "strict-origin-when-cross-origin",
      },
      method: "POST",
      url: url,
    })
      .then((res) => {
        console.log("res", res);
        let copy = [...homeSupport];
        copy[idx].Item = res.data;
        setHomeSupport(copy);
      })
      .catch((err) => {
        console.log("ERR => " + idx);
      });
    // .catch((err) => console.log(err));
  };
  useEffect(() => {
    getHomeSupport("/mainpage/getPopularList", 0); //
    getHomeSupport("/mainpage/getPushBookList", 1); //
    getHomeSupport("/mainpage/getPopularList", 2); //
    getHomeSupport("/mainpage/getPopularList", 3); //
  }, []);
  useEffect(() => {
    console.log(homeSupport);
  }, [homeSupport]);
  return (
    <>
      <div className={styles.HomeSupport}>
        {homeSupport.map((item, idx) => {
          return (
            <div key={item.category} className={styles.supportBox}>
              <h4 className={styles.supportCate}>{item.category}</h4>
              <div className={styles.supportList}>
                {item.Item.map((list, idx) => (
                  <BoxListItem
                    key={idx}
                    item={list}
                    url={"/support/supportView/"}
                    commentShow={false}
                    viewShow={true}
                    likeShow={false}
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
