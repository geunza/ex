import React, { useState, useEffect } from "react";
import styles from "scss/pages/Support.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { setLoginCheck } from "redux/store";
const RecentItem = ({
  item,
  getRecentItems,
  ord,
  getDoughnutList,
  getBarList,
  getTotalCount,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const userInfo = useSelector((state) => state.userInfo);
  const supportItem = useSelector((state) => state.supportItem);
  const endDateSource = item.si_end_dt;
  const title = item.si_title;
  const cateName = item.target_cat_name;
  const locCode = item.loc_code;
  const locName = supportItem.loc_cd.find(
    (item) => item.code == locCode
  ).code_nm;
  // const locName = "AA";
  const targetName = item.target_name;
  const [endDate, endDay] = stringTimeToISO(item.si_end_dt, "MMDD");
  const [readDate, readDay] = [item.tl_cret_dt, getDay(item.tl_cret_dt)];
  function getDay(date) {
    const week = ["일", "월", "화", "수", "목", "금", "토"];
    return week[new Date(date).getDay()];
  }
  let cost = item.target_cost_value;
  let costComma;
  typeof cost == "number"
    ? (costComma = addComma(item.target_cost_value))
    : (costComma = 0);

  const isZzim = item.mb_save_yn == "Y";
  const viewCount = item.view_cnt;
  function stringTimeToISO(stringDate, type) {
    const offset = 1000 * 60 * 60 * 9;
    // const offset = 0;
    const week = ["일", "월", "화", "수", "목", "금", "토"];
    const timeStamp = new Date(stringDate + offset);
    const date = timeStamp.toISOString().split("T")[0];
    const day = week[timeStamp.getDay()];
    if (type == "all") {
      return [date, day];
    }
    if (type == "MMDD") {
      const MM = date.split("-")[1];
      const DD = date.split("-")[2];
      return [`${MM}.${DD}`, day];
    }
  }
  function addComma(numb) {
    return numb.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const zzimClick = (idx, mb_save_yn) => {
    axios({
      method: "POST",
      url: "/saved/isSavedMyBook",
      headers: { user_id: userInfo.id },
      data: { mb_addidx: idx, mb_save_yn: mb_save_yn },
    })
      .then((res) => {
        getRecentItems(ord);
        getDoughnutList();
        getBarList();
        getTotalCount();
      })
      .catch((err) => console.log(err));
  };
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
      });
    }
    axios({
      url: `/mainpage/upViewCnt?si_idx=${idx}`,
      method: "POST",
    }).then(() => {
      getRecentItems(ord);
    });
  };
  return (
    <li className={styles.SupportItem}>
      <div className={styles.leftArea}>
        <div className={styles.itemTop}>
          <ol>
            <li>{cateName}</li>
            <li>{locName}</li>
            <li>{targetName}</li>
          </ol>
          <p>
            {readDate} ({readDay}) 읽음
          </p>
        </div>
        <div className={styles.itemInfo}>
          <h4>
            <button
              onClick={() => {
                openInNewTab(item.mobile_url, item.si_idx);
              }}
            >
              {title}
            </button>
          </h4>
          <p>
            {cost > 0 && (
              <>
                <span className={styles.moneyTit}>지원금</span>
                <span className={styles.moneyAmount}>{costComma}원</span>
              </>
            )}
          </p>
        </div>
      </div>
      <div className={styles.rightArea}>
        <ul>
          <li>
            <img
              src={require("assets/img/global/ico/ico_date.png")}
              alt="마감일"
            />
            <span className={styles.dueDate}>
              {endDate} ({endDay})
            </span>
          </li>
          <li>
            <img
              src={require("assets/img/global/ico/ico_view_black.png")}
              alt="조회수"
            />
            <span>{viewCount} 회</span>
          </li>
          <li className={styles.btnZzim}>
            <button
              type="button"
              className={isZzim ? styles.isZzim : null}
              onClick={() => {
                if (!isLoggedIn) {
                  dispatch(setLoginCheck(true));
                  return false;
                }
                zzimClick(item.si_idx, item.mb_save_yn);
              }}
            >
              <img
                priority="true"
                src={require("assets/img/global/ico/ico_zzim_black.png")}
                style={{ display: isZzim ? "none" : null }}
                alt="찜X"
              />
              <img
                priority="true"
                src={require("assets/img/global/ico/ico_zzim.png")}
                style={{ display: !isZzim ? "none" : null }}
                alt="찜O"
              />
              <span>찜</span>
            </button>
          </li>
        </ul>
      </div>
    </li>
  );
};
export default RecentItem;
