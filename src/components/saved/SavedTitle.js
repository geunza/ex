import React from "react";
import { useSelector } from "react-redux";
import styles from "scss/pages/Saved.module.scss";
const SavedTitle = () => {
  const userInfo = useSelector((state) => state.userInfo);
  return (
    <div className={`commonTitleWrap ${styles.titleArea}`}>
      <h3 className="title">{userInfo.usernickname}</h3>
      <p>대표님 반갑습니다. 대표님의 지원사업 현황을 분석합니다.</p>
    </div>
  );
};
export default SavedTitle;
