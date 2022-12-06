import React, { useState, useEffect } from "react";
import styles from "scss/pages/SupportList.module.scss";
import SupportFilter from "components/support/SupportFilter";
import SupportItems from "components/support/SupportItems";
import SupportRecent from "components/support/SupportRecent";
import { useDispatch, useSelector } from "react-redux";
import { setSupportInfo } from "redux/store/supportInfoSlice";
import axios from "axios";

const SupportList = ({}) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const supportInfo = useSelector((state) => state.supportInfo);
  const getSupportData = () => {
    axios({
      headers: {
        user_id: userInfo.id,
      },
      data: {
        ord: supportInfo.기술분야.text,
        business_type: "예비창업자",
        start_period: "1년 미만",
        company_type: "중소기업",
        target_cat_name: "사업화지원",
        business_ctg: "제조",
        tech_ctg: "",
        loc_code: "C02",
      },
      method: "POST",
      url: "/support/getSupportInfoList?select_cat=전체&ord=전체&cnt_sql=0",
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    //getSupportData();
  }, []);
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
              <SupportFilter supportInfo={supportInfo} />
            </div>
            <div className={styles.listArea}>
              <SupportItems />
            </div>
            <div className={styles.recentArea}>
              <SupportRecent userInfo={userInfo} />
            </div>
          </div>
        </div>
      </div>
      <style>
        {
          "\
        body{\
          background-color:#fff;\
        }\
      "
        }
      </style>
    </>
  );
};

export default SupportList;
