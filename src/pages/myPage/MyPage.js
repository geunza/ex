import React, { useState, useEffect } from "react";
import styles from "scss/pages/MyPage.module.scss";
import { useDispatch, useSelector } from "react-redux";

import { setSupportInfo } from "redux/store/supportInfoSlice";
import MyCompany from "components/myPage/MyCompany";
import MyLogin from "components/myPage/MyLogin";
import FilterButton from "components/home/FilterButton";
import Tooltip from "components/Tooltip";
import MyPageModal from "components/myPage/MyPageModal";
const MyPage = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const userInfo = useSelector((state) => state.userInfo);
  const supportInfo = useSelector((state) => state.supportInfo);

  const tooltipOpen = (e) => {
    const target = e.currentTarget.querySelector(".toolTipBox");
    target.classList.contains("active")
      ? target.classList.remove("active")
      : target.classList.add("active");
  };
  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);
  return (
    <div className={styles.MyPage}>
      <div className={`commonTitleWrap ${styles.titleArea}`}>
        <div className={`${styles.inner} inner`}>
          <div className={styles.leftArea}>
            <h3 className={`title ${styles.title}`}>마이페이지</h3>
            <p>지원사업 조건과 로그인 정보를 수정할 수 있어요.</p>
          </div>
          <div className="rightArea">
            <button type="button" onClick={() => {}}>
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/public_assets/img/global/ico/ico_alarm.png"
                }
                alt="알림설정"
              />
              <span>알림설정</span>
            </button>
          </div>
        </div>
        <MyPageModal />
      </div>

      <div className={styles.MyPageContent}>
        <div className="inner">
          <div className={styles.myRecord}>
            <h4 className={styles.mainTit}>활동이력</h4>
            <div className={styles.box}>
              <button
                type="button"
                onClick={() => {
                  alert("준비 중입니다.");
                }}
              >
                <div className={styles.imgArea}>
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/public_assets/img/myPage/myPage_01.png"
                    }
                    alt="멤버십 결제"
                  />
                </div>
                <span>멤버십 결제</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  alert("준비 중입니다.");
                }}
              >
                <div className={styles.imgArea}>
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/public_assets/img/myPage/myPage_02.png"
                    }
                    alt="엑시토 프렌즈 결제"
                  />
                </div>
                <span>엑시토 프렌즈 결제</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  alert("준비 중입니다.");
                }}
              >
                <div className={styles.imgArea}>
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/public_assets/img/myPage/myPage_03.png"
                    }
                    alt="이메일 정기배송 이력"
                  />
                </div>
                <span>이메일 정기배송 이력</span>
              </button>
            </div>
          </div>
          <div className={styles.myCompany}>
            <h4 className={styles.mainTit}>
              <span>
                기업정보
                <i onClick={tooltipOpen} className="btnToolTip" data-text="Hi">
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/public_assets/img/global/btn/btn_tooltip.png"
                    }
                    alt="tooltip"
                  />
                  <Tooltip
                    cont={
                      "입력한 정보는 저장되며 해당정보를 기반으로 맞춤 추천및 지원사업 조회가 가능합니다."
                    }
                  />
                </i>
              </span>
            </h4>
            <div className={styles.box}>
              <MyCompany />
            </div>
          </div>
          <div className={styles.myLogin}>
            <h4 className={styles.mainTit}>
              <span>
                로그인정보
                <i onClick={tooltipOpen} className="btnToolTip" data-text="Hi">
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/public_assets/img/global/btn/btn_tooltip.png"
                    }
                    alt="tooltip"
                  />
                  <Tooltip
                    cont={
                      "입력한 정보는 저장되며 해당정보를 기반으로 맞춤 추천및 지원사업 조회가 가능합니다."
                    }
                  />
                </i>
              </span>
            </h4>
            <div className={styles.box}>
              <MyLogin />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyPage;
