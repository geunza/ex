import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadingStart, loadingEnd } from "store";
import HomeListItem from "components/Home/HomeListItem";
import styles from "scss/components/Home/HomeSupport.module.scss";
const HomeSupport = ({}) => {
  const [homeSupport, setHomeSupport] = useState([]);
  const dispatch = useDispatch();
  const getHomeSupport = () => {
    dispatch(loadingStart());
    axios("/db/HomeSupport.json")
      .then((res) => {
        setHomeSupport(res.data);
      })
      .then(() => {
        dispatch(loadingEnd());
      });
  };
  useEffect(() => {
    getHomeSupport();
  }, []);
  return (
    <>
      <div className={styles.HomeSupport}>
        {homeSupport.map((item, idx) => {
          return (
            <div key={item.category} className={styles.supportBox}>
              <h4 className={styles.supportCate}>{item.category}</h4>
              <ul>
                {item.Item.map((list, idx) => (
                  <HomeListItem key={idx} item={list} likeShow={false} />
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default HomeSupport;
