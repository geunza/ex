import React from "react";
import styles from "scss/pages/Support.module.scss";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoginCheck } from "redux/store";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
const SupportItem = ({
  item,
  getSupportCont,
  getRecent,
  setScrollStorage,
  ord,
  keyword,
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const userInfo = useSelector((state) => state.userInfo);
  const supportItemReady = useSelector((state) => state.supportItemReady);
  const supportItem = useSelector((state) => state.supportItem);

  const cateCode = item.target_cat_name;
  const locName = item.locname;
  const targetName = item.target_name;
  const title = item.si_title;
  const cost = item.target_cost_value;
  const [cateName, setCateName] = useState("");
  let costComma;
  if (cost > 0) {
    costComma = addComma(item.target_cost_value);
  }
  useEffect(() => {
    if (supportItemReady) {
      setCateName(supportItem.spt_cd.find((x) => x.code == cateCode).code_nm);
    }
  }, [supportItemReady]);
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const readDateSource = item.tl_cret_dt;
  const readDay = week[new Date(item.tl_cret_dt).getDay()];
  const endDateSource = item.si_end_dt;
  const today = new Date();
  const isEnd = endDateSource - today.getTime() < 0;
  const [endDate, endDay] = stringToDate(item.si_end_dt, "MMDD");
  const viewCount = item.view_cnt;
  const isZzim = item.mb_save_yn == "Y";
  const url = item.mobile_url;
  function addComma(numb) {
    return numb.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  function stringToDate(stringDate, type) {
    const dateSource = new Date(stringDate);
    const week = ["일", "월", "화", "수", "목", "금", "토"];
    const month = ("00" + (dateSource.getMonth() + 1)).slice(-2);
    const date = ("00" + dateSource.getDate()).slice(-2);
    const day = week[dateSource.getDay()];
    return [`${month}.${date}`, day];
  }
  const zzimClick = (idx, mb_save_yn) => {
    axios({
      method: "POST",
      url: "/saved/isSavedMyBook",
      headers: { user_id: userInfo.id },
      data: { mb_addidx: idx, mb_save_yn: mb_save_yn },
    }).then((res) => {
      console.log(ord, keyword);
      getSupportCont(ord, keyword);
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
        console.log(idx);
        getRecent();
      });
    }
    axios({
      url: `/mainpage/upViewCnt?si_idx=${idx}`,
      method: "POST",
    }).then((res) => {
      getSupportCont(ord, keyword);
    });
  };
  return (
    <>
      <li className={styles.SupportItem}>
        <div className={styles.leftArea}>
          <div className={styles.itemTop}>
            <ol>
              <li>{cateName}</li>
              <li>{locName}</li>
              <li>{targetName}</li>
            </ol>
            <p>{readDateSource && `${readDateSource} (${readDay}) 읽음`}</p>
          </div>
          <div className={styles.itemInfo}>
            <h4>
              <button
                type="button"
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
            <li className={`${styles.dueDate} ` + (isEnd ? styles.end : "")}>
              {isEnd ? (
                <span>마감</span>
              ) : (
                <>
                  <img
                    priority="true"
                    src={require("assets/img/global/ico/ico_date.png")}
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
                src={require("assets/img/global/ico/ico_view_black.png")}
                alt="조회수"
              />
              <span>{viewCount} 회</span>
            </li>
            <li
              className={`${styles.btnZzim} ` + (isZzim ? styles.isZzim : null)}
            >
              <button
                type="button"
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
    </>
  );
};
export default SupportItem;
