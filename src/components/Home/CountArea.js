import React from "react";
import { useState, useEffect } from "react";
import styles from "scss/components/home/CountArea.module.scss";
import axios from "axios";
const CountArea = () => {
  const [count, setCount] = useState([]);
  const [newCount, setNewCount] = useState([]);
  const getCount = () => {
    axios("/db/countData.json").then((res) => setCount(res.data.count));
  };
  const changeCount = (arr) => {
    const newArr = [...arr].map((v) =>
      v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    );
    return newArr;
  };

  useEffect(() => {
    setNewCount(() => changeCount(count));
  }, [count]);
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
        <span className={styles.numb}>{newCount[0]}</span>
      </div>
      <ul>
        <li>
          <p className={styles.tit}>이번주 지원사업</p>
          <span className={styles.numb}>{newCount[1]}</span>
        </li>
        <li>
          <p className={styles.tit}>정보 제공기관</p>
          <span className={styles.numb}>{newCount[2]}</span>
        </li>
        <li>
          <p className={styles.tit}>누적 가입 기업</p>
          <span className={styles.numb}>{newCount[3]}</span>
        </li>
      </ul>
    </div>
  );
};
export default CountArea;
