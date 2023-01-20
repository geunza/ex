import React from "react";
import { useState, useEffect } from "react";
import styles from "scss/pages/Home.module.scss";
import axios from "axios";
import CountUp from "react-countup";
import { useSelector } from "react-redux";
const CountArea = ({ count, setCount }) => {
  const isMobile = useSelector((state) => state.isMobile);

  let cancel;
  const CancelToken = axios.CancelToken;
  const getCount = () => {
    axios({
      headers: {
        "Access-Control-Allow-Origin": "strict-origin-when-cross-origin",
      },
      method: "POST",
      url: process.env.REACT_APP_API_URL + "/mainpage/getTotalCount",
      cancelToken: new CancelToken(function executor(c) {
        // excutor 함수는 cancel 함수를 매개 변수로 받습니다.
        cancel = c;
      }),
    }).then((res) => {
      let data = res.data[0];
      setCount(data);
    });
  };

  useEffect(() => {
    getCount();
    return () => {
      cancel();
    };
  }, []);
  return (
    <div className={styles.CountArea}>
      <div className={styles.all}>
        <p className={styles.tit}>
          {isMobile ? (
            <span>누적지원사업</span>
          ) : (
            <>
              <span>전체누적</span>
              <span>지원사업 개수</span>
            </>
          )}
        </p>
        <CountUp
          className={styles.numb}
          duration={2}
          separator=","
          end={count.total_cnt}
        ></CountUp>
      </div>
      <ul>
        <li className={styles.thisWeek}>
          <p className={styles.tit}>이번주 지원사업</p>
          <CountUp
            className={styles.numb}
            duration={2}
            separator=","
            end={count.week_cnt}
          ></CountUp>
        </li>
        <li>
          <p className={styles.tit}>정보 제공기관</p>
          <CountUp
            className={styles.numb}
            duration={2}
            separator=","
            end={count.target_cnt}
          ></CountUp>
        </li>
        <li>
          <p className={styles.tit}>누적 가입 기업</p>
          <CountUp
            className={styles.numb}
            duration={2}
            separator=","
            end={count.user_cnt}
          ></CountUp>
        </li>
      </ul>
    </div>
  );
};
export default CountArea;
