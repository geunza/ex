import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadingStart, loadingEnd } from "redux/store";
import BoxListItemHome from "components/home/BoxListItemHome";
import styles from "scss/pages/Home.module.scss";
const HomeSupport = () => {
  let count = 0;
  let cancel;
  const CancelToken = axios.CancelToken;
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const [homeSupport, setHomeSupport] = useState([
    {
      category: "실시간인기",
      item: [],
      url: process.env.REACT_APP_API_RESOURCE + "/mainpage/getPopularList",
      cat_name: "실시간",
    },
    {
      category: "엑시토추천",
      item: [],
      url: process.env.REACT_APP_API_RESOURCE + "/mainpage/getPushBookList",
      cat_name: "엑시토추천",
    },
    {
      category: "찜인기",
      item: [],
      url: process.env.REACT_APP_API_RESOURCE + "/mainpage/getPopularList",
      cat_name: "찜",
    },
    {
      category: "예비창업자 대상",
      item: [],
      url: process.env.REACT_APP_API_RESOURCE + "/mainpage/getPopularList",
      cat_name: "예비창업자",
    },
  ]);
  const getHomeSupport = (category, url, cat_name) => {
    axios({
      headers: {
        user_id: userInfo.id,
      },
      data: { cat: cat_name },
      method: "POST",
      url: url,
      cancelToken: new CancelToken(function executor(c) {
        cancel = c;
      }),
    }).then((res) => {
      const data = res.data;
      const copy = [...homeSupport];
      copy.find((item) => item.category == category).item = data.map((v) => v);
      setHomeSupport(copy);
    });
  };
  useEffect(() => {
    homeSupport.forEach((v, i) => {
      getHomeSupport(v.category, v.url, v.cat_name);
    });
    return () => {
      cancel();
    };
  }, []);
  return (
    <>
      <div className={styles.HomeSupport}>
        {homeSupport.map((item, idx) => {
          return (
            <div key={item.category} className={styles.supportBox}>
              <h4 className={styles.supportCate}>{item.category}</h4>
              <div className={styles.supportList}>
                {item.item.slice(0, 4).map((list, idx) => (
                  <BoxListItemHome
                    getHomeSupport={getHomeSupport}
                    category={item}
                    key={idx}
                    item={list}
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
