import React from "react";
import styles from "scss/components/support/SupportItem.module.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoginCheck } from "redux/store";
import axios from "axios";
const SupportItem = ({ item, getSupportCont, getRecent }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const userInfo = useSelector((state) => state.userInfo);
  const cateName = item.target_cat_name;
  const locName = item.locname;
  const targetName = item.target_name;
  const title = item.si_title;
  const cost = item.target_cost_value;
  const costComma = addComma(item.target_cost_value);
  const readDateSource = item.tl_cret_dt;
  const endDateSource = item.si_end_dt;
  const today = new Date();
  const isEnd = endDateSource - today.getTime() < 0;
  const [endDate, endDay] = stringTimeToISO(item.si_end_dt, "MMDD");
  const viewCount = item.view_cnt;
  const isZzim = item.mb_save_yn == "Y";
  const url = item.mobile_url;
  function addComma(numb) {
    return numb.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
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
  const zzimClick = (idx, mb_save_yn) => {
    axios({
      method: "POST",
      url: "/saved/isSavedMyBook",
      headers: { user_id: userInfo.id },
      data: { mb_addidx: idx, mb_save_yn: mb_save_yn },
    }).then((res) => {
      getSupportCont();
    });
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
      }).then((res) => {
        getRecent();
      });
    }
    axios({
      url: `/mainpage/upViewCnt?si_idx=${idx}`,
      method: "POST",
    }).then((res) => {
      getSupportCont();
    });
  };
  return (
    <>
      <li className={styles.supportItem}>
        <div className={styles.leftArea}>
          <div className={styles.itemTop}>
            <ol>
              <li>{cateName}</li>
              <li>{locName}</li>
              <li>{targetName}</li>
            </ol>
            <p>{readDateSource && readDateSource}</p>
          </div>
          <div className={styles.itemInfo}>
            <h4>
              <button
                type="button"
                onClick={() => {
                  openInNewTab(url, item.si_idx);
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
            <li className={`${styles.dueDate} ` + (isEnd ? styles.end : "")}>
              {isEnd ? (
                <span>마감</span>
              ) : (
                <>
                  <img
                    priority="true"
                    src={
                      process.env.PUBLIC_URL +
                      "/public_assets/img/global/ico/ico_date.png"
                    }
                    alt="마감일"
                  />
                  <span>
                    {endDate} ({endDay})
                  </span>
                </>
              )}
            </li>
            <li>
              <img
                priority="true"
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
                    dispatch(setLoginCheck(true));
                    return false;
                  }
                  zzimClick(item.si_idx, item.mb_save_yn);
                }}
              >
                <img
                  priority="true"
                  src={
                    process.env.PUBLIC_URL +
                    "/public_assets/img/global/ico/ico_zzim_black.png"
                  }
                  style={{ display: isZzim ? "none" : null }}
                  alt="찜X"
                />
                <img
                  priority="true"
                  src={
                    process.env.PUBLIC_URL +
                    "/public_assets/img/global/ico/ico_zzim.png"
                  }
                  style={{ display: !isZzim ? "none" : null }}
                  alt="찜O"
                />
                <span>찜</span>
              </button>
            </li>
          </ul>
        </div>
      </li>
    </>
  );
};
export default SupportItem;
