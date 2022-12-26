import React, { useEffect, useState } from "react";
import styles from "scss/pages/Support.module.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { compose } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
const SupportRecent = ({ userInfo, savedBook, setSavedBook, getRecent }) => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const navigate = useNavigate();

  const openInNewTab = (url, idx) => {
    window.open(url, "_blank", "noopener,noreferrer");
    if (Object.keys(userInfo).length > 0) {
      axios({
        url: "/mainpage/insertTimeLine",
        method: "POST",
        headers: {
          user_id: userInfo.id,
        },
        data: { support_info: idx.toString() },
      }).then((res) => {
        console.log(idx);
      });
    }
    axios({
      url: `/mainpage/upViewCnt?si_idx=${idx}`,
      method: "POST",
    }).then((res) => {
      // getSupportCont();
    });
  };
  useEffect(() => {
    getRecent();
  }, [isLoggedIn, userInfo]);
  return (
    <div className={styles.SupportRecent}>
      <>
        <h4>최근 본 지원사업</h4>
        {isLoggedIn ? (
          <>
            <ul>
              {savedBook.map((item, idx) => {
                const offset = 1000 * 60 * 60 * 9;
                const timeStamp = new Date(item.si_end_dt - offset);
                const YYMMDD = timeStamp.toISOString().split("T")[0].split("-");
                const MM = YYMMDD[1];
                const DD = YYMMDD[2];
                const week = ["일", "월", "화", "수", "목", "금", "토"];
                const day = week[timeStamp.getDay()];
                const endTime = `${MM}.${DD} (${day}) 마감`;
                let price;
                if (
                  item.target_cost_value > 0 &&
                  typeof item.target_cost_value == "number"
                ) {
                  price = item.target_cost_value
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                } else {
                  price = 0;
                }
                return (
                  <li key={idx}>
                    <button
                      onClick={() => {
                        openInNewTab(item.mobile_url, item.si_idx);
                      }}
                    >
                      <h5 className={styles.tit}>{item.si_title}</h5>
                      <p>
                        <span className={styles.dueDate}>{endTime}</span>
                        {item.target_cost_value > 0 &&
                          typeof item.target_cost_value == "number" && (
                            <>
                              <span className={styles.slash}>/</span>
                              <span className={styles.moneyAmount}>
                                {price}원
                              </span>
                            </>
                          )}
                      </p>
                    </button>
                  </li>
                );
              })}
            </ul>
            <button
              className={styles.showAll}
              onClick={() => {
                navigate("/saved?cate=recent");
              }}
            >
              <span>전체보기</span>
            </button>
          </>
        ) : (
          <p className="empty">로그인이 필요합니다.</p>
        )}
      </>
    </div>
  );
};
export default SupportRecent;
