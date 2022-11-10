import React from "react";
import styles from "scss/components/support/SupportFilter.module.scss";
const SupportFilter = ({}) => {
  return (
    <>
      <div className={styles.SupportFilter}>
        <h4>조회 필터 </h4>
        <div className={styles.chkArea}>
          <input type="checkbox" id="chkAll" />
          <label htmlFor="chkAll">전체 지원사업 보기</label>
        </div>
        <div className={styles.filterBox}>
          <ul className={styles.filterList}>
            <li className={styles.filterItem}>
              <div className={styles.itemTit}>
                <span>신청대상</span>
                <button type="button">
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/public_assets/img/global/btn_arr.png"
                    }
                    alt="Select"
                  />
                </button>
              </div>
              <p>예비창업자</p>
            </li>
            <li className={styles.filterItem}>
              <div className={styles.itemTit}>
                <span>창업기간</span>
                <button type="button">
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/public_assets/img/global/btn_arr.png"
                    }
                    alt="Select"
                  />
                </button>
              </div>
              <p>3년 미만</p>
            </li>
            <li className={styles.filterItem}>
              <div className={styles.itemTit}>
                <span>카테고리</span>
                <button type="button">
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/public_assets/img/global/btn_arr.png"
                    }
                    alt="Select"
                  />
                </button>
              </div>
              <p>사업화 외 2개</p>
            </li>
            <li className={styles.filterItem}>
              <div className={styles.itemTit}>
                <span>지역</span>
                <button type="button">
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/public_assets/img/global/btn_arr.png"
                    }
                    alt="Select"
                  />
                </button>
              </div>
              <p>경기</p>
            </li>
            <li className={styles.filterItem}>
              <div className={styles.itemTit}>
                <span>분야</span>
                <button type="button">
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/public_assets/img/global/btn_arr.png"
                    }
                    alt="Select"
                  />
                </button>
              </div>
              <p>제조업 외 10개</p>
            </li>
          </ul>
          <div className={styles.submitArea}>
            <button type="button">
              <span>조회</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default SupportFilter;
