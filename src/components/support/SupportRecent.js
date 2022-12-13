import React, { useEffect, useState } from "react";
import styles from "scss/components/support/SupportRecent.module.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { compose } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
const SupportRecent = ({ userInfo }) => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const navigate = useNavigate();
  const [savedBook, setSavedBook] = useState([]);
  const getRecent = () => {
    axios({
      headers: { user_id: userInfo.id },
      data: {
        ord: "전체",
      },
      method: "POST",
      url: "/saved/getRecentlyMySavedBook",
    })
      .then((res) => {
        setSavedBook(res.data.slice(0, 3));
      })
      .catch((err) => {
        console.log("err", err);
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
                const price = item.target_cost_value
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                return (
                  <li key={idx}>
                    <Link to="###">
                      <h5 className={styles.tit}>{item.si_title}</h5>
                      <p>
                        <span className={styles.dueDate}>{endTime}</span>
                        <span className={styles.slash}>/</span>
                        <span className={styles.moneyAmount}>{price}원</span>
                      </p>
                    </Link>
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
