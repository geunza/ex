import React from "react";
import { useState, useEffect } from "react";
import styles from "scss/components/home/CountArea.module.scss";
import axios from "axios";
import CountUp from "react-countup";
const CountArea = ({ setAxiosCount }) => {
  const [count, setCount] = useState({
    total_cnt: 0,
    week_cnt: 0,
    user_cnt: 0,
    target_cnt: 0,
  });
  let cancel;
  const CancelToken = axios.CancelToken;
  const getCount = () => {
    axios({
      headers: {
        "Access-Control-Allow-Origin": "strict-origin-when-cross-origin",
      },
      method: "POST",
      url: "/mainpage/getTotalCount",
      cancelToken: new CancelToken(function executor(c) {
        // excutor 함수는 cancel 함수를 매개 변수로 받습니다.
        cancel = c;
      }),
    }).then((res) => {
      let data = res.data[0];
      setCount(data);
      setAxiosCount((prev) => prev + 1);
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
          <span>전체누적</span>
          <span>지원사업 개수</span>
        </p>
        <CountUp
          className={styles.numb}
          duration={2}
          separator=","
          end={count.total_cnt}
        ></CountUp>
      </div>
      <ul>
        <li>
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
            end={count.user_cnt}
          ></CountUp>
        </li>
        <li>
          <p className={styles.tit}>누적 가입 기업</p>
          <CountUp
            className={styles.numb}
            duration={2}
            separator=","
            end={count.target_cnt}
          ></CountUp>
        </li>
      </ul>
    </div>
  );
};
export default CountArea;
