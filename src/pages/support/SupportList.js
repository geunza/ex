import React from "react";
import styles from "scss/pages/SupportList.module.scss";
import SupportFilter from "components/support/SupportFilter";
import SupportItems from "components/support/SupportItems";
import SupportRecent from "components/support/SupportRecent";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSupportInfo } from "store/supportInfoSlice";

const SupportList = ({}) => {
  const supportInfo = useSelector((state) => state.supportInfo);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(supportInfo);
  }, [supportInfo]);
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
              <SupportFilter styles={styles} />
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
    </>
  );
};

export default SupportList;
