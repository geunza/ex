import React, { useState, useEffect } from "react";
import styles from "scss/components/saved/SavedItem.module.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const SavedItem = ({ item }) => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const sample = {
    target_cat_name: "사업화지원",
    si_end_dt: 1668697200000,
    view_cnt: 170,
    target_name: "민간기업",
    si_idx: 26726,
    mb_save_yn: null,
    tl_cret_dt: 1666588661000,
    loc_code: "C82",
    mobile_url: "https://s2bridge.com/apply/T9UCJ935JcQu",
    si_title: "글로벌 Shoot-Up 1기",
    mb_req_save_yn: null,
    mb_done_save_yn: null,
    target_cost_value: 0,
  };
  const endDateSource = item.si_end_dt;
  const title = item.si_title;
  const cateName = item.target_cat_name;
  const locName = item.loc_code;
  const targetName = item.target_name;
  const [endDate, endDay] = stringTimeToISO(item.si_end_dt, "MMDD");
  const [readDate, readDay] = stringTimeToISO(item.tl_cret_dt, "all");
  const cost = item.target_cost_value;
  const costComma = addComma(item.target_cost_value);
  const isZzim = item.mb_req_save_yn;
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
  return (
    <li className={styles.savedItem}>
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
            <Link to="###">{title}</Link>
          </h4>
          <p>
            <span className={styles.moneyTit}>지원금</span>
            <span className={styles.moneyAmount}>
              {cost > 0 && `${costComma}원`}
            </span>
          </p>
        </div>
      </div>
      <div className={styles.rightArea}>
        <ul>
          <li>
            <img
              src={
                process.env.PUBLIC_URL +
                "/public_assets/img/global/ico/ico_date.png"
              }
              alt="마감일"
            />
            <span className={styles.dueDate}>
              {endDate} ({endDay})
            </span>
          </li>
          <li>
            <img
              src={
                process.env.PUBLIC_URL +
                "/public_assets/img/global/ico/ico_view_black.png"
              }
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
                  alert("로그인이 필요합니다.");
                }
              }}
            >
              <img
                src={
                  process.env.PUBLIC_URL +
                  (isZzim
                    ? "/public_assets/img/global/ico/ico_zzim.png"
                    : "/public_assets/img/global/ico/ico_zzim_black.png")
                }
                alt="찜X"
              />
              <span>찜</span>
            </button>
          </li>
        </ul>
      </div>
    </li>
  );
};
export default SavedItem;
