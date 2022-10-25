import React from "react";
import { useState, useEffect } from "react";
import styles from "scss/components/Home/CountArea.module.scss";
const CountArea = () => {
  const [count, setCount] = useState([12111, 433, 114, 11444]);
  const [newCount, setNewCount] = useState([]);
  const changeCount = () => {
    let newArr = [...count].map((v) =>
      v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    );
    return newArr;
  };
  useEffect(() => {
    setNewCount(changeCount);
  }, [count]);
  return (
    <div className={styles.CountArea}>
      <ul>
        <li>
          <span>누적 지원사업 개수</span>
          <span>{newCount[0]}개</span>
        </li>
        <li>
          <span>이번주 지원사업</span>
          <span>{newCount[1]}개</span>
        </li>
        <li>
          <span>정보 제공기관</span>
          <span>{newCount[2]}개</span>
        </li>
        <li>
          <span>누적 가입 기업</span>
          <span>{newCount[3]}개</span>
        </li>
      </ul>
    </div>
  );
};
export default CountArea;
