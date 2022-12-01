import React, { useState, useEffect } from "react";
import styles from "scss/pages/MyPage.module.scss";
import { useDispatch, useSelector } from "react-redux";

import { setSupportInfo } from "redux/store/supportInfoSlice";
import MyCompany from "components/myPage/MyCompany";
import MyLogin from "components/myPage/MyLogin";

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
          <div className={styles.rightArea}>
            <button type="button" name="" value={"ㅁ"} onClick={() => {}}>
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/public_assets/img/global/ico/ico_blocked.png"
                }
                alt="차단 회원 관리"
              />
              <span>알림설정</span>
            </button>
          </div>
        </div>
      </div>
      <div className={styles.MyPageContent}>
        <div className="inner">
          <div className={styles.myRecord}>
            <h4>활동이력</h4>
            <div>
              <button
                type="button"
                onClick={() => {
                  alert("준비 중입니다.");
                }}
              >
                멤버십 결제
              </button>
              <button
                type="button"
                onClick={() => {
                  alert("준비 중입니다.");
                }}
              >
                엑시토 프렌즈 결제
              </button>
              <button
                type="button"
                onClick={() => {
                  alert("준비 중입니다.");
                }}
              >
                이메일 정기배송 이력
              </button>
            </div>
          </div>
          <div className={styles.myCompany}>
            <h4>
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
                  <div className="toolTipBox">
                    <p className="txt">
                      입력한 정보는 저장되며 해당정보를 기반으로 맞춤 추천및
                      지원사업 조회가 가능합니다.
                    </p>
                  </div>
                </i>
              </span>
            </h4>
            <MyCompany />
          </div>
          <div className={styles.myLogin}>
            <h4>로그인정보</h4>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyPage;
