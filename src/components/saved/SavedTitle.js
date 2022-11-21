import React from "react";
import styles from "scss/components/saved/SavedTitle.module.scss";
const SavedTitle = () => {
  return (
    <div className={`commonTitleWrap ${styles.titleArea}`}>
      <h3 className="title">주식회사 씨티엔스</h3>
      <p>대표님 반갑습니다. 대표님의 지원사업 현황을 분석합니다.</p>
      {1400 / 1820}
      <br></br>
      {370 / 1820}
    </div>
  );
};
export default SavedTitle;
