import React, { useState, useEffect } from "react";
import styles from "scss/components/support/SupportItem.module.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
const ApplyItem = ({
  item,
  getApplyItems,
  ord,
  getDoughnutList,
  getBarList,
}) => {
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
  const targetName = item.target_name;
  const [endDate, endDay] = stringTimeToISO(item.si_end_dt, "MMDD");
  // const [readDate, readDay] = stringTimeToISO(item.tl_cret_dt, "all");
  const done = item.mb_done_save_yn;
  const cost = item.target_cost_value;
  const costComma = addComma(item.target_cost_value);
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
  const doneClick = (mb_addidx, mb_done_save_yn) => {
    axios({
      url: "/saved/isDoneSavedMyBook",
      method: "POSt",
      headers: {
        user_id: userInfo.id,
      },
      data: { mb_addidx: mb_addidx, mb_done_save_yn: mb_done_save_yn },
    })
      .then((res) => {
        getApplyItems(ord);
        getDoughnutList();
        getBarList();
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  return (
    <li className={styles.supportItem}>
      <div className={styles.leftArea}>
        <div className={styles.itemTop}>
          <ol>
            <li>{cateName}</li>
            <li>{locName}</li>
            <li>{targetName}</li>
          </ol>
          <p>
            {"readDate"} ({"readDay"}) 읽음
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
              className={done == "Y" ? styles.isApply : null}
              onClick={() => {
                if (!isLoggedIn) {
                  alert("로그인이 필요합니다.");
                  return false;
                }
                doneClick(item.mb_addidx, item.mb_done_save_yn);
              }}
            >
              {done == "Y" ? (
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/public_assets/img/global/ico/ico_apply.png"
                  }
                  alt="신청"
                />
              ) : null}

              <span>선정</span>
            </button>
          </li>
        </ul>
      </div>
    </li>
  );
};
export default ApplyItem;