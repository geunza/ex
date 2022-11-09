import React from "react";
import styles from "scss/pages/SupportList.module.scss";
import SupportFilter from "components/support/SupportFilter";
import SupportItems from "components/support/SupportItems";
import SupportRecent from "components/support/SupportRecent";

const SupportList = ({}) => {
  return (
    <>
      <div className={styles.SupportList}>
        <div className={`inner`}>
          <div className={styles.tit}>
            <h4>신청 가능한 지원사업 찾기</h4>
            <p>
              좌측 <mark>필터 설정</mark> 후 내 기업에 맞는 지원사업만
              확인하세요.
            </p>
          </div>
          <div className={styles.contArea}>
            <div className={styles.filterArea}>
              <SupportFilter />
            </div>
            <div className={styles.listArea}>
              <SupportItems />
            </div>
            <div className={styles.recentArea}>
              <SupportRecent />
            </div>
          </div>
        </div>
      </div>
      <p>{261 / 1800}</p>
      <p>{1091 / 1800}</p>
      <p>{370 / 1800}</p>
    </>
  );
};

export default SupportList;
