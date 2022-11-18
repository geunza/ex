import React from "react";
import { useState, useEffect } from "react";
import styles from "scss/components/home/CountArea.module.scss";
import axios from "axios";
const CountArea = () => {
  const [count, setCount] = useState({});
  const [newCount, setNewCount] = useState({});
  const getCount = () => {
    axios({
      headers: {
        "Access-Control-Allow-Origin": "strict-origin-when-cross-origin",
      },
      method: "POST",
      url: "/mainpage/getTotalCount",
    }).then((res) => {
      let data = res.data[0];
      for (let type in data) {
        data[type] = data[type]
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      setCount(data);
    });
  };

  const changeCount = (arr) => {
    const newArr = [...arr].map((v) =>
      v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    );
    return newArr;
  };

  useEffect(() => {
    getCount();
  }, []);
  return (
    <div className={styles.CountArea}>
      <div className={styles.all}>
        <p className={styles.tit}>
          <span>전체누적</span>
          <span>지원사업 개수</span>
        </p>
        <span className={styles.numb}>{count.total_cnt}</span>
      </div>
      <ul>
        <li>
          <p className={styles.tit}>이번주 지원사업</p>
          <span className={styles.numb}>{count.week_cnt}</span>
        </li>
        <li>
          <p className={styles.tit}>정보 제공기관</p>
          <span className={styles.numb}>{count.user_cnt}</span>
        </li>
        <li>
          <p className={styles.tit}>누적 가입 기업</p>
          <span className={styles.numb}>{count.target_cnt}</span>
        </li>
      </ul>
    </div>
  );
};
export default CountArea;
