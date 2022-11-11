import React from "react";
import styles from "scss/components/support/SupportRecent.module.scss";
import { Link } from "react-router-dom";
const SupportRecent = () => {
  return (
    <>
      <div className={styles.SupportRecent}>
        <h4>최근 본 지원사업</h4>
        <ul>
          {Array(3)
            .fill()
            .map((_, idx) => {
              return (
                <li key={idx}>
                  <Link to="###">
                    <h5 className={styles.tit}>
                      2022년 규제자유 특구혁신 사업육성 사업화
                      지원(기업지원)(대전) 2022년 규제자유 특구혁신 사업육성
                      사업화 지원(기업지원)(대전)2022년 규제자유 특구혁신
                      사업육성 사업화 지원(기업지원)(대전)
                    </h5>
                    <p>
                      <span className={styles.dueDate}>09.15 (일) 마감</span>
                      <span className={styles.slash}>/</span>
                      <span className={styles.moneyAmount}>6,000,000원</span>
                    </p>
                  </Link>
                </li>
              );
            })}
        </ul>
        <button className={styles.showAll}>
          <span>전체보기</span>
        </button>
      </div>
    </>
  );
};
export default SupportRecent;
