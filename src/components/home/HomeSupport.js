import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadingStart, loadingEnd } from "store";
import BoxListItem from "components/BoxListItem";
import styles from "scss/components/home/HomeSupport.module.scss";
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
              <div className={styles.supportList}>
                {item.Item.map((list, idx) => (
                  <BoxListItem
                    key={idx}
                    item={list}
                    commentShow={false}
                    viewShow={true}
                    likeShow={false}
                    url={"/support/supportView/"}
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
